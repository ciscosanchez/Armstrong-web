import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },
];

const nextConfig: NextConfig = {
  experimental: {
    // Enable React compiler for automatic memoization
    reactCompiler: false,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Sanity CDN
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  // Security headers on all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // 301 redirects for legacy WordPress URLs
  async redirects() {
    return [
      // Legacy WP pages → new routes
      {
        source: '/moving-services-lebanon-pa',
        destination: '/locations/lancaster',
        permanent: true,
      },
      // Add more as needed during migration
    ];
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

export default nextConfig;
