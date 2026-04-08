import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SupplyChainTabs } from '@/components/sections/SupplyChainTabs';

export const metadata: Metadata = {
  title: 'Supply Chain Solutions',
  description:
    'End-to-end supply chain solutions — distribution, transportation management, and engineering services. High touch, low maintenance. The Armstrong Company.',
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Supply Chain Solutions' },
];

export default function SupplyChainPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue relative min-h-[480px] overflow-hidden text-white">
        <Image
          src="/images/sc-hero.png"
          alt="Armstrong supply chain warehouse operator"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="container-armstrong relative py-20">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
          <h1 className="mt-6 max-w-2xl text-4xl leading-tight font-semibold lg:text-5xl">
            High touch, low maintenance.
          </h1>
          <p className="text-armstrong-grey-2 mt-4 max-w-xl text-lg leading-relaxed">
            When business is moving quickly, you need a partner that can stay ahead of the curve.
            Our supply chain solutions cover everything from transportation and distribution to
            warehousing and engineering — all rooted in a deep knowledge of your business.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/get-moving-with-armstrong?type=supply-chain"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
            >
              Talk to a Supply Chain Expert
            </Link>
            <Link
              href="#supply-chain-tabs"
              className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Interactive service tabs ───────────────────────────────────── */}
      <div id="supply-chain-tabs">
        <SupplyChainTabs />
      </div>

      {/* ── Geographic reach ──────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <h2 className="mb-2 text-center text-2xl font-semibold">
            A partnership built for performance
          </h2>
          <p className="text-armstrong-grey-2 mb-10 text-center text-base">
            Armstrong Transportation Management, LLC · DOT# 2246724 · MC# 712934
          </p>
          <div className="grid gap-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-armstrong-blue mb-1 text-4xl font-bold">{stat.value}</p>
                <p className="font-semibold">{stat.label}</p>
                <p className="text-armstrong-grey-2 mt-1 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry expertise ────────────────────────────────────────── */}
      <section className="bg-armstrong-grey-3 py-16">
        <div className="container-armstrong">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                Industry Expertise
              </p>
              <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold">
                Specialized solutions across key industries
              </h2>
              <p className="text-armstrong-grey-1 mb-6 text-base leading-relaxed">
                We have specialized supply chain expertise across a number of industries — from
                food-grade distribution to industrial asset management.
              </p>
              <div className="flex flex-wrap gap-3">
                {INDUSTRIES.map((ind) => (
                  <span
                    key={ind}
                    className="border-armstrong-grey-3 text-armstrong-dark-blue rounded-full border bg-white px-5 py-2 text-sm font-medium shadow-sm"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/images/sc-port.webp"
                alt="Shipping containers at port — Armstrong global freight"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Armstrong ─────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container-armstrong text-center">
          <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
            Why Armstrong?
          </p>
          <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold">
            Three generations of going above and beyond
          </h2>
          <p className="text-armstrong-grey-1 mx-auto mb-8 max-w-2xl text-base leading-relaxed">
            Armstrong&apos;s culture is built on family values and a promise to give you exceptional
            quality service. We bring our family mentality to every service — if it&apos;s important
            to you, it&apos;s important to us.
          </p>
          <Link
            href="/about"
            className="text-armstrong-blue hover:text-armstrong-blue-hover font-semibold underline underline-offset-2"
          >
            More About Us →
          </Link>
        </div>
      </section>

      <CTABanner
        headline="Let's get your goods where they need to go."
        subhead="Our supply chain experts are ready to design a solution around your specific needs — not a one-size-fits-all contract."
        cta={{ label: 'Talk to an Expert', href: '/get-moving-with-armstrong?type=supply-chain' }}
        variant="blue"
      />
    </>
  );
}

const STATS = [
  { value: '500+', label: 'Cities covered', description: 'Nationwide reach' },
  { value: '49', label: 'States served', description: 'Coast to coast' },
  { value: '90%', label: 'U.S. coverage', description: 'Population reach' },
  { value: '65+', label: 'Years in logistics', description: 'Deep industry experience' },
] as const;

const INDUSTRIES = [
  'Food & Beverage',
  'Agriculture',
  'Healthcare',
  'Wine & Spirits',
  'Industrial',
] as const;
