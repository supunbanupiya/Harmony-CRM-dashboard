import { Request, Response } from 'express';
import { contactSchema } from './contact.schema';
import { saveContactMessage } from './contact.service';

export async function contact(req: Request, res: Response) {
  try {
    const input = contactSchema.parse(req.body);
    const message = await saveContactMessage(input);
    return res.status(201).json({ message: 'Contact message received.', data: message });
  } catch (err) {
    const error = err as Error;
    return res.status(400).json({ message: error.message || 'Contact message failed.' });
  }
}
