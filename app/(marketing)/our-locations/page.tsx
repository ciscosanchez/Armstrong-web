import type { Metadata } from 'next';
import { LOCATIONS } from '@/lib/locations/data';
import { LocationMap } from '@/components/sections/LocationMap';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Armstrong Locations — 33+ Cities Nationwide',
  description:
    'The Armstrong Company operates a network of over 33 locations across the United States. Find your local Armstrong office for residential, commercial, and supply chain moving services.',
};

export default function OurLocationsPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
            Our Locations
          </p>
          <h1 className="mb-4 text-4xl font-semibold text-balance lg:text-5xl">
            33+ locations. One Armstrong.
          </h1>
          <p className="text-armstrong-grey-2 max-w-xl">
            We built our business in Memphis in 1957. Today, our nationwide network of local experts
            combines personalized attention and global reach — so wherever you&apos;re going,
            there&apos;s an Armstrong team ready to help.
          </p>
        </div>
      </section>

      <section className="py-12" aria-labelledby="locations-map-heading">
        <div className="container-armstrong">
          <h2 id="locations-map-heading" className="sr-only">
            Interactive location map
          </h2>
          <LocationMap locations={LOCATIONS} />
        </div>
      </section>

      <CTABanner
        headline="Don't see your city? We probably serve it."
        subhead="Our network reaches well beyond our 33 offices. Call us and we'll connect you with the right team."
        cta={{ label: 'Call 800-288-7396', href: 'tel:+18002887396' }}
        secondaryCta={{ label: 'Get a Quote', href: '/get-moving-with-armstrong' }}
        variant="light"
      />
    </>
  );
}
