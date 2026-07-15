/**
 * GET /api/salonist/availability?branch=&service=&month=YYYY-MM[&staff=][&duration=]
 * → { ok, month, unavailable: ["YYYY-MM-DD"…], complete }
 *
 * Smart-calendar pre-check: probes each bookable day in the month and reports
 * which ones are fully booked/closed so the widget can strike them out. Days
 * not probed within the time budget are omitted from `unavailable` (and
 * `complete` is false) so they stay clickable — never a false "No Slot".
 * Result is cached in-memory per (branch,service,staff,duration,month) for 10
 * minutes, matching the plugin's availability cache.
 */
import type { APIRoute } from 'astro';
import {
  errorResponse,
  fetchBusinessHours,
  fetchMonthAvailability,
  json,
  requireDomainId,
  type MonthAvailability,
} from '../../../lib/salonist';

export const prerender = false;

const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map<string, { at: number; value: MonthAvailability }>();

export const GET: APIRoute = async ({ url }) => {
  try {
    requireDomainId();
    const branch = url.searchParams.get('branch') || requireDomainId();
    const service = url.searchParams.get('service') || '';
    const month = url.searchParams.get('month') || '';
    const staff = url.searchParams.get('staff') || 'any';
    const duration = url.searchParams.get('duration') || '';
    if (!service || !/^\d{4}-\d{2}$/.test(month)) {
      return json({ ok: false, error: 'bad_request', message: 'service and month=YYYY-MM are required' }, 400);
    }

    const key = `${branch}|${service}|${staff}|${duration}|${month}`;
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
      return json({ ok: true, ...hit.value }, 200, 300);
    }

    const hours = await fetchBusinessHours(branch).catch(() => ({ closedDays: [], maxAdvance: 30 }));
    const value = await fetchMonthAvailability({
      domainId: branch,
      serviceId: service,
      month,
      staffId: staff,
      duration,
      closedDays: hours.closedDays,
      maxAdvance: hours.maxAdvance,
    });

    // Only cache a fully-probed month; partial results should be retried.
    if (value.complete) cache.set(key, { at: Date.now(), value });

    return json({ ok: true, ...value }, 200, value.complete ? 300 : 0);
  } catch (err) {
    return errorResponse(err);
  }
};
