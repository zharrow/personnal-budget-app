'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { WidgetConfig, GridLayoutPreset, WidgetSize, WidgetSettings } from '@/types';
import { GRID_PRESETS, DEFAULT_LAYOUTS, applyWidgetSize } from '@/lib/grid-presets';
import { DashboardTemplate } from '@/lib/dashboardTemplates';

interface WidgetContextType {
  widgets: WidgetConfig[];
  currentLayout: GridLayoutPreset;
  updateWidgetPosition: (id: string, x: number, y: number, w: number, h: number) => void;
  updateWidgetSettings: (id: string, settings: Partial<WidgetSettings>) => void;
  toggleWidgetVisibility: (id: string) => void;
  toggleWidgetLock: (id: string) => void;
  applyLayoutPreset: (presetId: string) => void;
  applyTemplate: (template: DashboardTemplate) => void;
  changeGridPreset: (presetId: string) => void;
  resizeWidget: (id: string, size: WidgetSize) => void;
  resetWidgets: () => void;
  addWidget: (widget: WidgetConfig) => void;
  removeWidget: (id: string) => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  isSandboxMode: boolean;
  setIsSandboxMode: (mode: boolean) => void;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

const defaultLayoutId = 'classic';
const defaultWidgets = DEFAULT_LAYOUTS[defaultLayoutId];

export function WidgetProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);
  const [currentLayout, setCurrentLayout] = useState<GridLayoutPreset>(
    GRID_PRESETS.find((p) => p.id === defaultLayoutId) || GRID_PRESETS[0]
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSandboxMode, setIsSandboxMode] = useState(false);

  const updateWidgetPosition = (id: string, x: number, y: number, w: number, h: number) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? {
              ...widget,
              position: {
                ...widget.position,
                x,
                y,
                w,
                h,
              },
            }
          : widget
      )
    );
  };

  const updateWidgetSettings = (id: string, settings: Partial<WidgetSettings>) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? {
              ...widget,
              settings: {
                ...widget.settings,
                ...settings,
              },
            }
          : widget
      )
    );
  };

  const toggleWidgetVisibility = (id: string) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? { ...widget, isVisible: !widget.isVisible }
          : widget
      )
    );
  };

  const toggleWidgetLock = (id: string) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? { ...widget, isLocked: !widget.isLocked }
          : widget
      )
    );
  };

  const applyLayoutPreset = (presetId: string) => {
    const preset = DEFAULT_LAYOUTS[presetId];
    if (preset) {
      setWidgets(preset);
    }
  };

  const applyTemplate = (template: DashboardTemplate) => {
    // Convertir les widgets du template en WidgetConfig complets
    const newWidgets: WidgetConfig[] = template.widgets.map((widgetData, index) => ({
      id: widgetData.type,
      type: widgetData.type,
      title: getWidgetTitle(widgetData.type),
      position: widgetData.position,
      settings: {},
      isVisible: widgetData.isVisible,
      isLocked: widgetData.isLocked,
    }));

    setWidgets(newWidgets);
  };

  // Fonction helper pour obtenir le titre d'un widget
  const getWidgetTitle = (type: string): string => {
    const titles: Record<string, string> = {
      'solde': 'Solde Global',
      'categories': 'Dépenses par Catégorie',
      'garanties': 'Garanties',
      'transactions': 'Transactions Récentes',
      'expenses-chart': 'Graphique des Dépenses',
      'category-pie': 'Répartition par Catégorie',
      'balance-line': 'Évolution du Solde',
      'budget-progress': 'Suivi du Budget',
    };
    return titles[type] || type;
  };

  const changeGridPreset = (presetId: string) => {
    const preset = GRID_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setCurrentLayout(preset);

      // Ajuster les widgets à la nouvelle grille
      setWidgets((prev) =>
        prev.map((widget) => {
          const ratio = preset.columns / currentLayout.columns;
          return {
            ...widget,
            position: {
              ...widget.position,
              x: Math.round(widget.position.x * ratio),
              w: Math.max(1, Math.round(widget.position.w * ratio)),
            },
          };
        })
      );
    }
  };

  const resizeWidget = (id: string, size: WidgetSize) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id ? applyWidgetSize(widget, size) : widget
      )
    );
  };

  const resetWidgets = () => {
    setWidgets(defaultWidgets);
    setCurrentLayout(GRID_PRESETS[0]);
  };

  const addWidget = (widget: WidgetConfig) => {
    setWidgets((prev) => [...prev, widget]);
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <WidgetContext.Provider
      value={{
        widgets,
        currentLayout,
        updateWidgetPosition,
        updateWidgetSettings,
        toggleWidgetVisibility,
        toggleWidgetLock,
        applyLayoutPreset,
        applyTemplate,
        changeGridPreset,
        resizeWidget,
        resetWidgets,
        addWidget,
        removeWidget,
        isEditMode,
        setIsEditMode,
        isSandboxMode,
        setIsSandboxMode,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidgets() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgets must be used within a WidgetProvider');
  }
  return context;
}
