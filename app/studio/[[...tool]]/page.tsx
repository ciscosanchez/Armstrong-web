'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

// This page renders the full Sanity Studio at /studio
// Protected by basic auth middleware in production (see middleware.ts)
export default function StudioPage() {
  return <NextStudio config={config} />;
}
