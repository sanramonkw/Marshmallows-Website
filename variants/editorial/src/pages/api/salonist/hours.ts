/**
 * GET /api/salonist/hours?branch=<branchDomainId>
 * → { ok, closedDays: [0..6], maxAdvance: <days> }
 *
 * Business-hours metadata the calendar uses to disable closed weekdays and
 * bound the bookable window (0 = Sunday … 6 = Saturday).
 */
import type { APIRoute } from 'astro';
import { errorResponse, fetchBusinessHours, json, requireDomainId } from '../../../lib/salonist';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    requireDomainId();
    const branch = url.searchParams.get('branch') || requireDomainId();
    const hours = await fetchBusinessHours(branch);
    return json({ ok: true, ...hours }, 200, 600);
  } catch (err) {
    return errorResponse(err);
  }
};
