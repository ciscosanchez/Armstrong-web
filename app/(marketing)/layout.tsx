import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <OrganizationSchema />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
