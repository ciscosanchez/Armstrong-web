import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  headline: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  showSymbol?: boolean;
}

export function Hero({
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  showSymbol = false,
}: HeroProps) {
  return (
    <section
      className="bg-armstrong-dark-blue relative min-h-[600px] overflow-hidden"
      aria-label="Hero"
      style={{
        backgroundImage: !imageSrc
          ? 'linear-gradient(135deg, #00263F 0%, #003d5c 50%, #00263F 100%)'
          : undefined,
      }}
    >
      {/* Background image — only rendered when a real image is provided */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt ?? ''}
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
          unoptimized={imageSrc.endsWith('.svg')}
        />
      )}
      {/* Decorative gradient overlay */}
      <div className="from-armstrong-dark-blue/80 to-armstrong-blue/10 absolute inset-0 bg-gradient-to-br via-transparent" />

      {/* Symbol watermark — right-anchored, covers ~85% of hero height */}
      {showSymbol && (
        <div
          className="pointer-events-none absolute top-1/2 left-[15%] -translate-y-1/2 select-none"
          aria-hidden="true"
          style={{ width: '75%', aspectRatio: '1' }}
        >
          <Image
            src="/images/armstrong-symbol.png"
            alt=""
            fill
            className="object-contain opacity-[0.06] brightness-0 invert"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="container-armstrong relative z-10 flex min-h-[600px] items-center py-20">
        {showSymbol ? (
          /* Text left, symbol is in the background */
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl leading-tight font-semibold text-balance text-white lg:text-6xl">
              {headline}
            </h1>
            <p className="text-armstrong-grey-2 mb-8 max-w-xl text-lg leading-relaxed text-pretty">
              {subhead}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryCta.href}
                className="bg-armstrong-blue rounded-md px-7 py-3.5 text-center font-semibold text-white transition-colors hover:bg-[#0090d0] focus-visible:outline-2"
              >
                {primaryCta.label}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-md border border-white/30 px-7 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        ) : (
          /* Single-column default */
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl leading-tight font-semibold text-balance text-white lg:text-6xl">
              {headline}
            </h1>
            <p className="text-armstrong-grey-2 mb-8 max-w-xl text-lg leading-relaxed text-pretty">
              {subhead}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryCta.href}
                className="bg-armstrong-blue rounded-md px-7 py-3.5 text-center font-semibold text-white transition-colors hover:bg-[#0090d0] focus-visible:outline-2"
              >
                {primaryCta.label}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-md border border-white/30 px-7 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
