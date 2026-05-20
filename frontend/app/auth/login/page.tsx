'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadFromStorage, loginUser } from '@/store/slices/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({ email: 'admin@harmonycrm.com', password: 'Admin@12345' });

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (token) router.push(params.get('redirect') || '/dashboard');
  }, [params, router, token]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const action = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(action)) router.push('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center gradient-mesh px-6 py-12">
      <Card className="w-full max-w-md glass-card shadow-glow">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <BarChart3 />
          </div>
          <CardTitle className="text-2xl">Login to Harmony CRM</CardTitle>
          <CardDescription>Use admin seed account or your registered account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" required />
            {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
            <Button className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            New here? <Link href="/auth/signup" className="font-semibold text-primary">Create account</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
