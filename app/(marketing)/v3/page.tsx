/**
 * CONCEPT A — "Command Center"
 * Dark, video-first, enterprise ops aesthetic.
 * Feels like a logistics control room — data, scale, precision.
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Armstrong — Concept A: Command Center',
  robots: { index: false },
};

const TICKER_ITEMS = [
  '500+ Cities Covered',
  'DOT#2246724',
  'MC#712934',
  '49 States Served',
  '33+ Locations',
  '65+ Years in Logistics',
  'FTL · LTL · Intermodal',
  'First & Final Mile',
  'Warehousing & Distribution',
  'Data Center Relocation',
  'Supply Chain Engineering',
  'Commercial Moving',
];

const SERVICES = [
  {
    id: 'supply-chain',
    number: '01',
    label: 'Supply Chain & Logistics',
    body: 'End-to-end distribution, warehousing, and engineering built around your operation.',
    href: '/supply-chain-solutions',
    image: '/images/sc-hero.png',
  },
  {
    id: 'managed-transport',
    number: '02',
    label: 'Managed Transportation',
    body: 'Nationwide carrier network. FTL, LTL, intermodal, and first & final mile.',
    href: '/managed-transportation',
    image: '/images/sc-transportation.png',
  },
  {
    id: 'commercial',
    number: '03',
    label: 'Commercial Moving',
    body: 'Office, industrial, and multi-site relocations coordinated across the country.',
    href: '/business-moving-services',
    image: '/images/biz-office.jpg',
  },
  {
    id: 'data-center',
    number: '04',
    label: 'Data Center & Specialty',
    body: 'Zero-downtime critical moves with full chain-of-custody documentation.',
    href: '/data-center-logistics-services',
    image: '/images/biz-warehouse.jpg',
  },
  {
    id: 'residential',
    number: '05',
    label: 'Residential Moving',
    body: 'Local and long-distance home moves backed by enterprise-grade infrastructure.',
    href: '/household-moving-services',
    image: '/images/res-movers.jpg',
  },
] as const;

export default function ConceptA() {
  return (
    <div className="bg-armstrong-dark-blue text-white">
      {/* ── Video Hero ────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Video background — swap src for real video file */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/sc-hero.png"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          aria-hidden="true"
        >
          {/* <source src="/videos/armstrong-ops.mp4" type="video/mp4" /> */}
        </video>

        {/* Gradient overlay */}
        <div className="from-armstrong-dark-blue absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
        <div className="from-armstrong-dark-blue absolute right-0 bottom-0 left-0 h-48 bg-gradient-to-t" />

        {/* Content */}
        <div className="container-armstrong relative flex min-h-screen flex-col justify-center py-24">
          <p className="text-armstrong-blue mb-6 font-mono text-xs tracking-[0.3em] uppercase">
            Est. 1957 · 33 Locations · Nationwide
          </p>
          <h1 className="mb-6 max-w-3xl text-5xl leading-none font-bold tracking-tight lg:text-7xl xl:text-8xl">
            We move
            <br />
            <span className="text-armstrong-blue">what matters.</span>
          </h1>
          <p className="text-armstrong-grey-2 mb-10 max-w-lg text-xl leading-relaxed">
            Supply chain. Managed transportation. Commercial relocation. Residential moving. One
            partner. Any scale.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/get-moving-with-armstrong"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-none px-10 py-4 font-semibold tracking-wide text-white uppercase transition-colors"
            >
              Talk to a Specialist
            </Link>
            <Link
              href="#services"
              className="border border-white/20 px-10 py-4 font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/10"
            >
              View Services
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40">
            <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
            <div className="h-8 w-px bg-white" />
          </div>
        </div>
      </section>

      {/* ── Live ticker ───────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-white/10 bg-white/5 py-3" aria-hidden="true">
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-armstrong-blue mx-8 font-mono text-xs tracking-widest whitespace-nowrap uppercase"
            >
              {item}
              <span className="ml-8 text-white/20">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────────── */}
      <section id="services" className="py-24">
        <div className="container-armstrong">
          <div className="mb-16 flex items-end justify-between">
            <h2 className="text-4xl font-bold lg:text-5xl">
              What we
              <br />
              <span className="text-armstrong-blue">operate.</span>
            </h2>
            <p className="hidden max-w-xs text-sm leading-relaxed text-white/70 lg:block">
              Five service lines. One point of contact. Total accountability.
            </p>
          </div>

          <div className="space-y-px">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="group -mx-4 flex items-center justify-between border-t border-white/10 px-4 py-6 transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-8">
                  <span className="text-armstrong-blue w-8 shrink-0 font-mono text-sm">
                    {s.number}
                  </span>
                  <div>
                    <p className="group-hover:text-armstrong-blue text-xl font-semibold transition-colors">
                      {s.label}
                    </p>
                    <p className="mt-1 hidden text-sm text-white/70 sm:block">{s.body}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative hidden h-16 w-24 overflow-hidden rounded opacity-0 transition-opacity group-hover:opacity-100 lg:block">
                    <Image src={s.image} alt="" fill className="object-cover" />
                  </div>
                  <span className="text-armstrong-blue text-2xl transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </Link>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ── Stats grid ───────────────────────────────────────── */}
      <section className="border-y border-white/10 py-20">
        <div className="container-armstrong">
          <dl className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            {[
              { value: '500+', label: 'Cities', sub: 'Nationwide coverage' },
              { value: '49', label: 'States', sub: 'Coast to coast' },
              { value: '33+', label: 'Locations', sub: 'Local expertise' },
              { value: '65+', label: 'Years', sub: 'In operation since 1957' },
            ].map((s) => (
              <div key={s.label} className="bg-armstrong-dark-blue p-10 text-center">
                <dt className="stat-glow text-armstrong-blue mb-1 text-5xl font-bold">{s.value}</dt>
                <dd className="text-lg font-semibold">{s.label}</dd>
                <dd className="mt-1 text-xs text-white/70">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container-armstrong text-center">
          <p className="text-armstrong-blue mb-4 font-mono text-sm tracking-widest uppercase">
            Ready to move?
          </p>
          <h2 className="mb-8 text-4xl font-bold lg:text-6xl">
            Let&apos;s talk about
            <br />
            what you need to move.
          </h2>
          <Link
            href="/get-moving-with-armstrong"
            className="bg-armstrong-blue hover:bg-armstrong-blue-hover inline-block px-12 py-5 text-lg font-semibold tracking-wide text-white uppercase transition-colors"
          >
            Start the Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
