import { Request, Response } from 'express';
import { createClientSchema } from './clients.schema';
import { createClient, listClients } from './clients.service';

export async function getClients(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  const clients = await listClients(req.user.id);
  return res.json({ clients });
}

export async function postClient(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  try {
    const input = createClientSchema.parse(req.body);
    const client = await createClient(req.user.id, input);
    return res.status(201).json({ client });
  } catch (err) {
    const error = err as Error;
    return res.status(400).json({ message: error.message || 'Client creation failed.' });
  }
}
