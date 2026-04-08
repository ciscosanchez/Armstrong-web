import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ServiceFeatureGrid } from '@/components/sections/ServiceFeatureGrid';

export const metadata: Metadata = {
  title: 'Supply Chain Solutions',
  description:
    'End-to-end supply chain solutions — transportation, warehousing, distribution, and logistics management. High touch, low maintenance. The Armstrong Company.',
};

const FEATURES = [
  {
    icon: '🚛',
    title: 'Transportation management',
    description:
      'Full truckload, LTL, flatbed, refrigerated — we match your freight to the right carrier, every time.',
  },
  {
    icon: '🏭',
    title: 'Warehousing & distribution',
    description:
      'Climate-controlled facilities nationwide. Pick, pack, and ship from our network or yours.',
  },
  {
    icon: '📊',
    title: 'Supply chain engineering',
    description:
      "We don't just move things — we help design the system that moves them most efficiently.",
  },
  {
    icon: '🔄',
    title: 'First & final mile',
    description:
      'From origin to destination, every handoff managed. White-glove final-mile delivery included.',
  },
  {
    icon: '🌐',
    title: 'Global freight',
    description:
      'Air, ocean, and ground across 150+ countries. Customs clearance, compliance, documentation handled.',
  },
  {
    icon: '💻',
    title: 'Technology & visibility',
    description:
      'Real-time tracking, reporting dashboards, and EDI integration. You see what we see.',
  },
] as const;

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Supply Chain' },
];

export default function SupplyChainPage() {
  return (
    <>
      <div className="bg-armstrong-dark-blue pt-8 pb-0">
        <div className="container-armstrong">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
        </div>
      </div>

      <Hero
        headline="High touch, low maintenance."
        subhead="When business is moving quickly, you need a partner that can stay ahead of the curve. Our supply chain solutions cover everything from transportation and distribution to warehousing and storage — all rooted in a deep knowledge of your business."
        primaryCta={{
          label: 'Talk to a Supply Chain Expert',
          href: '/get-moving-with-armstrong?type=supply-chain',
        }}
        secondaryCta={{ label: 'Learn More', href: '#supply-chain-features' }}
      />

      {/* Features */}
      <section id="supply-chain-features" className="py-20" aria-labelledby="sc-features-heading">
        <div className="container-armstrong">
          <div className="mb-12 max-w-2xl">
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Supply Chain Services
            </p>
            <h2
              id="sc-features-heading"
              className="text-armstrong-dark-blue mb-4 text-3xl font-semibold lg:text-4xl"
            >
              In it for the long haul — and all your other supply chain needs.
            </h2>
            <p className="text-armstrong-grey-1">
              The Armstrong Company is the global supply chain partner blending expert teams,
              industry-leading technology, and a global network of resources to help your business
              stay a step ahead.
            </p>
          </div>
          <ServiceFeatureGrid features={FEATURES} />
        </div>
      </section>

      {/* Value props */}
      <section className="border-armstrong-grey-3 bg-armstrong-dark-blue border-t py-16 text-white">
        <div className="container-armstrong">
          <h2 className="mb-10 text-center text-2xl font-semibold">
            A partnership built for performance
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} className="text-center">
                <p className="text-armstrong-blue mb-2 text-3xl font-bold">{prop.stat}</p>
                <p className="mb-1 font-semibold">{prop.title}</p>
                <p className="text-armstrong-grey-2 text-sm">{prop.description}</p>
              </div>
            ))}
          </div>
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

const VALUE_PROPS = [
  {
    stat: '150+',
    title: 'Countries served',
    description: 'Global reach with local expertise at every node.',
  },
  {
    stat: '65+',
    title: 'Years in logistics',
    description: 'Deep experience across every industry vertical.',
  },
  {
    stat: '1 point',
    title: 'Of contact',
    description: 'One dedicated expert managing your entire supply chain.',
  },
];
