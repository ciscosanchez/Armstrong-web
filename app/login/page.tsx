import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Armstrong',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-armstrong-blue text-xs font-semibold tracking-wider uppercase">
            Armstrong Admin
          </p>
          <h1 className="text-armstrong-dark-blue mt-1 text-2xl font-bold">Sign in</h1>
        </div>

        {/* NextAuth magic-link / email sign-in form */}
        <form action="/api/auth/signin/email" method="POST" className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@goarmstrong.com"
              className="focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
            />
          </div>

          {/* CSRF token injected by NextAuth */}
          <input name="csrfToken" type="hidden" />
          <input name="callbackUrl" type="hidden" value="/dashboard/leads" />

          <button
            type="submit"
            className="bg-armstrong-blue w-full rounded-lg py-3 font-semibold text-white hover:bg-[#0090d0]"
          >
            Send magic link
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Only @goarmstrong.com accounts are authorized.
        </p>
      </div>
    </div>
  );
}
