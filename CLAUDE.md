# marshmallows.co — Astro rebuild

Modern Astro rebuild of **Marshmallows Nail Spa — صالون مارشميلوز لتجميل السيدات**
(https://marshmallows.co), a bilingual (Arabic/English) ladies' nail spa & beauty
salon in Kuwait (est. 2013, Commercial License 2015/3739). The owner is migrating
their sites off WordPress; the live site ran WordPress 7.0 with the custom
`marshmallowskwt` theme (Bootstrap 3, jQuery, Polylang, Yoast, Contact Form 7,
Salonist booking plugin). Site analysis and asset pull done 2026-07-02.

## Design: BOLD INNOVATION ("Sugar Rush") is the master design (2026-07-12)

Three alternative design directions were built in parallel under `variants/`
(`bold`, `editorial`, `premium`) — see the original `CLAUDE.md`
"Cold-resume checklist" history for that process. **The owner chose Bold
Innovation ("Sugar Rush")** as the final production design. It has been
**promoted from `variants/bold/` into the project root** (this file, `src/`,
`public/`, and the config files); `variants/bold/` was then deleted since its
content now lives at root. `variants/premium/` and `variants/editorial/`
remain as archived alternatives, each with its own `VARIANT.md`, in case the
owner wants to revisit them.

A pre-promotion snapshot of the previous master design exists at the git
branch **`pre-bold-promotion`** (tag it further if needed before it's pruned).

**Concept — playful nail-art-studio energy, Gen-Z beauty-brand rebrand.**
RTL-first: oversized GE SS TV Bold Arabic display headlines on a coral→blush
gradient hero, sticker/badge chips with hard offset shadows, a bento home
grid, a tilted polaroid mood-board gallery, a direction-aware marquee band of
real service categories, and an animated (count-up, reduced-motion-safe)
stat strip from real data (2 branches / 165+ services / est. 2013). Fun but
salon-trustworthy — hierarchy, whitespace and AA contrast are kept strict.
Same 20 pages, same URLs, same verbatim content, same SEO head, same booking
widget + `/api/salonist/*` (restyled shell only), same WhatsApp bubble +
fallback, same contact mailto — the promotion only restyled the site; nothing
functional changed.

## Stack & rationale

- **Astro 5** — fully static output, zero client JS by default; ideal for an
  informational salon site. Built-in i18n routing matches the live URL scheme.
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — brand tokens declared in
  `@theme` in `src/styles/global.css`; logical properties (`ms-/me-`, `ps-/pe-`,
  `start/end`) make every layout mirror correctly in RTL with no extra work.
- **@astrojs/sitemap** — sitemap-index at `/sitemap-index.xml` (declared in
  robots.txt and BaseLayout).

## Commands

```bash
npm install
npm run dev       # dev server
npm run build     # passing as of 2026-07-02 — 20 prerendered pages + Salonist API
npm run preview
node dist/server/entry.mjs   # serve the built site (static pages + /api/salonist/*)
```

Since phase 2 the build output is split by the node adapter:
`dist/client/` (all static pages/assets) + `dist/server/` (node entry that
serves them AND the on-demand `/api/salonist/*` proxy routes). See the
PHASE 2 section below for deploy options.

## i18n / RTL architecture

Mirrors the live Polylang setup exactly:

- **Arabic is the DEFAULT locale, served at the root** (`/`, `/services-ar/`,
  `/about-ar/`, `/الصور/`, …), `dir="rtl"`.
- **English lives under `/en/`** (`/en/home/`, `/en/services/`, …), `dir="ltr"`.
- `astro.config.mjs`: `i18n.defaultLocale: 'ar'`, `locales: ['ar','en']`,
  `prefixDefaultLocale: false`, plus redirect `/en → /en/home/`.
- `src/i18n/ui.ts` — all UI strings (both locales, copy verbatim from the live
  site) + `business` facts (phones, branches, socials).
- `src/i18n/utils.ts` — `useTranslations(locale)`, `dirFor`, and the **`routes`
  map**: because AR and EN slugs are unrelated (`/services-ar/salon-service-ar/`
  vs `/en/services/salon-service/`), every page has a logical id (`PageId`) and
  the map provides `pathFor()` / `alternatePath()` used by nav, the language
  switcher, and hreflang tags.
- Page content lives once in `src/components/pages/*Page.astro` (accepts
  `locale`); files in `src/pages/**` are 4-line wrappers that pin the slug and
  locale. Two route files use Arabic filenames (`الصور.astro`,
  `مقاطع-الفيديو.astro`) to preserve the live Arabic URLs.

## Design tokens (originals from the WP theme, plus Bold's AA-safe derivatives)

Fonts (self-hosted originals in `public/fonts/`, pulled from the theme) —
**unchanged by the Bold promotion**, no font added, no CDNs:

| Role | Family | Files |
|---|---|---|
| Arabic (body + headings) | **GE SS TV** | ge-sstv-medium.ttf (400), ge-sstv-bold.ttf (700) |
| Latin (body + headings) | **Century Gothic** | centurygothic.ttf (400), centurygothic-bold.ttf (700) |

(The theme also loaded Google Fonts Montserrat 400/700 as a generic fallback,
and declared a `helvetica-neue-ar-light` face whose file 404s on origin.)
Font family switches per `html[lang]` in `global.css`.

**Font-face fix — do not drop this on future edits to `global.css`:** GE SS
TV's TTF is missing/broken for some Latin glyphs (e.g. "y" — "Salmiya"
rendered "Salmi a" without this). Both GE SS TV `@font-face` rules carry a
`unicode-range` scoping them to Arabic script + digits/punctuation, so Latin
runs (like the "Salmiya" branch name mixed into Arabic copy) fall back to
Century Gothic instead of rendering the broken glyph. Verified 2026-07-12
after the Bold promotion (Playwright: footer/branch-name "Salmiya" renders
with the "y", computed `font-family` resolves to the fallback for that run).

Colors (Tailwind `@theme` in `src/styles/global.css`) — original brand hues
preserved, plus three same-hue derivatives added for Bold's AA-safe
white-on-pink text and hard offset shadows:

| Token | Hex | Origin / why |
|---|---|---|
| `pink` | `#d9726d` | original `.txt-pink` / `.bg-pink` — primary accent |
| `pink-light` | `#f7aeac` | original body background / booking button fill |
| `pink-pale` | `#fbd8d7` | original `.txt-pink3` / `.bg-pink3` |
| `pink-card` | `#fff5f5` | original pale content card |
| `blue-soft` | `#ccdfe7` | original `.bg-blue`, button hover |
| `brown` | `#bba496` | original `.txt-brown` |
| `brown-line` | `#a99387` | original `.line.brown` divider |
| `brown-deep` | `#ab866e` | Salonist widget hover accent |
| `pink-deep` | `#b3413c` | **Bold** — darkened brand pink, white text passes WCAG AA (≈5.6:1) |
| `plum` | `#3a1c1a` | **Bold** — near-black ink derived from the pink; body/heading ink, borders, offset shadows; ≥4.5:1 on every pink |
| `cream` | `#fff8f6` | **Bold** — warm paper body background |
| `ink` | remapped to `plum` | so untouched components inherit the Bold palette |

Typography feel: rounded geometric Latin (Century Gothic) + classic Kufi-style
GE SS TV Arabic, generous line-height (29px AR), pink-on-pink marshmallow look,
now on Bold's gradient/sticker system.

### Bold Innovation techniques / components

- `global.css`: gradient utilities (`grad-hero`, `grad-band`, `grad-soft`,
  `grad-text`), `display-xl/lg` clamp headline scale, `.sticker` /
  `.chip-price` badge system, `.card-pop` (2.5px plum border + hard offset
  shadow + hover lift), `.tilt-a…d` mood-board rotations, direction-aware pure
  CSS marquee (`translateX(±100%)` per `dir`), scroll-reveal styles using the
  **`translate` property** (never fights the tilt `transform`s), chunky
  `:focus-visible` ring, `::selection`.
- Components: `Marquee.astro` (service categories, aria-hidden duplicate
  track, wraps statically under reduced motion), `StatStrip.astro` (semantic
  `<dl>`, final values server-rendered; count-up only enhances).
- `BaseLayout.astro`: tiny inline `html.js` marker + one IntersectionObserver
  script (reveals + count-up, `prefers-reduced-motion` gated, transform/opacity
  only); sticky mobile Book-Now pill (header CTA is lg-only); restyled
  WhatsApp bubble (still fixed bottom-**right**, physical, both locales).
  Head/SEO byte-compatible with the prior master.
- `HomePage.astro`: gradient hero with oversized Arabic headline + linked
  service sticker chips + tilted video card + floating 💅 sticker → marquee →
  about with overlapping tilted photos + gradient display heading → counter
  strip (2 branches / 165+ services, computed from `src/data/services.ts` /
  est. 2013) → bento grid (3 service cards, gallery mood-board teaser,
  gradient booking-CTA tile with phone, 2 branch tiles).
- `PriceList`: bold `<details>` accordion, prices as KD sticker chips.
  `PartyPackages`: tinted header strips + price stickers. `GalleryGrid`:
  tilted, staggered polaroids. `Footer`: deep-plum rounded card with sticker
  headings and pink offset shadow. `PageHero`: gradient band + display-xl h1.
- Accessibility: one h1/page, semantic dl/details/nav, focus-visible ring,
  plum-on-pink text everywhere (no white-on-`#d9726d` body text), reveals and
  marquee fully disabled/static under `prefers-reduced-motion`, lazy images.

### Jury log (Playwright, desktop 1440×900 + mobile 390×844, AR + EN — from the
original Bold variant build, still relevant post-promotion)

1. **Booking bento tile white-on-white** — `.card-pop` (background #fff,
   declared later) beat `.grad-band` → white CTA text invisible. Fixed with
   explicit `.card-pop.grad-band` rule.
2. **Reveal killed the tilts** — `[data-reveal].is-in { transform:
   translateY(0) }` overwrote `rotate()` on elements carrying both (contact
   photo, video frames). Fixed by moving reveals to the independent
   `translate` property.
3. **Empty Salonist step bar** — when the API is unconfigured the widget's
   empty `<ol id="bw-steps">` left dead space; added `empty:hidden` (restyle
   only, no logic change). Offline degradation message + WhatsApp fallback
   card confirmed working.
4. **Sticky Book-Now missing on mobile** (header CTA was lg-only) — added a
   fixed bottom-start pill in `BaseLayout` for < lg, per brief.
5. **Contrast fixes** — branch-tile links switched from `pink-deep` (3.2:1 on
   pink-light) to plum (8.5:1); nav links plum instead of the old master's
   pink (3.5:1 on white).
6. RTL correctness verified: hero/text/bento mirror via logical properties,
   marquee animates the correct direction per `dir`, arrow badges flip with
   `rtl:-scale-x-100`, WhatsApp bubble stays physical bottom-right, digits
   render as Arabic-Indic through GE SS TV.
7. A "header mid-page" mess seen in one full-page screenshot was a
   Playwright sticky-stitching artifact, not a site bug (viewport shots
   clean). Confirmed again post-promotion 2026-07-12: a full-page screenshot
   taken without emulating `prefers-reduced-motion` / pre-scrolling shows
   large blank gaps where `[data-reveal]` sections haven't intersected yet;
   emulate reduced motion (or scroll through the page) before capturing
   full-page screenshots for review.

## Page inventory (rebuilt, per locale)

| Page | AR route | EN route | Status |
|---|---|---|---|
| Home | `/` | `/en/home/` | ✅ hero video + about + 3 service cards |
| Services hub | `/services-ar/` | `/en/services/` | ✅ (live page was an empty shell; rebuilt as card hub) |
| Salon Service | `/services-ar/salon-service-ar/` | `/en/services/salon-service/` | ✅ full price list, 12 categories / 83 items per locale |
| Home Service | `/services-ar/home-service-ar/` | `/en/services/home-service/` | ✅ 11 categories / 82 items per locale |
| Party Booth | `/services-ar/party-booth-ar/` | `/en/services/party-booth/` | ✅ 9 packages per locale |
| About | `/about-ar/` | `/en/about-us/` | ✅ 3 sections, verbatim copy |
| Photos | `/الصور/` | `/en/photos/` | ✅ 18-image gallery (live page's `[easy_image_gallery]` shortcode was broken; images recovered from media library) |
| Videos | `/مقاطع-الفيديو/` | `/en/videos/` | ✅ (live page was empty; rebuilt with brand video + Instagram link) |
| Contact | `/contact-ar/` | `/en/contact/` | ✅ CF7 field parity; submits via mailto (TODO: form service) |
| Booking | `/booking-ar/` | `/en/booking/` | ✅ native Salonist booking widget + WhatsApp/phone fallback — see PHASE 2 section |

Not rebuilt (WordPress internals, not real pages): footer content CPTs
(`/footer/branch-1-ar/` etc. — their content is in the Footer component),
per-service CPT detail URLs (`/service-salon/nails/` … 33 URLs per locale —
their content is consolidated into the three price-list pages, same as the
live site's visible UI). Consider 301s for those CPT URLs at deploy time.

Price data: `src/data/services.ts` + `src/data/party.ts` (extracted verbatim,
KD prices). Copy: `src/data/copy.ts`.

## source-assets/

Everything pulled from the live site with original filenames —
see `source-assets/MANIFEST.md` for the file → original-URL map:
`branding/` (logos, favicon, og-image), `fonts/` (4 TTFs), `images/`
(29 photos incl. 18 gallery images), `videos/` (hero .mov 8.4 MB, promo .mp4).
Curated copies deployed under `public/`.

## SEO / GEO implemented

- **JSON-LD**: `NailSalon`+`BeautySalon` LocalBusiness node **per branch**
  (Agaila/Sama Mall + Salmiya/Symphony Mall), with phone, email, Google Maps
  links, Instagram `sameAs`, KWD price range — emitted on every page from
  `BaseLayout.astro`. Opening hours were NOT published on the live site —
  ask the owner and add `openingHoursSpecification`.
- **hreflang**: `ar`, `en`, and `x-default` (→ Arabic) link tags on every page
  via the routes map. (The sitemap integration can't auto-pair the unrelated
  ar/en slugs, so hreflang lives in the HTML head — valid per Google.)
- Canonicals, OpenGraph (locale + alternate), Twitter cards, og:image
  (original 1080×1080 `Marshmallow-.png`).
- `public/llms.txt` — bilingual GEO summary: services, prices, branches,
  contact, booking links.
- `public/robots.txt` → sitemap-index.
- Meta Pixel (id 2414279082248757) existed on the live site — NOT ported;
  re-add if the owner wants it.

---

## ⚠️ PHASE 2 — SALONIST BOOKING (built 2026-07-02 — needs one credential to go live)

The owner provided their licensed `salonist-appointment` WP plugin
(`salonist-plugin/salonist-appointment/`). Its wire protocol was analyzed
(**full API map: `salonist-plugin/ANALYSIS.md`**) and the booking flow was
**reimplemented natively** (no plugin code copied, no React).

**Architecture:**

```
BookingWidget.astro (vanilla-TS island on the booking pages)
   │ fetch /api/salonist/*  (same-origin, trailing slashes — site-wide rule)
   ▼
src/pages/api/salonist/*.ts   ← on-demand routes (prerender = false, node adapter)
   │ src/lib/salonist.ts — form-encoded POSTs, response normalizing, slot-HTML parsing
   ▼
Salonist CRM  https://salonist.io/wordpressapi/*   (tenant id = domainId in each body)
```

- **Widget** (`src/components/BookingWidget.astro`, mounted in
  `src/components/pages/BookingPage.astro`): branch (Agaila/Sama Mall,
  Salmiya/Symphony Mall from live `/getAllLocations`) → service category →
  service (live catalogue, KD prices) → optional specialist ("no preference"
  = staffId `any`) → month calendar (closed weekdays + max-advance window
  from `/business_hours`) → time slots → details form (name, phone required;
  email optional) → review → confirm → success with CRM order id. Bilingual
  via `bk.*` keys in `src/i18n/ui.ts`; RTL-safe (logical properties); brand
  pink `#d9726d` + Salonist accent brown-deep `#ab866e`. **Pay at salon only**
  — the live site had no online payment.
- **Proxy routes** (each returns clean JSON; the CRM's slot responses are raw
  HTML radio lists that `parseSlotsHtml()` converts):
  `GET /api/salonist/branches/`, `services/?branch=`,
  `staff/?branch=&service=`, `hours/?branch=`,
  `slots/?branch=&service=&date=YYYY-MM-DD&staff=&duration=`,
  `POST /api/salonist/book/`. NOTE: `trailingSlash: 'always'` applies to API
  routes — always call them WITH the trailing slash (a 301 would break POST).
- **Env vars** (`.env.example`): `SALONIST_DOMAIN_ID` (required),
  `SALONIST_API_BASE` (optional, default `https://salonist.io`). Read at
  request time — never shipped to the browser, never hardcoded.

**Credentials the owner must supply (only one):** their Salonist
**`domainId`** — or their Salonist login email+password to fetch it once via
`POST https://salonist.io/secureweb/login` (see ANALYSIS.md §2 / .env.example).
There is no API key; the CRM authenticates every call by `domainId` alone.
No payment gateway keys are needed.

**Deploy options:**

1. **Node server (full booking):** `npm run build`, then run
   `node dist/server/entry.mjs` with `SALONIST_DOMAIN_ID` set (standalone
   @astrojs/node adapter; serves static pages + API; `HOST`/`PORT` env to
   bind). Any node host / PM2 / container works.
2. **Pure static (no online booking):** deploy `dist/client/` to any static
   host. The widget gets no API, shows a friendly bilingual "booking
   unavailable" note, and the WhatsApp/phone fallback card (always rendered
   below the widget) keeps taking bookings. The build passes with no
   credentials present.

**Verified 2026-07-02:** `npm run build` green; full flow driven headless
(Chromium/Playwright) against a mock CRM — branch→service→staff→date→slots→
details→confirm→success (order id round-trip), AR RTL rendering, invalid-phone
rejection, and credential-less degradation all pass. Upstream payloads match
the plugin byte-for-byte (dd-mm-YYYY dates, `payment_mode: "Cash on delivery"`,
`services[0][…]` fields).

**Remaining phase-2 TODOs:**

- Get the real `SALONIST_DOMAIN_ID` from the owner and smoke-test against the
  live CRM (branch names/ids, slot times, one test booking).
- Confirm KD currency display against `domain_detail` once live (widget
  currently labels prices with د.ك / KD directly).
- Optional parity features deliberately skipped (unused on the live site):
  multi-service cart, packages, gift cards, coupons, deposits/partial payment,
  online gateways. Add only if the owner asks.

## Web3 note

Evaluated and unnecessary for phase 1 (informational salon site). Possible
future angle: an on-chain / token-based loyalty program for repeat visits —
revisit only if the owner asks.

## Deployment

**Read `DEPLOYMENT.md` (same folder) before deploying** — build, env vars,
node-vs-static options, reverse proxy, cutover checklist, smoke tests.

### `DEPLOY_TARGET` env var (base-path support, merged 2026-07-12)

`astro.config.mjs` (root + each `variants/*`) reads `DEPLOY_TARGET` at build
time to choose `site`/`base`, and every internal href/asset path runs through
`withBase()` (`src/utils/paths.ts`) so links and assets keep working under a
subpath:

- **Unset (default) → production.** `site: 'https://marshmallows.co'`,
  `base: '/'`. This is what real deploys (`node dist/server/entry.mjs`,
  serving `dist/client` + `dist/server`) must use — **never set
  `DEPLOY_TARGET` for a production build.**
- **`DEPLOY_TARGET=pages` → GitHub Pages review deploy.**
  `site: 'https://sanramonkw.github.io'`,
  `base: '/Marshmallows-Website/'`. Driven by `npm run build:all` /
  `npm run deploy:all` (`scripts/build-all.sh` + `scripts/publish-dist.sh`),
  which build root + `variants/premium` + `variants/editorial` (`bold` no
  longer exists as a variant — it's the promoted root design) into one
  combined static tree and publish it to the repo's `gh-pages` branch.

**Why the booking widget falls back to WhatsApp/phone on the Pages
deploy:** the site uses the `@astrojs/node` **server** adapter, which splits
`astro build` output into `dist/client/` (static pages + assets) and
`dist/server/` (the node entry that also serves the on-demand
`/api/salonist/*` proxy routes — see the PHASE 2 section below). GitHub
Pages can only serve static files, so the Pages review deploy publishes
`dist/client/` alone; `dist/server/` (and therefore the Salonist API)
cannot run there. The `BookingWidget` island's `fetch('/api/salonist/...')`
calls are intentionally **not** passed through `withBase()` (they're
same-origin API calls, not page/asset links), so on Pages they 404 and the
widget gracefully shows its permanent WhatsApp/phone fallback card — this is
expected/correct for that preview target, not a bug. On a real production
deploy (`DEPLOY_TARGET` unset, full node server running) the same fetches
hit the live API and the booking widget works end-to-end.

## Local preview (owner's workflow)

The owner previews over SSH port-forwarding — **do not expose public
tunnels/hostnames for previews** (explicit owner preference). This site runs on
`127.0.0.1:4324` alongside the sibling sites (karaktea 4321, foodhacks 4322,
sanramon 4323, each via `npx astro preview` in their folder):

```bash
HOST=127.0.0.1 PORT=4324 node dist/server/entry.mjs
```

(`astro preview` no longer works here — the node adapter split the build into
`dist/client/` + `dist/server/`.) The owner connects with
`ssh cybertruck -L 4324:127.0.0.1:4324` and browses `http://localhost:4324`.
Never modify or restart the machine's `cybertruck` cloudflared tunnel
(system service, `/etc/cloudflared/config.yml` — it carries the owner's SSH).

## Cold-resume checklist for a future session

1. `npm install && npm run build` — should pass (20 pages → `dist/client/`,
   API server → `dist/server/`).
2. Everything content-related is in `src/data/` + `src/i18n/ui.ts`;
   layout/SEO in `src/layouts/BaseLayout.astro`; routes are thin wrappers.
   Booking: widget `src/components/BookingWidget.astro`, proxy
   `src/pages/api/salonist/*.ts` + `src/lib/salonist.ts`,
   protocol docs `salonist-plugin/ANALYSIS.md`.
3. Session state as of 2026-07-02: phases 1+2 complete and visually verified
   against the live site (Playwright screenshot comparison; see the
   color-fidelity notes in the design-tokens section). The owner provided the
   Salonist plugin (`salonist-plugin/`); the ONLY blocker for booking go-live
   is the owner's `SALONIST_DOMAIN_ID`.
3b. **2026-07-12: Bold Innovation ("Sugar Rush") promoted from
    `variants/bold/` to master** (see "Design: BOLD INNOVATION" section up
    top) — pure restyle, no functional change. `npm run build` re-verified
    green (20 pages + API), Playwright re-verified AR/RTL + EN/LTR rendering,
    booking widget presence + credential-less degradation + WhatsApp
    fallback, and the GE SS TV `unicode-range` font fix (kept post-promotion;
    "Salmiya" renders correctly). Pre-promotion state saved at git branch
    `pre-bold-promotion`.
4. Open TODOs, in priority order:
   - **Salonist booking go-live**: obtain `SALONIST_DOMAIN_ID` from the owner,
     set it in the deploy environment, smoke-test against the live CRM
     (see PHASE 2 section above).
   - Contact form backend (currently mailto; wire a form service or endpoint).
   - Opening hours from owner → footer + JSON-LD.
   - Transcode hero `Marshmallows_video_21042026.mov` (8.4 MB) to web-optimized
     MP4/WebM; it is served with `type="video/mp4"` like the live site.
   - Optional: 301 redirects for the 66 legacy service-CPT URLs; re-add Meta
     Pixel; decide fate of the 90 MB unreferenced `marshmallows-vdo2025.mp4`
     (not pulled).
