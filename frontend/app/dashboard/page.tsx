'use client';

import { useEffect } from 'react';
import { Activity, CheckSquare, DollarSign, TrendingUp, UsersRound } from 'lucide-react';
import { FadeIn } from '@/components/motion/fade-in';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDashboardSummary } from '@/store/slices/dashboardSlice';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  const cards = [
    { label: 'Total clients', value: data?.cards?.clients ?? 0, icon: UsersRound, hint: 'All owned client records' },
    { label: 'Active clients', value: data?.cards?.activeClients ?? 0, icon: Activity, hint: 'Currently active accounts' },
    { label: 'Open tasks', value: data?.cards?.openTasks ?? 0, icon: CheckSquare, hint: 'Not completed yet' },
    { label: 'Won revenue', value: formatCurrency(data?.cards?.wonRevenue ?? 0), icon: DollarSign, hint: 'Closed won value' },
    { label: 'Pipeline value', value: formatCurrency(data?.cards?.pipelineValue ?? 0), icon: TrendingUp, hint: 'All deal stages' }
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge variant="secondary">CRM analytics</Badge>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Dashboard overview</h2>
            <p className="text-muted-foreground">Live data loaded from protected Node.js API.</p>
          </div>
        </div>
      </FadeIn>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <FadeIn key={card.label} delay={index * 0.04}>
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-2 text-2xl font-black">{loading ? '...' : card.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>
                </CardContent>
              </Card>
            </FadeIn>
          );
        })}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline by stage</CardTitle>
            <CardDescription>Grouped from deals and pipeline_stages tables.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(data?.pipelineByStage || []).map((stage: any) => (
              <div key={stage.name}>
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span>{stage.name}</span>
                  <span>{formatCurrency(stage.amount)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, stage.amount / 1000)}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent communication</CardTitle>
            <CardDescription>Latest client touchpoints.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(data?.recentActivity || []).map((item: any, index: number) => (
              <div key={`${item.subject}-${index}`} className="rounded-2xl bg-muted p-4">
                <p className="font-semibold">{item.subject}</p>
                <p className="text-sm text-muted-foreground">{item.clientName} • {item.channel} • {item.direction}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
