import { z } from 'zod';

export const createCommunicationSchema = z.object({
  clientId: z.number(),
  channel: z.enum(['email', 'phone', 'meeting', 'whatsapp', 'note']).default('note'),
  subject: z.string().min(2),
  message: z.string().optional().nullable(),
  direction: z.enum(['inbound', 'outbound']).default('outbound')
});
