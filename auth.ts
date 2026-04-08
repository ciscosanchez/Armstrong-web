import NextAuth from 'next-auth';
import MicrosoftEntraId from 'next-auth/providers/microsoft-entra-id';
import Resend from 'next-auth/providers/resend';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db/client';

// NextAuth v5 — Microsoft Entra ID (Azure AD) SSO + magic link fallback
// Only @goarmstrong.com accounts are allowed (enforced in signIn callback)
//
// Microsoft Entra ID setup:
//   Azure Portal → Entra ID → App Registrations → New Registration
//   Redirect URI: https://yourdomain.com/api/auth/callback/microsoft-entra-id
//   Set AUTH_MICROSOFT_ENTRA_ID_ID, AUTH_MICROSOFT_ENTRA_ID_SECRET,
//   and AUTH_MICROSOFT_ENTRA_ID_TENANT_ID in .env.local
//
// Magic link fallback:
//   Set RESEND_API_KEY in .env.local

const microsoftConfigured =
  process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
  process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET &&
  process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Primary: Microsoft Entra ID (Azure AD) SSO
    ...(microsoftConfigured
      ? [
          MicrosoftEntraId({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
            issuer: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID}/v2.0`,
          }),
        ]
      : []),
    // Fallback: email magic link via Resend
    Resend({
      from: 'Armstrong Admin <noreply@goarmstrong.com>',
      ...(process.env.RESEND_API_KEY ? { apiKey: process.env.RESEND_API_KEY } : {}),
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    signIn({ user }) {
      // Restrict to Armstrong email domain
      const email = user.email ?? '';
      return email.endsWith('@goarmstrong.com');
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
