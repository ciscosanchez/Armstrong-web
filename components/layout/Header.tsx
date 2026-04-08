import Link from 'next/link';
import Image from 'next/image';
import { MobileNav } from './MobileNav';

const NAV_LINKS = [
  { label: 'Commercial Moving', href: '/business-moving-services' },
  { label: 'Residential Moving', href: '/household-moving-services' },
  { label: 'Supply Chain Solutions', href: '/supply-chain-solutions' },
  { label: 'Locations', href: '/our-locations' },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav aria-label="Main navigation">
        <div className="container-armstrong flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" aria-label="The Armstrong Company — home" className="shrink-0">
            <Image
              src="/images/armstrong-logo-primary.png"
              alt="The Armstrong Company"
              width={180}
              height={40}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-armstrong-dark-blue hover:bg-armstrong-grey-3 hover:text-armstrong-blue rounded-md px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: phone + Search + CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Phone — hidden on small */}
            <a
              href="tel:+18002887396"
              className="text-armstrong-dark-blue hover:text-armstrong-blue hidden items-center gap-1.5 text-sm font-medium xl:flex"
              aria-label="Call Armstrong at 1.800.288.7396"
            >
              <PhoneIcon />
              1.800.288.7396
            </a>

            {/* Search icon */}
            <button
              aria-label="Search"
              className="text-armstrong-dark-blue hover:bg-armstrong-grey-3 hidden h-9 w-9 items-center justify-center rounded-md lg:flex"
            >
              <SearchIcon />
            </button>

            {/* CTA */}
            <Link
              href="/get-moving-with-armstrong"
              className="bg-armstrong-dark-blue hover:bg-armstrong-blue hidden rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors sm:block"
            >
              Get Started
            </Link>

            <MobileNav links={NAV_LINKS} />
          </div>
        </div>
      </nav>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
