import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ServiceFeatureGrid } from '@/components/sections/ServiceFeatureGrid';

export const metadata: Metadata = {
  title: 'Data Center Logistics Services',
  description:
    'Where high-security meets white-glove delivery. Armstrong serves as your dedicated, single partner from transport to placement — built to safeguard your most critical IT assets.',
};

const FEATURES = [
  {
    icon: '🔒',
    title: 'Secure transport',
    description:
      'GPS-tracked, climate-controlled vehicles with chain-of-custody documentation from pickup to placement.',
  },
  {
    icon: '🤍',
    title: 'White-glove handling',
    description:
      'Anti-static packaging, ESD-safe protocols, and trained technicians for every piece of equipment.',
  },
  {
    icon: '🔌',
    title: 'Rack & stack installation',
    description:
      'Full cabinet installation, cable management, and equipment placement — ready for power-on.',
  },
  {
    icon: '📋',
    title: 'Asset management',
    description:
      'Barcoded tracking, audit reports, and chain-of-custody documentation for compliance requirements.',
  },
  {
    icon: '♻️',
    title: 'Decommissioning & ITAD',
    description:
      'Certified data destruction, responsible recycling, and disposition — fully documented.',
  },
  {
    icon: '🏗️',
    title: 'Data center migration',
    description:
      "End-to-end migration planning and execution. We've moved hundreds of data centers without downtime.",
  },
] as const;

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Data Center Logistics' },
];

export default function DataCenterPage() {
  return (
    <>
      <div className="bg-armstrong-dark-blue pt-8 pb-0">
        <div className="container-armstrong">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
        </div>
      </div>

      <Hero
        headline="Where high-security meets white-glove delivery."
        subhead="Armstrong serves as your dedicated, single partner from transport to placement — built to safeguard your most critical IT assets. One call, one team, one accountable partner."
        primaryCta={{
          label: 'Talk to a Data Center Expert',
          href: '/get-moving-with-armstrong?type=data-center',
        }}
        secondaryCta={{ label: 'Our Capabilities', href: '#data-center-features' }}
      />

      {/* Trust bar */}
      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-b py-8">
        <div className="container-armstrong">
          <ul className="text-armstrong-grey-1 flex flex-wrap justify-center gap-8 text-sm font-medium">
            {[
              'Chain-of-custody documentation',
              'ESD-safe protocols',
              'GPS-tracked transport',
              'Certified data destruction',
              'Single point of contact',
              'Zero-downtime migrations',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="bg-armstrong-green-1 h-2 w-2 rounded-full" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section id="data-center-features" className="py-20" aria-labelledby="dc-features-heading">
        <div className="container-armstrong">
          <div className="mb-12 max-w-2xl">
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Data Center Services
            </p>
            <h2
              id="dc-features-heading"
              className="text-armstrong-dark-blue mb-4 text-3xl font-semibold lg:text-4xl"
            >
              Your most critical assets deserve more than a moving truck.
            </h2>
            <p className="text-armstrong-grey-1">
              We&apos;ve built a specialized practice around data center logistics — with trained
              technicians, purpose-built equipment, and documented procedures that meet the
              requirements of even the most security-conscious organizations.
            </p>
          </div>
          <ServiceFeatureGrid features={FEATURES} />
        </div>
      </section>

      <CTABanner
        headline="Ready to move your data center?"
        subhead="Let's talk about your timeline, your assets, and your compliance requirements. We'll build a plan that works."
        cta={{
          label: 'Get a Data Center Quote',
          href: '/get-moving-with-armstrong?type=data-center',
        }}
        variant="dark"
      />
    </>
  );
}
