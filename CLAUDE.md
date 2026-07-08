# marshmallows.co — Astro rebuild

Modern Astro rebuild of **Marshmallows Nail Spa — صالون مارشميلوز لتجميل السيدات**
(https://marshmallows.co), a bilingual (Arabic/English) ladies' nail spa & beauty
salon in Kuwait (est. 2013, Commercial License 2015/3739). The owner is migrating
their sites off WordPress; the live site ran WordPress 7.0 with the custom
`marshmallowskwt` theme (Bootstrap 3, jQuery, Polylang, Yoast, Contact Form 7,
Salonist booking plugin). Site analysis and asset pull done 2026-07-02.

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

## Design tokens (originals from the WP theme)

Fonts (self-hosted originals in `public/fonts/`, pulled from the theme):

| Role | Family | Files |
|---|---|---|
| Arabic (body + headings) | **GE SS TV** | ge-sstv-medium.ttf (400), ge-sstv-bold.ttf (700) |
| Latin (body + headings) | **Century Gothic** | centurygothic.ttf (400), centurygothic-bold.ttf (700) |

(The theme also loaded Google Fonts Montserrat 400/700 as a generic fallback,
and declared a `helvetica-neue-ar-light` face whose file 404s on origin.)
Font family switches per `html[lang]` in `global.css`.

Colors (Tailwind `@theme` in `src/styles/global.css`):

| Token | Hex | Origin in theme CSS |
|---|---|---|
| `pink` | `#d9726d` | `.txt-pink` / `.bg-pink` — primary accent, hero bg, nav links |
| `pink-light` | `#f7aeac` | body background, `.btn-default` (booking button fill) |
| `pink-pale` | `#fbd8d7` | `.txt-pink3` / `.bg-pink3` — 16px-rounded footer card |
| `pink-card` | `#fff5f5` | pale content card (about section) — pixel-verified vs live |
| `blue-soft` | `#ccdfe7` | `.bg-blue`, button hover |
| `brown` | `#bba496` | `.txt-brown` |
| `brown-line` | `#a99387` | `.line.brown` divider |
| `brown-deep` | `#ab866e` | Salonist widget hover accent (wp-custom-css) |
| `ink` | `#2e2e2e` | heading color |

Typography feel: rounded geometric Latin (Century Gothic) + classic Kufi-style
GE SS TV Arabic, generous line-height (29px AR), pink-on-pink marshmallow look.

**Color/layout fidelity pass (2026-07-02, verified with Playwright screenshots
against the live site — keep these, the first draft got them wrong):**
- Header is **white** (`bg-white/95`) with pink nav links — NOT pink-light.
- Hero: `bg-pink` + the theme's leaf texture `public/images/pattern2b.png`
  (`bg-no-repeat bg-right-top`).
- Booking button: `bg-pink-light`, `text-[#222]`, `border border-pink`,
  `rounded-xl` (12px) — from live computed styles.
- About section: pale `pink-card` rounded-2xl card on the pink-light body;
  in AR the photo sits on the RIGHT (image div comes first in DOM → RTL grid).
- Services band: plain body background (NOT solid pink); white H2; card titles
  sit over a transparent→black/90 bottom gradient in white.
- Footer: content inside a rounded-2xl `pink-pale` card, copyright included.
- Floating WhatsApp bubble fixed bottom-**right** (physical, both locales).

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
