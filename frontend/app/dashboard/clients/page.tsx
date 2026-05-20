'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Plus, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createClient, fetchClients } from '@/store/slices/clientsSlice';

export default function ClientsPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.clients);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', status: 'lead', value: 0, source: 'Manual', notes: '' });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await dispatch(createClient({ ...form, value: Number(form.value) }));
    setForm({ name: '', company: '', email: '', phone: '', status: 'lead', value: 0, source: 'Manual', notes: '' });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UsersRound /> Add client</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Client name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="lead">Lead</option>
              <option value="active">Active</option>
              <option value="at_risk">At Risk</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </Select>
            <Input placeholder="Value" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} />
            <Button type="submit"><Plus size={16} /> Add client</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Client records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((client) => (
            <div key={client.id} className="flex flex-col justify-between gap-4 rounded-2xl border bg-background p-4 md:flex-row md:items-center">
              <div>
                <p className="font-bold">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.company || 'No company'} • {client.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={client.status === 'active' ? 'success' : client.status === 'at_risk' ? 'warning' : 'default'}>{client.status}</Badge>
                <p className="font-bold">{formatCurrency(Number(client.value))}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
