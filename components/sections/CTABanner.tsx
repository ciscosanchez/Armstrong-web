import Link from 'next/link';

interface CTABannerProps {
  headline: string;
  subhead?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'dark' | 'blue' | 'light';
}

const VARIANT_STYLES = {
  dark: {
    section: 'bg-armstrong-dark-blue text-white',
    headline: 'text-white',
    subhead: 'text-armstrong-grey-2',
    primary: 'bg-armstrong-blue text-white hover:bg-[#0090d0]',
    secondary: 'border border-white/30 text-white hover:bg-white/10',
  },
  blue: {
    section: 'bg-armstrong-blue text-white',
    headline: 'text-white',
    subhead: 'text-white/80',
    primary: 'bg-armstrong-dark-blue text-white hover:bg-[#003355]',
    secondary: 'border border-white/30 text-white hover:bg-white/10',
  },
  light: {
    section: 'bg-armstrong-grey-3 text-armstrong-dark-blue',
    headline: 'text-armstrong-dark-blue',
    subhead: 'text-armstrong-grey-1',
    primary: 'bg-armstrong-blue text-white hover:bg-[#0090d0]',
    secondary: 'border border-armstrong-grey-1 text-armstrong-dark-blue hover:bg-armstrong-grey-3',
  },
} as const;

export function CTABanner({
  headline,
  subhead,
  cta,
  secondaryCta,
  variant = 'dark',
}: CTABannerProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <section className={`${styles.section} py-16`} aria-label="Call to action">
      <div className="container-armstrong text-center">
        <h2 className={`mb-4 text-3xl font-semibold text-balance lg:text-4xl ${styles.headline}`}>
          {headline}
        </h2>
        {subhead && (
          <p className={`mx-auto mb-8 max-w-xl text-pretty ${styles.subhead}`}>{subhead}</p>
        )}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={cta.href}
            className={`rounded-md px-7 py-3.5 font-semibold transition-colors ${styles.primary}`}
          >
            {cta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className={`rounded-md px-7 py-3.5 font-semibold transition-colors ${styles.secondary}`}
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
