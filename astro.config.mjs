// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Mirrors the live WordPress/Polylang setup:
//   Arabic  = default locale, served at the root (/, /services-ar/, /about-ar/ …)
//   English = prefixed with /en/ (/en/home/, /en/services/ …)
//
// DEPLOY_TARGET env var selects the deploy target at build time:
//   (unset)            -> production: site https://marshmallows.co, base '/'.
//                          Build + run `node dist/server/entry.mjs` (dist/client
//                          + dist/server) so /api/salonist/* works and the
//                          booking widget is fully functional. NEVER set
//                          DEPLOY_TARGET for a production build.
//   DEPLOY_TARGET=pages -> GitHub Pages review deploy: site
//                          https://sanramonkw.github.io, base
//                          '/Marshmallows-Website/'. Only dist/client (the
//                          static half of the node-adapter build) is
//                          published — Pages can't run dist/server, so
//                          /api/salonist/* is unavailable there and the
//                          booking widget gracefully degrades to its
//                          WhatsApp/phone fallback. That degradation is
//                          expected/correct on Pages, not a bug.
const isPagesBuild = process.env.DEPLOY_TARGET === 'pages';

export default defineConfig({
  site: isPagesBuild ? 'https://sanramonkw.github.io' : 'https://marshmallows.co',
  base: isPagesBuild ? '/Marshmallows-Website/' : '/',
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
