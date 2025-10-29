'use client';

import { BaseWidget } from './BaseWidget';
import { Transaction } from '@/types';
import { Receipt, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecentTransactionsWidgetProps {
  transactions: Transaction[];
}

export function RecentTransactionsWidget({
  transactions,
}: RecentTransactionsWidgetProps) {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <BaseWidget
      title="Dernières transactions"
      actions={
        <Button variant="ghost" size="sm" asChild>
          <a href="/tableur">
            Voir tout
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      }
    >
      <div className="space-y-3">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{transaction.magasin}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {transaction.total.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.categorie}
              </p>
            </div>
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}
