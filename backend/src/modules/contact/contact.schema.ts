import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().nullable(),
  message: z.string().min(10)
});
