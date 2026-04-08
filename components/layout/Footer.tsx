import Link from 'next/link';
import Image from 'next/image';

const SERVICES_LINKS = [
  { label: 'Residential Moving', href: '/household-moving-services' },
  { label: 'Commercial Moving', href: '/business-moving-services' },
  { label: 'Supply Chain Solutions', href: '/supply-chain-solutions' },
  { label: 'Data Center Logistics', href: '/data-center-logistics-services' },
  { label: 'Charlotte Warehousing', href: '/charlotte-warehousing-services' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Safety', href: '/safety' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Resources', href: '/resources' },
  { label: 'Driver Portal', href: '/driver-portal' },
];

const TOOLS_LINKS = [
  { label: 'Get a Quote', href: '/get-moving-with-armstrong' },
  { label: 'Ballpark Estimate', href: '/ballpark-estimate' },
  { label: 'Virtual Survey', href: '/virtual-survey' },
  { label: 'Supplies Estimator', href: '/supplies-estimator' },
  { label: 'Financing', href: '/financing' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-armstrong-dark-blue text-white" aria-label="Site footer">
      <div className="container-armstrong py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" aria-label="The Armstrong Company — home">
              <Image
                src="/images/armstrong-logo-primary.png"
                alt="The Armstrong Company"
                width={160}
                height={36}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-armstrong-grey-2 mt-4 text-sm leading-relaxed">
              Our world moves around you.
            </p>
            <address className="mt-6 not-italic">
              <p className="text-armstrong-grey-2 text-sm">
                8275 Tournament Drive, Suite 200
                <br />
                Memphis, TN 38125
              </p>
              <a
                href="tel:+18002887396"
                className="hover:text-armstrong-light-blue mt-3 block text-sm font-medium text-white"
              >
                800-288-7396
              </a>
              <a
                href="mailto:info@goarmstrong.com"
                className="text-armstrong-grey-2 mt-1 block text-sm hover:text-white"
              >
                info@goarmstrong.com
              </a>
            </address>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              <SocialLink href="https://www.facebook.com/thearmstrongcompany" label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/company/goarmstrong/" label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/thearmstrongcompany/" label="Instagram">
                <InstagramIcon />
              </SocialLink>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-armstrong-grey-2 mb-4 text-sm font-semibold tracking-wider uppercase">
              Services
            </h3>
            <ul className="space-y-2">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-armstrong-grey-2 text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-armstrong-grey-2 mb-4 text-sm font-semibold tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-armstrong-grey-2 text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-armstrong-grey-2 mb-4 text-sm font-semibold tracking-wider uppercase">
              Get Moving
            </h3>
            <ul className="space-y-2">
              {TOOLS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-armstrong-grey-2 text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/our-locations"
              className="text-armstrong-grey-2 mt-6 block text-sm transition-colors hover:text-white"
            >
              33+ locations nationwide →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-armstrong text-armstrong-grey-2 flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          {/* Legal name required per brand guidelines §2.10 */}
          <p>© {currentYear} The Armstrong Company. Est. 1957. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/crown-privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/crown-privacy-policy#ccpa" className="hover:text-white">
              CA Privacy Rights
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-armstrong-grey-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:text-white"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        ry="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}
