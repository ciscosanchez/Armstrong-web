import Link from 'next/link';

// Brand Architecture: Home | Business | Supply Chain (§1.4)
const SERVICES = [
  {
    id: 'home',
    label: 'Home',
    headline: 'You make it home. We make it happen.',
    description:
      "As a full-service global moving company, we can help you make the most of your next big move. Whether you're a new homeowner moving across town or relocating across the globe, count on us.",
    href: '/household-moving-services',
    cta: 'Residential Moving',
    icon: HomeIcon,
  },
  {
    id: 'business',
    label: 'Business',
    headline: "We're in the business of moving yours forward.",
    description:
      'Our wide range of commercial services includes everything you need to get up and running quickly — from moving and installation to technical support and decommissioning.',
    href: '/business-moving-services',
    cta: 'Commercial Moving',
    icon: BuildingIcon,
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain',
    headline: 'High touch, low maintenance.',
    description:
      'When business is moving quickly, you need a partner that can stay ahead of the curve. Our supply chain solutions cover everything from transportation to warehousing — all rooted in deep knowledge of your business.',
    href: '/supply-chain-solutions',
    cta: 'Supply Chain',
    icon: TruckIcon,
  },
] as const;

export function ServiceGrid() {
  return (
    <section className="py-20" aria-labelledby="services-heading">
      <div className="container-armstrong">
        <div className="mb-12 text-center">
          <h2
            id="services-heading"
            className="text-armstrong-dark-blue mb-4 text-3xl font-semibold lg:text-4xl"
          >
            Think beyond the box.
          </h2>
          <p className="text-armstrong-grey-1 mx-auto max-w-xl">
            Pack it. Store it. Ship it. Nail it. The Armstrong Company handles every step of your
            move — residential, commercial, or global supply chain.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group border-armstrong-grey-3 flex flex-col rounded-xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="bg-armstrong-grey-3 text-armstrong-blue group-hover:bg-armstrong-blue mb-5 flex h-12 w-12 items-center justify-center rounded-lg transition-colors group-hover:text-white">
                <service.icon />
              </div>
              <p className="text-armstrong-blue mb-2 text-xs font-semibold tracking-wider uppercase">
                {service.label}
              </p>
              <h3 className="text-armstrong-dark-blue mb-3 text-xl font-semibold">
                {service.headline}
              </h3>
              <p className="text-armstrong-grey-1 mb-6 flex-1 text-sm leading-relaxed">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="text-armstrong-blue hover:text-armstrong-blue-hover inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
              >
                Learn about {service.cta}
                <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}
