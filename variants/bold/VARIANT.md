# VARIANT — BOLD INNOVATION ("Sugar Rush")

Design variant of marshmallows.co (master: `../../marshmallows.co/` — **do not
modify the master**). Same 20 pages, same URLs (AR at root incl. Arabic slugs,
EN under `/en/`), same verbatim content, same SEO head (canonical / hreflang /
per-branch NailSalon+BeautySalon JSON-LD / sitemap / robots / llms.txt), same
booking widget + `/api/salonist/*` (restyled shell only), WhatsApp bubble +
fallback, contact mailto — all functionally untouched.

## Concept

**Playful nail-art-studio energy, Gen-Z beauty-brand rebrand.** RTL-first:
oversized GE SS TV Bold Arabic display headlines on coral→blush gradient
fields, sticker/badge chips with hard offset shadows, a bento home grid,
tilted polaroid mood-board gallery, a marquee band of real service categories,
and an animated counter strip from real data. Fun but salon-trustworthy —
hierarchy, whitespace and AA contrast are kept strict.

## Tokens (in `src/styles/global.css` `@theme`)

All original brand tokens preserved (`pink #d9726d`, `pink-light #f7aeac`,
`pink-pale #fbd8d7`, `pink-card #fff5f5`, `brown-deep #ab866e`, …) plus three
same-hue derivatives for the bold look:

| Token | Hex | Why |
|---|---|---|
| `pink-deep` | `#b3413c` | darkened brand pink — white text passes WCAG AA (≈5.6:1) |
| `plum` | `#3a1c1a` | near-black ink derived from the pink — body/heading ink, borders, offset shadows; ≥4.5:1 on every pink |
| `cream` | `#fff8f6` | warm paper body background |

`ink` is remapped to plum so untouched components inherit the palette.
Fonts unchanged (GE SS TV + Century Gothic self-hosted); **no font added**,
no CDNs.

## Key techniques / components

- `global.css`: gradient utilities (`grad-hero`, `grad-band`, `grad-soft`,
  `grad-text`), `display-xl/lg` clamp headline scale, `.sticker` /
  `.chip-price` badge system, `.card-pop` (2.5px plum border + hard offset
  shadow + hover lift), `.tilt-a…d` mood-board rotations,
  direction-aware pure-CSS marquee (`translateX(±100%)` per `dir`),
  scroll-reveal styles using the **`translate` property** (never fights the
  tilt `transform`s), chunky `:focus-visible` ring, `::selection`.
- New components: `Marquee.astro` (service categories, aria-hidden duplicate
  track, wraps statically under reduced motion), `StatStrip.astro`
  (semantic `<dl>`, final values server-rendered; count-up only enhances).
- `BaseLayout.astro`: tiny inline `html.js` marker + one IntersectionObserver
  script (reveals + count-up, `prefers-reduced-motion` gated,
  transform/opacity only); sticky mobile Book-Now pill (header CTA is
  lg-only); restyled WhatsApp bubble (still fixed bottom-right, both
  locales). Head/SEO byte-compatible with master.
- `HomePage.astro`: gradient hero with oversized Arabic headline + linked
  service sticker chips + tilted video card + floating 💅 sticker → marquee →
  about with overlapping tilted photos + gradient display heading → counter
  strip (2 branches / 165+ services — computed from `src/data/services.ts` —
  / est. 2013) → bento grid (3 service cards, gallery mood-board teaser,
  gradient booking-CTA tile with phone, 2 branch tiles).
- `PriceList`: bold `<details>` accordion, prices as KD sticker chips.
  `PartyPackages`: tinted header strips + price stickers. `GalleryGrid`:
  tilted, staggered polaroids. `Footer`: deep-plum rounded card with sticker
  headings and pink offset shadow. `PageHero`: gradient band + display-xl h1.
- Accessibility: one h1/page, semantic dl/details/nav, focus-visible ring,
  plum-on-pink text everywhere (no white-on-#d9726d body text), reveals and
  marquee fully disabled/static under `prefers-reduced-motion`, lazy images.

## Jury log (Playwright, desktop 1440×900 + mobile 390×844, AR + EN)

1. **Booking bento tile white-on-white** — `.card-pop` (background #fff,
   declared later) beat `.grad-band` → white CTA text invisible. Fixed with
   explicit `.card-pop.grad-band` rule. Re-verified.
2. **Reveal killed the tilts** — `[data-reveal].is-in { transform:
   translateY(0) }` overwrote `rotate()` on elements carrying both (contact
   photo, video frames). Fixed by moving reveals to the independent
   `translate` property. Re-verified.
3. **Empty Salonist step bar** — when the API is unconfigured the widget's
   empty `<ol id="bw-steps">` left dead space; added `empty:hidden`
   (restyle only, no logic change). Offline degradation message + WhatsApp
   fallback card confirmed working.
4. **Sticky Book-Now missing on mobile** (header CTA was lg-only) — added a
   fixed bottom-start pill in `BaseLayout` for < lg, per brief.
5. **Contrast fixes** — branch-tile links switched from `pink-deep` (3.2:1 on
   pink-light) to plum (8.5:1); nav links plum instead of the master's pink
   (3.5:1 on white).
6. RTL correctness verified: hero/text/bento mirror via logical properties,
   marquee animates the correct direction per `dir`, arrow badges flip with
   `rtl:-scale-x-100`, WhatsApp bubble stays physical bottom-right, digits
   render as Arabic-Indic through GE SS TV.
7. Full-page screenshot "header mid-page" mess was a Playwright
   sticky-stitching artifact, not a site bug (viewport shots clean).

## Build & run

```bash
npm install
npm run build           # 20 prerendered pages + salonist API — passing
HOST=127.0.0.1 PORT=4341 node dist/server/entry.mjs   # this variant's port
```

Port **4341** is reserved for this variant (master preview uses 4324).
Booking degrades gracefully without `SALONIST_DOMAIN_ID` (expected in
preview); set it in the environment to enable live booking.
