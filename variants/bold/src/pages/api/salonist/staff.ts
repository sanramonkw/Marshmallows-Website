/**
 * GET /api/salonist/staff?branch=<branchDomainId>&service=<serviceId>
 * → { ok, staff: [{ id, name, image }] }
 *
 * Specialists able to perform a service ("no preference" is handled
 * client-side with staffId "any").
 */
import type { APIRoute } from 'astro';
import { errorResponse, fetchStaff, json, requireDomainId } from '../../../lib/salonist';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    requireDomainId();
    const branch = url.searchParams.get('branch') || requireDomainId();
    const service = url.searchParams.get('service') || '';
    if (!service) {
      return json({ ok: false, error: 'bad_request', message: 'service is required' }, 400);
    }
    const staff = await fetchStaff(branch, service);
    return json({ ok: true, staff }, 200, 300);
  } catch (err) {
    return errorResponse(err);
  }
};
