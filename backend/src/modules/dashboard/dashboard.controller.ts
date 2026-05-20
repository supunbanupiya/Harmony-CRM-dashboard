import { Request, Response } from 'express';
import { getDashboardSummary } from './dashboard.service';

export async function summary(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  const data = await getDashboardSummary(req.user.id);
  return res.json(data);
}
