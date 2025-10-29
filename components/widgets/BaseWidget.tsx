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
        'rounded-lg border border-border bg-card p-6 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
