# Armstrong Website — Claude Code Instructions

This file is loaded automatically by Claude Code. Follow all instructions below exactly.

---

## Project

goarmstrong.com rebuild — Next.js 15 App Router, TypeScript strict mode with `exactOptionalPropertyTypes: true`.

---

## Node / npm

Before running any `node`, `npm`, `npx`, or `gh` command, export the NVM path:

```bash
export PATH="$PATH:/Users/ciscosanchez/.nvm/versions/node/v22.22.2/bin"
```

---

## Dev Server

```bash
npm run dev
```

Uses `--turbopack`. Do not add `--turbopack` manually; it is already in the script.

---

## Typecheck

```bash
node_modules/.bin/tsc --noEmit
```

Do not use `npx tsc` — use the local binary directly to ensure the project's own TypeScript version is used.

---

## TypeScript — exactOptionalPropertyTypes: true

The `tsconfig.json` sets `"exactOptionalPropertyTypes": true`. This means you must **never** pass `undefined` to an optional prop. Use a conditional spread instead:

```ts
// WRONG — will cause a type error
<Component prop={value ?? undefined} />

// CORRECT — conditionally include the prop
<Component {...(value ? { prop: value } : {})} />
```

This rule applies to all component props, object literals, and function arguments.

---

## Brand Colors — Never Hardcode Hex

Never hardcode hex color values in Tailwind classes, inline styles, or CSS. Always use Armstrong Tailwind tokens. All tokens are defined in `tailwind.config.ts`.

```ts
// WRONG
<div className="bg-[#00263F]">

// CORRECT
<div className="bg-armstrong-dark-blue">
```

Available tokens: `armstrong-dark-blue`, `armstrong-blue`, `armstrong-light-blue`, `armstrong-grey-1`, `armstrong-grey-2`, `armstrong-grey-3`, `armstrong-purple-1`, `armstrong-purple-2`, `armstrong-purple-3`, `armstrong-green-1`, `armstrong-green-2`, `armstrong-green-3`.

---

## Logos

Use PNGs from `public/images/` for all logo display — do not use SVG files directly (they are approximations only).

- **Header**: `armstrong-logo-primary.png`
- **Footer**: `armstrong-logo-primary.png` with Tailwind classes `brightness-0 invert` (renders white on dark background)

---

## Sanity Queries

All Sanity GROQ queries live in `lib/sanity/queries.ts`. Always use the typed helper functions — never write inline GROQ in page or component files.

```ts
// CORRECT
import { getBlogPosts, getBlogPostBySlug } from '@/lib/sanity/queries';

// WRONG
import { client } from '@/lib/sanity/client';
const posts = await client.fetch(`*[_type == "post"]`);
```

---

## Rate Limiter

`lib/security/rateLimit.ts` exports `checkRateLimit()`. It is lazy-initialized and returns `{ allowed: true }` when Redis environment variables are not configured.

Do **not** initialize `Ratelimit` at module level — only initialize inside `checkRateLimit()` to avoid crashes when `UPSTASH_REDIS_REST_URL` is unset.

---

## Forms

All forms are validated with Zod schemas from `lib/validations/`. Forms POST to `/api/leads` or `/api/estimate`. Every form submission must include a CSRF token obtained via `lib/security/csrf.ts`.

---

## NetSuite

`lib/netsuite/leads.ts` exports `createLead()` and `updateLead()`. Call these **only from API route handlers** — never import or call them from client components or server components.

---

## Admin Dashboard

The admin dashboard lives at `/dashboard` (route group `(admin)`). It is protected by NextAuth. The login page is at `/login` and uses Google OAuth.

---

## Location Data

Location data for all 33+ cities is static in `lib/locations/data.ts`. Do not fetch location data from any external API. If new locations need to be added, update `data.ts` directly.

---

## Hero Component

The `Hero` component accepts a `showSymbol` prop (boolean). When `true`, it renders the Armstrong symbol as an `absolute`-positioned watermark. This does not affect text layout — do not adjust padding or positioning to compensate.

---

## Leaflet Map

`components/sections/LocationMap.tsx` uses Leaflet for the interactive US map. Import it only via Next.js `dynamic()` with `{ ssr: false }`. Never import Leaflet at the top level of any file — it will crash during SSR.

```ts
// CORRECT — in a server or parent component
const LocationMap = dynamic(() => import('@/components/sections/LocationMap'), { ssr: false });
```

---

## Missing Credentials

The app functions without Upstash, Resend, NetSuite, or Turnstile credentials. Each of these degrades gracefully:

- **Upstash**: rate limiting allows all requests
- **Resend**: email sending silently no-ops (lead still saved to DB)
- **NetSuite**: CRM push silently no-ops (lead still saved to DB)
- **Turnstile**: bot check is skipped

Do not add additional error handling or warning logs for missing env vars beyond what is already in the codebase.

---

## Code Style Rules

- No file over **500 lines** — split into smaller modules
- No `any` types — use `unknown` and narrow, or define proper types
- No inline styles (`style={{...}}`) except where Tailwind cannot express the value (e.g., a dynamic CSS variable or a precise pixel value not in the scale)
- No `console.log` left in committed code — use `console.error` for genuine errors only
- All API routes validate request bodies with Zod before processing
- All new Zod schemas go in `lib/validations/`
