'use client';

import { BaseWidget } from './BaseWidget';
import { Progress } from '@/components/ui/progress';
import { Categorie } from '@/types';

interface BudgetProgressWidgetProps {
  categoriesData: Record<Categorie, number>;
  budgetLimits?: Record<Categorie, number>;
}

const DEFAULT_BUDGETS: Record<Categorie, number> = {
  Alimentaire: 400,
  Transport: 150,
  Logement: 800,
  Loisirs: 200,
  Santé: 100,
  Vêtements: 100,
  Électronique: 200,
  Autre: 150,
};

export function BudgetProgressWidget({
  categoriesData,
  budgetLimits = DEFAULT_BUDGETS,
}: BudgetProgressWidgetProps) {
  const categories = Object.entries(categoriesData).filter(([_, value]) => value > 0);

  return (
    <BaseWidget title="Budget par Catégorie">
      <div className="space-y-4">
        {categories.map(([category, spent]) => {
          const limit = budgetLimits[category as Categorie] || 0;
          const percentage = limit > 0 ? (spent / limit) * 100 : 0;
          const isOverBudget = percentage > 100;

          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category}</span>
                <span className={isOverBudget ? 'text-destructive font-semibold' : 'text-muted-foreground'}>
                  {Math.round(spent)}€ / {limit}€
                </span>
              </div>
              <Progress
                value={Math.min(percentage, 100)}
                className={isOverBudget ? 'h-2 [&>div]:bg-destructive' : 'h-2'}
              />
            </div>
          );
        })}
      </div>
    </BaseWidget>
  );
}
