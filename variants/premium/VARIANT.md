# PREMIUM variant — "Maison Marshmallows"

Luxury/editorial redesign of marshmallows.co (master:
`../../marshmallows.co/` — read its CLAUDE.md for architecture, i18n,
booking, SEO; all of that is inherited unchanged). Same 20 pages, same
URLs (AR default at root incl. Arabic slugs, EN under `/en/`), same
verbatim content, same data model, same SEO head, same booking island +
`/api/salonist/*` proxy. Only the presentation layer changed.

## Concept

A "boutique beauty maison": porcelain/cream fields with the brand's
marshmallow pinks recast as accents — a rosewood-deepened pink for text
and CTAs (AA contrast), blush washes for section fields, hairline rules
everywhere. The hero video sits in an arched atelier window with a cream
mat and an offset echo frame; services are an arched triptych; price
lists read like a spa menu carte (dotted leaders, end-aligned serif
prices); the gallery is a soft editorial mosaic with occasional arch
frames; the booking fallback is a glass-blur panel; the footer is a deep
warm-ink maison band. Designed RTL-first (logical properties only), EN
mirrors cleanly.

## Tokens (src/styles/global.css @theme)

Brand originals preserved: `pink #d9726d`, `pink-light #f7aeac`,
`pink-pale #fbd8d7`, `pink-card #fff5f5`, `brown-deep #ab866e`, etc.
Added premium derivatives:

| Token | Hex | Role |
|---|---|---|
| `rosewood` | `#a34944` | deepened brand pink — text accent / CTA (AA on porcelain) |
| `rosewood-deep` | `#7e3835` | hover |
| `blush-wash` | `#f8e8e2` | warm section field |
| `porcelain` | `#faf6f2` | page background |
| `porcelain-deep` | `#f2eae3` | page-hero field |
| `cream` | `#fffdfb` | raised cards |
| `hairline` | `#e7d7cd` | fine rules |
| `ink` | `#3a322d`, `ink-soft #6f635b` | warm charcoal type |

Shadows: `shadow-plush` / `shadow-whisper` (soft rosewood-tinted).

## Typography

- GE SS TV (Arabic) + Century Gothic (Latin body) unchanged, self-hosted.
- ONE added self-hosted face: **Cormorant Garamond** variable woff2
  (`public/fonts/cormorant-garamond-var.woff2`, 37 KB, weights 400–700,
  latin subset, no CDN). Used only for Latin display moments via
  `.font-display`; **Arabic display stays GE SS TV** (enforced by
  `html[lang]` rules in global.css).
- `.overline-label`: letterspaced caps for Latin, natural set for Arabic.

## Components changed (vs master)

- `global.css` — full redesign: tokens above, `.font-display`,
  `.overline-label`, `.flourish` (hairline + diamond gem), `.glass`,
  `.arch`, `.btn-solid`/`.btn-outline`, `.carte-item` (dotted-leader menu
  rows), `[data-reveal]` scroll-reveal (transform/opacity only, disabled
  under `prefers-reduced-motion`), condensing `#site-header` styles,
  and a CSS-only restyle of `#booking-widget` (widget markup untouched).
  Base element styles are inside `@layer base` so utilities still win.
- `Header.astro` — glass sticky header, hairline underline nav with
  animated rules, condenses on scroll (rAF-throttled, passive), refined
  hamburger, dropdowns also open on `:focus-within`.
- `Footer.astro` — deep warm-ink maison band, serif branch headings in
  pink-light, hairline dividers, outline CTA. Content verbatim.
- `PageHero.astro` — porcelain-deep editorial opener: overline subtitle,
  display h1, flourish.
- `ServiceCard.astro` — arched frame with cream mat, caption below,
  jewelry hover (image bloom + hairline grows).
- `PriceList.astro` — spa menu carte: single cream carte panel, native
  `<details>` accordion kept (165+ items), category names in display
  type, rotating `+` gem disclosure, dotted leaders, rosewood prices.
- `PartyPackages.astro`, `GalleryGrid.astro` (mosaic, every 5th image
  arched), `BookingCTA.astro` (solid/outline pill variants),
  `LanguageSwitcher.astro`, `PageHero`, all `pages/*Page.astro` —
  restyled; `BookingPage` fallback card is now a glass-blur panel over
  blush glows; `ContactPage` uses hairline-underline inputs.
- `BaseLayout.astro` — head/SEO untouched; added the tiny
  IntersectionObserver reveal script and a ring on the WhatsApp bubble
  (still green, fixed bottom-right physical in both locales).
- `BookingWidget.astro` and `src/pages/api/salonist/*` — **functionally
  untouched** (restyled purely via CSS in global.css).

## Jury log (Awwwards-style pass, Playwright desktop 1440×900 + mobile 390×844, AR + EN)

1. **Bug found & fixed:** footer h3 headings were invisible — the
   unlayered `h1–h6 { color: ink }` rule in global.css out-cascaded
   Tailwind's layered `text-pink-light` utility on the dark footer.
   Moved base element styles into `@layer base`.
2. **Contrast:** header language switcher was brown-deep (#ab866e,
   ~3.4:1 on glass) → switched to rosewood (>4.5:1). Footer body text
   `#d9c9bf` on `#332a25` ≈ 7:1; copyright `#bda798` ≈ 5:1 — AA passes.
3. **Booking degraded state:** empty step indicator left a hollow band —
   added `#bw-steps:empty { display:none }`.
4. RTL verified: carte leader rows (name→dots→price) mirror correctly,
   hero echo-frame offset flips via `rtl:-translate-x-3`, footer column
   order and nav mirror, calendar inside the widget stays `dir="ltr"`
   (by design, from master). EN LTR mirrors cleanly.
5. One h1 per page, focus-visible rings, reduced-motion honored, only
   JS: booking island + mobile toggle + header condense + reveal
   observer (~1 KB total added).

## Build / run

```bash
npm install
npm run build          # 20 pages + salonist API, node adapter — passing
HOST=127.0.0.1 PORT=4340 node dist/server/entry.mjs   # this variant's port
```

Booking degrades gracefully without `SALONIST_DOMAIN_ID` (bilingual
offline note + WhatsApp/phone glass panel) — expected in preview.
