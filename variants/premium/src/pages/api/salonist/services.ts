/**
 * GET /api/salonist/services?branch=<branchDomainId>
 * → { ok, categories: [{ id, name, services: [{ id, name, price, duration }] }] }
 *
 * Live service catalogue for one branch (Salonist Plan/Child re-flattened —
 * labels come from the CRM, not from src/data/services.ts).
 */
import type { APIRoute } from 'astro';
import { errorResponse, fetchServices, json, requireDomainId } from '../../../lib/salonist';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    requireDomainId();
    const branch = url.searchParams.get('branch') || requireDomainId();
    const categories = await fetchServices(branch);
    return json({ ok: true, categories }, 200, 300);
  } catch (err) {
    return errorResponse(err);
  }
};
