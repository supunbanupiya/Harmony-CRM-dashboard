'use client';

import { FormEvent, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { PublicNav } from '@/components/layout/public-nav';
import { FadeIn } from '@/components/motion/fade-in';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { submitContact } from '@/store/slices/contactSlice';

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.contact);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await dispatch(submitContact(form));
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <PublicNav />
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <FadeIn>
          <p className="font-semibold text-primary">Contact</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Talk to the Harmony CRM team.</h1>
          <p className="mt-5 text-muted-foreground">Submit your requirement. The backend stores your message in the public contact_messages table.</p>
          <div className="mt-8 rounded-3xl bg-card p-6 shadow-sm">
            <Mail className="mb-4 text-primary" />
            <p className="font-semibold">Public API used</p>
            <p className="mt-1 text-sm text-muted-foreground">POST /api/contact</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Send inquiry</CardTitle>
              <CardDescription>No login required.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <Input placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <Textarea placeholder="Tell us what CRM system you need" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                {success && <p className="text-sm font-medium text-emerald-600">Message sent successfully.</p>}
                {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
                <Button type="submit" disabled={loading}>
                  <Send size={16} /> {loading ? 'Sending...' : 'Send message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </FadeIn>
      </main>
    </div>
  );
}
