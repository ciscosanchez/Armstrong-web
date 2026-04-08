import { z } from 'zod';

export const HOME_SIZE_TIERS = ['studio', '1br', '2br', '3br', '4br+', 'office'] as const;
export type HomeSizeTier = (typeof HOME_SIZE_TIERS)[number];

export const EstimateSchema = z.object({
  moveType: z.enum(['residential', 'commercial', 'supply-chain']),
  originZip: z.string().regex(/^\d{5}$/, 'Enter a valid 5-digit ZIP'),
  destZip: z.string().regex(/^\d{5}$/, 'Enter a valid 5-digit ZIP'),
  moveDate: z.string().datetime({ message: 'Select a move date' }).optional().or(z.literal('')),
  homeSizeTier: z.enum(HOME_SIZE_TIERS),
  addOns: z.object({
    packing: z.boolean(),
    storage: z.boolean(),
    piano: z.boolean(),
    vehicle: z.boolean(),
    art: z.boolean(),
  }),
});

export type EstimateInput = z.infer<typeof EstimateSchema>;

export interface EstimateResult {
  low: number;
  high: number;
  currency: 'USD';
  distanceMiles: number;
  isPeakSeason: boolean;
  disclaimer: string;
}
