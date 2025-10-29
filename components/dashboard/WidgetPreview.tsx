'use client';

import { WidgetConfig } from '@/types';
import { TrendingUp, TrendingDown, Shield, Receipt, PieChart } from 'lucide-react';

interface WidgetPreviewProps {
  widget: WidgetConfig;
  width: number;
  height: number;
}

export function WidgetPreview({ widget, width, height }: WidgetPreviewProps) {
  const isCompact = widget.settings.displayMode === 'compact';
  const isDetailed = widget.settings.displayMode === 'detailed';
  const showTitle = widget.settings.showTitle !== false;

  // Rendu en fonction du type de widget
  const renderContent = () => {
    switch (widget.type) {
      case 'solde_global':
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            {showTitle && (
              <h4 className={`font-semibold mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                {widget.title}
              </h4>
            )}
            <div className={`${isCompact ? 'text-2xl' : isDetailed ? 'text-5xl' : 'text-4xl'} font-bold text-green-600`}>
              2 450,75 €
            </div>
            {!isCompact && (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span>-12.5% ce mois</span>
              </div>
            )}
            {isDetailed && (
              <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="text-xs text-muted-foreground">Revenus</div>
                  <div className="font-semibold text-green-600">3 200 €</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="text-xs text-muted-foreground">Dépenses</div>
                  <div className="font-semibold text-red-600">1 234 €</div>
                </div>
              </div>
            )}
          </div>
        );

      case 'garanties':
        return (
          <div className="flex flex-col h-full p-4">
            {showTitle && (
              <h4 className={`font-semibold mb-3 ${isCompact ? 'text-sm' : 'text-base'}`}>
                {widget.title}
              </h4>
            )}
            <div className="flex-1 flex flex-col justify-center gap-2">
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded border">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  {!isCompact && <span className="text-sm">MacBook Pro</span>}
                </div>
                <span className="text-xs text-green-600 font-medium">6 mois</span>
              </div>
              {!isCompact && (
                <>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded border">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Lave-linge</span>
                    </div>
                    <span className="text-xs text-orange-500 font-medium">3 mois</span>
                  </div>
                  {isDetailed && (
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded border">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Canapé Ikea</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">9 ans</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );

      case 'graphique_depenses':
        return (
          <div className="flex flex-col h-full p-4">
            {showTitle && (
              <h4 className={`font-semibold mb-3 ${isCompact ? 'text-sm' : 'text-base'}`}>
                {widget.title}
              </h4>
            )}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-[200px]">
                <PieChart className={`w-full h-full ${isCompact ? 'opacity-50' : 'opacity-100'} text-primary`} />
                {isDetailed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">1 234 €</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {!isCompact && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Alimentaire</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Transport</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'derniers_tickets':
        return (
          <div className="flex flex-col h-full p-4">
            {showTitle && (
              <h4 className={`font-semibold mb-3 ${isCompact ? 'text-sm' : 'text-base'}`}>
                {widget.title}
              </h4>
            )}
            <div className="flex-1 space-y-2 overflow-hidden">
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded border">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-orange-500" />
                  {!isCompact && <span className="text-sm">Carrefour</span>}
                </div>
                <span className="text-sm font-semibold">47,85 €</span>
              </div>
              {!isCompact && (
                <>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded border">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Total Energies</span>
                    </div>
                    <span className="text-sm font-semibold">65,40 €</span>
                  </div>
                  {isDetailed && (
                    <>
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded border">
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Fnac</span>
                        </div>
                        <span className="text-sm font-semibold">102,98 €</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded border">
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Pharmacie</span>
                        </div>
                        <span className="text-sm font-semibold">11,40 €</span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm">Widget {widget.type}</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="relative bg-card border-2 border-border rounded-lg shadow-lg transition-all duration-300 overflow-hidden"
      style={{
        width: '100%',
        aspectRatio: `${width} / ${height}`,
        minHeight: '150px',
      }}
    >
      {renderContent()}

      {/* Indicateur de dimensions en bas à droite */}
      <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-background/90 px-2 py-1 rounded border backdrop-blur-sm">
        {width}w × {height}h
      </div>
    </div>
  );
}
