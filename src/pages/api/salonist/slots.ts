/**
 * GET /api/salonist/slots?branch=&service=&date=YYYY-MM-DD[&staff=][&duration=]
 * → { ok, slots: [{ value: "08:00:00", label: "08:00 AM" }, …] }
 *   (empty array = fully booked / closed)
 *
 * The CRM answers with a pre-rendered HTML radio list; we parse each radio's
 * `value` (submitted back at booking time) AND its visible label server-side
 * and hand the widget clean JSON (ANALYSIS.md §4).
 */
import type { APIRoute } from 'astro';
import { errorResponse, fetchSlots, json, requireDomainId, toCrmDate } from '../../../lib/salonist';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    requireDomainId();
    const branch = url.searchParams.get('branch') || requireDomainId();
    const service = url.searchParams.get('service') || '';
    const date = url.searchParams.get('date') || '';
    if (!service || !date) {
      return json({ ok: false, error: 'bad_request', message: 'service and date are required' }, 400);
    }
    const slots = await fetchSlots({
      domainId: branch,
      serviceId: service,
      date: toCrmDate(date),
      staffId: url.searchParams.get('staff') || 'any',
      duration: url.searchParams.get('duration') || '',
    });
    return json({ ok: true, slots }, 200, 60);
  } catch (err) {
    return errorResponse(err);
  }
};
