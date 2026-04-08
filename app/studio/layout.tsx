import type { ReactNode } from 'react';

// Studio gets its own layout — no marketing header/footer, no consent banner
export const metadata = {
  title: 'Armstrong CMS Studio',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
