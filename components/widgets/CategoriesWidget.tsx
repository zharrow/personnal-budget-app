'use client';

import { BaseWidget } from './BaseWidget';
import { Categorie } from '@/types';

interface CategoriesWidgetProps {
  data: Record<Categorie, number>;
}

export function CategoriesWidget({ data }: CategoriesWidgetProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  const categories = Object.entries(data)
    .map(([categorie, montant]) => ({
      categorie: categorie as Categorie,
      montant,
      percentage: (montant / total) * 100,
    }))
    .sort((a, b) => b.montant - a.montant)
    .slice(0, 5);

  const getCategorieColor = (categorie: string) => {
    const colors: Record<string, string> = {
      Alimentaire: 'bg-green-500',
      Transport: 'bg-blue-500',
      Logement: 'bg-purple-500',
      Loisirs: 'bg-pink-500',
      Santé: 'bg-red-500',
      Vêtements: 'bg-yellow-500',
      Électronique: 'bg-indigo-500',
      Autre: 'bg-gray-500',
    };
    return colors[categorie] || colors.Autre;
  };

  return (
    <BaseWidget title="Dépenses par catégorie">
      <div className="space-y-3">
        {categories.map(({ categorie, montant, percentage }) => (
          <div key={categorie} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{categorie}</span>
              <span className="text-muted-foreground">
                {montant.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full ${getCategorieColor(categorie)} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}
