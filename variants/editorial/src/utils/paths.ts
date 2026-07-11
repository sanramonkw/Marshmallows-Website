/**
 * Prefixes a root-relative path with the configured Astro `base`, so links
 * and asset references keep working under a subpath deployment (e.g. GitHub
 * Pages project pages) as well as at the domain root (production).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
