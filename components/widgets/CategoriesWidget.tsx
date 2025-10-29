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
    const colors: Record<string, { bg: string; text: string; badge: string }> = {
      Alimentaire: { bg: 'bg-pastel-green', text: 'text-pastel-green', badge: 'bg-pastel-green' },
      Transport: { bg: 'bg-pastel-blue', text: 'text-pastel-blue', badge: 'bg-pastel-blue' },
      Logement: { bg: 'bg-pastel-purple', text: 'text-pastel-purple', badge: 'bg-pastel-purple' },
      Loisirs: { bg: 'bg-pastel-pink', text: 'text-pastel-pink', badge: 'bg-pastel-pink' },
      Santé: { bg: 'bg-pastel-red', text: 'text-pastel-red', badge: 'bg-pastel-red' },
      Vêtements: { bg: 'bg-pastel-yellow', text: 'text-pastel-yellow', badge: 'bg-pastel-yellow' },
      Électronique: { bg: 'bg-pastel-indigo', text: 'text-pastel-indigo', badge: 'bg-pastel-indigo' },
      Autre: { bg: 'bg-muted', text: 'text-muted-foreground', badge: 'bg-muted' },
    };
    return colors[categorie] || colors.Autre;
  };

  return (
    <BaseWidget title="Dépenses par catégorie" className="bg-gradient-pastel-cool border-pastel-teal">
      <div className="space-y-4">
        {categories.map(({ categorie, montant, percentage }) => (
          <div key={categorie} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getCategorieColor(categorie).bg}`} />
                <span className="font-medium">{categorie}</span>
              </div>
              <span className={`font-semibold ${getCategorieColor(categorie).text}`}>
                {montant.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden relative group">
              <div
                className={`h-full ${getCategorieColor(categorie).bg} transition-all duration-500 group-hover:opacity-80`}
                style={{ width: `${percentage}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}
