import { Request, Response } from 'express';
import { createCommunicationSchema } from './communications.schema';
import { createCommunication, listCommunications } from './communications.service';

export async function getCommunications(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  const communications = await listCommunications(req.user.id);
  return res.json({ communications });
}

export async function postCommunication(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  try {
    const input = createCommunicationSchema.parse(req.body);
    const communication = await createCommunication(req.user.id, input);
    return res.status(201).json({ communication });
  } catch (err) {
    const error = err as Error;
    return res.status(400).json({ message: error.message || 'Communication creation failed.' });
  }
}
