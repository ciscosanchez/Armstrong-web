import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { StatsBar } from '@/components/sections/StatsBar';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Full-Service Moving, Storage and Logistics | The Armstrong Company',
  description:
    "Whether you're moving your household, your business, or your product, we do what it takes to get your goods where they need to go, across the block or around the globe.",
  alternates: {
    canonical: 'https://goarmstrong.com',
  },
  openGraph: {
    title: 'The Armstrong Company — Our world moves around you.',
    description: 'Full-service moving, storage & logistics since 1957. 33+ locations nationwide.',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Our world moves around you."
        subhead="Whether we're moving your household, your business, or your product, our expert team will partner with you to make the process as easy as it should be."
        primaryCta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        secondaryCta={{ label: 'Instant Estimate', href: '/ballpark-estimate' }}
        showSymbol
      />

      <StatsBar
        stats={[
          { value: '1957', label: 'Founded' },
          { value: '33+', label: 'Locations' },
          { value: '3', label: 'Generations' },
          { value: '50+', label: 'Years of trust' },
        ]}
      />

      <ServiceGrid />

      <CTABanner
        headline="Make your next move your best move."
        subhead="Talk to one of our moving experts today. No pressure, no platitudes — just straight answers."
        cta={{ label: 'Contact Us', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
