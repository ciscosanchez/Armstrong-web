import type { Metadata } from 'next';
import Image from 'next/image';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ArmstrongIcon } from '@/components/ui/ArmstrongIcon';
import type { ArmstrongIconName } from '@/components/ui/ArmstrongIcon';

export const metadata: Metadata = {
  title: 'Careers: Join the Armstrong Team',
  description:
    'Armstrong knows that you deserve an employer that has your back. Join our team in a multitude of locations across the country.',
};

const JOB_BOARD_URL =
  'https://recruiting2.ultipro.com/ARM1007ARCL/JobBoard/d9af2e13-d684-4470-9476-a2659f017437/?q=&o=postedDateDesc&w=&wc=&we=&wpst=';

export default function CareersPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue relative min-h-[420px] overflow-hidden text-white">
        <Image
          src="/images/careers-truck.png"
          alt="Armstrong moving truck"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="container-armstrong relative py-20">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} variant="dark" />
          <h1 className="mt-6 max-w-2xl text-4xl leading-tight font-semibold lg:text-5xl">
            Careers: Join the Armstrong Team!
          </h1>
          <p className="text-armstrong-grey-2 mt-4 max-w-xl text-lg leading-relaxed">
            Armstrong knows that you deserve an employer that has your back. We&apos;re always
            looking for driven, dedicated people to join our team.
          </p>
          <a
            href={JOB_BOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-armstrong-blue hover:bg-armstrong-blue-hover mt-8 inline-block rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </section>

      {/* ── Why Armstrong ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-armstrong">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                Why Armstrong
              </p>
              <h2 className="text-armstrong-dark-blue mb-6 text-3xl font-semibold lg:text-4xl">
                Our team members are much more than assets — they&apos;re the heart of our
                organization.
              </h2>
              <p className="text-armstrong-grey-1 mb-4 text-base leading-relaxed">
                Whether you&apos;re a contract driver, administrative personnel, or warehouse
                operator, our strong values, respect for others, support and collaboration, and
                entrepreneurial spirit mean anyone can succeed here.
              </p>
              <p className="text-armstrong-grey-1 mb-8 text-base leading-relaxed">
                We offer real career path potential, competitive compensation, and a team that
                genuinely has your back — every single day.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="border-armstrong-grey-3 rounded-xl border p-4">
                    <ArmstrongIcon name={b.icon} className="text-armstrong-blue mb-2 h-8 w-8" />
                    <p className="text-armstrong-dark-blue text-sm font-semibold">{b.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[480px] overflow-hidden rounded-2xl">
              <Image
                src="/images/careers-mover.png"
                alt="Armstrong employee at work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Employee Experience ───────────────────────────────────────── */}
      <section className="bg-armstrong-grey-3 py-20">
        <div className="container-armstrong">
          <div className="mb-12 text-center">
            <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
              Employee Experience
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold lg:text-4xl">
              Built on integrity. Driven by people.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {EXPERIENCE_CARDS.map((card) => (
              <div key={card.title} className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="bg-armstrong-blue/10 mb-5 flex h-14 w-14 items-center justify-center rounded-full">
                  <ArmstrongIcon name={card.icon} className="text-armstrong-blue h-8 w-8" />
                </div>
                <h3 className="text-armstrong-dark-blue mb-3 text-lg font-semibold">
                  {card.title}
                </h3>
                <p className="text-armstrong-grey-1 text-base leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Types ──────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-armstrong">
          <div className="mb-12 text-center">
            <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
              Explore Roles
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold lg:text-4xl">
              Find your fit at Armstrong
            </h2>
            <p className="text-armstrong-grey-1 mx-auto mt-4 max-w-xl text-base leading-relaxed">
              From the cab of a truck to the boardroom, we have opportunities across our entire
              operation.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAREER_TYPES.map((type) => (
              <div
                key={type.title}
                className="group border-armstrong-grey-3 relative overflow-hidden rounded-2xl border"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={type.image}
                    alt={type.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-armstrong-dark-blue mb-2 text-base font-semibold">
                    {type.title}
                  </h3>
                  <p className="text-armstrong-grey-1 text-sm leading-relaxed">{type.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Drive for Armstrong ───────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue py-20 text-white">
        <div className="container-armstrong">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                Drivers
              </p>
              <h2 className="mb-6 text-3xl font-semibold lg:text-4xl">Drive for Armstrong</h2>
              <p className="text-armstrong-grey-2 mb-4 text-base leading-relaxed">
                As an Armstrong van operator, you&apos;re not just a driver — you&apos;re a trusted
                professional representing our brand in communities across the country. We offer
                owner-operator and company driver opportunities with full support from our
                operations team.
              </p>
              <ul className="text-armstrong-grey-2 mb-8 space-y-3 text-base">
                {DRIVER_PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <span className="text-armstrong-blue mt-1 shrink-0" aria-hidden="true">
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href={JOB_BOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-armstrong-blue hover:bg-armstrong-blue-hover inline-block rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
              >
                View Driver Openings
              </a>
            </div>
            {/* Video embed — replace VIDEO_ID with the real YouTube ID when available */}
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/40">
              <Image
                src="/images/careers-semi.png"
                alt="Armstrong semi truck on the road"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://www.youtube.com/@TheArmstrongCompany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105"
                  aria-label="Watch Drive for Armstrong video"
                >
                  <svg
                    className="text-armstrong-dark-blue ml-1 h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Office / Culture photo break ─────────────────────────────── */}
      <section className="relative h-64 overflow-hidden lg:h-80">
        <Image
          src="/images/careers-office.png"
          alt="Armstrong office culture"
          fill
          className="object-cover"
        />
        <div className="bg-armstrong-dark-blue/50 absolute inset-0" />
        <div className="container-armstrong relative flex h-full items-center">
          <blockquote className="max-w-2xl">
            <p className="text-2xl leading-snug font-semibold text-white lg:text-3xl">
              &ldquo;At Armstrong, our culture isn&apos;t a perk — it&apos;s the foundation
              everything else is built on.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Open Positions ────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-armstrong">
          <div className="bg-armstrong-grey-3 rounded-2xl p-10 text-center lg:p-16">
            <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold">Open Positions</h2>
            <p className="text-armstrong-grey-1 mx-auto mb-8 max-w-xl text-base leading-relaxed">
              Browse current openings across all our locations. New positions are posted regularly —
              from drivers and warehouse operators to corporate and administrative roles.
            </p>
            <a
              href={JOB_BOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover inline-block rounded-full px-10 py-4 text-lg font-semibold text-white transition-colors"
            >
              View All Open Positions
            </a>
            <p className="text-armstrong-grey-2 mt-4 text-sm">
              Powered by UKG · listings updated in real time
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to join a team that moves the world?"
        subhead="Explore open roles across 33+ locations nationwide."
        cta={{ label: 'View Open Positions', href: JOB_BOARD_URL }}
        variant="dark"
      />
    </>
  );
}

const BENEFITS: { icon: ArmstrongIconName; title: string }[] = [
  { icon: 'protect-shield', title: 'Health & dental benefits' },
  { icon: 'bullseye-target', title: 'Career growth paths' },
  { icon: 'country', title: '33+ locations nationwide' },
  { icon: 'heads', title: 'Supportive team culture' },
  { icon: 'money-1', title: 'Competitive compensation' },
  { icon: 'gear-and-arrow', title: 'Entrepreneurial spirit' },
];

const EXPERIENCE_CARDS: { icon: ArmstrongIconName; title: string; body: string }[] = [
  {
    icon: 'trophy',
    title: 'Recognized excellence',
    body: 'Armstrong has been recognized as a top employer in the logistics and moving industry, with awards for safety, service, and employee satisfaction.',
  },
  {
    icon: 'globe',
    title: 'Nationwide opportunity',
    body: 'With 33+ locations across the US, your career can grow in the city you love or take you somewhere new. Transfers and promotions happen from within.',
  },
  {
    icon: 'thumbsup',
    title: 'Real support system',
    body: "Our operations teams, dispatch, and leadership are there when you need them. We don't just talk about support — we build it into our culture.",
  },
];

const CAREER_TYPES = [
  {
    title: 'Van Operators & Drivers',
    body: 'Owner-operator and company driver roles with consistent lanes and full back-office support.',
    image: '/images/careers-semi.png',
    alt: 'Armstrong semi truck',
  },
  {
    title: 'Moving & Warehouse',
    body: 'Movers, packers, drivers, and warehouse staff at locations across the country.',
    image: '/images/careers-warehouse.png',
    alt: 'Armstrong warehouse employee',
  },
  {
    title: 'Field Operations',
    body: 'Crew leaders, coordinators, and field supervisors ensuring every move is executed perfectly.',
    image: '/images/careers-mover.png',
    alt: 'Armstrong mover at work',
  },
  {
    title: 'Corporate & Admin',
    body: 'Sales, marketing, finance, HR, and leadership roles at our Memphis headquarters and regional offices.',
    image: '/images/careers-office.png',
    alt: 'Armstrong office team',
  },
];

const DRIVER_PERKS = [
  'Competitive pay with performance incentives',
  'Consistent freight — no forced dispatch',
  'Full support from our experienced operations team',
  'Modern, well-maintained equipment',
  'Health benefits and retirement options',
  'Opportunities to grow into leadership roles',
];
