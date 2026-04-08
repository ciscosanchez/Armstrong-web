import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BusinessMovingTabs } from '@/components/sections/BusinessMovingTabs';

export const metadata: Metadata = {
  title: 'Commercial Moving Services',
  description:
    'Top-rated commercial moving services tailored to your business. Armstrong plans, coordinates, and manages every move down to the last detail — from office relocation to industrial equipment.',
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Commercial Moving' },
];

export default function BusinessMovingPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue relative min-h-[480px] overflow-hidden text-white">
        <Image
          src="/images/biz-hero.png"
          alt="Armstrong commercial movers at work"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="container-armstrong relative py-20">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
          <h1 className="mt-6 max-w-2xl text-4xl leading-tight font-semibold lg:text-5xl">
            We&apos;re in the business of moving yours forward.
          </h1>
          <p className="text-armstrong-grey-2 mt-4 max-w-xl text-lg leading-relaxed">
            Our wide range of commercial services includes everything you need to get up and running
            quickly — from moving and installation to technical support and decommissioning. Your
            project will be led by a team with deep industry expertise.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/get-moving-with-armstrong?type=commercial"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
            >
              Get a Commercial Quote
            </Link>
            <Link
              href="#biz-tabs"
              className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Interactive service tabs ───────────────────────────────────── */}
      <div id="biz-tabs">
        <BusinessMovingTabs />
      </div>

      {/* ── Proof strip ───────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <h2 className="mb-2 text-center text-2xl font-semibold">
            Proven commercial moving performance
          </h2>
          <p className="text-armstrong-grey-2 mb-10 text-center text-base">
            From single-office moves to multi-site national rollouts
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

      {/* ── Industries ────────────────────────────────────────────────── */}
      <section className="bg-armstrong-grey-3 py-16">
        <div className="container-armstrong">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                Industries We Serve
              </p>
              <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold">
                Your industry. Your requirements. Our expertise.
              </h2>
              <p className="text-armstrong-grey-1 mb-6 text-base leading-relaxed">
                Armstrong has served businesses across every major sector. We understand
                compliance-sensitive environments, fast-paced technology moves, and the unique
                demands of healthcare and laboratory settings.
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
                src="/images/biz-office.jpg"
                alt="Armstrong commercial mover assembling office furniture"
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
            quality service. We bring that mentality to every commercial job — if it&apos;s
            important to your business, it&apos;s important to us.
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
        headline="Let's take your business to the next level."
        subhead="The Armstrong Company plans, coordinates, and manages every move down to the last detail — ensuring you get from one space to the next without missing a beat."
        cta={{
          label: 'Get a Commercial Quote',
          href: '/get-moving-with-armstrong?type=commercial',
        }}
        variant="blue"
      />
    </>
  );
}

const STATS = [
  { value: '65+', label: 'Years of service', description: 'Deep industry experience' },
  { value: '33+', label: 'Locations nationwide', description: 'Coast to coast' },
  { value: '1000s', label: 'Commercial moves', description: 'Completed annually' },
  { value: '24/7', label: 'Move support', description: 'After-hours crews available' },
] as const;

const INDUSTRIES = [
  'Healthcare',
  'Financial Services',
  'Education',
  'Government',
  'Hospitality',
  'Technology',
  'Legal',
  'Retail',
  'Industrial',
] as const;
