/**
 * CONCEPT C — "Live Operations"
 * Kinetic, motion-driven. Rolling tickers, video cards, parallax.
 * Feels like the business is always in motion — because it is.
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Armstrong — Concept C: Live Operations',
  robots: { index: false },
};

const MARQUEE_TOP = [
  'Supply Chain Solutions',
  'Managed Transportation',
  'Commercial Moving',
  'Data Center Relocation',
  'Residential Moving',
  'Warehousing & Distribution',
  'FTL · LTL · Intermodal',
  'First & Final Mile',
];

const MARQUEE_BOT = [
  '500+ Cities',
  '49 States',
  '33+ Locations',
  '65+ Years',
  'DOT#2246724',
  'MC#712934',
  'Since 1957',
  '3 Generations',
];

const SERVICE_CARDS = [
  {
    id: 'supply-chain',
    label: 'Supply Chain\n& Logistics',
    tag: 'B2B · Enterprise',
    image: '/images/sc-hero.png',
    href: '/supply-chain-solutions',
    accent: true,
  },
  {
    id: 'transport',
    label: 'Managed\nTransportation',
    tag: '500+ Cities · 49 States',
    image: '/images/sc-transportation.png',
    href: '/managed-transportation',
    accent: false,
  },
  {
    id: 'commercial',
    label: 'Commercial\nMoving',
    tag: 'Office · Industrial · FF&E',
    image: '/images/biz-office.jpg',
    href: '/business-moving-services',
    accent: false,
  },
  {
    id: 'data',
    label: 'Data Center\n& Specialty',
    tag: 'Zero downtime',
    image: '/images/biz-warehouse.jpg',
    href: '/data-center-logistics-services',
    accent: false,
  },
  {
    id: 'residential',
    label: 'Residential\nMoving',
    tag: 'Local · Long distance',
    image: '/images/res-movers.jpg',
    href: '/household-moving-services',
    accent: false,
  },
] as const;

const PROOF = [
  { value: '500+', label: 'Cities covered' },
  { value: '65+', label: 'Years operating' },
  { value: '33+', label: 'Locations' },
  { value: '49', label: 'States served' },
] as const;

export default function ConceptC() {
  return (
    <div className="bg-white">
      {/* ── Hero — full bleed video + giant type ─────────────── */}
      <section className="bg-armstrong-dark-blue relative min-h-screen overflow-hidden">
        {/* Video bg */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/sc-transportation.png"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          aria-hidden="true"
        >
          {/* <source src="/videos/armstrong-fleet.mp4" type="video/mp4" /> */}
        </video>
        <div className="from-armstrong-dark-blue absolute inset-0 bg-gradient-to-b via-transparent to-transparent opacity-80" />

        <div className="container-armstrong relative flex min-h-screen flex-col justify-center py-24">
          {/* Overline ticker */}
          <div className="mb-8 w-full overflow-hidden" aria-hidden="true">
            <div className="marquee-track">
              {[...MARQUEE_TOP, ...MARQUEE_TOP].map((item, i) => (
                <span
                  key={i}
                  className="text-armstrong-blue mr-12 text-xs font-semibold tracking-widest whitespace-nowrap uppercase"
                >
                  {item} ·
                </span>
              ))}
            </div>
          </div>

          <h1 className="mb-8 text-white">
            <span className="block text-6xl leading-none font-black lg:text-8xl">Built for</span>
            <span className="block text-6xl leading-none font-black lg:text-8xl">complexity.</span>
            <span className="text-armstrong-blue block text-6xl leading-none font-black lg:text-8xl">
              Built for you.
            </span>
          </h1>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/get-moving-with-armstrong"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover px-8 py-4 font-bold text-white transition-colors"
            >
              Talk to a Specialist →
            </Link>
            <Link
              href="/ballpark-estimate"
              className="border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Instant Estimate
            </Link>
          </div>
        </div>

        {/* Bottom marquee */}
        <div
          className="absolute right-0 bottom-0 left-0 overflow-hidden border-t border-white/10 bg-white/5 py-3"
          aria-hidden="true"
        >
          <div
            className="marquee-track"
            style={{ animationDirection: 'reverse', animationDuration: '20s' }}
          >
            {[...MARQUEE_BOT, ...MARQUEE_BOT].map((item, i) => (
              <span
                key={i}
                className="mr-12 font-mono text-xs tracking-widest whitespace-nowrap text-white/70 uppercase"
              >
                {item} ·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rolling stat band ────────────────────────────────── */}
      <section className="bg-armstrong-blue">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {PROOF.map((p) => (
            <div
              key={p.label}
              className="border-r border-white/20 py-8 text-center text-white last:border-0"
            >
              <p className="text-5xl font-black">{p.value}</p>
              <p className="mt-1 text-sm font-semibold text-white/70">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Service cards — horizontal scroll on mobile ───────── */}
      <section className="py-20">
        <div className="container-armstrong mb-10">
          <h2 className="text-armstrong-dark-blue text-4xl font-black lg:text-5xl">
            Every kind
            <br />
            of move.
          </h2>
        </div>

        <div className="container-armstrong flex gap-4 overflow-x-auto px-6 pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {SERVICE_CARDS.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className={`group relative flex min-w-[260px] flex-col justify-end overflow-hidden rounded-2xl p-6 lg:min-w-0 ${s.accent ? 'min-h-[400px]' : 'min-h-[320px]'}`}
            >
              <Image
                src={s.image}
                alt={s.label.replace('\n', ' ')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative">
                <p className="mb-2 text-xs font-semibold text-white/80">{s.tag}</p>
                <h3 className="text-xl leading-tight font-black whitespace-pre-line text-white">
                  {s.label}
                </h3>
                <p className="text-armstrong-blue mt-3 text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Split — video + copy ──────────────────────────────── */}
      <section className="grid min-h-[500px] lg:grid-cols-2">
        <div className="relative min-h-[300px] overflow-hidden">
          <Image
            src="/images/sc-port.webp"
            alt="Armstrong global logistics"
            fill
            className="object-cover"
          />
          <div className="bg-armstrong-dark-blue/50 absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Play button — placeholder for video */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm">
              <div className="ml-2 border-y-[12px] border-l-[20px] border-y-transparent border-l-white" />
            </div>
          </div>
        </div>
        <div className="bg-armstrong-dark-blue flex items-center p-12 lg:p-20">
          <div className="text-white">
            <p className="text-armstrong-blue mb-4 text-sm font-semibold tracking-widest uppercase">
              Why Armstrong
            </p>
            <h2 className="mb-6 text-3xl font-black text-white lg:text-4xl">
              Three generations.
              <br />
              One promise.
            </h2>
            <p className="mb-8 leading-relaxed text-white/80">
              We&apos;ve been moving what matters since 1957. From family homes to Fortune 500
              supply chains — if it&apos;s important to you, it&apos;s important to us.
            </p>
            <Link href="/about" className="text-armstrong-blue font-semibold hover:underline">
              Our story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue py-24 text-center text-white">
        <div className="container-armstrong">
          <h2 className="mb-6 text-5xl font-black text-white lg:text-6xl">
            What do you need
            <br />
            <span className="text-armstrong-blue">to move?</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-moving-with-armstrong"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover px-10 py-4 font-bold text-white transition-colors"
            >
              Talk to Us
            </Link>
            <Link
              href="/ballpark-estimate"
              className="border border-white/30 px-10 py-4 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
