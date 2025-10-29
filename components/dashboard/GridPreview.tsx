'use client';

import { GridLayoutPreset } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GridPreviewProps {
  preset: GridLayoutPreset;
  className?: string;
}

export function GridPreview({ preset, className }: GridPreviewProps) {
  // Calculer le nombre de colonnes à afficher (max 12 pour la preview)
  const displayColumns = Math.min(preset.columns, 12);

  // Créer une grille de 3 rangées pour la démonstration
  const rows = 3;

  // Calculer la taille relative du gap
  const gapScale = preset.gap / 16; // Normaliser par rapport à 16px

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative w-full h-28 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-3 overflow-hidden border border-border/50",
        className
      )}
    >
      <div
        className="grid h-full transition-all duration-300"
        style={{
          gridTemplateColumns: `repeat(${displayColumns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: `${Math.max(2, gapScale * 4)}px`,
        }}
      >
        {Array.from({ length: displayColumns * rows }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.01 }}
            className={cn(
              "bg-gradient-to-br from-primary/30 to-primary/10 rounded-sm",
              "border border-primary/20 transition-all duration-200",
              "hover:from-primary/40 hover:to-primary/20 hover:scale-105"
            )}
            style={{
              minHeight: `${preset.rowHeight / 10}px`,
            }}
          />
        ))}
      </div>

      {/* Légende superposée */}
      <div className="absolute top-2 right-2 text-[10px] font-medium text-primary bg-background/90 px-2 py-0.5 rounded-md border border-border/50 shadow-sm">
        {preset.columns} colonnes
      </div>

      {/* Indicateur de gap */}
      <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground bg-background/90 px-2 py-0.5 rounded-md border border-border/50 shadow-sm">
        Gap: {preset.gap}px
      </div>

      {/* Indicateur de hauteur */}
      <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-background/90 px-2 py-0.5 rounded-md border border-border/50 shadow-sm">
        H: {preset.rowHeight}px
      </div>
    </motion.div>
  );
}
