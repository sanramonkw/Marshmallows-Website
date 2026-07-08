# Salonist Appointment plugin — interoperability analysis

Analyzed 2026-07-02 from the owner-provided plugin source
(`salonist-plugin/salonist-appointment/`, v1.0.1). Purpose: understand how the
WP plugin talks to the Salonist CRM so the booking flow can be reimplemented
natively for the Astro rebuild. **No plugin code is copied — this documents the
wire protocol only.**

## 1. Architecture

```
React widget (build/index.js, mounted at #salonist-booking-root)
   │  fetch, X-WP-Nonce header
   ▼
WP REST proxy  /wp-json/salonist/v1/*   (includes/class-salonist-rest-api.php)
   │  server-side wp_remote_post / cURL, form-encoded bodies
   ▼
Salonist CRM   https://salonist.io  (fallback https://salonist.in for domain_detail)
```

The WP layer is a thin proxy + response normalizer. It also keeps a local
`wp_appointment_orders` table (order log for the WP admin screen only — the
CRM is the source of truth).

## 2. Authentication / credentials

**There is no API key.** The upstream calls are authenticated only by a
`domainId` — the salon's Salonist account/tenant id — sent form-encoded in
every request body.

How the plugin obtains it (admin flow, `/admin/login` route):

- Admin enters their **Salonist account email + password** on the WP admin
  page (React admin app, `admin/class-salonist-admin-settings.php` just
  renders `#salonist-admin-root`).
- Plugin POSTs JSON `{email, password}` to `https://salonist.io/secureweb/login`.
- The full login response (contains `domainId`, and for some accounts
  `client_id` / `client_secret`, used only for coupon validation) is stored in
  WP **user meta** `salonist_user_login_detail` (not wp_options; there is a
  legacy `salonist_react_domain_id` option fallback).
- All other settings (currency override, feature toggles like
  `enable_coupons`, payment gateway keys, colors, translation overrides) are
  also user-meta on that same user, saved via `/admin/settings`.

→ **The only credential the rebuild needs is the `domainId`** (or the owner's
Salonist login, used once to fetch it). Payment gateway keys are irrelevant —
the live site had all of them empty (pay at salon only).

## 3. Upstream endpoint map (WP route → Salonist CRM)

All upstream calls are `POST` with `application/x-www-form-urlencoded` (or
multipart for order create) bodies. Base: `https://salonist.io`.

| WP proxy route | Upstream | Request body | Response (after plugin's legacy re-nesting) |
|---|---|---|---|
| `GET /locations` | `/wordpressapi/getAllLocations` | `domainId` | `{locations:[{Domain:{id,address,…}, Detail:{name, staff_select}, Admin:{…}}]}` — one entry per branch, **each branch has its own `Domain.id`** used for all subsequent calls |
| `GET /services?domainId` | `/wordpressapi/services` | `domainId` | `{services:[{Plan:{id,name,…}, Child:[{id,name,price,service_time,…}]}], details:{Insdetail:{…}}}` — `Plan` = category, `Child` = bookable services (`service_time` in minutes) |
| `GET /packages` | `/wordpressapi/packages` | `domainId` | `{packages:[{Package:{…}, Packageinfo:[…]}]}` |
| `GET /giftcards` | `/webapi/giftcards_templates` | `domainId` | `{…[{Giftcardtemplate:{…}}]}` |
| `GET /staff?domainId&serviceId` | `/wordpressapi/service_staff` | `domainId, service_id` | `{list:[{id,name,image?}]}` |
| `GET /slots?domainId&staffId&date&serviceId&duration` | see §4 | see §4 | `{html:"…"}` |
| `GET /slots/availability?…&month=YYYY-MM` | (WP-side aggregation: probes `/slots` per day) | — | `{unavailable:[…], available:[…]}` — calendar strike-out helper, cached 10 min |
| `GET /business_hours` | `/wordpressapi/business_hours` | `domainId` | `{list:{0..6:{Businesshours:{status:"Open"\|"Close",…}}}, details:{Insdetail:{max_advance_booking}}}` — plugin derives `closed_days` (0=Sun…6=Sat) and `max_advance` (days) |
| `GET /domain_detail?domainId` | `/webapicustomer/domain_detail` (falls back to `salonist.in`) | `domainId` | `{domaindetail:{currency, currency_type, deposit_option, deposit_amount,…}, domainadmin:{…}}` |
| `POST /book` | `/wordpressapi/order_create_wordpress` (multipart, one call **per selected item**, 0.5 s apart) | see §5 | `{status:"success"\|…, order_id \| salonSaleId, message}` |
| `POST /coupon/validate` | `/wordpressapi/coupon_validate` | `coupon_code, domainId, customer_contact` (+ optional `client_id`/`client_secret`) | `{status, …}` |
| `POST /payments/*` | Stripe / Razorpay / PayTabs / Telr / MyFatoorah APIs directly | gateway keys from user meta | — (all disabled on the live site) |

`GET /settings` is WP-local: currency, feature flags, theming, and the full
EN + AR translation tables baked into the plugin (useful reference for
bilingual labels).

## 4. Time slots

`GET /slots` logic (`fetch_slots_for_date`):

1. If a specific staff member is selected (`staffId !== 'any'`):
   `POST /wordpressapi/get_staff_time_availaibility` with
   `domainId, staff, date, serviceId, servicetime` (duration in minutes).
2. Otherwise, or if (1) returned nothing:
   `POST /wordpressapi/get_business_time` with `domainId, date, serviceId`.

**The response is a fragment of pre-rendered HTML** (`{html: "…"}`)
containing `<input type="radio" value="H:MM AM/PM">` + label pairs. The React
widget injects it with `dangerouslySetInnerHTML` and reads the clicked radio's
`value` as the chosen time. "No availability" signals: the token
`not_available` (business_time) or a `Not Available!` label (staff endpoint),
or an empty fragment. → A native rebuild should parse the radio `value`s
server-side and return a clean JSON array.

Date format: the CRM expects `dd-mm-YYYY` (the plugin's availability prober
uses `d-m-Y`; `create_booking` converts `YYYY-mm-dd` → `d-m-Y` before
forwarding, so the widget itself sends ISO dates and WP normalizes).

The widget builds its calendar from `/business_hours` (`closed_days`,
`max_advance`, default 30 days) and only fetches `/slots` for the picked date.

## 5. Booking creation

Widget → `POST /book` (JSON): `domainId`, legacy top-level `service/staff/
date/time`, `selected_items:[{service:{id,name,price,type,…}, staff:{id,name},
location:{Domain:{id},name,address}, date, time}]`, `customer:{firstName,
lastName?, phone, email?}`, `gateway` (live site: "At Salon" → mapped to
`Cash on delivery`), totals/coupon/partial-payment fields.

WP → CRM, per item, multipart POST `/wordpressapi/order_create_wordpress`:

```
domainId              (the BRANCH's Domain.id)
type                  "Appointment"        ("Quick Sale" for packages)
customer_id           ""
bill_date             dd-mm-YYYY
subtotal, grandtotal  price (numeric)
item_vat              0
payingnow             0 for pay-at-salon
dueamount             grandtotal
customer_name         "First Last"
customer_contact      phone
email                 email or ""
payment_mode          "Cash on delivery"
time                  "H:MM AM"            (slot value)
staffId               staff id, "" for no preference
services[0][id|qty|price|discount|total|staffId|bill_date|time]
```

Success: `{status:"success", order_id}` (or `salonSaleId`), plus a
human-readable `message`.

## 6. What the owner must provide

1. **Salonist `domainId`** — or their Salonist login email+password so it can
   be fetched once via `POST https://salonist.io/secureweb/login`. On a
   multi-branch account, `/getAllLocations` then reveals each branch's own
   `Domain.id` (Agaila / Salmiya).
2. Nothing else. Currency comes from `domain_detail` (KWD); no payment
   gateway is enabled; there is no additional API key or secret.

The `domainId` is a tenant identifier rather than a strong secret (the WP
proxy exposed it to every browser via query strings), but the rebuild still
keeps it server-side in an env var (`SALONIST_DOMAIN_ID`) as good hygiene.

## 7. Widget state machine (React bundle, for parity)

```
1 branch  →  2 service (Plan category → Child service)
          →  3 specialist (skipped when branch Detail.staff_select === "None";
                           "No Preference" = staffId "any")
          →  4 date (calendar bounded by business_hours) + slots (radio HTML)
          →  5 details (name, phone required; email optional) + payment method
          →  confirm → POST /book → receipt/success screen
```

Multi-service booking, packages, gift cards, coupons, deposits and online
payments exist in the plugin but were **not enabled/used on the live site** —
the native rebuild implements the single-service pay-at-salon path.
