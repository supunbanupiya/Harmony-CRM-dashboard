'use client';

import { useEffect } from 'react';
import { KanbanSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPipeline } from '@/store/slices/pipelineSlice';

export default function PipelinePage() {
  const dispatch = useAppDispatch();
  const { stages } = useAppSelector((state) => state.pipeline);

  useEffect(() => {
    dispatch(fetchPipeline());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary"><KanbanSquare className="mr-2 h-3.5 w-3.5" /> Deal pipeline</Badge>
        <h2 className="mt-3 text-3xl font-black">Task and deal stages</h2>
      </div>
      <div className="grid gap-5 xl:grid-cols-5">
        {stages.map((stage) => (
          <Card key={stage.id} className="min-h-[420px]">
            <CardHeader>
              <CardTitle className="text-base">{stage.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.deals.map((deal) => (
                <div key={deal.id} className="rounded-2xl border bg-muted/50 p-4">
                  <p className="font-bold">{deal.title}</p>
                  <p className="text-sm text-muted-foreground">{deal.clientName}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-primary">{formatCurrency(Number(deal.amount))}</span>
                    <Badge variant="outline">{deal.probability}%</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
