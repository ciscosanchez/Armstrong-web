import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ServiceFeatureGrid } from '@/components/sections/ServiceFeatureGrid';

export const metadata: Metadata = {
  title: 'Residential Moving Services',
  description:
    'Our residential moving services include everything you need for a smooth move: packing, unpacking, storage, and valuation coverage. The Armstrong Company — est. 1957.',
};

const FEATURES = [
  {
    icon: '📦',
    title: 'Full-service packing',
    description:
      'Our crew handles everything — wrapping, boxing, labeling — so you can focus on your next chapter.',
  },
  {
    icon: '🚚',
    title: 'Local & long-distance moves',
    description:
      "Whether you're moving across the block or across the country, we've got the fleet and the team.",
  },
  {
    icon: '🗄️',
    title: 'Short & long-term storage',
    description:
      "Climate-controlled facilities in 33+ locations nationwide. Your things stay safe until you're ready.",
  },
  {
    icon: '🛋️',
    title: 'Furniture assembly & placement',
    description: "We don't just drop and run. We set up every room the way you want it.",
  },
  {
    icon: '🎹',
    title: 'Specialty items',
    description:
      'Pianos, antiques, artwork, wine collections — handled by specialists, not just movers.',
  },
  {
    icon: '🌍',
    title: 'International relocation',
    description:
      'Moving abroad? We coordinate customs, shipping, and destination services end-to-end.',
  },
] as const;

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Residential Moving' },
];

export default function HouseholdMovingPage() {
  return (
    <>
      <div className="bg-armstrong-dark-blue pt-8 pb-0">
        <div className="container-armstrong">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
        </div>
      </div>

      <Hero
        headline="You make it home. We make it happen."
        subhead="As a full-service global moving company, we help you make the most of your next big move. Whether you're a new homeowner moving across town or relocating across the globe, count on us to get personal and essential goods wherever they need to go."
        primaryCta={{
          label: 'Get a Free Quote',
          href: '/get-moving-with-armstrong?type=residential',
        }}
        secondaryCta={{ label: 'Ballpark Estimate', href: '/ballpark-estimate' }}
      />

      {/* Features */}
      <section className="py-20" aria-labelledby="residential-features-heading">
        <div className="container-armstrong">
          <div className="mb-12 max-w-2xl">
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Residential Services
            </p>
            <h2
              id="residential-features-heading"
              className="text-armstrong-dark-blue mb-4 text-3xl font-semibold lg:text-4xl"
            >
              Everything your move needs. Nothing it doesn&apos;t.
            </h2>
            <p className="text-armstrong-grey-1">
              We&apos;ve been in this business long enough to hear all the stories — promises that
              weren&apos;t kept, vendors that didn&apos;t listen. Those people didn&apos;t hire The
              Armstrong Company.
            </p>
          </div>
          <ServiceFeatureGrid features={FEATURES} />
        </div>
      </section>

      {/* Process */}
      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-20">
        <div className="container-armstrong">
          <h2 className="text-armstrong-dark-blue mb-10 text-center text-3xl font-semibold">
            How your move works
          </h2>
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

      <CTABanner
        headline="Your home is where our heart is."
        subhead="Let's make the most of your next move. Talk to an expert today."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong?type=residential' }}
        secondaryCta={{ label: 'Schedule a Survey', href: '/virtual-survey' }}
        variant="dark"
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
