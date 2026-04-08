import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ServiceFeatureGrid } from '@/components/sections/ServiceFeatureGrid';

export const metadata: Metadata = {
  title: 'Commercial Moving Services',
  description:
    'Top-rated commercial moving services tailored to your business. Armstrong plans, coordinates, and manages every move down to the last detail — from office relocation to industrial equipment.',
};

const FEATURES = [
  {
    icon: '🏢',
    title: 'Office relocation',
    description:
      'Minimal downtime, maximum efficiency. We move your entire operation on your schedule.',
  },
  {
    icon: '🔧',
    title: 'Equipment installation',
    description:
      'IT infrastructure, lab equipment, industrial machinery — installed and operational, fast.',
  },
  {
    icon: '🗑️',
    title: 'Decommissioning services',
    description:
      'Retiring a location? We handle asset disposition, recycling, and responsible disposal.',
  },
  {
    icon: '🏥',
    title: 'Healthcare & lab moving',
    description:
      'Sensitive equipment, compliance requirements, zero tolerance for damage. We know the drill.',
  },
  {
    icon: '🏨',
    title: 'Hospitality & FF&E',
    description:
      'Hotel openings, renovations, and refurbishments — furniture, fixtures, and equipment installed on time.',
  },
  {
    icon: '🏛️',
    title: 'Government & education',
    description:
      'GSA-compliant processes, proper documentation, experienced crews. We work within your procurement framework.',
  },
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

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Commercial Moving' },
];

export default function BusinessMovingPage() {
  return (
    <>
      <div className="bg-armstrong-dark-blue pt-8 pb-0">
        <div className="container-armstrong">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
        </div>
      </div>

      <Hero
        headline="We're in the business of moving yours forward."
        subhead="Our wide range of commercial services includes everything you need to get up and running quickly — from moving and installation to technical support and decommissioning. Your project will be led by a team with deep industry expertise."
        primaryCta={{
          label: 'Get a Commercial Quote',
          href: '/get-moving-with-armstrong?type=commercial',
        }}
        secondaryCta={{ label: 'Schedule a Survey', href: '/virtual-survey' }}
      />

      {/* Features */}
      <section className="py-20" aria-labelledby="commercial-features-heading">
        <div className="container-armstrong">
          <div className="mb-12 max-w-2xl">
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Commercial Services
            </p>
            <h2
              id="commercial-features-heading"
              className="text-armstrong-dark-blue mb-4 text-3xl font-semibold lg:text-4xl"
            >
              Your time is money. We won&apos;t waste either.
            </h2>
            <p className="text-armstrong-grey-1">
              When you&apos;re moving any part of your business, time is critical. We make your job
              easy by managing it all — and our work reflects positively on your performance.
            </p>
          </div>
          <ServiceFeatureGrid features={FEATURES} />
        </div>
      </section>

      {/* Industries */}
      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong">
          <h2 className="text-armstrong-dark-blue mb-8 text-center text-2xl font-semibold">
            Industries we serve
          </h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((industry) => (
              <li
                key={industry}
                className="border-armstrong-grey-1 text-armstrong-dark-blue rounded-full border bg-white px-5 py-2 text-sm font-medium"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        headline="Let's take your business to the next level."
        subhead="The Armstrong Company plans, coordinates, and manages every move down to the last detail — ensuring you get from one space to the next without missing a beat."
        cta={{
          label: 'Get a Commercial Quote',
          href: '/get-moving-with-armstrong?type=commercial',
        }}
        variant="dark"
      />
    </>
  );
}
