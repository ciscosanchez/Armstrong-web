import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="relative w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-14 items-center border-b border-gray-200 px-4">
          <Link href="/dashboard/leads" className="text-armstrong-dark-blue text-sm font-bold">
            Armstrong Admin
          </Link>
        </div>
        <nav className="space-y-1 p-3">
          <NavItem href="/dashboard/leads" label="Leads" />
          <NavItem href="/dashboard/analytics" label="Analytics" />
        </nav>
        <div className="absolute bottom-0 w-56 border-t border-gray-200 p-3">
          <Link
            href="/api/auth/signout"
            className="block rounded px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
          >
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hover:text-armstrong-dark-blue block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      {label}
    </Link>
  );
}
