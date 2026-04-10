/**
 * CONCEPT B — "Manifesto"
 * Bold editorial typography. Stark, confident, brand-forward.
 * Feels like a company that doesn't need to explain itself — it just states it.
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Armstrong — Concept B: Manifesto',
  robots: { index: false },
};

const SERVICES = [
  {
    label: 'Supply Chain & Logistics',
    href: '/supply-chain-solutions',
    image: '/images/sc-hero.png',
  },
  {
    label: 'Managed Transportation',
    href: '/managed-transportation',
    image: '/images/sc-transportation.png',
  },
  {
    label: 'Commercial Moving',
    href: '/business-moving-services',
    image: '/images/biz-office.jpg',
  },
  {
    label: 'Data Center & Specialty',
    href: '/data-center-logistics-services',
    image: '/images/biz-warehouse.jpg',
  },
  {
    label: 'Residential Moving',
    href: '/household-moving-services',
    image: '/images/res-movers.jpg',
  },
] as const;

export default function ConceptB() {
  return (
    <div>
      {/* ── Manifesto Hero ────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue relative min-h-screen overflow-hidden">
        {/* Full bleed background image — low opacity */}
        <Image
          src="/images/biz-hero.png"
          alt=""
          fill
          className="object-cover opacity-10"
          priority
          aria-hidden="true"
        />

        <div className="container-armstrong relative flex min-h-screen flex-col justify-between py-16">
          {/* Giant statement */}
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="leading-none font-black tracking-tighter text-white">
              <span className="block text-[12vw]">We move</span>
              <span className="text-armstrong-blue block text-[12vw]">businesses.</span>
              <span className="block text-[12vw]">Goods.</span>
              <span className="block text-[12vw]">Families.</span>
            </h1>
          </div>

          {/* Bottom row */}
          <div className="flex flex-wrap items-end justify-between gap-8 pt-16">
            <div className="max-w-md">
              <p className="text-lg leading-relaxed text-white/80">
                Supply chain. Transportation. Commercial. Residential. 65+ years. 33 locations. One
                company that does it all — and owns every outcome.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/get-moving-with-armstrong"
                  className="bg-armstrong-blue hover:bg-armstrong-blue-hover px-8 py-4 font-semibold text-white transition-colors"
                >
                  Let&apos;s Talk
                </Link>
                <Link
                  href="/ballpark-estimate"
                  className="border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Get an Estimate
                </Link>
              </div>
            </div>
            <div className="text-right font-mono text-xs tracking-widest text-white/70">
              <p>Est. 1957</p>
              <p>DOT#2246724</p>
              <p>MC#712934</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Split service showcase ────────────────────────────── */}
      <section>
        {SERVICES.map((s, i) => (
          <Link
            key={s.label}
            href={s.href}
            className={`group flex min-h-[280px] ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Image half */}
            <div className="relative w-1/2 overflow-hidden">
              <Image
                src={s.image}
                alt={s.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="bg-armstrong-dark-blue/40 absolute inset-0" />
            </div>

            {/* Text half */}
            <div
              className={`bg-armstrong-dark-blue flex w-1/2 items-center p-12 lg:p-20 ${i % 2 === 0 ? '' : 'justify-end text-right'}`}
            >
              <div>
                <p className="text-armstrong-blue mb-3 font-mono text-xs tracking-widest uppercase">
                  0{i + 1}
                </p>
                <h2 className="mb-6 text-3xl leading-tight font-bold text-white lg:text-4xl">
                  {s.label}
                </h2>
                <span className="text-armstrong-blue transition-gap inline-flex items-center gap-2 font-semibold group-hover:gap-4">
                  Explore
                  <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ── Statement strip ──────────────────────────────────── */}
      <section className="bg-armstrong-blue py-20 text-white">
        <div className="container-armstrong">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { stat: '500+', label: 'Cities in our carrier network' },
              { stat: '3', label: 'Generations of family ownership' },
              { stat: '100%', label: 'Accountability on every move' },
            ].map((s) => (
              <div key={s.stat} className="border-l-4 border-white/30 pl-8">
                <p className="mb-2 text-6xl font-black">{s.stat}</p>
                <p className="text-lg font-semibold text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue py-32 text-center text-white">
        <div className="container-armstrong">
          <p className="text-armstrong-blue mb-6 font-mono text-sm tracking-widest uppercase">
            The Armstrong Company
          </p>
          <h2 className="mb-4 text-5xl font-black tracking-tight text-white lg:text-7xl">
            Our world moves
            <br />
            around you.
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg text-white/80">
            Since 1957. Three generations. One promise.
          </p>
          <Link
            href="/get-moving-with-armstrong"
            className="bg-armstrong-blue hover:bg-armstrong-blue-hover inline-block px-16 py-5 text-lg font-bold tracking-widest text-white uppercase transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
