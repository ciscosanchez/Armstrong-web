# Armstrong Website — goarmstrong.com

Developer documentation for the Next.js 15 rebuild of [goarmstrong.com](https://goarmstrong.com) — The Armstrong Company, full-service moving, storage & logistics.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full engineering specification.

---

## Prerequisites

- **Node.js** 22 or higher (`node --version`)
- **npm** 10 or higher (`npm --version`)
- A PostgreSQL 16 database (local or hosted — Supabase, Neon, Railway all work)
- A Sanity account (free tier is fine for development)

---

## Quick Start

```bash
# 1. Clone
git clone git@github.com:<org>/armstrong-web.git
cd armstrong-web

# 2. Install dependencies
npm install

# 3. Copy env template and fill in your values
cp .env.local.example .env.local
# edit .env.local — at minimum set DATABASE_URL and AUTH_SECRET

# 4. Push the Prisma schema to your local DB
npm run db:push

# 5. Start the dev server (Turbopack)
npm run dev
```

The site is available at [http://localhost:3000](http://localhost:3000).  
Sanity Studio is embedded at [http://localhost:3000/studio](http://localhost:3000/studio).

---

## npm Scripts

| Script                  | What it does                                                                     |
| ----------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`           | Start Next.js dev server with Turbopack                                          |
| `npm run build`         | Production build                                                                 |
| `npm start`             | Serve the production build locally                                               |
| `npm run lint`          | Run ESLint (Next.js flat config)                                                 |
| `npm run lint:fix`      | Run ESLint and auto-fix violations                                               |
| `npm run format`        | Format all files with Prettier                                                   |
| `npm run format:check`  | Check formatting without writing                                                 |
| `npm run typecheck`     | Run `tsc --noEmit` (no emit, strict check)                                       |
| `npm test`              | Run Playwright E2E tests (headless)                                              |
| `npm run test:ui`       | Run Playwright with the interactive UI                                           |
| `npm run test:headed`   | Run Playwright in headed browser mode                                            |
| `npm run seed:articles` | Import default article content into Sanity (run once after Sanity is configured) |
| `npm run db:push`       | Push Prisma schema to DB without migrations (dev)                                |
| `npm run db:migrate`    | Create and apply a new Prisma migration                                          |
| `npm run db:studio`     | Open Prisma Studio GUI at localhost:5555                                         |
| `npm run db:generate`   | Regenerate the Prisma client after schema changes                                |

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in each value. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser — never put secrets in them.

### Analytics

| Variable                        | Purpose                                     | Where to get it                         |
| ------------------------------- | ------------------------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (format: `G-XXXXXXXXXX`) | Google Analytics → Admin → Data Streams |

### Bot Protection — Cloudflare Turnstile

| Variable                         | Purpose                          | Where to get it                  |
| -------------------------------- | -------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public site key (safe to expose) | Cloudflare Dashboard → Turnstile |
| `TURNSTILE_SECRET_KEY`           | Server-side verification secret  | Cloudflare Dashboard → Turnstile |

### CMS — Sanity

| Variable                        | Purpose                                     | Where to get it                     |
| ------------------------------- | ------------------------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID                           | sanity.io/manage → project settings |
| `NEXT_PUBLIC_SANITY_DATASET`    | Dataset name (usually `production`)         | sanity.io/manage → datasets         |
| `SANITY_API_READ_TOKEN`         | Read-only API token for server-side fetches | sanity.io/manage → API → Tokens     |
| `SANITY_API_WRITE_TOKEN`        | Write token used by the seed script         | sanity.io/manage → API → Tokens     |

### Database — PostgreSQL via Prisma

| Variable       | Purpose                      | Where to get it                                      |
| -------------- | ---------------------------- | ---------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | Your DB provider (Neon, Supabase, Railway, or local) |

### Auth — NextAuth.js (Google OAuth)

| Variable             | Purpose                                                                                 | Where to get it                                      |
| -------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `AUTH_SECRET`        | Secret used to sign NextAuth JWTs and cookies. Generate with: `openssl rand -base64 32` | Generate locally                                     |
| `AUTH_GOOGLE_ID`     | Google OAuth client ID                                                                  | Google Cloud Console → APIs & Services → Credentials |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret                                                              | Google Cloud Console → APIs & Services → Credentials |

### Email — Resend

| Variable         | Purpose                                                                     | Where to get it       |
| ---------------- | --------------------------------------------------------------------------- | --------------------- |
| `RESEND_API_KEY` | API key for sending transactional email (lead notifications, confirmations) | resend.com → API Keys |

### Rate Limiting — Upstash Redis

| Variable                   | Purpose                         | Where to get it                         |
| -------------------------- | ------------------------------- | --------------------------------------- |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST endpoint URL | upstash.com → Redis database → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST auth token   | upstash.com → Redis database → REST API |

> If these are unset, rate limiting degrades gracefully to allow-all. The app functions normally.

### CRM — NetSuite

| Variable                   | Purpose                    | Where to get it                                      |
| -------------------------- | -------------------------- | ---------------------------------------------------- |
| `NETSUITE_ACCOUNT_ID`      | NetSuite account ID        | NetSuite → Setup → Company → Company Information     |
| `NETSUITE_CONSUMER_KEY`    | OAuth 1.0a consumer key    | NetSuite → Setup → Integration → Manage Integrations |
| `NETSUITE_CONSUMER_SECRET` | OAuth 1.0a consumer secret | NetSuite → Setup → Integration → Manage Integrations |
| `NETSUITE_TOKEN_ID`        | Access token ID            | NetSuite → Setup → Users/Roles → Access Tokens       |
| `NETSUITE_TOKEN_SECRET`    | Access token secret        | NetSuite → Setup → Users/Roles → Access Tokens       |

> If these are unset, lead submissions are still saved to the PostgreSQL DB and emailed via Resend. NetSuite sync silently no-ops.

### Cron Jobs

| Variable      | Purpose                                                                                           | Where to get it                             |
| ------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `CRON_SECRET` | Shared secret sent in `Authorization` header by cron callers to authenticate scheduled API routes | Generate locally: `openssl rand -base64 32` |

---

## Architecture Overview

This is a Next.js 15 App Router application using TypeScript in strict mode. Key architectural decisions:

- **Routing**: Route groups `(marketing)` for public pages, `(admin)` for the auth-gated dashboard
- **CMS**: Sanity v3 with embedded Studio at `/studio`. Blog/article content is managed there.
- **Database**: PostgreSQL via Prisma. Stores leads, tracking events, and session data.
- **Forms**: React Hook Form + Zod validation. All forms POST to `/api/` routes. CSRF protection via double-submit cookie.
- **Auth**: NextAuth.js v5 with Google OAuth. Only armstrong.com Google Workspace accounts should be granted access (configure allowed domains in Google Cloud Console).
- **CRM**: Leads are written to PostgreSQL and asynchronously pushed to NetSuite via OAuth 1.0a REST API.
- **Rate limiting**: Upstash Redis via `@upstash/ratelimit`. Degrades to allow-all when Redis is unconfigured.
- **Analytics**: GA4 via `next/third-parties` (no GTM). First-party behavioral events tracked to PostgreSQL via `/api/track`.
- **Bot protection**: Cloudflare Turnstile on all public forms.
- **Maps**: Leaflet (client-side only, loaded via dynamic import to avoid SSR crash).
- **Fonts**: Uncut Sans loaded via `next/font/local` (zero FOUT, self-hosted).

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full detail on every layer.

---

## Key Directories

```
app/(marketing)/        All public-facing pages (homepage, service pages, locations, blog, forms)
app/(admin)/            Internal sales dashboard — protected by NextAuth (Google OAuth)
app/api/                API routes: leads, estimate, survey, credit, supplies, track, auth
app/studio/             Sanity Studio embedded at /studio
components/layout/      Header, Footer, MobileNav, Breadcrumb
components/sections/    Hero, ServiceGrid, LocationMap, StatsBar, TestimonialCarousel, CTABanner, BlogGrid
components/forms/       ContactForm, EstimateForm, SurveyForm, CreditApplicationForm, SuppliesEstimator
components/seo/         JSON-LD schema components (Organization, LocalBusiness, Article)
components/tracking/    TrackingProvider (session init), ConsentBanner (CCPA/GDPR)
components/ui/          Brand-styled primitive components (Button, Input, Select, etc.)
lib/db/                 Prisma singleton client
lib/email/              Resend client + email templates
lib/fonts.ts            next/font/local config for Uncut Sans
lib/locations/          Static location data for 33+ cities (do not fetch from external API)
lib/netsuite/           NetSuite OAuth 1.0a client + lead create/update helpers
lib/sanity/             Sanity client config + typed GROQ query helpers
lib/security/           Rate limiter (rateLimit.ts) + CSRF (csrf.ts)
lib/tracking/           Typed first-party event definitions
lib/validations/        Zod schemas for all form payloads
sanity/                 Sanity schema definitions (document types, field definitions)
scripts/                One-time seed scripts (seed-articles.ts)
public/fonts/           Uncut Sans woff2 files (self-hosted, committed to repo)
public/images/          Armstrong logos and brand images
sample/                 Brand assets and PDFs — gitignored, not deployed
tests/e2e/              Playwright E2E test specs
```

---

## CMS — Sanity Studio

Articles and resource content are managed in Sanity Studio, accessible at `/studio` when running locally or on your deployed Vercel URL.

**To import default content:**

1. Configure `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_WRITE_TOKEN` in `.env.local`
2. Run: `npm run seed:articles`

This is a one-time operation. After that, use the Studio UI to manage content.

---

## Brand System

- **Font**: Uncut Sans (MIT license) — all weights served from `public/fonts/uncut-sans/`
- **Colors**: Never hardcode hex values. Use Tailwind `armstrong-*` tokens defined in `tailwind.config.ts` (e.g., `armstrong-dark-blue`, `armstrong-blue`, `armstrong-green-1`)
- **Logos**: Use PNGs from `public/images/` — `armstrong-logo-primary.png` in the header; same file with Tailwind `brightness-0 invert` classes in the footer

---

## Deployment

**Recommended: Vercel**

1. Connect the GitHub repo to a Vercel project
2. Set all environment variables in the Vercel dashboard (Settings → Environment Variables)
3. Vercel auto-detects Next.js — no build config needed
4. Set `DATABASE_URL` to a hosted PostgreSQL provider (Neon or Supabase recommended)

The app is also deployable to any Node.js host that supports Next.js standalone output.

---

## Further Reading

- [ARCHITECTURE.md](./ARCHITECTURE.md) — full engineering spec: tech stack, brand, routing, CMS schema, form architecture, NetSuite integration, tracking, security, testing, deployment phases
