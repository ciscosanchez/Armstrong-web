import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db/client';

// NextAuth v5 — magic link via Resend email
// Only @goarmstrong.com addresses are allowed (enforced in signIn callback)

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
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
