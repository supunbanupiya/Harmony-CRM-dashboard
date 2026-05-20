import { BarChart3, KanbanSquare, LockKeyhole, MessageSquareText, Palette, UsersRound } from 'lucide-react';
import { PublicNav } from '@/components/layout/public-nav';
import { FadeIn } from '@/components/motion/fade-in';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  { icon: BarChart3, title: 'Analytics dashboard', text: 'View clients, won revenue, open tasks, and pipeline value in one place.' },
  { icon: KanbanSquare, title: 'Task and deal pipeline', text: 'Track leads from new inquiry to won deal using stage-based pipeline boards.' },
  { icon: MessageSquareText, title: 'Communication timeline', text: 'Log calls, emails, meetings, WhatsApp updates, and notes per client.' },
  { icon: UsersRound, title: 'Client profiles', text: 'Keep value, source, status, contact information, and notes together.' },
  { icon: LockKeyhole, title: 'JWT authentication', text: 'Secure dashboard APIs using token-based access control.' },
  { icon: Palette, title: 'Modern UI theme', text: 'Colourful cards, rounded shadcn-style components, and subtle animations.' }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      <PublicNav />
      <main className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <p className="font-semibold text-primary">Features</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">Everything needed for a clean CRM starter project.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">Public pages remain open. CRM workspace pages are protected after login.</p>
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} delay={index * 0.05}>
                <Card className="h-full glass-card">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.text}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </main>
    </div>
  );
}
