import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, MessageSquareText, Sparkles, TrendingUp, UsersRound } from 'lucide-react';
import { FadeIn } from '@/components/motion/fade-in';
import { PublicNav } from '@/components/layout/public-nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { label: 'Client growth', value: '+38%', icon: UsersRound },
  { label: 'Pipeline value', value: '$202K', icon: TrendingUp },
  { label: 'Messages tracked', value: '1.4K', icon: MessageSquareText }
];

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-mesh">
      <PublicNav />
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <FadeIn>
            <Badge className="mb-5" variant="secondary">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Colourful CRM workspace
            </Badge>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
              Manage clients, tasks, pipeline and communication from one beautiful dashboard.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Harmony CRM gives teams a clean sales command center with analytics, task pipelines, and client communication history.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/auth/signup">Create free account <ArrowRight size={18} /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/features">View features</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['JWT secure login', 'MySQL ready', 'Redux thunk APIs'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {item}
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 opacity-20 blur-3xl" />
            <Card className="relative overflow-hidden border-0 shadow-glow">
              <CardContent className="p-0">
                <Image src="/images/hero-crm.svg" width={920} height={620} alt="Harmony CRM dashboard preview" className="h-auto w-full" priority />
              </CardContent>
            </Card>
          </FadeIn>
        </section>
        <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-20 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={index * 0.08}>
                <Card className="glass-card border-white/40">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-black">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </section>
      </main>
    </div>
  );
}
