import { WidgetConfig } from '@/types';

export interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'overview' | 'analysis' | 'tracking' | 'custom';
  widgets: Omit<WidgetConfig, 'id'>[];
}

export const DASHBOARD_TEMPLATES: DashboardTemplate[] = [
  {
    id: 'vue-ensemble',
    name: 'Vue d\'Ensemble',
    description: 'Dashboard équilibré avec tous les indicateurs essentiels',
    icon: '📊',
    category: 'overview',
    widgets: [
      {
        type: 'solde',
        position: { x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'categories',
        position: { x: 4, y: 0, w: 4, h: 3, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'expenses-chart',
        position: { x: 8, y: 0, w: 4, h: 3, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'transactions',
        position: { x: 0, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'garanties',
        position: { x: 4, y: 3, w: 8, h: 2, minW: 4, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
    ],
  },
  {
    id: 'analyse-approfondie',
    name: 'Analyse Approfondie',
    description: 'Focus sur les graphiques et l\'analyse détaillée des dépenses',
    icon: '📈',
    category: 'analysis',
    widgets: [
      {
        type: 'balance-line',
        position: { x: 0, y: 0, w: 6, h: 3, minW: 4, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'expenses-chart',
        position: { x: 6, y: 0, w: 6, h: 3, minW: 4, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'category-pie',
        position: { x: 0, y: 3, w: 4, h: 3, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'budget-progress',
        position: { x: 4, y: 3, w: 4, h: 3, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'solde',
        position: { x: 8, y: 3, w: 4, h: 2, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
    ],
  },
  {
    id: 'suivi-budget',
    name: 'Suivi de Budget',
    description: 'Optimisé pour suivre vos budgets et limites de dépenses',
    icon: '💰',
    category: 'tracking',
    widgets: [
      {
        type: 'solde',
        position: { x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'budget-progress',
        position: { x: 6, y: 0, w: 6, h: 3, minW: 4, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'expenses-chart',
        position: { x: 0, y: 2, w: 6, h: 3, minW: 4, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'categories',
        position: { x: 6, y: 3, w: 6, h: 2, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
    ],
  },
  {
    id: 'minimaliste',
    name: 'Minimaliste',
    description: 'Dashboard épuré avec les informations essentielles',
    icon: '✨',
    category: 'overview',
    widgets: [
      {
        type: 'solde',
        position: { x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'balance-line',
        position: { x: 0, y: 2, w: 8, h: 3, minW: 4, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'transactions',
        position: { x: 8, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
    ],
  },
  {
    id: 'graphiques-detailles',
    name: 'Graphiques Détaillés',
    description: 'Maximum de visualisations pour une analyse complète',
    icon: '📉',
    category: 'analysis',
    widgets: [
      {
        type: 'balance-line',
        position: { x: 0, y: 0, w: 6, h: 3, minW: 4, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'expenses-chart',
        position: { x: 6, y: 0, w: 6, h: 3, minW: 4, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'category-pie',
        position: { x: 0, y: 3, w: 6, h: 3, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'categories',
        position: { x: 6, y: 3, w: 6, h: 3, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
    ],
  },
  {
    id: 'garanties-focus',
    name: 'Focus Garanties',
    description: 'Suivi prioritaire des garanties et achats importants',
    icon: '🛡️',
    category: 'tracking',
    widgets: [
      {
        type: 'garanties',
        position: { x: 0, y: 0, w: 12, h: 3, minW: 6, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'solde',
        position: { x: 0, y: 3, w: 4, h: 2, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'transactions',
        position: { x: 4, y: 3, w: 4, h: 2, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'categories',
        position: { x: 8, y: 3, w: 4, h: 2, minW: 3, minH: 2 },
        isVisible: true,
        isLocked: false,
      },
    ],
  },
];

export function getTemplateById(id: string): DashboardTemplate | undefined {
  return DASHBOARD_TEMPLATES.find((template) => template.id === id);
}

export function getTemplatesByCategory(category: DashboardTemplate['category']): DashboardTemplate[] {
  return DASHBOARD_TEMPLATES.filter((template) => template.category === category);
}
