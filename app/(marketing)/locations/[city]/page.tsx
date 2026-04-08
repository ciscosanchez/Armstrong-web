import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLocationBySlug, getAllLocationSlugs } from '@/lib/locations/data';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTABanner } from '@/components/sections/CTABanner';

// ISR: regenerate location pages every 24 hours
export const revalidate = 86400;

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ city: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return { title: 'Location Not Found' };

  return {
    title: `Best ${location.city} Movers: Moving Services for Homes & Businesses`,
    description: `The Armstrong Company provides full-service residential and commercial moving in ${location.city}, ${location.state}. Get a free quote today. Call ${location.phone}.`,
    openGraph: {
      title: `${location.city} Moving Services — The Armstrong Company`,
      description: `Expert movers serving ${location.city} and surrounding areas since 1957.`,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/our-locations' },
    { label: `${location.city}, ${location.state}` },
  ];

  return (
    <>
      <LocalBusinessSchema location={location} />

      {/* Hero */}
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb items={breadcrumbs} variant="dark" />
          <h1 className="mt-6 text-4xl font-semibold text-balance lg:text-5xl">
            Best {location.city} Movers: Moving Services for Homes &amp; Businesses
          </h1>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/get-moving-with-armstrong?city=${location.slug}`}
              className="bg-armstrong-blue rounded-md px-6 py-3 font-semibold text-white hover:bg-[#0090d0]"
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:${location.phone.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '+1$1$2$3')}`}
              className="rounded-md border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Call {location.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-12">
        <div className="container-armstrong grid gap-8 md:grid-cols-3">
          {location.address.street && (
            <div>
              <h2 className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
                Address
              </h2>
              <address className="text-armstrong-grey-1 not-italic">
                {location.address.street}
                <br />
                {location.address.city}, {location.address.state} {location.address.zip}
              </address>
            </div>
          )}
          <div>
            <h2 className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Phone
            </h2>
            <a
              href={`tel:${location.phone.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '+1$1$2$3')}`}
              className="text-armstrong-dark-blue hover:text-armstrong-blue font-medium"
            >
              {location.phone}
            </a>
          </div>
          <div>
            <h2 className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Hours
            </h2>
            <p className="text-armstrong-grey-1">Monday–Friday, 8:00 AM – 5:00 PM</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-armstrong-grey-3 border-t py-12">
        <div className="container-armstrong">
          <h2 className="text-armstrong-dark-blue mb-6 text-2xl font-semibold">
            Services in {location.city}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {location.services.map((service) => (
              <li
                key={service}
                className="border-armstrong-grey-3 flex items-center gap-2 rounded-md border px-4 py-3 text-sm"
              >
                <span
                  className="bg-armstrong-blue h-2 w-2 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                {SERVICE_LABELS[service] ?? service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service areas */}
      {location.serviceAreas.length > 0 && (
        <section className="border-armstrong-grey-3 border-t py-12">
          <div className="container-armstrong">
            <h2 className="text-armstrong-dark-blue mb-4 text-2xl font-semibold">
              Areas We Serve Near {location.city}
            </h2>
            <p className="text-armstrong-grey-1 mb-4">
              The Armstrong Company serves {location.city} and surrounding communities including:
            </p>
            <ul className="flex flex-wrap gap-2">
              {location.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="border-armstrong-grey-3 text-armstrong-grey-1 rounded-full border px-3 py-1 text-sm"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABanner
        headline={`Ready to move in ${location.city}?`}
        subhead="Contact us today for your free quote. No pressure — just straight answers from experts."
        cta={{
          label: 'Get a Free Quote',
          href: `/get-moving-with-armstrong?city=${location.slug}`,
        }}
        secondaryCta={{ label: 'Ballpark Estimate', href: '/ballpark-estimate' }}
        variant="dark"
      />
    </>
  );
}

const SERVICE_LABELS: Record<string, string> = {
  residential: 'Residential Moving',
  commercial: 'Commercial Moving',
  'supply-chain': 'Supply Chain Solutions',
  'data-center': 'Data Center Logistics',
  storage: 'Storage Solutions',
  warehousing: 'Warehousing',
};
