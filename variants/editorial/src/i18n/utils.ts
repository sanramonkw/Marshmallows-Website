import { ui, defaultLocale, type Locale, type UIKey } from './ui';
import { withBase } from '../utils/paths';

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}

export const dirFor = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');

/**
 * Route map between the Arabic (default, unprefixed) and English (/en/…)
 * versions of every page — mirrors the live site's Polylang URL structure.
 * Keys are logical page ids used by nav/hreflang.
 */
export const routes: Record<string, { ar: string; en: string }> = {
  home: { ar: '/', en: '/en/home/' },
  services: { ar: '/services-ar/', en: '/en/services/' },
  salonService: { ar: '/services-ar/salon-service-ar/', en: '/en/services/salon-service/' },
  partyBooth: { ar: '/services-ar/party-booth-ar/', en: '/en/services/party-booth/' },
  homeService: { ar: '/services-ar/home-service-ar/', en: '/en/services/home-service/' },
  about: { ar: '/about-ar/', en: '/en/about-us/' },
  photos: { ar: '/الصور/', en: '/en/photos/' },
  videos: { ar: '/مقاطع-الفيديو/', en: '/en/videos/' },
  contact: { ar: '/contact-ar/', en: '/en/contact/' },
  booking: { ar: '/booking-ar/', en: '/en/booking/' },
};

export type PageId = keyof typeof routes;

/** In-page navigation href, base-prefixed for subpath (GitHub Pages) deploys. */
export function pathFor(page: PageId, locale: Locale): string {
  return withBase(routes[page][locale]);
}

/** The same page in the other language (for hreflang + language switcher), base-prefixed. */
export function alternatePath(page: PageId, locale: Locale): string {
  return withBase(routes[page][locale === 'ar' ? 'en' : 'ar']);
}

/**
 * Bare (un-based) route paths for SEO absolute URLs (canonical / hreflang /
 * og:url). These are resolved against the production `site` via `new URL()`,
 * so they must NOT carry the GitHub Pages base prefix.
 */
export function seoPath(page: PageId, locale: Locale): string {
  return routes[page][locale];
}

export function seoAlternate(page: PageId, locale: Locale): string {
  return routes[page][locale === 'ar' ? 'en' : 'ar'];
}

/**
 * EDITORIAL variant helper — section/folio numbers.
 * Arabic-Indic digits for the Arabic experience (٠١ ٠٢ …),
 * zero-padded Latin for English (01 02 …).
 */
export function folio(n: number, locale: Locale): string {
  const padded = String(n).padStart(2, '0');
  if (locale !== 'ar') return padded;
  const arabicIndic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return padded.replace(/\d/g, (d) => arabicIndic[Number(d)]);
}
