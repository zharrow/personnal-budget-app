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
    <BaseWidget title="Vue d'ensemble">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Solde actuel</p>
          <p className="text-3xl font-bold text-card-foreground">
            {solde.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            })}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
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
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
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
