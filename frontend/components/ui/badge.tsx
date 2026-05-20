import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors', {
  variants: {
    variant: {
      default: 'bg-primary/10 text-primary',
      secondary: 'bg-secondary/15 text-sky-700 dark:text-sky-200',
      success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
      warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
      danger: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
      outline: 'border text-foreground'
    }
  },
  defaultVariants: { variant: 'default' }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
