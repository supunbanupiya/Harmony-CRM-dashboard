'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signupUser } from '@/store/slices/authSlice';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', companyName: '', email: '', password: '' });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const action = await dispatch(signupUser(form));
    if (signupUser.fulfilled.match(action)) router.push('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center gradient-mesh px-6 py-12">
      <Card className="w-full max-w-md glass-card shadow-glow">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles />
          </div>
          <CardTitle className="text-2xl">Create Harmony workspace</CardTitle>
          <CardDescription>Signup creates a secured dashboard account using JWT.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" required />
            <Input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} placeholder="Company name" />
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password min 8 characters" required />
            {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
            <Button className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have account? <Link href="/auth/login" className="font-semibold text-primary">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
