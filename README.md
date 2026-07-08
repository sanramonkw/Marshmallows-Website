# Marshmallows Nail Spa — marshmallows.co (Astro rebuild)

Modern Astro 5 + Tailwind 4 rebuild, migrated off WordPress. Arabic-first
(RTL at root, EN under `/en/`), native Salonist booking widget + server proxy
(`/api/salonist/*`, node adapter), per-branch BeautySalon JSON-LD.

- **Start here:** `CLAUDE.md` (context, tokens, PHASE 2 booking architecture) and `DEPLOYMENT.md` (deploy options: node server for live booking, or pure static with WhatsApp fallback; needs `SALONIST_DOMAIN_ID`).
- **Run:** `npm install && npm run build` then `node dist/server/entry.mjs` (or `npm run dev`).
- **`salonist-plugin/`** — the original WP plugin + `ANALYSIS.md` (Salonist API protocol reference).
- **`variants/premium|bold|editorial/`** — three alternative production-ready design directions (same content/URLs/SEO/booking, different visual language), each with its own `VARIANT.md`. The root project is the master reference.
