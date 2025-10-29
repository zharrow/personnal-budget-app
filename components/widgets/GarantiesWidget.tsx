'use client';

import { BaseWidget } from './BaseWidget';
import { Garantie } from '@/types';
import { Shield, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GarantiesWidgetProps {
  garanties: Garantie[];
}

export function GarantiesWidget({ garanties }: GarantiesWidgetProps) {
  const activeGaranties = garanties.filter(
    (g) => g.statut === 'active' || g.statut === 'expirant_bientot'
  );

  const expirantBientot = garanties.filter(
    (g) => g.statut === 'expirant_bientot'
  ).length;

  const getDaysRemaining = (finGarantie: string) => {
    const end = new Date(finGarantie);
    const now = new Date();
    const diff = Math.floor((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <BaseWidget
      title="Garanties actives"
      actions={
        <Button variant="ghost" size="sm" asChild>
          <a href="/garanties">
            Voir tout
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold">
              {activeGaranties.length}
            </span>
          </div>
          {expirantBientot > 0 && (
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              <AlertCircle className="mr-1 h-3 w-3" />
              {expirantBientot} expire{expirantBientot > 1 ? 'nt' : ''} bientôt
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          {activeGaranties.slice(0, 3).map((garantie) => {
            const daysRemaining = getDaysRemaining(garantie.finGarantie);
            const isExpiringSoon = daysRemaining < 30;

            return (
              <div
                key={garantie.id}
                className="p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{garantie.produit}</p>
                    <p className="text-xs text-muted-foreground">
                      {garantie.magasin}
                    </p>
                  </div>
                  <p
                    className={`text-xs font-medium ${
                      isExpiringSoon ? 'text-orange-600' : 'text-muted-foreground'
                    }`}
                  >
                    {daysRemaining}j
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {activeGaranties.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">Aucune garantie active</p>
          </div>
        )}
      </div>
    </BaseWidget>
  );
}
