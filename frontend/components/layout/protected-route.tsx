'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadFromStorage } from '@/store/slices/authSlice';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { token, hydrated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (hydrated && !token) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, pathname, router, token]);

  if (!hydrated) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading Harmony workspace...</div>;
  }

  if (!token) return null;

  return <>{children}</>;
}
