// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Mirrors the live WordPress/Polylang setup:
//   Arabic  = default locale, served at the root (/, /services-ar/, /about-ar/ …)
//   English = prefixed with /en/ (/en/home/, /en/services/ …)
export default defineConfig({
  site: 'https://marshmallows.co',
  trailingSlash: 'always',
  // PHASE 2 — Salonist booking: the site stays fully prerendered ('static' is
  // Astro 5's default), but the node adapter enables the on-demand API proxy
  // routes under /api/salonist/* (each opts out with `prerender = false`).
  // Deploy: `node dist/server/entry.mjs` serves both the static pages and the
  // API. Pure-static fallback: deploy dist/client/ alone — the booking widget
  // then degrades gracefully to the WhatsApp/phone fallback. See CLAUDE.md.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    '/en': '/en/home/',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ar',
        locales: {
          ar: 'ar',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
