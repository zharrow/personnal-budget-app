'use client';

import { GridLayoutPreset } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GridPreviewOverlayProps {
  preset: GridLayoutPreset | null;
  isVisible: boolean;
}

export function GridPreviewOverlay({ preset, isVisible }: GridPreviewOverlayProps) {
  const [dimensions, setDimensions] = useState({ rows: 10 });

  useEffect(() => {
    if (isVisible && preset) {
      const updateDimensions = () => {
        const viewportHeight = window.innerHeight;
        const estimatedRows = Math.ceil(viewportHeight / (preset.rowHeight + preset.gap)) + 2;
        setDimensions({ rows: estimatedRows });
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [isVisible, preset]);

  if (!preset || !isVisible) return null;

  const displayColumns = preset.columns;
  const totalCells = displayColumns * dimensions.rows;

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
              {/* Grille de prévisualisation */}
              <div
                className="w-full"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${displayColumns}, 1fr)`,
                  gridAutoRows: `${preset.rowHeight}px`,
                  gap: `${preset.gap}px`,
                }}
              >
                {Array.from({ length: totalCells }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(index * 0.003, 0.5),
                      ease: "easeOut"
                    }}
                    className="relative bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary/40 rounded-lg shadow-lg"
                  >
                    {/* Effet de brillance au survol */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg" />
                  </motion.div>
                ))}
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
                <div className="text-xl font-bold text-primary mb-1">{preset.name}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {preset.description}
                </div>
              </div>

              <div className="h-px bg-border/50" />

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <span className="text-2xl font-bold text-primary mb-1">{preset.columns}</span>
                  <span className="text-muted-foreground font-medium">colonnes</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <span className="text-2xl font-bold text-primary mb-1">{preset.rowHeight}</span>
                  <span className="text-muted-foreground font-medium">hauteur (px)</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <span className="text-2xl font-bold text-primary mb-1">{preset.gap}</span>
                  <span className="text-muted-foreground font-medium">espacement</span>
                </div>
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
