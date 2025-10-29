'use client';

import { WidgetConfig } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LayoutPreviewOverlayProps {
  layoutId: string | null;
  layoutWidgets: WidgetConfig[] | null;
  isVisible: boolean;
  gridColumns: number;
  rowHeight: number;
  gap: number;
}

// Couleurs pour différencier les types de widgets
const widgetTypeColors: Record<string, { from: string; to: string; border: string }> = {
  solde_global: { from: 'from-green-500/20', to: 'to-green-500/5', border: 'border-green-500/40' },
  graphique_depenses: { from: 'from-blue-500/20', to: 'to-blue-500/5', border: 'border-blue-500/40' },
  garanties: { from: 'from-purple-500/20', to: 'to-purple-500/5', border: 'border-purple-500/40' },
  derniers_tickets: { from: 'from-orange-500/20', to: 'to-orange-500/5', border: 'border-orange-500/40' },
};

export function LayoutPreviewOverlay({
  layoutId,
  layoutWidgets,
  isVisible,
  gridColumns,
  rowHeight,
  gap,
}: LayoutPreviewOverlayProps) {
  const [dimensions, setDimensions] = useState({ rows: 10 });

  useEffect(() => {
    if (isVisible && layoutWidgets) {
      const updateDimensions = () => {
        // Calculer le nombre de lignes nécessaires en fonction des widgets
        const maxY = Math.max(...layoutWidgets.map(w => w.position.y + w.position.h));
        const estimatedRows = Math.max(maxY + 2, 8);
        setDimensions({ rows: estimatedRows });
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [isVisible, layoutWidgets]);

  if (!layoutWidgets || !isVisible || !layoutId) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        >
          {/* Overlay semi-transparent avec effet de flou */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />

          {/* Conteneur de la grille qui prend toute la largeur disponible */}
          <div className="absolute inset-0 pt-20 pb-6 px-6">
            <div className="relative w-full h-full">
              {/* Grille de prévisualisation avec widgets positionnés */}
              <div
                className="relative w-full"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                  gridAutoRows: `${rowHeight}px`,
                  gap: `${gap}px`,
                  minHeight: `${dimensions.rows * (rowHeight + gap)}px`,
                }}
              >
                {/* Afficher les cellules de fond */}
                {Array.from({ length: gridColumns * dimensions.rows }).map((_, index) => (
                  <div
                    key={`bg-${index}`}
                    className="bg-muted/20 border border-border/30 rounded-md"
                  />
                ))}

                {/* Widgets positionnés */}
                {layoutWidgets.map((widget, index) => {
                  const colors = widgetTypeColors[widget.type] || {
                    from: 'from-primary/20',
                    to: 'to-primary/5',
                    border: 'border-primary/40',
                  };

                  return (
                    <motion.div
                      key={widget.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      className={`absolute bg-gradient-to-br ${colors.from} ${colors.to} border-2 ${colors.border} rounded-lg shadow-lg backdrop-blur-sm`}
                      style={{
                        gridColumn: `${widget.position.x + 1} / span ${widget.position.w}`,
                        gridRow: `${widget.position.y + 1} / span ${widget.position.h}`,
                        left: `${(widget.position.x * (100 / gridColumns))}%`,
                        top: `${widget.position.y * (rowHeight + gap)}px`,
                        width: `calc(${widget.position.w * (100 / gridColumns)}% - ${gap}px)`,
                        height: `${widget.position.h * rowHeight + (widget.position.h - 1) * gap}px`,
                      }}
                    >
                      {/* Contenu du widget preview */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-foreground/80 mb-1">
                            {widget.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {widget.position.w} × {widget.position.h}
                          </div>
                        </div>
                      </div>

                      {/* Effet de brillance */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Badge d'information flottant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute top-6 right-6 bg-background/95 backdrop-blur-lg rounded-xl border-2 border-primary/60 shadow-2xl p-5 min-w-[280px]"
          >
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-xl font-bold text-primary mb-1 capitalize">
                  Layout {layoutId}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Prévisualisation de la disposition des widgets
                </div>
              </div>

              <div className="h-px bg-border/50" />

              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Widgets :</div>
                {layoutWidgets.map((widget) => (
                  <div key={widget.id} className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 rounded-sm border-2 ${widgetTypeColors[widget.type]?.border || 'border-primary/40'} ${widgetTypeColors[widget.type]?.from || 'bg-primary/20'}`} />
                    <span className="text-foreground/80">{widget.title}</span>
                    <span className="text-muted-foreground ml-auto">
                      {widget.position.w}×{widget.position.h}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-center text-muted-foreground/70 mt-1">
                Survolez les options pour prévisualiser
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
