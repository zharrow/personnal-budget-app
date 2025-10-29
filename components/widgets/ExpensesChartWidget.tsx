'use client';

import { BaseWidget } from './BaseWidget';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

interface ExpensesChartWidgetProps {
  transactions: Array<{ date: Date; montant: number }>;
}

export function ExpensesChartWidget({ transactions }: ExpensesChartWidgetProps) {
  const monthlyData = useMemo(() => {
    const dataByMonth: Record<string, number> = {};

    transactions.forEach((transaction) => {
      const monthKey = new Date(transaction.date).toLocaleDateString('fr-FR', {
        month: 'short',
        year: 'numeric',
      });
      dataByMonth[monthKey] = (dataByMonth[monthKey] || 0) + Math.abs(transaction.montant);
    });

    return Object.entries(dataByMonth)
      .map(([month, total]) => ({
        month,
        total: Math.round(total),
      }))
      .slice(-6); // 6 derniers mois
  }, [transactions]);

  return (
    <BaseWidget title="Dépenses Mensuelles">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
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
              formatter={(value: number) => [`${value}€`, 'Total']}
            />
            <Bar dataKey="total" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </BaseWidget>
  );
}
