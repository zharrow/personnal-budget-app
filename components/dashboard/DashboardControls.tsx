'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useWidgets } from '@/contexts/WidgetContext';
import { GRID_PRESETS, DEFAULT_LAYOUTS } from '@/lib/grid-presets';
import { Settings, Eye, RotateCcw, Edit3, Check, Grid3x3, Layout, Save } from 'lucide-react';
import { GridLayoutPreset } from '@/types';
import { TemplateSelector } from './TemplateSelector';
import { DashboardTemplate } from '@/lib/dashboardTemplates';

interface DashboardControlsProps {
  onPresetHover?: (preset: GridLayoutPreset | null) => void;
  onLayoutHover?: (layoutId: string | null) => void;
}

export function DashboardControls({ onPresetHover, onLayoutHover }: DashboardControlsProps) {
  const {
    widgets,
    currentLayout,
    toggleWidgetVisibility,
    resetWidgets,
    isEditMode,
    setIsEditMode,
    changeGridPreset,
    applyLayoutPreset,
    applyTemplate,
    saveDashboard,
    hasUnsavedChanges,
  } = useWidgets();

  const handleModeToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleGridPresetChange = (presetId: string) => {
    changeGridPreset(presetId);
    // Réinitialiser le hover après sélection pour masquer l'overlay
    setTimeout(() => onPresetHover?.(null), 100);
  };

  const handleLayoutPresetApply = (layoutId: string) => {
    applyLayoutPreset(layoutId);
    // Réinitialiser le hover après sélection pour masquer l'overlay
    setTimeout(() => onLayoutHover?.(null), 100);
  };

  const handleTemplateSelect = (template: DashboardTemplate) => {
    applyTemplate(template);
  };

  const handleSave = () => {
    saveDashboard();
  };

  return (
    <div className="flex items-center gap-2">
      {/* Template Selector */}
      <TemplateSelector onSelectTemplate={handleTemplateSelect} />

      {/* Bouton Sauvegarder */}
      {hasUnsavedChanges && (
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Sauvegarder
        </Button>
      )}

      {/* Mode Edition */}
      <Button
        variant={isEditMode ? 'default' : 'outline'}
        size="sm"
        onClick={handleModeToggle}
      >
        {isEditMode ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Terminer
          </>
        ) : (
          <>
            <Edit3 className="mr-2 h-4 w-4" />
            Personnaliser
          </>
        )}
      </Button>

      {/* Grille */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Grid3x3 className="mr-2 h-4 w-4" />
            Grille
            <span className="ml-2 text-xs text-muted-foreground">
              ({currentLayout.columns} col)
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Type de grille</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={currentLayout.id}
            onValueChange={handleGridPresetChange}
          >
            {GRID_PRESETS.map((preset) => (
              <DropdownMenuRadioItem
                key={preset.id}
                value={preset.id}
                onMouseEnter={() => onPresetHover?.(preset)}
                onMouseLeave={() => onPresetHover?.(null)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{preset.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {preset.description}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {preset.columns} colonnes · {preset.rowHeight}px · Gap {preset.gap}px
                  </span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Layouts prédéfinis */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Layout className="mr-2 h-4 w-4" />
            Layout
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Layouts prédéfinis</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.keys(DEFAULT_LAYOUTS).map((layoutId) => (
            <Button
              key={layoutId}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleLayoutPresetApply(layoutId)}
              onMouseEnter={() => onLayoutHover?.(layoutId)}
              onMouseLeave={() => onLayoutHover?.(null)}
            >
              <Layout className="mr-2 h-4 w-4" />
              {layoutId.charAt(0).toUpperCase() + layoutId.slice(1)}
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Widgets */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Widgets
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Afficher les widgets</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {widgets.map((widget) => (
            <DropdownMenuCheckboxItem
              key={widget.id}
              checked={widget.isVisible}
              onCheckedChange={() => toggleWidgetVisibility(widget.id)}
            >
              {widget.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Paramètres */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={resetWidgets}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
