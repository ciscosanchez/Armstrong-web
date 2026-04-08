import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ResidentialMovingTabs } from '@/components/sections/ResidentialMovingTabs';

export const metadata: Metadata = {
  title: 'Residential Moving Services',
  description:
    'Our residential moving services include everything you need for a smooth move: packing, unpacking, storage, and valuation coverage. The Armstrong Company — est. 1957.',
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Residential Moving' },
];

export default function HouseholdMovingPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue relative min-h-[480px] overflow-hidden text-white">
        <Image
          src="/images/res-hero.jpg"
          alt="Armstrong residential movers"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="container-armstrong relative py-20">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
          <h1 className="mt-6 max-w-2xl text-4xl leading-tight font-semibold lg:text-5xl">
            You make it home. We make it happen.
          </h1>
          <p className="text-armstrong-grey-2 mt-4 max-w-xl text-lg leading-relaxed">
            As a full-service global moving company, we help you make the most of your next big
            move. Whether you&apos;re a new homeowner moving across town or relocating across the
            globe, count on us to get your personal and essential goods wherever they need to go.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/get-moving-with-armstrong?type=residential"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="#res-tabs"
              className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Interactive service tabs ───────────────────────────────────── */}
      <div id="res-tabs">
        <ResidentialMovingTabs />
      </div>

      {/* ── How your move works ───────────────────────────────────────── */}
      <section className="bg-armstrong-grey-3 py-20">
        <div className="container-armstrong">
          <div className="mb-12 text-center">
            <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
              The Process
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold">How your move works</h2>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title} className="rounded-xl bg-white p-6 shadow-sm">
                <span className="bg-armstrong-blue mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-armstrong-dark-blue mb-2 font-semibold">{step.title}</h3>
                <p className="text-armstrong-grey-1 text-sm">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Certifications & memberships ─────────────────────────────── */}
      <section className="py-16">
        <div className="container-armstrong">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative h-72 overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/images/res-longdist2.png"
                alt="Armstrong long-distance moving truck"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                Certified & Accredited
              </p>
              <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold">
                Moving you with the highest standards in the industry
              </h2>
              <p className="text-armstrong-grey-1 mb-6 text-base leading-relaxed">
                Armstrong holds memberships and certifications across the globe — ensuring your move
                meets rigorous quality, compliance, and safety standards wherever you&apos;re
                headed.
              </p>
              <div className="flex flex-wrap gap-3">
                {CERTIFICATIONS.map((cert) => (
                  <span
                    key={cert}
                    className="border-armstrong-grey-3 text-armstrong-dark-blue rounded-full border bg-white px-5 py-2 text-sm font-medium shadow-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof strip ───────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
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

      <CTABanner
        headline="Your home is where our heart is."
        subhead="Let's make the most of your next move. Talk to an expert today."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong?type=residential' }}
        secondaryCta={{ label: 'Schedule a Survey', href: '/virtual-survey' }}
        variant="blue"
      />
    </>
  );
}

const PROCESS_STEPS = [
  {
    title: 'Get a quote',
    description:
      "Tell us about your move — where, when, and what. We'll give you a straight answer on cost.",
  },
  {
    title: 'Schedule a survey',
    description:
      'An expert visits (in person or virtually) to understand every detail of your move.',
  },
  {
    title: 'We handle everything',
    description:
      'Packing, loading, transport, unloading — our crew manages it all on your timeline.',
  },
  {
    title: 'Settle in',
    description: 'We unpack, assemble, and place. You just decide where things go.',
  },
];

const CERTIFICATIONS = [
  'FIDI Certified',
  'IAMX Member',
  'LACMA Member',
  'Worldwide ERC Member',
  'CTPAT Certified',
  'FAIM Accredited',
  'ISO 9001 Certified',
  'ProMover Member',
] as const;

const STATS = [
  { value: '65+', label: 'Years of service', description: 'Est. 1957' },
  { value: '33+', label: 'Locations nationwide', description: 'Wherever you are' },
  { value: '50K+', label: 'Families moved', description: 'And counting' },
  { value: '4.8★', label: 'Customer rating', description: 'Award-winning service' },
] as const;
