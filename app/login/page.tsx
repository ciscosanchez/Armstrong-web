import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Armstrong',
  robots: { index: false, follow: false },
};

const MS_ENABLED = !!(
  process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
  process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET &&
  process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID
);

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

        {/* Microsoft SSO — shown when Entra ID credentials are configured */}
        {MS_ENABLED && (
          <form action="/api/auth/signin/microsoft-entra-id" method="POST" className="mb-4">
            <input name="callbackUrl" type="hidden" value="/dashboard/leads" />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <MicrosoftIcon />
              Continue with Microsoft
            </button>
          </form>
        )}

        {MS_ENABLED && (
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">or use magic link</span>
            </div>
          </div>
        )}

        {/* Magic link fallback */}
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
          <input name="csrfToken" type="hidden" />
          <input name="callbackUrl" type="hidden" value="/dashboard/leads" />
          <button
            type="submit"
            className="bg-armstrong-blue hover:bg-armstrong-blue-hover w-full rounded-lg py-3 font-semibold text-white"
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

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}
