'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CheckSquare, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createTask, fetchTasks, updateTaskStatus } from '@/store/slices/tasksSlice';
import type { Task } from '@/types';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.tasks);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', status: 'todo', dueDate: '' });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await dispatch(createTask(form as any));
    setForm({ title: '', description: '', priority: 'medium', status: 'todo', dueDate: '' });
  }

  function badgeVariant(priority: Task['priority']) {
    if (priority === 'high') return 'danger';
    if (priority === 'medium') return 'warning';
    return 'secondary';
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckSquare /> Add task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
            <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            <Button type="submit"><Plus size={16} /> Add task</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Task list</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((task) => (
            <div key={task.id} className="rounded-2xl border bg-background p-4">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <p className="font-bold">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.clientName || 'General'} • Due {task.dueDate || 'Not set'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={badgeVariant(task.priority)}>{task.priority}</Badge>
                  <Select className="w-36" value={task.status} onChange={(e) => dispatch(updateTaskStatus({ id: task.id, status: e.target.value as Task['status'] }))}>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
