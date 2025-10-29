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

  const getCategoryColors = (categorie: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      Alimentaire: { bg: 'bg-pastel-green', text: 'text-pastel-green', icon: 'text-pastel-green' },
      Transport: { bg: 'bg-pastel-blue', text: 'text-pastel-blue', icon: 'text-pastel-blue' },
      Logement: { bg: 'bg-pastel-purple', text: 'text-pastel-purple', icon: 'text-pastel-purple' },
      Loisirs: { bg: 'bg-pastel-pink', text: 'text-pastel-pink', icon: 'text-pastel-pink' },
      Santé: { bg: 'bg-pastel-red', text: 'text-pastel-red', icon: 'text-pastel-red' },
      Vêtements: { bg: 'bg-pastel-yellow', text: 'text-pastel-yellow', icon: 'text-pastel-yellow' },
      Électronique: { bg: 'bg-pastel-indigo', text: 'text-pastel-indigo', icon: 'text-pastel-indigo' },
      Autre: { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'text-muted-foreground' },
    };
    return colors[categorie] || colors.Autre;
  };

  return (
    <BaseWidget
      title="Dernières transactions"
      className="bg-gradient-pastel-sunset border-pastel-pink"
      actions={
        <Button variant="ghost" size="sm" asChild>
          <a href="/tableur">
            Voir tout
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      }
    >
      <div className="space-y-2">
        {recentTransactions.map((transaction) => {
          const colors = getCategoryColors(transaction.categorie);
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-card transition-all duration-300 hover:scale-[1.01] border-l-2 border-transparent hover:border-l-2 hover:shadow-sm"
              style={{ borderLeftColor: `var(--pastel-${transaction.categorie === 'Alimentaire' ? 'green' : transaction.categorie === 'Transport' ? 'blue' : 'purple'})` }}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} transition-all duration-300 hover:scale-110`}>
                  <Receipt className={`h-5 w-5 ${colors.icon}`} />
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
                <p className={`text-xs font-medium ${colors.text}`}>
                  {transaction.categorie}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </BaseWidget>
  );
}
