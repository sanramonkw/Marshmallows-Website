/**
 * POST /api/salonist/book
 * body: { branchId, service:{id,name,price}, staffId?, date:"YYYY-MM-DD",
 *         time:"H:MM AM", customer:{name, phone, email?} }
 * → { ok, orderId, message }
 *
 * Creates a pay-at-salon appointment via Salonist order_create_wordpress
 * (ANALYSIS.md §5). No online payment — the live site had none enabled.
 */
import type { APIRoute } from 'astro';
import { createBooking, errorResponse, json, requireDomainId } from '../../../lib/salonist';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    requireDomainId();

    let body: any;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'bad_request', message: 'Invalid JSON body' }, 400);
    }

    const name = String(body?.customer?.name ?? '').trim();
    const phone = String(body?.customer?.phone ?? '').trim();
    const serviceId = String(body?.service?.id ?? '').trim();
    const date = String(body?.date ?? '').trim();
    const time = String(body?.time ?? '').trim();
    if (name.length < 2 || !/^\+?[0-9\s-]{7,15}$/.test(phone) || !serviceId || !date || !time) {
      return json({ ok: false, error: 'bad_request', message: 'Missing or invalid booking fields' }, 400);
    }

    const result = await createBooking({
      branchId: String(body?.branchId ?? '') || requireDomainId(),
      service: {
        id: serviceId,
        name: String(body?.service?.name ?? ''),
        price: Number.parseFloat(String(body?.service?.price ?? '0')) || 0,
      },
      staffId: String(body?.staffId ?? ''),
      date,
      time,
      customer: { name, phone, email: String(body?.customer?.email ?? '').trim() },
    });

    return json(
      { ok: result.ok, orderId: result.orderId, message: result.message },
      result.ok ? 200 : 502,
    );
  } catch (err) {
    return errorResponse(err);
  }
};
