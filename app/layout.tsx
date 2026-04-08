import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { uncutSans } from '@/lib/fonts';
import { TrackingProvider } from '@/components/tracking/TrackingProvider';
import { ConsentBanner } from '@/components/tracking/ConsentBanner';
import { ChatWidget } from '@/components/layout/ChatWidget';
import { EasterEgg } from '@/components/EasterEgg';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://goarmstrong.com'),
  title: {
    default: 'Full-Service Moving, Storage and Logistics | The Armstrong Company',
    template: '%s | The Armstrong Company',
  },
  description:
    "Whether you're moving your household, your business, or your product, we do what it takes to get your goods where they need to go.",
  keywords: ['moving', 'storage', 'logistics', 'relocation', 'supply chain', 'Armstrong'],
  openGraph: {
    type: 'website',
    siteName: 'The Armstrong Company',
    locale: 'en_US',
    // Default OG image — place your 1200×630 social card at public/og-default.jpg
    // images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thearmstrongco',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  return (
    <html lang="en" className={uncutSans.variable}>
      <body className="min-h-screen font-sans antialiased">
        <TrackingProvider>
          {children}
          <ConsentBanner />
          <ChatWidget />
          <EasterEgg />
        </TrackingProvider>
        {ga4Id && <GoogleAnalytics gaId={ga4Id} />}
      </body>
    </html>
  );
}
