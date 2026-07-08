# DEPLOYMENT — marshmallows.co (Astro rebuild)

Read this fully before deploying. For architecture and project context see
`CLAUDE.md`; for the Salonist wire protocol see `salonist-plugin/ANALYSIS.md`.

## 1. What you are deploying

An Astro 5 site with **two output halves** (node adapter, `@astrojs/node`
standalone):

- `dist/client/` — 20 fully prerendered static pages (AR at root/RTL, EN under
  `/en/`) plus all assets.
- `dist/server/` — a small node server (`entry.mjs`) that serves those static
  pages **and** the on-demand `/api/salonist/*` booking proxy routes.

Online booking only works when the node server runs with credentials. Without
it the site still works fully; the booking pages show a bilingual
"online booking unavailable" note and a WhatsApp/phone booking card.

## 2. Build

```bash
node -v        # use Node 20+ 
npm ci         # or npm install
npm run build  # must end with "20 page(s) built" and no errors
```

The build must pass **with no env vars set** — credentials are read at request
time, never at build time.

## 3. Environment variables

Copy `.env.example` and fill in:

| Var | Required | Meaning |
|---|---|---|
| `SALONIST_DOMAIN_ID` | for online booking | The salon's Salonist tenant id. Authenticates ALL CRM calls — treat it as a secret. Get it from the owner. |
| `SALONIST_API_BASE` | no | Defaults to `https://salonist.io`. Only change if the salon's account lives on another Salonist cluster. |
| `HOST` / `PORT` | no | Bind address for the node server (defaults `0.0.0.0:4321`). |

Never commit `.env`. Never hardcode the domainId in source. It must never
appear in client-side code — check the built `dist/client/` if unsure.

## 4. Deploy options

### Option A — node server (recommended: full online booking)

```bash
SALONIST_DOMAIN_ID=<id> HOST=0.0.0.0 PORT=4321 node dist/server/entry.mjs
```

Run under a supervisor (PM2/systemd) or a container. Put nginx/Caddy/Cloudflare
in front for TLS. Reverse-proxy notes:

- Proxy **all** paths to the node server — it serves the static pages itself.
  (Optionally serve `dist/client/` directly from the proxy/CDN for performance
  and pass only `/api/*` to node.)
- Do NOT strip or add trailing slashes at the proxy. The site is built with
  `trailingSlash: 'always'` and the booking widget calls the API **with**
  trailing slashes; an inserted 301 will break the booking `POST`.
- URLs contain encoded Arabic paths (e.g. `/%D8%A7%D9%84%D8%B5%D9%88%D8%B1/`).
  Ensure the proxy passes UTF-8/percent-encoded paths through untouched.

### Option B — pure static (no online booking)

Upload `dist/client/` to any static host. Booking degrades to the
WhatsApp/phone fallback automatically. You can start here and move to Option A
later without rebuilding differently — it is the same build.

## 5. Forms, captcha & email (SMTP) — read before launch

**Current state:** the contact form (`/contact-ar/`, `/en/contact/`) submits
via a **mailto fallback** — it opens the visitor's mail app; no server
receives anything and there is **no spam protection**. (Booking is separate —
see §3/§4; the booking widget talks to Salonist's CRM, not email.) The old
WordPress Contact Form 7 + Google reCAPTCHA did NOT survive the migration
(the reCAPTCHA keys live in the owner's Google account and were not ported).
Do not re-add Google reCAPTCHA — the agreed replacement is **Cloudflare
Turnstile**.

**The relay Worker is already built** at `../form-relay-worker/` — follow its
README (developer runbook: deploy commands, secret injection, and the full
per-site form-wiring guide).

**Agreed plan (2026-07-03; owner decisions tracked in
`../progress/QUESTIONS.md`):** one shared **Cloudflare Worker form relay** for
all four sites + Turnstile. (Alternative for this site only: since Option A
already runs a node server, the contact form could instead POST to a native
`/api/contact/` route — but keeping all four sites on the one Worker relay is
simpler to operate.)

> **Owner confirmed (2026-07-05): Turnstile is already in use in their
> Cloudflare account.** Get the site + secret key from the owner's existing
> setup (verify the widget's hostname list covers all four domains —
> karaktea.com, foodhacks.co, sanramonkw.com, marshmallows.co — or have them
> add a widget for these domains). Do not introduce any other captcha.

To enable, before or at launch:

1. **Turnstile keys** from the owner's Cloudflare dashboard (one widget
   covering all four domains). Site key → baked into the form markup at
   build; secret key → ONLY the Worker env, never this repo.
2. **Deploy the form relay Worker** and point the form at its endpoint
   (replace the mailto interception in `ContactPage.astro`'s script).
3. **SMTP / email delivery settings** live in the Worker env, not here
   (Resend/MailChannels API key, or SMTP host + user + password).
   Destination inbox: **info@marshmallows.co**.
4. **Test end-to-end in BOTH locales:** a real AR and EN submission arrives,
   Turnstile verifies (widget renders correctly in RTL), and a bot-style
   instant submission (honeypot) is rejected.

Until this is done the form stays mailto-only — workable for a soft launch
since WhatsApp is the salon's primary contact channel anyway.

## 6. Pre-launch checklist

- [ ] `SALONIST_DOMAIN_ID` set (Option A) and **smoke-tested against the live
      CRM**: branches endpoint returns Agaila + Salmiya, services list shows KD
      prices, slots load for a near-term date, and ONE test booking round-trips
      an order id (then cancel it in the Salonist dashboard).
- [ ] DNS: point `marshmallows.co` at the new host. The old WordPress shared
      host intermittently served *other tenants' sites* on this domain — verify
      the old origin is fully retired after cutover.
- [ ] 301 redirects for legacy WordPress URLs (list + rationale in `CLAUDE.md`:
      66 service-CPT URLs → the three price-list pages, old booking page ids).
- [ ] robots.txt + `/sitemap-index.xml` reachable; submit to Google Search
      Console. hreflang ar/en is in the page heads.
- [ ] Owner decisions: re-add Meta Pixel (id in `CLAUDE.md`)? Opening hours for
      the footer + JSON-LD?
- [ ] Hero video is still the original `.mov` (no ffmpeg on the build machine).
      Transcode to MP4/WebM before launch for Firefox users; keep the same
      rounded-frame styling.

## 7. Post-launch smoke test (2 minutes)

1. `/` renders RTL Arabic with white header, coral hero + leaf pattern.
2. `/en/home/` renders LTR English.
3. Language switcher round-trips the same page in both directions.
4. `/booking-ar/` walks branch → service → date → slot → details → confirm
   (Option A) or shows the WhatsApp fallback (Option B).
5. View-source on any page: `<link rel="canonical">` points at
   `https://marshmallows.co/...` and JSON-LD (NailSalon, both branches) is
   present.
6. The floating WhatsApp bubble opens `+965 2246 2646`.
