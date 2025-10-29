'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Receipt,
  FileSpreadsheet,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NotificationBell } from './NotificationBell';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    label: 'Scan Ticket',
    icon: Receipt,
    href: '/scan',
  },
  {
    label: 'Tableur',
    icon: FileSpreadsheet,
    href: '/tableur',
  },
  {
    label: 'Garanties',
    icon: Shield,
    href: '/garanties',
  },
  {
    label: 'Budget',
    icon: Wallet,
    href: '/budget',
  },
  {
    label: 'Paramètres',
    icon: Settings,
    href: '/parametres',
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? '64px' : '240px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'relative flex flex-col border-r border-border bg-background',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <motion.div
          animate={{
            opacity: isCollapsed ? 0 : 1,
            display: isCollapsed ? 'none' : 'flex',
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">BudgetApp</span>
        </motion.div>

        <div className="flex items-center gap-1">
          {!isCollapsed && <NotificationBell />}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors"
            aria-label={isCollapsed ? 'Ouvrir la sidebar' : 'Fermer la sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'text-muted-foreground'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <motion.span
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  display: isCollapsed ? 'none' : 'inline',
                }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5',
            'bg-muted text-muted-foreground'
          )}
        >
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-primary">F</span>
          </div>
          <motion.div
            animate={{
              opacity: isCollapsed ? 0 : 1,
              display: isCollapsed ? 'none' : 'block',
            }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            <span className="text-sm font-medium">Florent</span>
            <span className="text-xs text-muted-foreground">
              florent@example.com
            </span>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
