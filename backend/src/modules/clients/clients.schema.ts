import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  status: z.enum(['lead', 'active', 'at_risk', 'won', 'lost']).default('lead'),
  value: z.number().nonnegative().default(0),
  source: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
});
