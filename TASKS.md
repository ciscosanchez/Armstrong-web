# Armstrong Website — Remaining Tasks

> Last updated: 2026-04-08  
> Status key: 🔴 Blocking | 🟡 Important | 🟢 Nice to have

---

## 🔴 Must-do before launch

### Credentials & Infrastructure

- [ ] **Database** — replace placeholder `DATABASE_URL` with real Postgres  
      → Recommended: [Neon](https://neon.tech) (free, serverless, one-click setup)
- [ ] **Resend** — add `RESEND_API_KEY` to `.env.local` + Vercel  
      → resend.com → API Keys → Create
- [ ] **Cloudflare Turnstile** — add site key + secret to env  
      → dashboard.cloudflare.com → Turnstile → Add site
- [ ] **Sentry** — create project at sentry.io → add `NEXT_PUBLIC_SENTRY_DSN` to env
- [ ] **Deploy to Vercel** — connect GitHub repo, set all env vars in Vercel dashboard  
      → Required Vercel secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (for CI auto-deploy)
- [ ] **Cloudflare** — put production domain behind Cloudflare (free plan covers DDoS)

### Auth — Microsoft Entra ID SSO

- [ ] Azure Portal → Entra ID → App Registrations → New Registration
  - Redirect URI: `https://goarmstrong.com/api/auth/callback/microsoft-entra-id`
  - Add `AUTH_MICROSOFT_ENTRA_ID_ID`, `AUTH_MICROSOFT_ENTRA_ID_SECRET`, `AUTH_MICROSOFT_ENTRA_ID_TENANT_ID` to env

### Brand Assets

- [ ] **Uncut Sans font files** — drop `.woff2` files in `public/fonts/uncut-sans/`  
      → Source: https://github.com/kaspernordkvist/uncut_sans (MIT license)  
      → Currently falling back to system-ui
- [ ] **Real logo SVG files** — get actual vector files from brand team  
      → Currently using PNG fallback from brand guide
- [ ] **OG social image** — create a 1200×630 image at `public/og-default.jpg`  
      → Used for social share previews (LinkedIn, Slack, iMessage, etc.)
- [ ] **Hero photo** — replace gradient hero with real Armstrong photo

### Sanity

- [ ] Add CORS origin for production domain  
      → sanity.io/manage → API → CORS origins → Add `https://goarmstrong.com`
- [ ] Seed articles: `npm run seed:articles` (already done for dev, repeat for prod dataset if needed)

---

## 🟡 Important — wire up after launch

### Monitoring & Alerting (Sentry)

- [ ] Set up alert rules in Sentry:
  - Alert on any new error (email + Slack)
  - Alert if error rate > 10/minute
  - Alert on P75 LCP > 2500ms
- [ ] Add `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` to Vercel  
      → Enables sourcemap uploads so stack traces show real code

### Rate Limiting

- [ ] Create Upstash Redis database → add `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`  
      → Without this, rate limiting is disabled (allow-all)

### CRM

- [ ] NetSuite REST API credentials (when ready)  
      → `NETSUITE_ACCOUNT_ID`, `NETSUITE_CONSUMER_KEY/SECRET`, `NETSUITE_TOKEN_ID/SECRET`  
      → Without these, leads save to Postgres + email only (no CRM sync)

### Admin Dashboard

- [ ] Run `npm run db:push` against production DB to create schema
- [ ] Seed first admin user in Prisma Studio or directly in DB
- [ ] Set `CRON_SECRET` for scheduled job endpoints

### GitHub Actions Secrets

Required for CI to pass and CD to deploy:

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` — already have: `y3zr80qh`
- [ ] `SANITY_API_READ_TOKEN` — already have
- [ ] `SENTRY_AUTH_TOKEN` — from sentry.io
- [ ] `VERCEL_TOKEN` — from vercel.com → Settings → Tokens
- [ ] `VERCEL_ORG_ID` — from Vercel project settings
- [ ] `VERCEL_PROJECT_ID` — from Vercel project settings

---

## 🟢 Nice to have

- [ ] **Sanity SSO** — upgrade to Growth/Enterprise plan for SAML SSO with Azure AD  
      → Currently editors log in with separate Sanity accounts
- [ ] **GrowthBook A/B testing** — self-hosted, add to ARCHITECTURE.md once decided
- [ ] **Virtual survey scheduling** — integrate with a real calendar API (Calendly, MS Bookings)
- [ ] **Financing page** — wire to a real financing partner API
- [ ] **More Playwright tests** — ballpark estimate wizard, location map interaction
- [ ] **Sub-brand pages** — Crown, Humboldt, Jack Treier location pages (stubs exist, need content)
- [ ] **sitemap.ts** — confirm all pages are listed; re-submit to Google Search Console post-launch
- [ ] **Accessibility audit** — run full axe-playwright suite, target WCAG 2.1 AA

---

## Done ✅

- [x] Next.js 15 App Router scaffold with all marketing pages
- [x] Sanity v3 CMS — schema, queries, Studio embedded at `/studio`
- [x] 18 resource articles seeded into Sanity
- [x] Sanity project ID configured (`y3zr80qh`)
- [x] Leaflet location map with 33 real locations
- [x] Forms: ContactForm, EstimateForm, VirtualSurveyForm, CreditApplicationForm, SuppliesEstimator
- [x] Cloudflare Turnstile wired to all lead-capture forms (dev bypass included)
- [x] Rate limiting (Upstash Redis, lazy — degrades gracefully)
- [x] CSRF protection on all API routes
- [x] NetSuite integration (lib/netsuite — no-ops without credentials)
- [x] Resend email templates (lead notification + confirmation)
- [x] Admin dashboard (leads, analytics) — NextAuth-protected
- [x] Microsoft Entra ID SSO + magic link fallback
- [x] Sentry monitoring (client + server + edge configs)
- [x] Security headers (HSTS, X-Frame-Options, CSP, nosniff)
- [x] GitHub Actions CI (typecheck, lint, Playwright on Chromium)
- [x] GitHub Actions CD (Vercel deploy on push to main)
- [x] Armstrong brand design system (Tailwind tokens, color palette)
- [x] SEO: JSON-LD schemas (Organization, LocalBusiness, BlogPosting)
- [x] CCPA consent banner + privacy pages
- [x] Sitemap + robots.txt
- [x] README.md, ARCHITECTURE.md, CLAUDE.md, .env.local.example
- [x] Video embeds in Sanity (YouTube/Vimeo/Mux)
- [x] Form abuse hardening (disposable email detection, suspicious lead scoring)
- [x] Easter egg 🚛
