import { Request, Response } from 'express';
import { loginSchema, signupSchema } from './auth.schema';
import { getCurrentUser, loginUser, signupUser } from './auth.service';

export async function signup(req: Request, res: Response) {
  try {
    const input = signupSchema.parse(req.body);
    const result = await signupUser(input);
    return res.status(201).json(result);
  } catch (err) {
    const error = err as Error & { status?: number };
    return res.status(error.status || 400).json({ message: error.message || 'Signup failed.' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const input = loginSchema.parse(req.body);
    const result = await loginUser(input);
    return res.json(result);
  } catch (err) {
    const error = err as Error & { status?: number };
    return res.status(error.status || 400).json({ message: error.message || 'Login failed.' });
  }
}

export async function me(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  const user = await getCurrentUser(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });
  return res.json({ user });
}
