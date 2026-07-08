/**
 * PHASE 2 — Salonist CRM client (server-side only).
 *
 * Native reimplementation of the wire protocol used by the owner's licensed
 * `salonist-appointment` WordPress plugin (documented in
 * salonist-plugin/ANALYSIS.md). The Salonist CRM authenticates every call
 * with the salon's tenant id (`domainId`) sent form-encoded in the body —
 * we keep it out of the browser and proxy through /api/salonist/* routes.
 *
 * Credentials come from environment variables (see .env.example):
 *   SALONIST_DOMAIN_ID  — required; the salon's Salonist tenant id
 *   SALONIST_API_BASE   — optional; defaults to https://salonist.io
 */

export const SALONIST_BASE =
  import.meta.env.SALONIST_API_BASE ||
  process.env.SALONIST_API_BASE ||
  'https://salonist.io';

export function getDomainId(): string {
  return (
    import.meta.env.SALONIST_DOMAIN_ID ||
    process.env.SALONIST_DOMAIN_ID ||
    ''
  );
}

export class SalonistError extends Error {
  status: number;
  code: string;
  constructor(code: string, message: string, status = 502) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

/** JSON Response helper for the API routes. */
export function json(data: unknown, status = 200, cacheSeconds = 0): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  headers['Cache-Control'] =
    cacheSeconds > 0 ? `public, max-age=${cacheSeconds}` : 'no-store';
  return new Response(JSON.stringify(data), { status, headers });
}

export function errorResponse(err: unknown): Response {
  if (err instanceof SalonistError) {
    return json({ ok: false, error: err.code, message: err.message }, err.status);
  }
  return json({ ok: false, error: 'upstream_error', message: 'Salonist request failed' }, 502);
}

/** Guard used by every route: 503 = "not configured" (widget shows fallback). */
export function requireDomainId(): string {
  const id = getDomainId();
  if (!id) {
    throw new SalonistError(
      'not_configured',
      'SALONIST_DOMAIN_ID is not set — online booking is disabled',
      503,
    );
  }
  return id;
}

/** Form-encoded POST to the Salonist CRM; returns parsed JSON. */
export async function upstream<T = any>(
  path: string,
  body: Record<string, string>,
  base = SALONIST_BASE,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch(`${base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(body).toString(),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new SalonistError('upstream_error', `Salonist returned HTTP ${res.status}`);
    }
    const text = await res.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new SalonistError('upstream_error', 'Salonist returned invalid JSON');
    }
  } catch (e) {
    if (e instanceof SalonistError) throw e;
    throw new SalonistError('upstream_error', 'Could not reach Salonist');
  } finally {
    clearTimeout(timer);
  }
}

/** ISO `YYYY-MM-DD` → CRM `DD-MM-YYYY` (passes `DD-MM-YYYY` through). */
export function toCrmDate(date: string): string {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (iso) return `${iso[3]}-${iso[2]}-${iso[1]}`;
  if (/^\d{2}-\d{2}-\d{4}$/.test(date)) return date;
  throw new SalonistError('bad_request', 'Invalid date format', 400);
}

/**
 * The CRM's slot endpoints answer with a pre-rendered HTML fragment of
 * <input type="radio" value="H:MM AM"> pairs (see ANALYSIS.md §4).
 * Parse the radio values into a clean string array; empty array = no slots.
 */
export function parseSlotsHtml(html: unknown): string[] {
  if (typeof html !== 'string' || html.trim() === '') return [];
  if (/not_available/i.test(html)) return [];
  if (/not\s+available/i.test(html.replace(/<[^>]*>/g, ' '))) return [];
  const slots: string[] = [];
  const re = /<input\b[^>]*\bvalue\s*=\s*"([^"]+)"[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const v = m[1].trim();
    if (v && !slots.includes(v)) slots.push(v);
  }
  return slots;
}

/* ------------------------------------------------------------------ */
/* Typed fetchers used by the API routes                              */
/* ------------------------------------------------------------------ */

export interface Branch {
  id: string;
  name: string;
  address: string;
  staffSelect: boolean;
}

export async function fetchBranches(domainId: string): Promise<Branch[]> {
  const data = await upstream('/wordpressapi/getAllLocations', { domainId });
  const raw: any[] = Array.isArray(data?.locations) ? data.locations : [];
  const branches = raw
    .map((loc): Branch | null => {
      // nested (Domain/Detail) and flat shapes both occur upstream
      const domain = loc?.Domain ?? loc ?? {};
      const detail = loc?.Detail ?? loc?.detail ?? {};
      const id = String(domain.id ?? '');
      if (!id) return null;
      return {
        id,
        name: String(detail.name || domain.name || domain.domain || ''),
        address: String(domain.address || detail.address || ''),
        staffSelect: (detail.staff_select ?? '') !== 'None',
      };
    })
    .filter((b): b is Branch => b !== null);
  // Single-location accounts can return an empty list — the root tenant id
  // is itself bookable.
  if (branches.length === 0) {
    branches.push({ id: domainId, name: '', address: '', staffSelect: true });
  }
  return branches;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
}
export interface ServiceCategory {
  id: string;
  name: string;
  services: ServiceItem[];
}

export async function fetchServices(domainId: string): Promise<ServiceCategory[]> {
  const data = await upstream('/wordpressapi/services', { domainId });
  const raw: any[] = Array.isArray(data?.services) ? data.services : [];
  const categories: ServiceCategory[] = [];
  for (const row of raw) {
    const plan = row?.Plan ?? row ?? {};
    const children: any[] = Array.isArray(row?.Child)
      ? row.Child
      : Array.isArray(row?.child)
        ? row.child
        : [];
    const services: ServiceItem[] = children
      .map((c): ServiceItem | null => {
        const id = String(c?.id ?? '');
        if (!id) return null;
        return {
          id,
          name: String(c.name ?? ''),
          price: Number.parseFloat(String(c.price ?? '0')) || 0,
          duration: Number.parseInt(String(c.service_time ?? '0'), 10) || 0,
        };
      })
      .filter((s): s is ServiceItem => s !== null);
    if (services.length > 0) {
      categories.push({
        id: String(plan.id ?? ''),
        name: String(plan.name ?? ''),
        services,
      });
    }
  }
  return categories;
}

export interface StaffMember {
  id: string;
  name: string;
  image: string;
}

export async function fetchStaff(domainId: string, serviceId: string): Promise<StaffMember[]> {
  const data = await upstream('/wordpressapi/service_staff', {
    domainId,
    service_id: serviceId,
  });
  const raw: any[] = Array.isArray(data?.list) ? data.list : [];
  return raw
    .map((s): StaffMember | null => {
      const id = String(s?.id ?? '');
      if (!id) return null;
      return { id, name: String(s.name ?? ''), image: String(s.image ?? '') };
    })
    .filter((s): s is StaffMember => s !== null);
}

export interface BusinessHours {
  closedDays: number[]; // 0 = Sunday … 6 = Saturday
  maxAdvance: number; // bookable days ahead
}

export async function fetchBusinessHours(domainId: string): Promise<BusinessHours> {
  const data = await upstream('/wordpressapi/business_hours', { domainId });
  const details = data?.details?.Insdetail ?? data?.details ?? {};
  const maxAdvance = Number.parseInt(String(details?.max_advance_booking ?? ''), 10) || 30;
  const closedDays: number[] = [];
  const list = data?.list;
  if (list && typeof list === 'object') {
    for (const [key, row] of Object.entries<any>(list)) {
      const status = row?.Businesshours?.status ?? row?.status ?? '';
      if (status === 'Close') closedDays.push(Number.parseInt(key, 10));
    }
  }
  return { closedDays: closedDays.filter((d) => Number.isFinite(d)), maxAdvance };
}

/**
 * Slots for one date. Mirrors the plugin's two-step strategy: ask for the
 * specific specialist's availability first, fall back to general business
 * time for "no preference" (or when the staff call yields nothing).
 */
export async function fetchSlots(opts: {
  domainId: string;
  serviceId: string;
  date: string; // DD-MM-YYYY
  staffId?: string;
  duration?: string;
}): Promise<string[]> {
  const { domainId, serviceId, date } = opts;
  const staffId = opts.staffId && opts.staffId !== 'any' ? opts.staffId : '';

  if (staffId) {
    try {
      const data = await upstream('/wordpressapi/get_staff_time_availaibility', {
        domainId,
        staff: staffId,
        date,
        serviceId,
        servicetime: opts.duration ?? '',
      });
      const slots = parseSlotsHtml(data?.html);
      if (slots.length > 0) return slots;
    } catch {
      // fall through to business time
    }
  }

  const data = await upstream('/wordpressapi/get_business_time', {
    domainId,
    date,
    serviceId,
  });
  return parseSlotsHtml(data?.html);
}

export interface BookingRequest {
  branchId: string;
  service: { id: string; name: string; price: number };
  staffId?: string; // '' | 'any' = no preference
  date: string; // YYYY-MM-DD (client) — converted here
  time: string; // slot value, e.g. "10:00 AM"
  customer: { name: string; phone: string; email?: string };
}

export interface BookingResult {
  ok: boolean;
  orderId: string;
  message: string;
}

/** Create a pay-at-salon appointment (the live site had no online payment). */
export async function createBooking(req: BookingRequest): Promise<BookingResult> {
  const billDate = toCrmDate(req.date);
  const staffId = req.staffId && req.staffId !== 'any' ? req.staffId : '';
  const price = Number.isFinite(req.service.price) ? req.service.price : 0;

  const order: Record<string, string> = {
    domainId: req.branchId,
    type: 'Appointment',
    customer_id: '',
    bill_date: billDate,
    subtotal: String(price),
    grandtotal: String(price),
    item_vat: '0',
    payingnow: '0',
    dueamount: String(price),
    customer_name: req.customer.name,
    customer_contact: req.customer.phone,
    email: req.customer.email ?? '',
    payment_mode: 'Cash on delivery', // CRM value for "pay at salon"
    time: req.time,
    staffId,
    'services[0][id]': req.service.id,
    'services[0][qty]': '1',
    'services[0][price]': String(price),
    'services[0][discount]': '0',
    'services[0][total]': String(price),
    'services[0][staffId]': staffId,
    'services[0][bill_date]': billDate,
    'services[0][time]': req.time,
  };

  const res = await upstream('/wordpressapi/order_create_wordpress', order);
  const ok = res?.status === 'success' || res?.success === true;
  return {
    ok,
    orderId: String(res?.order_id ?? res?.salonSaleId ?? ''),
    message: String(res?.message ?? ''),
  };
}
