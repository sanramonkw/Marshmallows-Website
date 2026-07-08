# VARIANT — EDITORIAL MINIMAL ("The Marshmallows Journal")

A beauty-magazine / lookbook expression of Marshmallows Nail Spa. Same
content, URLs, data model, SEO head, and functionality as the master
(`../../marshmallows.co/` — read its CLAUDE.md first); only the design
language changed.

## Concept

The anti-noise salon site: a serene, timeless beauty journal. Porcelain,
blush-tinted paper (`#fbf7f5`) with soft warm ink (`#29241f`); the brand
pink `#d9726d` is confined to folios, hairline rules, link underlines and
the arrow accents, with a rosewood derivative `#a3423d` (5.9:1 on paper,
WCAG AA) carrying small-text accents and the signature CTA. Photography is
treated as magazine plates — hairline-matted figures with quiet folio
captions — and every section carries a numbered folio: **Arabic-Indic
numerals in AR (٠١ الصالون / ٠٢ الخدمات…), Latin in EN (01/02…)**. Services
read as a fine spa carte: numbered category headings, dotted leaders, a KD
price column, and a typographic jump index. RTL-first: everything is built
on logical properties so the Arabic (default) experience mirrors perfectly.

## Tokens (added on top of the master's originals — none removed)

| Token | Value | Role |
|---|---|---|
| `paper` | `#fbf7f5` | body — warm blush-tinted paper |
| `paper-2` | `#f5ebe8` | deeper blush plate (reserve) |
| `rose` | `#a3423d` | rosewood pink derivative, AA for small text; CTA fill |
| `ink` | `#29241f` | warm editorial ink (overrides master's `#2e2e2e`) |
| `ink-soft` | `#6d635d` | captions / secondary copy |
| `hairline` | `#e4d9d4` | 1px editorial rules |
| `--font-serif` | Cormorant Garamond | the ONE added face (variable woff2 ×2, self-hosted, OFL) — **Latin display only**; Arabic display stays GE SS TV |

CSS primitives in `src/styles/global.css`: `.eyebrow` (tracked small-caps
label — tracking only in EN; Arabic is never letter-spaced), `.folio`,
`.rule / .rule-ink / .rule-pink`, `.carte-row + .leader + .carte-price`
(dotted-leader menu rows), `.plate` + `.plate-caption` (hairline-matted
figures), `.btn-editorial` (+ `--ghost`).

## Key changes

- **`src/styles/global.css`** — full editorial token/primitive layer; added
  Cormorant Garamond `@font-face` (2 woff2, no CDN); **GE SS TV scoped via
  `unicode-range`** to Arabic script + digits/punctuation because the TTF is
  missing the Latin "y" glyph ("Salmiya" rendered "Salmi a" on AR pages) —
  Latin words inside Arabic pages now fall back to brand Century Gothic
  while digits keep GE SS TV's Arabic-Indic rendering; reduced-motion guard;
  `:focus-visible` rosewood outline; scoped `#booking-widget` overrides that
  flatten radii/shadows (restyle only — widget markup/logic untouched).
- **`src/i18n/utils.ts`** — added `folio(n, locale)` (٠١/01) helper only;
  routes map untouched.
- **`Header.astro`** — paper masthead, hairline bottom rule, small tracked
  ink nav with pink active underline, ghost carte CTA; dropdowns became
  hairline panels (also keyboard-visible via `focus-within`); gallery parent
  is now a real link (to Photos) instead of a dead `<span>`.
- **`Footer.astro`** — colophon: `pink-card` field, eyebrow branch directory
  with hairline stubs, small-print license line under a full rule.
- **`PageHero.astro`** — pink banner → editorial title block: numbered
  eyebrow + huge quiet `h1` + short pink rule (accepts `num`).
- **`PriceList.astro`** — accordion → open **carte**: typographic category
  index (anchor jumps), numbered category headings (serif in EN), dotted
  leaders, rosewood KD price column. Same `PriceCategory` data, verbatim.
- **`PartyPackages.astro`** — shadow cards → numbered carte entries with
  ink top rules, em-dash feature lists, hairline-framed prices, leader rows
  for extras.
- **`GalleryGrid.astro`** — masonry → editorial contact sheet: uniform
  square plates, thin gutters, folio-numbered captions.
- **`ServiceCard.astro`** — overlay gradient card → magazine figure: 4:5
  plate, caption BELOW with folio + direction-aware arrow (→/← mirrors via
  `rtl:`), slow reduced-motion-safe zoom.
- **`BookingCTA.astro`** — rosewood editorial button (+ `ghost` variant).
- **Pages** (`src/components/pages/*.astro`) — recomposed on a 6xl grid with
  hairline section separators and folios: home = cover (eyebrow → huge
  headline → pink rule → video plate ٠٠) + ٠١ about spread + ٠٢ services
  plates; about = three alternating plate/essay spreads (first paragraph set
  larger); contact = underline-only editorial form fields (same CF7 field
  names + mailto script); booking = widget + hairline fallback band.

## Unchanged (hard constraints honored)

All 20 routes incl. Arabic slugs; copy verbatim (both locales); assets;
BaseLayout SEO head (canonical/hreflang/JSON-LD/OG) byte-identical;
sitemap/robots/llms.txt; BookingWidget island + `/api/salonist/*` +
`src/lib/salonist.ts` functionally untouched; WhatsApp bubble + fallback
card; contact mailto; hero video; one `h1`/page; lazy images; ~zero added
JS (same two tiny inline scripts as master).

## Jury log (self-review vs Playwright screenshots, desktop 1440×900 + mobile 390×844)

1. **Latin "y" missing on AR pages** — GE SS TV TTF has no "y" glyph:
   "Salmiya"→"Salmi a", "Symphony"→"S mphon", "Type here"→"T pe here".
   Fixed with `unicode-range` scoping (see above). Re-shot: correct.
2. **Duplicate headings** — first draft repeated `home.aboutTitle` /
   `home.servicesTitle` in both eyebrow and `h2` (copy-verbatim rule bars
   inventing new label text). Replaced eyebrows with folio + hairline stub.
3. **Arrow directionality** — service-card arrow was a single hardcoded
   glyph; replaced with `rtl:`-swapped →/← pair and mirrored hover
   translation.
4. **RTL mirror check** — carte price column sits at inline-end (left in
   AR, right in EN); about spreads alternate correctly; header logo right /
   CTA left in AR; contact-sheet folios read RTL. Pass.
5. **Carte headings** — promoted to serif display size in EN for a stronger
   menu-as-carte voice.
6. **AA check** — rosewood `#a3423d` on paper 5.9:1, ink-soft 5.2:1, CTA
   white-on-rosewood 6.2:1. Pass.

## Build & run

```bash
npm install
npm run build                    # 20 pages + salonist API — passing
HOST=127.0.0.1 PORT=4342 node dist/server/entry.mjs   # this variant's port
```

Without `SALONIST_DOMAIN_ID` the booking widget degrades to the bilingual
offline note + WhatsApp/phone fallback (expected). Final AR homepage
screenshot: scratchpad `variant-marshmallows-editorial.png`.
