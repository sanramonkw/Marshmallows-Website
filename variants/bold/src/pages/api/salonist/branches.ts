/**
 * GET /api/salonist/branches
 * → { ok, branches: [{ id, name, address, staffSelect }] }
 *
 * Server-side proxy to Salonist getAllLocations (see salonist-plugin/ANALYSIS.md).
 * Returns 503 { error: "not_configured" } when SALONIST_DOMAIN_ID is unset —
 * the widget then shows the WhatsApp/phone fallback.
 */
import type { APIRoute } from 'astro';
import { errorResponse, fetchBranches, json, requireDomainId } from '../../../lib/salonist';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const domainId = requireDomainId();
    const branches = await fetchBranches(domainId);
    return json({ ok: true, branches }, 200, 300);
  } catch (err) {
    return errorResponse(err);
  }
};
