import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface Props {
  params: Promise<{ market: string }>;
}

interface MarketData {
  city: string;
  county: string;
  headline: string;
  intro: string;
  services: string[];
  nearbyLocations: string[];
  phone: string;
}

const PA_MARKETS: Record<string, MarketData> = {
  'lancaster-pa': {
    city: 'Lancaster',
    county: 'Lancaster County',
    headline: 'Moving & Storage in Lancaster, PA',
    intro:
      "Armstrong's Lancaster location is our Pennsylvania headquarters — serving Lancaster County and the surrounding South Central PA region with residential, commercial, and supply chain services.",
    services: [
      'Local residential moving',
      'Long-distance moving',
      'Commercial office relocation',
      'Supply chain & warehousing',
      'Packing & crating',
      'Secure storage',
    ],
    nearbyLocations: ['York', 'Harrisburg', 'Reading', 'Lebanon', 'Mechanicsburg'],
    phone: '(800) 288-7396',
  },
  'york-pa': {
    city: 'York',
    county: 'York County',
    headline: 'Moving & Storage in York, PA',
    intro:
      'Armstrong serves the York, PA area from our Lancaster hub — bringing full residential and commercial moving services to York County and the surrounding communities.',
    services: [
      'Local residential moving',
      'Long-distance moving',
      'Commercial relocation',
      'Packing & storage',
      'Senior moving services',
    ],
    nearbyLocations: ['Lancaster', 'Harrisburg', 'Hanover', 'Red Lion'],
    phone: '(800) 288-7396',
  },
  'harrisburg-pa': {
    city: 'Harrisburg',
    county: 'Dauphin County',
    headline: 'Moving & Storage in Harrisburg, PA',
    intro:
      "Serving Pennsylvania's state capital and the greater Capital Region. Armstrong handles residential moves, government contractor relocations, and commercial moves throughout the Harrisburg metro.",
    services: [
      'Residential moving',
      'Government & contractor relocation',
      'Commercial moving',
      'Long-distance & interstate moves',
      'Storage solutions',
    ],
    nearbyLocations: ['Mechanicsburg', 'Carlisle', 'Hershey', 'Lebanon', 'Lancaster'],
    phone: '(800) 288-7396',
  },
  'reading-pa': {
    city: 'Reading',
    county: 'Berks County',
    headline: 'Moving & Storage in Reading, PA',
    intro:
      "Armstrong provides moving and storage services throughout Berks County. Our Reading-area clients benefit from our Lancaster hub's full fleet and experienced crews.",
    services: [
      'Local moves in Berks County',
      'Long-distance relocation',
      'Commercial moving',
      'Packing services',
      'Short & long-term storage',
    ],
    nearbyLocations: ['Lancaster', 'Allentown', 'Pottstown', 'Kutztown'],
    phone: '(800) 288-7396',
  },
  'mechanicsburg-pa': {
    city: 'Mechanicsburg',
    county: 'Cumberland County',
    headline: 'Moving & Storage in Mechanicsburg, PA',
    intro:
      'Armstrong serves Mechanicsburg and the greater Cumberland County area — a rapidly growing community just west of Harrisburg. Our teams handle everything from single-family home moves to full commercial relocations.',
    services: [
      'Residential moving',
      'Commercial relocation',
      'New construction moves',
      'Storage options',
      'Packing services',
    ],
    nearbyLocations: ['Harrisburg', 'Carlisle', 'Camp Hill', 'New Cumberland'],
    phone: '(800) 288-7396',
  },
  'lebanon-pa': {
    city: 'Lebanon',
    county: 'Lebanon County',
    headline: 'Moving & Storage in Lebanon, PA',
    intro:
      "Armstrong's Lancaster team serves Lebanon County for all types of residential and commercial moves. Trusted local service backed by national logistics capabilities.",
    services: [
      'Local residential moving',
      'Commercial moving',
      'Long-distance relocation',
      'Storage',
      'Packing & unpacking',
    ],
    nearbyLocations: ['Lancaster', 'Harrisburg', 'Hershey', 'Palmyra'],
    phone: '(800) 288-7396',
  },
};

export async function generateStaticParams() {
  return Object.keys(PA_MARKETS).map((market) => ({ market }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market } = await params;
  const data = PA_MARKETS[market];
  if (!data) return {};
  return {
    title: `${data.headline} | The Armstrong Company`,
    description: `Armstrong provides moving and storage services in ${data.city}, ${data.county}. Get a free quote from our local Pennsylvania team.`,
  };
}

export default async function PAMarketPage({ params }: Props) {
  const { market } = await params;
  const data = PA_MARKETS[market];
  if (!data) notFound();

  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Pennsylvania', href: '/pennsylvania' },
              { label: data.city },
            ]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold lg:text-5xl">{data.headline}</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-xl">
            Serving {data.city} and {data.county} with the care and reliability Armstrong is known
            for.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              {data.county}
            </p>
            <h2 className="text-armstrong-dark-blue mb-6 text-3xl font-semibold">
              Your local Armstrong team
            </h2>
            <p className="text-armstrong-grey-1 mb-6 leading-relaxed">{data.intro}</p>

            <h3 className="text-armstrong-dark-blue mb-4 font-semibold">Services in {data.city}</h3>
            <ul className="space-y-2">
              {data.services.map((svc) => (
                <li key={svc} className="text-armstrong-grey-1 flex items-center gap-2 text-sm">
                  <span className="bg-armstrong-blue/10 text-armstrong-blue flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs">
                    ✓
                  </span>
                  {svc}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {/* Contact card */}
            <div className="bg-armstrong-dark-blue rounded-xl p-8 text-white">
              <p className="text-armstrong-grey-2 mb-1 text-sm">
                Lancaster Hub — {data.city} Service
              </p>
              <p className="text-armstrong-blue text-2xl font-bold">
                <a href={`tel:${data.phone.replace(/\D/g, '')}`} className="hover:underline">
                  {data.phone}
                </a>
              </p>
              <p className="text-armstrong-grey-2 mt-3 text-sm">Mon–Fri 8am–6pm · Sat 9am–2pm</p>
              <a
                href="/get-moving-with-armstrong"
                className="bg-armstrong-blue mt-5 inline-block w-full rounded-md px-6 py-3 text-center font-semibold text-white hover:bg-[#0090d0]"
              >
                Get a Free Quote
              </a>
            </div>

            {/* Nearby markets */}
            <div className="border-armstrong-grey-3 rounded-xl border p-6">
              <p className="text-armstrong-dark-blue mb-3 text-sm font-semibold">
                We also serve nearby
              </p>
              <div className="flex flex-wrap gap-2">
                {data.nearbyLocations.map((loc) => (
                  <span
                    key={loc}
                    className="border-armstrong-grey-3 text-armstrong-grey-1 rounded-full border px-3 py-1 text-xs"
                  >
                    {loc}, PA
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline={`Ready to move in ${data.city}?`}
        subhead="Our Pennsylvania team responds same day. Get your free quote now."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
