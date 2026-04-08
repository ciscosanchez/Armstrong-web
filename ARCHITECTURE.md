# Armstrong Website — Architecture & Engineering Specification

> **The Armstrong Company** — Full-Service Moving, Storage & Logistics  
> Rebuild of goarmstrong.com in TypeScript / Next.js 15  
> Version: 1.0 | Last updated: 2026-04-07

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [GA4 Decision — Keep or Replace](#2-ga4-decision--keep-or-replace)
3. [Tech Stack](#3-tech-stack)
4. [Brand Design System](#4-brand-design-system)
5. [Project Structure](#5-project-structure)
6. [Routing & Page Inventory](#6-routing--page-inventory)
7. [CMS — Sanity v3](#7-cms--sanity-v3)
8. [Forms — API Architecture](#8-forms--api-architecture)
9. [NetSuite Integration](#9-netsuite-integration)
10. [User Tracking & Sales Intelligence](#10-user-tracking--sales-intelligence)
11. [Interactive Features](#11-interactive-features)
12. [Live Chat — Mock Implementation](#12-live-chat--mock-implementation)
13. [CCPA / Privacy Compliance](#13-ccpa--privacy-compliance)
14. [Security Architecture](#14-security-architecture)
15. [DDoS & Edge Protection](#15-ddos--edge-protection)
16. [Performance & Scale](#16-performance--scale)
17. [Testing Strategy — Playwright](#17-testing-strategy--playwright)
18. [Code Quality — ESLint, Prettier, Husky](#18-code-quality--eslint-prettier-husky)
19. [Deployment](#19-deployment)
20. [Phase Plan](#20-phase-plan)
21. [Open Architecture Decisions](#21-open-architecture-decisions)

---

## 1. Project Overview

This is a ground-up TypeScript/Next.js 15 rebuild of the Armstrong Company website
(`goarmstrong.com`). The current site runs on WordPress + WP Rocket + Gravity Forms.

### Goals

- **Brand fidelity**: Implement Armstrong Brand Guidelines V1 precisely — Uncut Sans,
  exact color palette, tone of voice, architecture (Home / Business / Supply Chain)
- **Performance**: LCP < 1.5s, CLS = 0, INP < 100ms across all page types
- **Sales intelligence**: First-party lead tracking → NetSuite CRM, replacing
  anonymous GA4 funnels with named lead attribution
- **Scale**: Handle traffic spikes (moving is seasonal; Q1/Q2 are peak) without
  degradation — ISR + Cloudflare edge caching
- **Security**: WAF, DDoS protection, CSRF, rate limiting, zero client-side secrets
- **Maintainability**: No file over 500 lines, strict TypeScript, Playwright E2E coverage,
  ESLint + Prettier enforced on commit

### Current stack being replaced

| Was                | Now                                    |
| ------------------ | -------------------------------------- |
| WordPress          | Next.js 15 App Router                  |
| WP Rocket          | next/image + ISR + Cloudflare          |
| Gravity Forms      | React Hook Form + Zod + `/api/` routes |
| GTM / GA4 only     | GA4 + first-party tracking DB          |
| No CMS for content | Sanity v3                              |
| No CRM integration | NetSuite REST API                      |
| reCAPTCHA          | Cloudflare Turnstile                   |
| VWO A/B testing    | GrowthBook (self-hosted)               |

---

## 2. GA4 Decision — Keep or Replace

**Recommendation: Keep `G-GZ7MVEHYW1`, add a new web data stream.**

### Pros of keeping the existing property

- Preserves historical baseline (years of traffic, conversions, audiences)
- Existing goals/funnels remain intact for YoY comparison post-launch
- Retargeting audiences in Google Ads are preserved
- No "dark period" in reporting during migration

### Cons

- Legacy event schema from WP/GTM may pollute the new clean event taxonomy
- Old WP-specific custom dimensions will need deprecation/cleanup in GA4 settings

### Implementation plan

1. In GA4, create a **new web data stream** for the rebuilt site
2. Keep the old stream live during the migration window for comparison
3. After 90 days post-launch, deprecate the old stream
4. Clean up legacy custom events/dimensions in GA4 Admin
5. Use **Consent Mode v2** on the new site (required for CCPA + EU users)

**Do not** re-implement GTM in the new site. Use `next/third-parties` for GA4
directly — it handles script loading correctly for Next.js and avoids GTM's
synchronous blocking behavior.

---

## 3. Tech Stack

| Layer           | Choice                     | Version           |
| --------------- | -------------------------- | ----------------- |
| Framework       | Next.js (App Router)       | 15.x              |
| Language        | TypeScript (strict)        | 5.x               |
| Styling         | Tailwind CSS               | v4                |
| Form validation | React Hook Form + Zod      | RHF 7.x / Zod 3.x |
| ORM             | Prisma                     | 5.x               |
| Database        | PostgreSQL                 | 16                |
| CMS             | Sanity                     | v3                |
| Email           | Resend                     | latest            |
| Auth (admin)    | NextAuth.js                | v5                |
| Rate limiting   | @upstash/ratelimit + Redis | latest            |
| CRM             | NetSuite REST API          | —                 |
| Analytics       | GA4 via next/third-parties | —                 |
| A/B testing     | GrowthBook                 | latest            |
| Testing         | Playwright                 | latest            |
| Linting         | ESLint (flat config)       | 9.x               |
| Formatting      | Prettier                   | 3.x               |
| Git hooks       | Husky + lint-staged        | latest            |
| Bot protection  | Cloudflare Turnstile       | —                 |
| CDN / WAF       | Cloudflare                 | —                 |
| Deployment      | Vercel                     | —                 |
| Monitoring      | Sentry                     | latest            |

---

## 4. Brand Design System

Based on Armstrong Brand Guidelines V1 (Armstrong_BrandGuidelines_V1.pdf).

### Typography

**Primary typeface: Uncut Sans** (all weights)  
Source: https://github.com/kaspernordkvist/uncut_sans  
License: MIT — include font files in `/public/fonts/uncut-sans/`

| Weight name | CSS weight |
| ----------- | ---------- |
| Light       | 300        |
| Book        | 350        |
| Regular     | 400        |
| Medium      | 500        |
| Semibold    | 600        |
| Bold        | 700        |

Loaded via `next/font/local` — zero FOUT, self-hosted, optimal LCP.

```ts
// lib/fonts.ts
import localFont from 'next/font/local';

export const uncutSans = localFont({
  src: [
    { path: '../public/fonts/uncut-sans/UncutSans-Light.woff2', weight: '300' },
    { path: '../public/fonts/uncut-sans/UncutSans-Book.woff2', weight: '350' },
    { path: '../public/fonts/uncut-sans/UncutSans-Regular.woff2', weight: '400' },
    { path: '../public/fonts/uncut-sans/UncutSans-Medium.woff2', weight: '500' },
    { path: '../public/fonts/uncut-sans/UncutSans-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/uncut-sans/UncutSans-Bold.woff2', weight: '700' },
  ],
  variable: '--font-uncut-sans',
  display: 'swap',
});
```

### Color Palette (§3.6 — exact HEX values)

| Token                | Name       | HEX       | PMS         | Usage                           |
| -------------------- | ---------- | --------- | ----------- | ------------------------------- |
| `--color-dark-blue`  | Dark Blue  | `#00263F` | 2965 C      | 35% — primary backgrounds, text |
| `--color-blue`       | Blue       | `#00a4eb` | 299 C       | 10% — primary actions, links    |
| `--color-light-blue` | Light Blue | `#9ad7f9` | 2975 C      | 10% — hover states, accents     |
| `--color-white`      | White      | `#ffffff` | —           | 35% — backgrounds, text on dark |
| `--color-grey-1`     | Grey 01    | `#69829e` | 2165 C      | Subtext, borders                |
| `--color-grey-2`     | Grey 02    | `#9eaec0` | 2165 C @65% | Disabled states                 |
| `--color-grey-3`     | Grey 03    | `#d2dae2` | 2165 C @30% | Dividers, backgrounds           |
| `--color-purple-1`   | Purple 01  | `#3d3d5f` | 4144 C      | Dark accent                     |
| `--color-purple-2`   | Purple 02  | `#878cbe` | 7674 C      | Secondary accent                |
| `--color-purple-3`   | Purple 03  | `#dbdceb` | 7674 C @30% | Light accent                    |
| `--color-green-1`    | Green 01   | `#00bc82` | 2414 C      | 5% — success, CTA accent        |
| `--color-green-2`    | Green 02   | `#7fe1b0` | 353 C       | Light success                   |
| `--color-green-3`    | Green 03   | `#d9f6e7` | 353 C @30%  | Success backgrounds             |

### Color Proportions (§3.7)

```
35% White        — backgrounds, text reversal
35% Dark Blue    — dominant; hero backgrounds, nav, footer
10% Blue         — CTAs, links, interactive elements
10% Neutrals     — body text, supporting copy
 5% Greens       — success states, accents
 5% Purples      — secondary accents
```

### Brand Voice (§2.2 — "The Straight Talker")

- Confident, candid, casual — never stiff or corporate
- Always second-person ("your move", "your business")
- Brief: think social post, not white paper
- Tagline: **"Our world moves around you."**
- Full legal name "The Armstrong Company" appears once per piece, then "Armstrong"
- AP Style + Oxford comma + no spaces around em dash

### Brand Architecture

```
The Armstrong Company
├── Home      — Residential moving & storage
├── Business  — Commercial moving, office relocation, data center
└── Supply Chain — Logistics, warehousing, transportation
```

---

## 5. Project Structure

```
armstrong/
├── ARCHITECTURE.md              ← this file
├── Armstrong_BrandGuidelines_V1.pdf
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── eslint.config.mjs
├── .prettierrc
├── .env.example
├── prisma/
│   └── schema.prisma
├── public/
│   └── fonts/
│       └── uncut-sans/          ← woff2 files
├── app/
│   ├── layout.tsx               ← root layout, fonts, providers
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── (marketing)/             ← public-facing route group
│   │   ├── page.tsx             ← Homepage
│   │   ├── about/page.tsx
│   │   ├── safety/page.tsx
│   │   ├── sustainability/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── financing/page.tsx
│   │   ├── credit-application/page.tsx
│   │   ├── our-locations/page.tsx
│   │   ├── locations/
│   │   │   └── [city]/page.tsx  ← ISR, generateStaticParams
│   │   ├── household-moving-services/page.tsx
│   │   ├── business-moving-services/page.tsx
│   │   ├── supply-chain-solutions/page.tsx
│   │   ├── data-center-logistics-services/page.tsx
│   │   ├── charlotte-warehousing-services/page.tsx
│   │   ├── get-moving-with-armstrong/page.tsx
│   │   ├── ballpark-estimate/page.tsx
│   │   ├── virtual-survey/page.tsx
│   │   ├── supplies-estimator/page.tsx
│   │   ├── supplies-estimator-results/page.tsx
│   │   ├── crownwms/page.tsx
│   │   ├── jack-treier/page.tsx
│   │   ├── humboldt-home/page.tsx
│   │   ├── crown-privacy-policy/page.tsx
│   │   └── resources/
│   │       ├── page.tsx
│   │       ├── [category]/page.tsx
│   │       ├── general/[slug]/page.tsx
│   │       ├── service/[slug]/page.tsx
│   │       └── industry/[slug]/page.tsx
│   ├── (admin)/                 ← auth-gated sales dashboard
│   │   └── dashboard/
│   │       ├── layout.tsx       ← auth check
│   │       ├── page.tsx         ← overview
│   │       ├── leads/
│   │       │   ├── page.tsx     ← lead queue
│   │       │   └── [id]/page.tsx
│   │       └── analytics/page.tsx
│   └── api/
│       ├── leads/
│       │   ├── route.ts         ← POST — contact / booking form
│       │   └── [id]/route.ts    ← GET/PATCH — dashboard
│       ├── estimate/
│       │   └── route.ts         ← POST — ballpark estimate calculator
│       ├── survey/
│       │   └── route.ts         ← POST — virtual survey scheduling
│       ├── credit/
│       │   └── route.ts         ← POST — credit application
│       ├── supplies/
│       │   └── route.ts         ← POST — supplies estimator
│       ├── track/
│       │   └── route.ts         ← POST — first-party behavioral events
│       └── auth/
│           └── [...nextauth]/route.ts
├── components/
│   ├── ui/                      ← primitive, brand-styled
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Spinner.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── Header.tsx           ← nav, phone, social
│   │   ├── Footer.tsx           ← legal name, address, links
│   │   ├── MobileNav.tsx        ← slide-out drawer
│   │   └── Breadcrumb.tsx       ← JSON-LD BreadcrumbList
│   ├── sections/
│   │   ├── Hero.tsx             ← full-bleed, dark blue bg
│   │   ├── ServiceGrid.tsx      ← Home / Business / Supply Chain cards
│   │   ├── LocationMap.tsx      ← interactive US map
│   │   ├── StatsBar.tsx         ← "Founded 1957, 33+ locations..."
│   │   ├── TestimonialCarousel.tsx
│   │   ├── CTABanner.tsx        ← "Our world moves around you" + button
│   │   └── BlogGrid.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx      ← get-moving-with-armstrong
│   │   ├── EstimateForm.tsx     ← ballpark-estimate (multi-step)
│   │   ├── SurveyForm.tsx       ← virtual-survey
│   │   ├── CreditApplicationForm.tsx
│   │   └── SuppliesEstimator.tsx ← interactive calculator
│   ├── seo/
│   │   ├── OrganizationSchema.tsx  ← JSON-LD
│   │   ├── LocalBusinessSchema.tsx ← per location page
│   │   └── ArticleSchema.tsx       ← blog posts
│   └── tracking/
│       ├── TrackingProvider.tsx    ← client component, session init
│       └── ConsentBanner.tsx       ← CCPA/GDPR consent UI
├── lib/
│   ├── fonts.ts                 ← next/font/local config
│   ├── db/
│   │   └── client.ts            ← Prisma singleton
│   ├── validations/
│   │   ├── lead.ts              ← Zod: ContactFormSchema
│   │   ├── estimate.ts          ← Zod: EstimateSchema
│   │   ├── credit.ts            ← Zod: CreditApplicationSchema
│   │   └── track.ts             ← Zod: TrackingEventSchema
│   ├── email/
│   │   ├── client.ts            ← Resend instance
│   │   └── templates.ts         ← lead notification, confirmation
│   ├── netsuite/
│   │   ├── client.ts            ← OAuth 1.0a REST client
│   │   └── leads.ts             ← createLead(), updateLead()
│   ├── sanity/
│   │   ├── client.ts            ← createClient config
│   │   └── queries.ts           ← GROQ queries
│   ├── tracking/
│   │   └── events.ts            ← typed event definitions
│   ├── security/
│   │   ├── rateLimit.ts         ← Upstash rate limiter
│   │   └── csrf.ts              ← double-submit cookie
│   └── locations/
│       └── data.ts              ← static location data (33+ cities)
├── styles/
│   └── globals.css              ← design tokens + Tailwind base
└── tests/
    ├── e2e/
    │   ├── homepage.spec.ts
    │   ├── forms.spec.ts
    │   ├── locations.spec.ts
    │   ├── estimate.spec.ts
    │   ├── seo.spec.ts
    │   ├── security.spec.ts
    │   └── a11y.spec.ts
    └── playwright.config.ts
```

---

## 6. Routing & Page Inventory

### Static pages (built at compile time)

| Route                             | Purpose                           | Notes                                   |
| --------------------------------- | --------------------------------- | --------------------------------------- |
| `/`                               | Homepage                          | Hero, service grid, stats, CTA          |
| `/about`                          | Company values & story            | Founded 1957, integrity/honesty/respect |
| `/safety`                         | Safety commitment                 |                                         |
| `/sustainability`                 | Environmental impact              |                                         |
| `/careers`                        | Job listings                      | Dynamically loaded from external ATS    |
| `/financing`                      | Move financing                    |                                         |
| `/credit-application`             | Business credit form              |                                         |
| `/our-locations`                  | Locations index + interactive map | 33+ cities                              |
| `/household-moving-services`      | Residential services              |                                         |
| `/business-moving-services`       | Commercial services               |                                         |
| `/supply-chain-solutions`         | Supply chain                      |                                         |
| `/data-center-logistics-services` | Data center                       |                                         |
| `/charlotte-warehousing-services` | Charlotte warehousing             |                                         |
| `/get-moving-with-armstrong`      | Primary contact/booking form      |                                         |
| `/ballpark-estimate`              | Multi-step estimate wizard        |                                         |
| `/virtual-survey`                 | Survey scheduler                  |                                         |
| `/supplies-estimator`             | Packing supplies calculator       |                                         |
| `/supplies-estimator-results`     | Results page                      |                                         |
| `/crownwms`                       | Crown → Armstrong acquisition     |                                         |
| `/jack-treier`                    | Jack Treier → Armstrong           |                                         |
| `/humboldt-home`                  | Humboldt → Armstrong              |                                         |
| `/crown-privacy-policy`           | Privacy policy                    |                                         |
| `/resources`                      | Blog + resources hub              |                                         |

### ISR pages (regenerate every 24h)

| Route pattern                | Count | Revalidation |
| ---------------------------- | ----- | ------------ |
| `/locations/[city]`          | 33+   | 24h          |
| `/resources/[category]`      | 12    | 1h           |
| `/resources/general/[slug]`  | ~50+  | 1h           |
| `/resources/service/[slug]`  | 31    | 24h          |
| `/resources/industry/[slug]` | 9     | 24h          |

### Sub-brand paths (permanent, branded under Armstrong)

```
/crownwms             → Crown acquisition landing
/crown-history
/crown-locations
/crown-commercial-services
/jack-treier          → Jack Treier acquisition landing
/armstrong-jack-treier-locations
/moving-services-lebanon-pa
/moving-services-mechanicsburg-pa
/office-industrial-moving-lancaster
/moving-services-in-reading-pa
/moving-services-york-pa
/moving-services-west-chester-pa
/moving-services-harrisburg-pa
/humboldt-home        → Humboldt acquisition landing
/about-armstrong-humboldt
/humboldt-management-team
/humboldt-international-moving
```

> **Long-term plan**: Sub-brands are path-routed under goarmstrong.com today.
> As acquisitions are fully absorbed into the Armstrong brand, these pages
> will be 301-redirected to the equivalent Armstrong service/location pages.
> No subdomain architecture needed.

### API routes

| Method   | Path                      | Purpose                           |
| -------- | ------------------------- | --------------------------------- |
| POST     | `/api/leads`              | Contact / booking form submission |
| GET      | `/api/leads/[id]`         | Dashboard lead detail             |
| PATCH    | `/api/leads/[id]`         | Update lead status                |
| POST     | `/api/estimate`           | Ballpark estimate calculation     |
| POST     | `/api/survey`             | Schedule virtual survey           |
| POST     | `/api/credit`             | Credit application                |
| POST     | `/api/supplies`           | Supplies estimator                |
| POST     | `/api/track`              | First-party behavioral event      |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth.js                       |

---

## 7. CMS — Sanity v3

### Why Sanity

- **Structured content**: Location data, services, blog posts, case studies are
  all typed schemas — not free-form HTML
- **GROQ queries**: Flexible, fast, no N+1 fetching
- **Content Lake**: Hosted — no infrastructure to manage
- **Real-time**: Marketing team can publish without a deployment
- **Free tier**: Generous for this scale
- **Next.js ISR integration**: `revalidateTag()` via Sanity webhook → on-demand ISR

### Content schemas

```
sanity/
├── schemaTypes/
│   ├── location.ts          ← city, phone, address, service areas, coordinates
│   ├── blogPost.ts          ← title, slug, body, categories, author, date
│   ├── caseStudy.ts         ← title, industry, services, results, body
│   ├── servicePage.ts       ← service name, description, features, CTA
│   └── teamMember.ts        ← name, title, photo, bio
```

### ISR + Sanity webhook flow

```
Sanity publish → webhook → POST /api/sanity/revalidate → revalidateTag('location-pages')
```

---

## 8. Forms — API Architecture

All forms are native React components. No WordPress plugins. End-to-end typed.

### Contact / Booking Form (`POST /api/leads`)

```typescript
// lib/validations/lead.ts
const ContactFormSchema = z.object({
  type: z.enum(['residential', 'commercial', 'supply-chain', 'data-center']),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,20}$/),
  originZip: z
    .string()
    .regex(/^\d{5}$/)
    .optional(),
  destZip: z
    .string()
    .regex(/^\d{5}$/)
    .optional(),
  moveDate: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
});
```

**Request lifecycle:**

```
Client submits form
  → CSRF token verified (double-submit cookie)
  → Cloudflare Turnstile token verified server-side
  → Rate limit checked (5 req/IP/min via Upstash Redis)
  → Zod validates body — 422 on failure
  → Lead saved to PostgreSQL (Prisma)
  → UTM params + IP geo + device attached (server-enriched)
  → Resend: confirmation email to user
  → Resend: alert to sales team (with lead detail + source)
  → NetSuite: createLead() queued (see §9)
  → Response: { id, status: 'received', nextStep }
```

### Ballpark Estimate (`POST /api/estimate`)

Multi-step wizard. Server calculates range based on:

- Origin → destination distance (ZIP centroid lookup table, no Google Maps API cost)
- Home size tier (studio / 1BR / 2BR / 3BR / 4BR+ / custom sqft)
- Move date (peak season: Jun–Aug adds ~15% premium)
- Add-ons: packing service, storage, specialty items

Returns: `{ low: number, high: number, currency: 'USD', disclaimer: string }`

### Supplies Estimator (`POST /api/supplies`)

Room-by-room item selector. Each room type has default item counts.
Client maintains state; server validates final list and returns:
`{ items: SupplyLineItem[], totalBoxes: number, estimatedCost: number }`

### Virtual Survey (`POST /api/survey`)

Collects: name, email, phone, preferred date/time, move type.
Triggers: Resend notification to local office based on origin ZIP routing.
Future integration: Cal.com self-hosted for real-time availability.

### Credit Application (`POST /api/credit`)

Business-only form. Fields: company name, EIN, annual revenue, contact info,
trade references. Saved to DB with `status: 'pending_review'`.
Resend: notification to finance team.

---

## 9. NetSuite Integration

Armstrong uses NetSuite as the CRM / ERP. All qualified form submissions create
a Lead record in NetSuite via the REST API.

### Authentication

NetSuite REST uses **OAuth 1.0a** (not 2.0). Each request requires a signed
HMAC-SHA256 Authorization header.

```typescript
// lib/netsuite/client.ts
// Uses: oauth-1.0a + crypto (Node built-in)
// Credentials (all server-only, never in client bundle):
//   NETSUITE_ACCOUNT_ID
//   NETSUITE_CONSUMER_KEY
//   NETSUITE_CONSUMER_SECRET
//   NETSUITE_TOKEN_ID
//   NETSUITE_TOKEN_SECRET
```

### Lead creation flow

```typescript
// lib/netsuite/leads.ts
async function createNetSuiteLead(lead: Lead): Promise<string> {
  // POST to: https://{accountId}.suitetalk.api.netsuite.com/services/rest/record/v1/lead
  // Returns: NetSuite internal lead ID
  // On failure: log error + alert ops, do NOT fail the form submission
}
```

> **Important**: NetSuite sync is **fire-and-forget with retry queue**.
> A NetSuite outage must never prevent a lead from being saved locally.
> Architecture: lead saved to Postgres first, then a background job
> (Vercel Cron or queue) syncs pending leads to NetSuite with exponential backoff.

### Field mapping

| Armstrong form field | NetSuite field                        |
| -------------------- | ------------------------------------- |
| `firstName`          | `firstName`                           |
| `lastName`           | `lastName`                            |
| `email`              | `email`                               |
| `phone`              | `phone`                               |
| `type`               | `custentity_move_type` (custom field) |
| `originZip`          | `custentity_origin_zip`               |
| `destZip`            | `custentity_dest_zip`                 |
| `moveDate`           | `custentity_move_date`                |
| `_source`            | `leadsource` (NetSuite standard)      |
| `_campaign`          | `custentity_utm_campaign`             |
| `_locationCity`      | `custentity_lead_city`                |

---

## 10. User Tracking & Sales Intelligence

### Philosophy

Own your data. Don't rely solely on GA4 — which gives you aggregate traffic,
not individual lead journeys. Build a first-party event store that the sales
team can actually use.

### First-party event store

**`POST /api/track`** — fires on every meaningful user action.

```typescript
// lib/tracking/events.ts
type TrackingEvent =
  | { event: 'page_view'; path: string; referrer: string }
  | { event: 'cta_click'; ctaText: string; ctaPage: string }
  | { event: 'form_start'; formId: string }
  | { event: 'form_abandon'; formId: string; lastField: string }
  | { event: 'estimate_complete'; range: [number, number]; moveType: string }
  | { event: 'location_viewed'; city: string }
  | { event: 'phone_click'; phone: string; page: string }
  | { event: 'chat_open'; page: string };
```

All events are server-stored with:

- `sessionId` (first-party cookie, 30-day expiry)
- `leadId` (populated if user later submits a form — joins session to lead)
- `ip` (hashed for privacy — not stored raw)
- `userAgent`, `device` (mobile/tablet/desktop)
- `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`
- `referrer`
- `geoCity`, `geoState`, `geoDma` (via MaxMind GeoIP2)

### Lead scoring (for sales dashboard)

| Signal                              | Points |
| ----------------------------------- | ------ |
| Form submitted                      | 100    |
| Estimate tool completed             | 40     |
| 3+ page views in session            | 20     |
| Location page visited               | 15     |
| Phone click                         | 30     |
| Returning visitor (2nd+ session)    | 25     |
| Organic search (utm_medium=organic) | 10     |
| Paid search (utm_medium=cpc)        | 5      |

**Score ≥ 100**: Hot — sales team notified immediately via Resend  
**Score 50–99**: Warm — appears in dashboard queue  
**Score < 50**: Cold — stored but not prioritized

### Sales dashboard (`/dashboard/leads`)

Protected by NextAuth (email + password or SSO).

Features:

- Lead queue sorted by score, with source attribution
- Filter by: move type, origin city, score tier, date range, UTM source
- Click lead → full journey: pages visited, time on site, what they clicked
- "Assign to rep" workflow
- Export to CSV (for import to NetSuite or email campaigns)
- Geographic heat map: which location pages are generating leads

### What we do NOT track (CCPA compliance)

- Form field contents mid-type
- Cross-site fingerprinting
- Device fingerprinting without consent
- IP addresses stored raw (hashed only)

---

## 11. Interactive Features

### Ballpark Estimate Wizard

Multi-step form, client-side state with `useReducer`.

```
Step 1 → Move type (Residential / Commercial / Supply Chain)
Step 2 → Origin ZIP → Destination ZIP (with city/state auto-display)
Step 3 → Home size (studio / 1BR / 2BR / 3BR / 4BR+ / office sqft)
Step 4 → Move date (calendar picker, peak season flagged)
Step 5 → Add-ons (packing, storage, specialty: piano, art, vehicle)
─────────────────────────────────────────────────────────────────
Results → Estimated range, e.g. "$2,400 – $3,800"
         + CTA: "Get an exact quote" → /get-moving-with-armstrong
         + CTA: "Schedule a survey" → /virtual-survey
```

### Supplies Estimator

Room-by-room packing calculator. State: `Record<RoomType, ItemCounts>`.

```
Rooms: Living Room, Kitchen, Dining Room, Master Bedroom,
       Bedroom 2, Bedroom 3, Home Office, Garage, Storage
Items per room: Small boxes, Medium boxes, Large boxes,
                Wardrobe boxes, Packing paper (lbs),
                Bubble wrap (rolls), Tape (rolls)
```

Live-updating totals as user adjusts sliders/inputs.
Results page (`/supplies-estimator-results`): printable checklist + CTA.

### Location Finder Map

Interactive US map with 33+ location pins.

```typescript
// components/sections/LocationMap.tsx
// Library: react-simple-maps (lightweight SVG — no Mapbox API cost)
// Data: lib/locations/data.ts (static, no API dependency)
// Features:
//   - Color-coded pins by service availability
//   - Hover tooltip: city name + phone
//   - Click → location sidebar with address, hours, services
//   - "Get a quote for [City]" → /get-moving-with-armstrong?city=memphis
//   - Mobile: falls back to filterable card list
```

### Virtual Survey Scheduler

Booking form for in-person or online survey.
Fields: name, email, phone, preferred date, preferred time window, move type.
Phase 1: Form → email notification to local office.
Phase 2: Integrate Cal.com (self-hosted) for real availability booking.

---

## 12. Live Chat — Mock Implementation

Phase 1 ships with a **mock live chat widget** — real UI, no external dependency.

```
components/layout/ChatWidget.tsx
  → Floating button (bottom-right, dark blue, Armstrong symbol icon)
  → Opens: "Chat with Armstrong" panel
  → Automated responses for common questions:
      "I need a quote" → link to /ballpark-estimate
      "How do I schedule a survey?" → link to /virtual-survey
      "What areas do you serve?" → link to /our-locations
      "I have a question about my move" → asks for phone/email → POST /api/leads
  → Captures: name + email/phone → creates lead record
  → Shows: "A team member will follow up within 1 business hour"
```

Phase 2 options (when ready for real chat):

- **Intercom** — best-in-class, $$
- **Crisp** — affordable, good free tier
- **Chatwoot** — open source, self-hosted
- **Drift** — strong B2B features, $$$

The mock widget fires `chat_open` tracking events, captures lead data,
and can be swapped for any real provider without touching other components.

---

## 13. CCPA / Privacy Compliance

Armstrong serves California users (Sacramento, LA, Bay Area locations) —
CCPA compliance is required from day one.

### Consent banner

```
components/tracking/ConsentBanner.tsx
  → First visit: "We use cookies to personalize your experience and improve
    our services. [Accept All] [Manage Preferences] [Reject Non-Essential]"
  → Consent stored: first-party cookie `arm_consent` (1-year expiry)
  → Values: { analytics: boolean, marketing: boolean }
```

### GA4 Consent Mode v2

```typescript
// gtag consent configuration — fires BEFORE gtag initialization
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500,
});
// On user accept → gtag('consent', 'update', { analytics_storage: 'granted', ... })
```

### First-party tracking + consent

- `POST /api/track` only fires after `analytics: true` consent
- `sessionId` cookie only set after consent
- IP is hashed (SHA-256) before storage — not stored raw anywhere

### Privacy policy page

`/crown-privacy-policy` already exists on the current site.
Rebuild as a static Next.js page with structured sections covering:
data collected, how it's used, NetSuite/Resend as processors, user rights,
California-specific rights (right to know, right to delete, opt-out of sale).

---

## 14. Security Architecture

### Application layer (Next.js)

**CSRF protection** — double-submit cookie pattern:

```typescript
// lib/security/csrf.ts
// 1. On page load: set httpOnly cookie `csrf_token` = random 32-byte hex
// 2. JS reads `csrf_token` from a readable cookie (separate, non-httpOnly)
// 3. Form POSTs include `X-CSRF-Token` header
// 4. API route: verify header matches httpOnly cookie
```

**Rate limiting** — Upstash Redis:

```typescript
// lib/security/rateLimit.ts
// /api/leads:    5 requests / IP / 60 seconds
// /api/estimate: 10 requests / IP / 60 seconds
// /api/track:    60 requests / IP / 60 seconds
// /api/*:        100 requests / IP / 60 seconds
```

**Bot protection** — Cloudflare Turnstile on all forms:

```typescript
// Server-side verification:
// POST https://challenges.cloudflare.com/turnstile/v0/siteverify
// { secret: TURNSTILE_SECRET_KEY, response: clientToken }
// Returns: { success: boolean }
```

**Security headers** (via `next.config.ts`):

```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'nonce-{NONCE}' https://challenges.cloudflare.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com",
      'frame-src https://challenges.cloudflare.com',
    ].join('; '),
  },
];
```

**SQL injection** — impossible via Prisma's parameterized queries.  
**XSS** — React JSX escaping + strict CSP nonce on inline scripts.  
**Secrets** — All env vars are server-only. `server-only` package prevents
accidental client bundle inclusion of server modules.

### Input validation

All API routes validate with Zod before any DB operation.
Zod's `.strict()` strips unknown fields — no prototype pollution.
File uploads (if added later): validate MIME type server-side, not extension.

---

## 15. DDoS & Edge Protection

### Cloudflare configuration

**WAF rules (Cloudflare-managed):**

- OWASP Core Ruleset: enabled
- Armstrong custom rules:
  - `/api/leads` → rate limit: 5 req/IP/min → BLOCK
  - `/api/*` → rate limit: 100 req/IP/5min → CHALLENGE
  - User-Agent empty or suspicious → JS CHALLENGE
  - Country block: configurable per compliance needs

**Bot Management:**

- Cloudflare Bot Management: challenge score > 30 → JS challenge
- Verified bots (Googlebot, Bingbot): allow
- Turnstile on all forms: invisible challenge, CAPTCHA fallback

**DDoS protection:**

- L3/L4: Cloudflare Magic Transit (automatic)
- HTTP flood (L7): Cloudflare HTTP DDoS managed ruleset
- Threshold: if `/` receives > 1000 req/IP/min → auto-block

**Caching (performance + DDoS resilience):**

```
Static pages (homepage, service pages):  Cache-Control: public, max-age=3600, s-maxage=86400
Location pages (ISR):                    Cache-Control: public, s-maxage=86400, stale-while-revalidate=3600
API routes:                              Cache-Control: no-store
Dashboard:                               Cache-Control: no-store, private
```

Cloudflare serves cached pages from 300+ edge PoPs — most traffic never
reaches Vercel during a spike.

### Vercel configuration

- **Function concurrency limits**: set per-route max concurrency
- **Edge Runtime** for lightweight API routes (`/api/track`, `/api/estimate`)
- **Node.js Runtime** for heavy operations (Prisma queries, NetSuite calls)

---

## 16. Performance & Scale

### Page generation strategy

| Page type               | Strategy              | Reason                 |
| ----------------------- | --------------------- | ---------------------- |
| Homepage, service pages | Static (build-time)   | Maximum CDN hit rate   |
| Location pages (33+)    | ISR, 24h revalidation | Content changes rarely |
| Blog/resources          | ISR, 1h revalidation  | Fresh without rebuilds |
| Estimate results        | Dynamic (SSR)         | Personalized           |
| Dashboard               | Dynamic + auth        | Never cached           |

### Image optimization

All images use `next/image`:

- Hero images: `priority={true}` — no lazy load
- Below fold: `loading="lazy"` (default)
- Explicit `width` and `height` on every image — CLS = 0
- Format: WebP/AVIF via next/image automatic format negotiation
- Hosted on Cloudflare R2 or Vercel Blob

### Font loading

Uncut Sans loaded via `next/font/local`:

- `display: 'swap'` — text visible immediately in fallback
- Font files served from same origin — no third-party DNS lookup
- Only subsets needed (Latin) included — reduces payload

### Core Web Vitals targets

| Metric | Target  | Strategy                                    |
| ------ | ------- | ------------------------------------------- |
| LCP    | < 1.5s  | Priority hero image, CDN, ISR               |
| CLS    | 0       | Explicit image dimensions, no layout shifts |
| INP    | < 100ms | Minimal client JS, RSC for static content   |
| TTFB   | < 200ms | ISR + Cloudflare edge cache                 |

### Lighthouse CI

Run in GitHub Actions on every PR:

- LCP < 2.5s (warning), < 1.5s (target)
- Performance score ≥ 90
- Accessibility score ≥ 95 (WCAG 2.1 AA)
- SEO score = 100

---

## 17. Testing Strategy — Playwright

### Test structure

```
tests/e2e/
├── homepage.spec.ts        ← hero, nav, CTAs render; phone link correct
├── forms.spec.ts           ← contact form: happy path, validation, rate limit 429
├── estimate.spec.ts        ← multi-step wizard, step navigation, result render
├── locations.spec.ts       ← dynamic route for Memphis, Chicago, Atlanta
├── seo.spec.ts             ← JSON-LD present, canonical, meta description, OG tags
├── security.spec.ts        ← CSRF rejection, missing Turnstile → 400, rate limit
├── a11y.spec.ts            ← axe-core on every page type
└── tracking.spec.ts        ← events fire after consent, not before
```

### Key test patterns

```typescript
// forms.spec.ts — happy path
test('contact form submits and shows confirmation', async ({ page }) => {
  await page.goto('/get-moving-with-armstrong');
  await page.fill('[name="firstName"]', 'Jane');
  await page.fill('[name="email"]', 'jane@example.com');
  // ... fill remaining fields
  await page.click('button[type="submit"]');
  await expect(page.locator('[data-testid="confirmation"]')).toBeVisible();
});

// security.spec.ts — CSRF
test('POST /api/leads without CSRF token returns 403', async ({ request }) => {
  const res = await request.post('/api/leads', {
    data: { firstName: 'test', email: 'test@test.com' },
    // No X-CSRF-Token header
  });
  expect(res.status()).toBe(403);
});
```

### Running tests

```bash
# All E2E tests
npx playwright test

# Specific file
npx playwright test tests/e2e/forms.spec.ts

# UI mode (interactive)
npx playwright test --ui

# CI mode (headed=false, retries=2)
npx playwright test --reporter=github
```

---

## 18. Code Quality — ESLint, Prettier, Husky

### File size rule

**Maximum 500 lines per file.** Enforced via ESLint rule:

```json
// eslint.config.mjs
{ "max-lines": ["error", { "max": 500, "skipComments": true }] }
```

### Prettier config

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### ESLint flat config highlights

- `@typescript-eslint/recommended-type-checked`
- `eslint-plugin-react-hooks` — hooks rules
- `eslint-plugin-jsx-a11y` — accessibility
- `eslint-plugin-next` — Next.js specific
- `no-console: "warn"` (use structured logging instead)
- `@typescript-eslint/no-explicit-any: "error"`

### Pre-commit hook (Husky + lint-staged)

```json
// .husky/pre-commit → npx lint-staged
// lint-staged in package.json:
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{css,json,md}": ["prettier --write"]
}
```

### TypeScript strict config

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

---

## 19. Deployment

### Environments

| Environment | Branch      | URL                     | Purpose           |
| ----------- | ----------- | ----------------------- | ----------------- |
| Production  | `main`      | goarmstrong.com         | Live site         |
| Staging     | `staging`   | staging.goarmstrong.com | Pre-launch review |
| Preview     | `feature/*` | pr-{n}.vercel.app       | Per-PR preview    |

### GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  quality:
    - eslint + prettier check
    - tsc --noEmit
    - playwright tests (headless)
    - lighthouse CI
  deploy:
    needs: quality
    - vercel deploy (preview on PR, production on main merge)
```

### Environment variables

```bash
# .env.example — committed to repo (no real values)

# Database
DATABASE_URL=postgresql://...

# NetSuite
NETSUITE_ACCOUNT_ID=
NETSUITE_CONSUMER_KEY=
NETSUITE_CONSUMER_SECRET=
NETSUITE_TOKEN_ID=
NETSUITE_TOKEN_SECRET=

# Resend
RESEND_API_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# GA4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-GZ7MVEHYW1

# GrowthBook (A/B testing)
NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY=

# Sentry
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```

---

## 20. Phase Plan

### Phase 1 — Foundation (Weeks 1–3)

- [x] ARCHITECTURE.md written
- [ ] Next.js 15 scaffold
- [ ] Uncut Sans + design tokens
- [ ] Header, Footer, MobileNav
- [ ] Homepage (static, brand-compliant)
- [ ] `POST /api/leads` with Zod + rate limit + Turnstile
- [ ] Contact form (`/get-moving-with-armstrong`)
- [ ] Playwright: homepage + forms
- [ ] Husky + ESLint + Prettier

### Phase 2 — Services & Locations (Weeks 4–6)

- [ ] Service pages: Residential, Commercial, Supply Chain, Data Center
- [ ] Location template + 33 city data objects
- [ ] ISR for `/locations/[city]`
- [ ] Interactive location map
- [ ] JSON-LD schemas (Organization, LocalBusiness, BreadcrumbList)
- [ ] Playwright: location routes + SEO

### Phase 3 — Interactive Tools (Weeks 7–8)

- [ ] Ballpark Estimate multi-step wizard + `/api/estimate`
- [ ] Supplies Estimator + results page
- [ ] Virtual Survey form + `/api/survey`
- [ ] Mock live chat widget

### Phase 4 — CMS + Content (Weeks 9–10)

- [ ] Sanity v3 setup + schemas
- [ ] Resources hub + blog templates
- [ ] ISR + Sanity webhook → on-demand revalidation
- [ ] Service taxonomy archives (31)
- [ ] Industry taxonomy archives (9)
- [ ] sitemap.xml + robots.txt

### Phase 5 — Sales Intelligence (Weeks 11–12)

- [ ] `POST /api/track` + TrackingProvider
- [ ] Session / UTM capture
- [ ] MaxMind GeoIP2 enrichment
- [ ] Lead scoring algorithm
- [ ] Sales dashboard (NextAuth + lead queue + export)
- [ ] Resend: immediate hot-lead notification
- [ ] NetSuite integration (OAuth 1.0a + retry queue)

### Phase 6 — Sub-brands + Hardening (Weeks 13–14)

- [ ] Crown, Jack Treier, Humboldt acquisition pages
- [ ] Pennsylvania sub-market pages
- [ ] Security audit: headers, CSRF, rate limits
- [ ] Cloudflare WAF rules + bot management
- [ ] CCPA consent banner + Consent Mode v2
- [ ] Lighthouse CI in GitHub Actions
- [ ] Full Playwright regression suite

---

## 21. Open Architecture Decisions

| Decision                      | Status                                         | Notes                           |
| ----------------------------- | ---------------------------------------------- | ------------------------------- |
| GA4 property                  | Keep `G-GZ7MVEHYW1`, add new web stream        | See §2                          |
| Sub-brand routing             | Path-based under goarmstrong.com               | No subdomains needed            |
| Live chat                     | Mock widget Phase 1, real provider TBD Phase 2 | See §12                         |
| Careers ATS integration       | TBD — what ATS does Armstrong use?             | Static listing fallback         |
| GrowthBook A/B testing        | Self-hosted vs. cloud                          | Cloud simpler to start          |
| Cal.com for survey scheduling | Phase 2                                        | Phase 1 uses email notification |
| Mapbox vs. react-simple-maps  | react-simple-maps (no API cost)                | Upgrade to Mapbox if needed     |
| PostgreSQL hosting            | Railway or Supabase                            | Both support PgBouncer pooling  |

---

_This document is the source of truth for the Armstrong rebuild. Update it as decisions are made._
