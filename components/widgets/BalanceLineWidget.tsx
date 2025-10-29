'use client';

import { BaseWidget } from './BaseWidget';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useMemo } from 'react';
import { Transaction } from '@/types';

interface BalanceLineWidgetProps {
  transactions: Transaction[];
  initialBalance?: number;
}

export function BalanceLineWidget({ transactions, initialBalance = 5000 }: BalanceLineWidgetProps) {
  const balanceData = useMemo(() => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let runningBalance = initialBalance;
    const data: Array<{ date: string; solde: number }> = [];

    // Point de départ
    data.push({
      date: 'Départ',
      solde: initialBalance,
    });

    sortedTransactions.forEach((transaction) => {
      runningBalance += transaction.total;
      data.push({
        date: new Date(transaction.date).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
        }),
        solde: Math.round(runningBalance),
      });
    });

    return data.slice(-10); // 10 derniers points
  }, [transactions, initialBalance]);

  const minBalance = Math.min(...balanceData.map((d) => d.solde));
  const maxBalance = Math.max(...balanceData.map((d) => d.solde));

  return (
    <BaseWidget title="Évolution du Solde">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceData}>
            <defs>
              <linearGradient id="colorSolde" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[Math.floor(minBalance * 0.95), Math.ceil(maxBalance * 1.05)]}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}€`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                color: 'hsl(var(--popover-foreground))',
              }}
              formatter={(value: number) => [`${value}€`, 'Solde']}
            />
            <Area
              type="monotone"
              dataKey="solde"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              fill="url(#colorSolde)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </BaseWidget>
  );
}
