'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BaseWidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function BaseWidget({
  title,
  children,
  className,
  actions,
}: BaseWidgetProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border/50 bg-gradient-to-br from-card via-card to-accent/5 p-6 hover-depth transition-all duration-300',
        className
      )}
      style={{
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground bg-gradient-to-r from-primary to-accent bg-clip-text">{title}</h3>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
