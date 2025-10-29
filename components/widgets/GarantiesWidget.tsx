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
      className="bg-gradient-pastel-green border-pastel-green"
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
        <div className="flex items-center justify-between bg-pastel-green rounded-lg p-3 transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
              <Shield className="h-6 w-6 text-pastel-green" />
            </div>
            <span className="text-2xl font-bold text-pastel-green">
              {activeGaranties.length}
            </span>
          </div>
          {expirantBientot > 0 && (
            <Badge variant="outline" className="bg-pastel-orange text-pastel-orange border-pastel-orange">
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
                className={`p-3 rounded-lg border transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                  isExpiringSoon
                    ? 'bg-pastel-orange border-pastel-orange'
                    : 'bg-pastel-blue border-pastel-blue'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{garantie.produit}</p>
                    <p className="text-xs text-muted-foreground">
                      {garantie.magasin}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isExpiringSoon
                        ? 'bg-card text-pastel-orange'
                        : 'bg-card text-pastel-blue'
                    }`}
                  >
                    {daysRemaining}j
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activeGaranties.length === 0 && (
          <div className="text-center py-8 bg-pastel-blue rounded-lg">
            <Shield className="mx-auto h-8 w-8 mb-2 text-pastel-blue" />
            <p className="text-sm text-pastel-blue">Aucune garantie active</p>
          </div>
        )}
      </div>
    </BaseWidget>
  );
}
