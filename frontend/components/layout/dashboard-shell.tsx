'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, KanbanSquare, LogOut, MessageSquareText, PanelLeft, UsersRound, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

const links = [
  { href: '/dashboard', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/clients', label: 'Clients', icon: UsersRound },
  { href: '/dashboard/pipeline', label: 'Pipeline', icon: KanbanSquare },
  { href: '/dashboard/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/dashboard/communications', label: 'Communications', icon: MessageSquareText }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  function handleLogout() {
    dispatch(logout());
    router.push('/auth/login');
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-card/90 p-5 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="mb-8 flex items-center gap-3 font-bold">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
            <PanelLeft size={20} />
          </span>
          <span>
            Harmony CRM
            <span className="block text-xs font-medium text-muted-foreground">Client growth console</span>
          </span>
        </Link>
        <nav className="space-y-2">
          {links.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground',
                  active && 'bg-primary text-primary-foreground shadow-lg shadow-violet-500/20 hover:bg-primary hover:text-primary-foreground'
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b bg-background/80 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <h1 className="text-xl font-bold">{user?.name || 'CRM Manager'}</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </Button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
            {links.map((item) => (
              <Button key={item.href} variant={pathname === item.href ? 'default' : 'outline'} size="sm" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
