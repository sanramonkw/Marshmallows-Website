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

/**
 * Optional base URL for staff profile photos. The CRM returns bare filenames
 * (e.g. `1770467062.jpeg`) in the staff `img` field; the folder they live in
 * is not exposed by the plugin (which itself renders placeholder avatars), so
 * we only build a URL when this is configured or the value is already absolute.
 * Left empty → the widget shows a name-initials avatar (no broken images).
 */
export const SALONIST_IMAGE_BASE =
  import.meta.env.SALONIST_IMAGE_BASE || process.env.SALONIST_IMAGE_BASE || '';

function resolveStaffImage(raw: unknown): string {
  const v = String(raw ?? '').trim();
  if (!v || v === 'null') return '';
  if (/^https?:\/\//i.test(v)) return v;
  return SALONIST_IMAGE_BASE ? `${SALONIST_IMAGE_BASE.replace(/\/$/, '')}/${v}` : '';
}

/** CRM `service_time` is `"HH:MM"` (e.g. `"00:15"` = 15 min); tolerate a plain integer too. */
export function parseServiceTime(raw: unknown): number {
  const s = String(raw ?? '').trim();
  if (!s) return 0;
  const hm = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(s);
  if (hm) return Number.parseInt(hm[1], 10) * 60 + Number.parseInt(hm[2], 10);
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : 0;
}

/** Fallback formatter for a slot value with no adjacent label (`"08:00:00"` → `"8:00 AM"`). */
export function formatSlotLabel(value: string): string {
  const m = /^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/i.exec(value.trim());
  if (!m) return value.trim();
  const h = Number.parseInt(m[1], 10);
  const min = m[2];
  const ap = m[3] ? m[3].toUpperCase() : h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${min} ${ap}`;
}

// Windows-1252 code points (U+0080–U+009F specials) → their original byte,
// used to reverse UTF-8-decoded-as-CP1252 mojibake.
const CP1252_REV = new Map<number, number>([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84], [0x2026, 0x85],
  [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88], [0x2030, 0x89], [0x0160, 0x8a],
  [0x2039, 0x8b], [0x0152, 0x8c], [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92],
  [0x201c, 0x93], [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b], [0x0153, 0x9c],
  [0x017e, 0x9e], [0x0178, 0x9f],
]);

/**
 * Repair "double-encoded" text where UTF-8 bytes were mis-decoded as Windows-1252
 * (e.g. the CRM stores `"Salem Al-Mubarak Street â€" Symphony Mall"` — the `â€"`
 * is an en-dash "–"). Re-encodes to the original bytes and decodes as UTF-8.
 * Safe no-op when there are no mojibake markers or the repair would be invalid.
 */
export function fixMojibake(input: unknown): string {
  const s = String(input ?? '');
  if (!s || !/Ã.|Â.|â€/.test(s)) return s; // no mojibake markers → leave untouched
  const bytes: number[] = [];
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    if (cp <= 0xff) bytes.push(cp);
    else if (CP1252_REV.has(cp)) bytes.push(CP1252_REV.get(cp)!);
    else return s; // a genuinely non-CP1252 char (e.g. real Arabic) → not simple mojibake
  }
  try {
    const decoded = Buffer.from(bytes).toString('utf8');
    return decoded.includes('�') ? s : decoded; // invalid decode → keep original
  } catch {
    return s;
  }
}

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

export interface Slot {
  /** radio value submitted to the CRM, e.g. "08:00:00" */
  value: string;
  /** human label from the adjacent `<label>` text, e.g. "08:00 AM" */
  label: string;
}

/**
 * The CRM's slot endpoints answer with a pre-rendered HTML fragment of
 * `<label>08:00 AM <input type="radio" value="08:00:00" …></label>` pairs
 * (see ANALYSIS.md §4). We keep BOTH the radio `value` (what the CRM expects
 * back at booking time) and the visible label (what the widget shows). Empty
 * array = no slots.
 */
export function parseSlotsHtml(html: unknown): Slot[] {
  if (typeof html !== 'string' || html.trim() === '') return [];
  if (/not_available/i.test(html)) return [];
  if (/not\s+available/i.test(html.replace(/<[^>]*>/g, ' '))) return [];

  const slots: Slot[] = [];
  const seen = new Set<string>();
  const push = (value: string, labelHtml: string) => {
    const v = value.trim();
    if (!v || seen.has(v)) return;
    seen.add(v);
    const label = labelHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    slots.push({ value: v, label: label || formatSlotLabel(v) });
  };

  // Preferred: each slot is wrapped in a <label> whose text is the display time.
  const labelRe = /<label\b[^>]*>([\s\S]*?)<\/label>/gi;
  let lm: RegExpExecArray | null;
  let matched = false;
  while ((lm = labelRe.exec(html)) !== null) {
    const inner = lm[1];
    const vm = /<input\b[^>]*\bvalue\s*=\s*"([^"]+)"/i.exec(inner);
    if (!vm) continue;
    matched = true;
    push(vm[1], inner.replace(/<input[\s\S]*$/i, '')); // text before the <input>
  }

  // Fallback: bare <input>s with no wrapping label.
  if (!matched) {
    const re = /<input\b[^>]*\bvalue\s*=\s*"([^"]+)"[^>]*>/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) push(m[1], '');
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
        name: fixMojibake(detail.name || domain.name || domain.domain || ''),
        address: fixMojibake(domain.address || detail.address || ''),
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
          duration: parseServiceTime(c.service_time),
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
      // CRM field is `img` (a bare filename or null); older shapes used `image`.
      return { id, name: String(s.name ?? ''), image: resolveStaffImage(s.img ?? s.image) };
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
}): Promise<Slot[]> {
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

export interface MonthAvailability {
  month: string; // YYYY-MM
  /** ISO dates (YYYY-MM-DD) that were probed and returned NO slots. */
  unavailable: string[];
  /** ISO dates actually probed (the rest were skipped by the time budget). */
  probed: string[];
  /** true if every candidate day was probed within the budget. */
  complete: boolean;
}

/**
 * Smart calendar helper (mirrors the plugin's per-day pre-check, but safer):
 * for each bookable day in `month` — within [today, today+maxAdvance], excluding
 * closed weekdays — probe the normal slot path and mark the day unavailable ONLY
 * when it genuinely returns zero slots. Days left unprobed by the time budget are
 * reported via `probed`/`complete` so the UI can leave them clickable (never a
 * false "No Slot"). Bounded concurrency keeps upstream load reasonable.
 */
export async function fetchMonthAvailability(opts: {
  domainId: string;
  serviceId: string;
  month: string; // YYYY-MM
  staffId?: string;
  duration?: string;
  closedDays?: number[];
  maxAdvance?: number;
}): Promise<MonthAvailability> {
  const mm = /^(\d{4})-(\d{2})$/.exec(opts.month);
  if (!mm) throw new SalonistError('bad_request', 'Invalid month (expected YYYY-MM)', 400);
  const year = Number.parseInt(mm[1], 10);
  const mon = Number.parseInt(mm[2], 10); // 1-12
  const closed = new Set(opts.closedDays ?? []);
  const maxAdvance = opts.maxAdvance && opts.maxAdvance > 0 ? opts.maxAdvance : 30;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setDate(max.getDate() + maxAdvance);

  const daysInMonth = new Date(year, mon, 0).getDate();
  const candidates: string[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, mon - 1, d);
    date.setHours(0, 0, 0, 0);
    if (date < today || date > max) continue;
    if (closed.has(date.getDay())) continue; // closed weekday — UI already greys it
    candidates.push(`${mm[1]}-${mm[2]}-${String(d).padStart(2, '0')}`);
  }

  const unavailable: string[] = [];
  const probed: string[] = [];
  const deadline = Date.now() + 12_000; // overall time budget
  const CONCURRENCY = 8;
  let idx = 0;

  const worker = async () => {
    while (idx < candidates.length && Date.now() < deadline) {
      const iso = candidates[idx++];
      try {
        const slots = await fetchSlots({
          domainId: opts.domainId,
          serviceId: opts.serviceId,
          date: toCrmDate(iso),
          staffId: opts.staffId,
          duration: opts.duration,
        });
        probed.push(iso);
        if (slots.length === 0) unavailable.push(iso);
      } catch {
        // probe failed → leave the day clickable (do not mark unavailable)
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, candidates.length) }, worker),
  );

  return {
    month: opts.month,
    unavailable,
    probed,
    complete: probed.length === candidates.length,
  };
}
