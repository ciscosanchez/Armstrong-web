import { z } from 'zod';

export const ContactFormSchema = z.object({
  type: z.enum(['residential', 'commercial', 'supply-chain', 'data-center'], {
    errorMap: () => ({ message: 'Please select a move type' }),
  }),
  firstName: z.string().min(1, 'First name is required').max(100, 'First name is too long').trim(),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name is too long').trim(),
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/, 'Please enter a valid phone number')
    .trim(),
  originZip: z
    .string()
    .regex(/^\d{5}$/, 'Origin ZIP must be 5 digits')
    .optional()
    .or(z.literal('')),
  destZip: z
    .string()
    .regex(/^\d{5}$/, 'Destination ZIP must be 5 digits')
    .optional()
    .or(z.literal('')),
  moveDate: z.string().datetime({ message: 'Invalid move date' }).optional().or(z.literal('')),
  notes: z.string().max(2000, 'Notes must be under 2000 characters').optional(),
  // Honeypot — must be empty (bot detection)
  _website: z.literal('').optional(),
  // Cloudflare Turnstile token (required)
  cfTurnstileResponse: z.string().min(1, 'Bot verification required'),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// ──────────────────────────────────────────────
// Virtual Survey
// ──────────────────────────────────────────────

export const SurveyFormSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/)
    .trim(),
  moveType: z.enum(['residential', 'commercial']),
  surveyType: z.enum(['virtual', 'in-person']),
  preferredDate: z.string().datetime(),
  preferredTimeWindow: z.enum(['morning', 'afternoon', 'flexible']),
  notes: z.string().max(1000).optional(),
  cfTurnstileResponse: z.string().min(1),
});

export type SurveyFormInput = z.infer<typeof SurveyFormSchema>;

// ──────────────────────────────────────────────
// Credit Application
// ──────────────────────────────────────────────

export const CreditApplicationSchema = z.object({
  companyName: z.string().min(1).max(200).trim(),
  ein: z
    .string()
    .regex(/^\d{2}-\d{7}$/, 'EIN format: XX-XXXXXXX')
    .trim(),
  annualRevenue: z.enum(['under-1m', '1m-5m', '5m-25m', '25m+']),
  yearsInBusiness: z.number().int().min(0).max(200),
  contactFirstName: z.string().min(1).max(100).trim(),
  contactLastName: z.string().min(1).max(100).trim(),
  contactEmail: z.string().email().toLowerCase().trim(),
  contactPhone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/)
    .trim(),
  creditLimit: z.number().int().min(1000).max(1_000_000),
  cfTurnstileResponse: z.string().min(1),
});

export type CreditApplicationInput = z.infer<typeof CreditApplicationSchema>;
