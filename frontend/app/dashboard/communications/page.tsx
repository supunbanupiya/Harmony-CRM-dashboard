'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MessageSquareText, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchClients } from '@/store/slices/clientsSlice';
import { createCommunication, fetchCommunications } from '@/store/slices/communicationsSlice';

export default function CommunicationsPage() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clients.items);
  const { items } = useAppSelector((state) => state.communications);
  const [form, setForm] = useState({ clientId: 1, channel: 'email', subject: '', message: '', direction: 'outbound' });

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchCommunications());
  }, [dispatch]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await dispatch(createCommunication({ ...form, clientId: Number(form.clientId) }));
    setForm({ clientId: clients[0]?.id || 1, channel: 'email', subject: '', message: '', direction: 'outbound' });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquareText /> Log communication</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select value={String(form.clientId)} onChange={(e) => setForm({ ...form, clientId: Number(e.target.value) })}>
              {clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
            </Select>
            <Select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="meeting">Meeting</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="note">Note</option>
            </Select>
            <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
            <Textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button type="submit"><Plus size={16} /> Save log</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Communication timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{item.subject}</p>
                  <p className="text-sm text-muted-foreground">{item.clientName} • {item.clientCompany || 'No company'}</p>
                  <p className="mt-2 text-sm">{item.message}</p>
                </div>
                <Badge variant="secondary">{item.channel}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
