import { z } from 'zod';

export const TrackingEventSchema = z.discriminatedUnion('event', [
  z.object({
    event: z.literal('page_view'),
    path: z.string().max(500),
    referrer: z.string().max(500).optional(),
  }),
  z.object({
    event: z.literal('cta_click'),
    ctaText: z.string().max(200),
    ctaPage: z.string().max(500),
    ctaHref: z.string().max(500).optional(),
  }),
  z.object({
    event: z.literal('form_start'),
    formId: z.string().max(100),
    formPage: z.string().max(500),
  }),
  z.object({
    event: z.literal('form_abandon'),
    formId: z.string().max(100),
    lastField: z.string().max(100),
    timeOnForm: z.number().int().min(0).optional(),
  }),
  z.object({
    event: z.literal('estimate_complete'),
    moveType: z.string().max(50),
    estimateLow: z.number().int().optional(),
    estimateHigh: z.number().int().optional(),
  }),
  z.object({
    event: z.literal('location_viewed'),
    city: z.string().max(100),
    slug: z.string().max(100),
  }),
  z.object({
    event: z.literal('phone_click'),
    phone: z.string().max(20),
    page: z.string().max(500),
  }),
  z.object({
    event: z.literal('chat_open'),
    page: z.string().max(500),
  }),
  z.object({
    event: z.literal('consent_accepted'),
    analytics: z.boolean(),
    marketing: z.boolean(),
  }),
  z.object({
    event: z.literal('consent_rejected'),
  }),
]);

export type TrackingEventInput = z.infer<typeof TrackingEventSchema>;
