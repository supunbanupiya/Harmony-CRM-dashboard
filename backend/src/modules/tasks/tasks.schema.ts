import { z } from 'zod';

export const createTaskSchema = z.object({
  clientId: z.number().optional().nullable(),
  title: z.string().min(2),
  description: z.string().optional().nullable(),
  status: z.enum(['todo', 'in_progress', 'completed']).default('todo'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string().optional().nullable()
});

export const updateStatusSchema = z.object({
  status: z.enum(['todo', 'in_progress', 'completed'])
});
