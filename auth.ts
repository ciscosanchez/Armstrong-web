import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db/client';

// NextAuth v5 — Google OAuth (primary) + magic link via Resend (fallback)
// Only @goarmstrong.com addresses are allowed (enforced in signIn callback)
//
// Setup:
//   Google OAuth — Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs
//   Authorized redirect URI: https://yourdomain.com/api/auth/callback/google
//   Set AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET in .env.local
//
//   Magic link fallback — set RESEND_API_KEY in .env.local

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Primary: Google OAuth (only active when credentials are set)
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
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
      // Attach user id to session so server components can read it
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
