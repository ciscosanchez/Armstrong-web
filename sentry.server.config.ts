import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Lower sample rate on server — high-traffic API routes would be expensive
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.NODE_ENV,

  // Capture unhandled promise rejections and uncaught exceptions
  integrations: [Sentry.prismaIntegration()],
});
