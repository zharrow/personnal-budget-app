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
        'relative flex flex-col border-r border-border/50 bg-linear-to-b from-background via-pastel-blue/10 to-pastel-purple/10',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/50 bg-linear-to-r from-pastel-blue to-pastel-purple/50">
        <motion.div
          animate={{
            opacity: isCollapsed ? 0 : 1,
            display: isCollapsed ? 'none' : 'flex',
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-card">
            <Wallet className="h-5 w-5 text-pastel-blue" />
          </div>
          <span className="font-semibold text-lg bg-linear-to-r from-pastel-blue to-pastel-purple bg-clip-text text-transparent">BudgetApp</span>
        </motion.div>

        <div className="flex items-center gap-1">
          {!isCollapsed && <NotificationBell />}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-pastel-blue/30 transition-all duration-300"
            aria-label={isCollapsed ? 'Ouvrir la sidebar' : 'Fermer la sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-pastel-blue" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-pastel-blue" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const colors = [
            { bg: 'hover:bg-pastel-blue', text: 'hover:text-pastel-blue', icon: 'text-pastel-blue' },
            { bg: 'hover:bg-pastel-purple', text: 'hover:text-pastel-purple', icon: 'text-pastel-purple' },
            { bg: 'hover:bg-pastel-green', text: 'hover:text-pastel-green', icon: 'text-pastel-green' },
            { bg: 'hover:bg-pastel-pink', text: 'hover:text-pastel-pink', icon: 'text-pastel-pink' },
            { bg: 'hover:bg-pastel-orange', text: 'hover:text-pastel-orange', icon: 'text-pastel-orange' },
            { bg: 'hover:bg-pastel-indigo', text: 'hover:text-pastel-indigo', icon: 'text-pastel-indigo' },
          ];
          const color = colors[index % colors.length];

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300',
                color.bg,
                color.text,
                'text-muted-foreground hover:scale-[1.02] hover:shadow-sm'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-md bg-muted/50 transition-colors duration-300`}>
                <Icon className={`h-5 w-5 shrink-0 ${color.icon}`} />
              </div>
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
      <div className="p-3 border-t border-border/50 bg-linear-to-r from-pastel-purple/30 to-pastel-pink/30">
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5',
            'bg-gradient-pastel-sunset text-muted-foreground hover:scale-[1.02] transition-all duration-300'
          )}
        >
          <div className="h-8 w-8 rounded-full bg-linear-to-br from-pastel-purple to-pastel-pink flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-card">F</span>
          </div>
          <motion.div
            animate={{
              opacity: isCollapsed ? 0 : 1,
              display: isCollapsed ? 'none' : 'block',
            }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            <span className="text-sm font-medium text-card-foreground">Florent</span>
            <span className="text-xs text-pastel-purple">
              florent@example.com
            </span>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
