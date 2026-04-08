'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavChild {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href?: string;
  children?: readonly NavChild[];
}

interface MobileNavProps {
  links: readonly NavLink[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const close = () => {
    setIsOpen(false);
    setOpenGroup(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        className="text-armstrong-dark-blue hover:bg-armstrong-grey-3 flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
      >
        {isOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* Slide-in panel */}
      <nav
        id="mobile-nav-panel"
        aria-label="Mobile navigation"
        className={[
          'fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-white shadow-xl transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="text-armstrong-dark-blue font-semibold">Menu</span>
          <button
            onClick={close}
            aria-label="Close menu"
            className="hover:bg-armstrong-grey-3 flex h-8 w-8 items-center justify-center rounded-md"
          >
            <XIcon />
          </button>
        </div>

        <ul className="px-3 pb-6">
          {links.map((link) =>
            link.children ? (
              <li key={link.label}>
                <button
                  onClick={() => setOpenGroup((g) => (g === link.label ? null : link.label))}
                  className="text-armstrong-dark-blue hover:bg-armstrong-grey-3 flex w-full items-center justify-between rounded-md px-3 py-3 font-medium"
                  aria-expanded={openGroup === link.label}
                >
                  {link.label}
                  <ChevronIcon open={openGroup === link.label} />
                </button>
                {openGroup === link.label && (
                  <ul className="border-armstrong-grey-3 mb-1 ml-3 border-l-2 pl-3">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          className="text-armstrong-dark-blue hover:bg-armstrong-grey-3 hover:text-armstrong-blue block rounded-md px-3 py-2.5 text-sm"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href ?? '/'}
                  onClick={close}
                  className="text-armstrong-dark-blue hover:bg-armstrong-grey-3 block rounded-md px-3 py-3 font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}

          {/* CTA */}
          <li className="mt-4 px-3">
            <Link
              href="/get-moving-with-armstrong"
              onClick={close}
              className="bg-armstrong-dark-blue hover:bg-armstrong-blue block rounded-full px-5 py-3 text-center font-semibold text-white"
            >
              Get Started
            </Link>
          </li>
          <li className="mt-2 px-3">
            <a
              href="tel:+18002887396"
              className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 block rounded-md border px-5 py-3 text-center font-medium"
            >
              800-288-7396
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}
