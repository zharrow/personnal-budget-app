import { GridLayoutPreset, WidgetConfig, WidgetSize } from '@/types';

// Presets de layout pour la grid
export const GRID_PRESETS: GridLayoutPreset[] = [
  {
    id: 'classic',
    name: 'Classique',
    description: 'Layout standard avec 12 colonnes, idéal pour la plupart des usages',
    columns: 12,
    rowHeight: 100,
    gap: 16,
    compactType: 'vertical',
  },
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Layout aéré avec 24 colonnes pour plus de précision',
    columns: 24,
    rowHeight: 80,
    gap: 20,
    compactType: 'vertical',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Layout dense pour afficher plus de contenu',
    columns: 12,
    rowHeight: 80,
    gap: 8,
    compactType: 'vertical',
  },
  {
    id: 'spacious',
    name: 'Spacieux',
    description: 'Layout avec grands espaces, parfait pour les grands écrans',
    columns: 12,
    rowHeight: 120,
    gap: 24,
    compactType: 'vertical',
  },
  {
    id: 'freeform',
    name: 'Libre',
    description: 'Positionnement libre sans compactage automatique',
    columns: 24,
    rowHeight: 60,
    gap: 12,
    compactType: null,
  },
];

// Tailles prédéfinies pour les widgets (en unités de grid)
export const WIDGET_SIZE_PRESETS: Record<WidgetSize, { w: number; h: number }> = {
  small: { w: 3, h: 2 },
  medium: { w: 4, h: 2 },
  large: { w: 6, h: 3 },
  xlarge: { w: 12, h: 4 },
  custom: { w: 4, h: 2 }, // Default pour custom
};

// Contraintes de taille par type de widget
export const WIDGET_SIZE_CONSTRAINTS: Record<string, {
  minW: number;
  minH: number;
  maxW?: number;
  maxH?: number;
  defaultW: number;
  defaultH: number;
}> = {
  solde_global: {
    minW: 3,
    minH: 2,
    maxW: 6,
    maxH: 3,
    defaultW: 4,
    defaultH: 2,
  },
  graphique_depenses: {
    minW: 4,
    minH: 2,
    maxW: 12,
    maxH: 4,
    defaultW: 4,
    defaultH: 2,
  },
  garanties: {
    minW: 3,
    minH: 2,
    maxW: 6,
    maxH: 4,
    defaultW: 4,
    defaultH: 2,
  },
  derniers_tickets: {
    minW: 4,
    minH: 2,
    maxW: 12,
    maxH: 5,
    defaultW: 12,
    defaultH: 3,
  },
  calendrier_paiements: {
    minW: 4,
    minH: 3,
    maxW: 8,
    maxH: 5,
    defaultW: 6,
    defaultH: 3,
  },
  tableur: {
    minW: 6,
    minH: 3,
    maxW: 12,
    maxH: 6,
    defaultW: 12,
    defaultH: 4,
  },
  objectif_epargne: {
    minW: 3,
    minH: 2,
    maxW: 6,
    maxH: 3,
    defaultW: 4,
    defaultH: 2,
  },
  top_magasins: {
    minW: 3,
    minH: 2,
    maxW: 6,
    maxH: 4,
    defaultW: 4,
    defaultH: 3,
  },
};

// Layouts prédéfinis complets
export const DEFAULT_LAYOUTS: Record<string, WidgetConfig[]> = {
  classic: [
    {
      id: 'solde',
      type: 'solde_global',
      title: 'Vue d\'ensemble',
      position: { x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2, maxW: 6, maxH: 3 },
      settings: { displayMode: 'normal', showTitle: true },
      isVisible: true,
    },
    {
      id: 'categories',
      type: 'graphique_depenses',
      title: 'Dépenses par catégorie',
      position: { x: 4, y: 0, w: 4, h: 2, minW: 4, minH: 2, maxW: 12, maxH: 4 },
      settings: { displayMode: 'normal', showTitle: true },
      isVisible: true,
    },
    {
      id: 'garanties',
      type: 'garanties',
      title: 'Garanties actives',
      position: { x: 8, y: 0, w: 4, h: 2, minW: 3, minH: 2, maxW: 6, maxH: 4 },
      settings: { displayMode: 'normal', showTitle: true },
      isVisible: true,
    },
    {
      id: 'transactions',
      type: 'derniers_tickets',
      title: 'Dernières transactions',
      position: { x: 0, y: 2, w: 12, h: 3, minW: 4, minH: 2, maxW: 12, maxH: 5 },
      settings: { displayMode: 'normal', showTitle: true },
      isVisible: true,
    },
  ],
  modern: [
    {
      id: 'solde',
      type: 'solde_global',
      title: 'Vue d\'ensemble',
      position: { x: 0, y: 0, w: 8, h: 2, minW: 6, minH: 2, maxW: 12, maxH: 3 },
      settings: { displayMode: 'detailed', showTitle: true },
      isVisible: true,
    },
    {
      id: 'categories',
      type: 'graphique_depenses',
      title: 'Dépenses par catégorie',
      position: { x: 8, y: 0, w: 8, h: 2, minW: 8, minH: 2, maxW: 24, maxH: 4 },
      settings: { displayMode: 'normal', showTitle: true },
      isVisible: true,
    },
    {
      id: 'garanties',
      type: 'garanties',
      title: 'Garanties actives',
      position: { x: 16, y: 0, w: 8, h: 2, minW: 6, minH: 2, maxW: 12, maxH: 4 },
      settings: { displayMode: 'normal', showTitle: true },
      isVisible: true,
    },
    {
      id: 'transactions',
      type: 'derniers_tickets',
      title: 'Dernières transactions',
      position: { x: 0, y: 2, w: 24, h: 3, minW: 8, minH: 2, maxW: 24, maxH: 5 },
      settings: { displayMode: 'normal', showTitle: true },
      isVisible: true,
    },
  ],
  compact: [
    {
      id: 'solde',
      type: 'solde_global',
      title: 'Vue d\'ensemble',
      position: { x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2, maxW: 6, maxH: 3 },
      settings: { displayMode: 'compact', showTitle: false },
      isVisible: true,
    },
    {
      id: 'categories',
      type: 'graphique_depenses',
      title: 'Dépenses',
      position: { x: 3, y: 0, w: 3, h: 2, minW: 4, minH: 2, maxW: 12, maxH: 4 },
      settings: { displayMode: 'compact', showTitle: false },
      isVisible: true,
    },
    {
      id: 'garanties',
      type: 'garanties',
      title: 'Garanties',
      position: { x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2, maxW: 6, maxH: 4 },
      settings: { displayMode: 'compact', showTitle: false },
      isVisible: true,
    },
    {
      id: 'transactions',
      type: 'derniers_tickets',
      title: 'Transactions',
      position: { x: 9, y: 0, w: 3, h: 2, minW: 4, minH: 2, maxW: 12, maxH: 5 },
      settings: { displayMode: 'compact', showTitle: false },
      isVisible: true,
    },
  ],
};

// Fonction helper pour obtenir les contraintes d'un widget
export function getWidgetConstraints(type: string) {
  return WIDGET_SIZE_CONSTRAINTS[type] || {
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    defaultW: 4,
    defaultH: 2,
  };
}

// Fonction pour appliquer un preset de taille à un widget
export function applyWidgetSize(widget: WidgetConfig, size: WidgetSize): WidgetConfig {
  const sizePreset = WIDGET_SIZE_PRESETS[size];
  const constraints = getWidgetConstraints(widget.type);

  return {
    ...widget,
    position: {
      ...widget.position,
      w: Math.max(constraints.minW, Math.min(sizePreset.w, constraints.maxW || 12)),
      h: Math.max(constraints.minH, Math.min(sizePreset.h, constraints.maxH || 6)),
    },
    settings: {
      ...widget.settings,
      size,
    },
  };
}
