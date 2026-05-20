import { Request, Response } from 'express';
import { getPipeline } from './pipeline.service';

export async function pipeline(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  const stages = await getPipeline(req.user.id);
  return res.json({ stages });
}
