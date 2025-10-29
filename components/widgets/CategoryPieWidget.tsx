'use client';

import { BaseWidget } from './BaseWidget';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Categorie } from '@/types';

interface CategoryPieWidgetProps {
  data: Record<Categorie, number>;
}

const COLORS = {
  Alimentaire: 'hsl(var(--chart-1))',
  Transport: 'hsl(var(--chart-2))',
  Logement: 'hsl(var(--chart-3))',
  Loisirs: 'hsl(var(--chart-4))',
  Santé: 'hsl(var(--chart-5))',
  Vêtements: 'hsl(var(--chart-1))',
  Électronique: 'hsl(var(--chart-2))',
  Autre: 'hsl(var(--muted-foreground))',
};

export function CategoryPieWidget({ data }: CategoryPieWidgetProps) {
  const chartData = Object.entries(data)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value: Math.round(value),
    }));

  return (
    <BaseWidget title="Répartition par Catégorie">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as Categorie] || COLORS.Autre}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                color: 'hsl(var(--popover-foreground))',
              }}
              formatter={(value: number) => `${value}€`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </BaseWidget>
  );
}
