import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Armstrong — Built for the move you cannot afford to get wrong.',
  robots: { index: false },
};

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    id: 'supply-chain',
    eyebrow: 'Supply Chain',
    headline: 'High touch, low maintenance.',
    body: 'Transportation management, distribution, warehousing, and engineering services — designed around your operation, not a generic contract.',
    href: '/supply-chain-solutions',
    cta: 'Explore Supply Chain',
    accent: true,
  },
  {
    id: 'commercial',
    eyebrow: 'Commercial Moving',
    headline: "We're in the business of moving yours forward.",
    body: 'Office relocations, FF&E installation, decommissioning, and multi-site commercial moves — coordinated nationwide.',
    href: '/business-moving-services',
    cta: 'Explore Commercial',
    accent: false,
  },
  {
    id: 'data-center',
    eyebrow: 'Data Center & Specialty',
    headline: 'Zero-downtime critical moves.',
    body: 'Certified data center relocations, IT asset disposition, and specialized equipment moves with full chain-of-custody documentation.',
    href: '/data-center-logistics-services',
    cta: 'Explore Data Center',
    accent: false,
  },
  {
    id: 'brokerage',
    eyebrow: 'Freight Brokerage',
    headline: 'The right carrier. Every load.',
    body: 'Armstrong Transportation Management connects shippers to a vetted carrier network — 49 states, 500+ cities, asset-light flexibility.',
    href: '/supply-chain-solutions',
    cta: 'Explore Brokerage',
    accent: false,
  },
  {
    id: 'residential',
    eyebrow: 'Residential Moving',
    headline: 'You make it home. We make it happen.',
    body: 'Local, long-distance, and international residential moves backed by the same infrastructure we use for Fortune 500 clients.',
    href: '/household-moving-services',
    cta: 'Explore Residential',
    accent: false,
  },
] as const;

const AUDIENCES = [
  {
    id: 'enterprise',
    label: 'Enterprise & Corporate',
    description:
      'Office relocations, multi-site coordination, FF&E, and dedicated account management for complex commercial moves.',
    href: '/business-moving-services',
  },
  {
    id: 'healthcare',
    label: 'Healthcare & Industrial',
    description:
      'Regulated environments, specialized equipment, and chain-of-custody documentation for high-stakes moves.',
    href: '/data-center-logistics-services',
  },
  {
    id: 'supply-chain-ops',
    label: 'Supply Chain Operators',
    description:
      'TMS, distribution, warehousing, and freight brokerage — end-to-end logistics built around your operation.',
    href: '/supply-chain-solutions',
  },
  {
    id: 'residential-buyers',
    label: 'Homeowners & Families',
    description:
      'Full-service residential moving, local and long-distance, with the same care and accountability we bring to every client.',
    href: '/household-moving-services',
  },
] as const;

const STATS = [
  { value: '500+', label: 'Cities Covered', sub: 'Nationwide reach' },
  { value: '49', label: 'States Served', sub: 'Coast to coast' },
  { value: '33+', label: 'Locations', sub: 'Local expertise' },
  { value: '65+', label: 'Years in Logistics', sub: 'Since 1957' },
] as const;

const SERVICE_IMAGES = [
  {
    id: 'supply-chain',
    eyebrow: 'Supply Chain & Logistics',
    label: 'End-to-end logistics solutions',
    sub: 'Explore Supply Chain',
    image: '/images/sc-hero.png',
    alt: 'Armstrong supply chain warehouse operations',
    href: '/supply-chain-solutions',
  },
  {
    id: 'commercial',
    eyebrow: 'Commercial Moving',
    label: 'Office & industrial relocation',
    sub: 'Explore Commercial',
    image: '/images/biz-office.jpg',
    alt: 'Armstrong commercial office relocation',
    href: '/business-moving-services',
  },
  {
    id: 'managed-transport',
    eyebrow: 'Managed Transportation',
    label: 'Freight, brokerage & carrier network',
    sub: 'Explore Managed Transportation',
    image: '/images/sc-transportation.png',
    alt: 'Armstrong managed transportation fleet',
    href: '/managed-transportation',
  },
  {
    id: 'residential',
    eyebrow: 'Residential Moving',
    label: 'Local & long-distance moves',
    sub: 'Explore Residential',
    image: '/images/res-movers.jpg',
    alt: 'Armstrong residential movers',
    href: '/household-moving-services',
  },
] as const;

const WHY = [
  {
    id: 'account',
    headline: 'Dedicated Account Management',
    body: 'One point of contact. Full visibility. We assign a dedicated rep to every commercial relationship — no hand-offs, no surprises.',
  },
  {
    id: 'footprint',
    headline: 'Nationwide Footprint, Local Relationships',
    body: '33+ locations means we have boots on the ground wherever your business needs us — with the consistency of a single partner.',
  },
  {
    id: 'infrastructure',
    headline: 'Proven Logistics Infrastructure',
    body: 'DOT#2246724 · MC#712934. Our own transportation management arm means we control capacity, quality, and accountability end-to-end.',
  },
] as const;

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function HomepageV2() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue relative overflow-hidden py-24 text-white">
        {/* Armstrong A symbol watermark */}
        <div
          className="pointer-events-none absolute top-1/2 left-[15%] -translate-y-1/2 select-none"
          aria-hidden="true"
          style={{ width: '75%', aspectRatio: '1' }}
        >
          <Image
            src="/images/armstrong-symbol.png"
            alt=""
            fill
            className="object-contain opacity-[0.06] brightness-0 invert"
            priority
          />
        </div>

        <div className="container-armstrong relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="mb-5 text-sm font-semibold tracking-widest text-white/60 uppercase">
              Moving · Logistics · Supply Chain · Brokerage
            </p>

            <h1 className="mb-6 text-4xl leading-tight font-semibold text-white lg:text-6xl">
              Built for the move you
              <br />
              can&apos;t afford to get wrong.
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
              Complex commercial relocations, end-to-end supply chain management, freight brokerage,
              and residential moving — all under one roof, backed by 65+ years and 33 locations
              nationwide.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/get-moving-with-armstrong"
                className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
              >
                Talk to a Specialist
              </Link>
              <Link
                href="/ballpark-estimate"
                className="rounded-full border border-white/30 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Get an Instant Estimate
              </Link>
            </div>

            {/* Service pills */}
            <div className="mt-12 flex flex-wrap gap-2">
              {[
                'Supply Chain',
                'Commercial Moving',
                'Data Center',
                'Freight Brokerage',
                'Residential',
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="bg-armstrong-blue py-10">
        <div className="container-armstrong">
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center text-white">
                <dt className="mb-0.5 text-3xl font-bold">{s.value}</dt>
                <dd className="text-sm font-semibold">{s.label}</dd>
                <dd className="mt-0.5 text-xs text-white/60">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Service Image Strip ──────────────────────────────── */}
      <section aria-label="Our services">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {SERVICE_IMAGES.map((s) => (
            <Link key={s.id} href={s.href} className="group relative h-64 overflow-hidden lg:h-80">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="bg-armstrong-dark-blue/50 group-hover:bg-armstrong-dark-blue/30 absolute inset-0 transition-opacity duration-300" />
              {/* Label */}
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <p className="mb-1 text-xs font-semibold tracking-widest text-white/70 uppercase">
                  {s.eyebrow}
                </p>
                <p className="text-lg font-semibold text-white">{s.label}</p>
                <p className="mt-1 text-sm text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.sub} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Capabilities ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-armstrong">
          <div className="mb-12 max-w-2xl">
            <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
              What We Do
            </p>
            <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold lg:text-4xl">
              One partner. Every kind of move.
            </h2>
            <p className="text-armstrong-grey-1 text-base leading-relaxed">
              From managing a 50-truck supply chain network to moving a family across the country —
              Armstrong brings the same expertise and accountability to every engagement.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <article
                key={cap.id}
                className={`group flex flex-col rounded-xl p-8 transition-shadow hover:shadow-md ${
                  cap.accent
                    ? 'bg-armstrong-dark-blue text-white'
                    : 'border-armstrong-grey-3 border bg-white'
                }`}
              >
                <p
                  className={`mb-3 text-xs font-semibold tracking-widest uppercase ${
                    cap.accent ? 'text-armstrong-blue' : 'text-armstrong-blue'
                  }`}
                >
                  {cap.eyebrow}
                </p>
                <h3
                  className={`mb-3 text-xl font-semibold ${cap.accent ? 'text-white' : 'text-armstrong-dark-blue'}`}
                >
                  {cap.headline}
                </h3>
                <p
                  className={`mb-6 flex-1 text-sm leading-relaxed ${cap.accent ? 'text-white/70' : 'text-armstrong-grey-1'}`}
                >
                  {cap.body}
                </p>
                <Link
                  href={cap.href}
                  className={`inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2 ${
                    cap.accent
                      ? 'text-armstrong-blue'
                      : 'text-armstrong-blue hover:text-armstrong-blue-hover'
                  }`}
                >
                  {cap.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Serve ─────────────────────────────────────── */}
      <section className="bg-armstrong-grey-3 py-20">
        <div className="container-armstrong">
          <div className="mb-12 text-center">
            <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
              Who We Serve
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold lg:text-4xl">
              Built for every kind of client.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a) => (
              <Link
                key={a.id}
                href={a.href}
                className="group border-armstrong-grey-3 flex flex-col rounded-xl border bg-white p-7 transition-shadow hover:shadow-md"
              >
                <h3 className="text-armstrong-dark-blue group-hover:text-armstrong-blue mb-3 font-semibold transition-colors">
                  {a.label}
                </h3>
                <p className="text-armstrong-grey-1 flex-1 text-sm leading-relaxed">
                  {a.description}
                </p>
                <span className="text-armstrong-blue mt-5 text-sm font-semibold">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Armstrong ────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-armstrong">
          <div className="mb-12 max-w-2xl">
            <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
              Why Armstrong
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold lg:text-4xl">
              Three generations of going above and beyond.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.id} className="border-armstrong-blue border-l-4 pl-6">
                <h3 className="text-armstrong-dark-blue mb-2 text-lg font-semibold">
                  {w.headline}
                </h3>
                <p className="text-armstrong-grey-1 text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/about"
              className="text-armstrong-blue hover:text-armstrong-blue-hover font-semibold underline underline-offset-2"
            >
              More about The Armstrong Company →
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Let's talk about what you're moving."
        subhead="Whether it's a complex supply chain, a commercial relocation, or a family home — our team is ready to design the right solution."
        cta={{ label: 'Talk to a Specialist', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
