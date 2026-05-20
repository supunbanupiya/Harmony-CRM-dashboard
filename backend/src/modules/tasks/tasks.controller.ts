import { Request, Response } from 'express';
import { createTaskSchema, updateStatusSchema } from './tasks.schema';
import { createTask, listTasks, updateTaskStatus } from './tasks.service';

export async function getTasks(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  const tasks = await listTasks(req.user.id);
  return res.json({ tasks });
}

export async function postTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  try {
    const input = createTaskSchema.parse(req.body);
    const task = await createTask(req.user.id, input);
    return res.status(201).json({ task });
  } catch (err) {
    const error = err as Error;
    return res.status(400).json({ message: error.message || 'Task creation failed.' });
  }
}

export async function patchTaskStatus(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  try {
    const input = updateStatusSchema.parse(req.body);
    const task = await updateTaskStatus(req.user.id, Number(req.params.id), input.status);
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    return res.json({ task });
  } catch (err) {
    const error = err as Error;
    return res.status(400).json({ message: error.message || 'Task update failed.' });
  }
}
