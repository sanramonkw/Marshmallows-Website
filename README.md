# Marshmallows Nail Spa — marshmallows.co (Astro rebuild)

Modern Astro 5 + Tailwind 4 rebuild, migrated off WordPress. Arabic-first
(RTL at root, EN under `/en/`), native Salonist booking widget + server proxy
(`/api/salonist/*`, node adapter), per-branch BeautySalon JSON-LD.

**Design: BOLD INNOVATION ("Sugar Rush")** — the owner's chosen final design,
promoted from `variants/bold/` into the project root on 2026-07-12 (pure
restyle; content/URLs/SEO/booking unchanged). See `CLAUDE.md` for the full
design-tokens/jury-log writeup. A snapshot of the previous master design is
kept at the git branch `pre-bold-promotion`.

- **Start here:** `CLAUDE.md` (context, tokens, PHASE 2 booking architecture) and `DEPLOYMENT.md` (deploy options: node server for live booking, or pure static with WhatsApp fallback; needs `SALONIST_DOMAIN_ID`).
- **Run:** `npm install && npm run build` then `node dist/server/entry.mjs` (or `npm run dev`).
- **`salonist-plugin/`** — the original WP plugin + `ANALYSIS.md` (Salonist API protocol reference).
- **`variants/premium|editorial/`** — two archived alternative design directions (same content/URLs/SEO/booking, different visual language), each with its own `VARIANT.md`, kept in case the owner wants to revisit them. `variants/bold/` was promoted to root and removed.
