'use client';

import { BaseWidget } from './BaseWidget';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface SoldeWidgetProps {
  solde: number;
  depensesMois: number;
  variation: number; // Pourcentage de variation par rapport au mois précédent
}

export function SoldeWidget({
  solde,
  depensesMois,
  variation,
}: SoldeWidgetProps) {
  const isPositive = variation >= 0;

  return (
    <BaseWidget title="Vue d'ensemble" className="bg-gradient-pastel-blue border-pastel-blue">
      <div className="space-y-4">
        <div className="bg-pastel-blue rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]">
          <p className="text-sm text-pastel-blue font-medium">Solde actuel</p>
          <p className="text-3xl font-bold text-card-foreground mt-1">
            {solde.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            })}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-pastel-blue">
          <div>
            <p className="text-sm text-muted-foreground">Dépenses ce mois</p>
            <p className="text-xl font-semibold text-card-foreground">
              {depensesMois.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })}
            </p>
          </div>

          <div
            className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
              isPositive
                ? 'bg-pastel-green text-pastel-green'
                : 'bg-pastel-red text-pastel-red'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(variation)}%
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}
