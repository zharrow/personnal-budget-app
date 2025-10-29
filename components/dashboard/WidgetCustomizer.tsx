'use client';

import { useState, useEffect } from 'react';
import { WidgetConfig, WidgetSize, WidgetDisplayMode } from '@/types';
import { useWidgets } from '@/contexts/WidgetContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Lock, Unlock, Maximize2, Minimize2, Eye, EyeOff, Sliders } from 'lucide-react';
import { WidgetPreview } from './WidgetPreview';

interface WidgetCustomizerProps {
  widget: WidgetConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WidgetCustomizer({
  widget,
  open,
  onOpenChange,
}: WidgetCustomizerProps) {
  const {
    resizeWidget,
    updateWidgetSettings,
    toggleWidgetLock,
    toggleWidgetVisibility,
    removeWidget,
    updateWidgetPosition,
  } = useWidgets();

  const [customWidth, setCustomWidth] = useState(widget.position.w);
  const [customHeight, setCustomHeight] = useState(widget.position.h);

  // Mettre à jour les états locaux quand le widget change
  useEffect(() => {
    setCustomWidth(widget.position.w);
    setCustomHeight(widget.position.h);
  }, [widget.position.w, widget.position.h]);

  const handleSizeChange = (size: WidgetSize) => {
    resizeWidget(widget.id, size);
  };

  const handleDisplayModeChange = (mode: WidgetDisplayMode) => {
    updateWidgetSettings(widget.id, { displayMode: mode });
  };

  const handleTitleToggle = (checked: boolean) => {
    updateWidgetSettings(widget.id, { showTitle: checked });
  };

  const handleCustomSizeApply = () => {
    updateWidgetPosition(
      widget.id,
      widget.position.x,
      widget.position.y,
      customWidth,
      customHeight
    );
  };

  // Créer un widget temporaire pour la prévisualisation avec les valeurs en cours de modification
  const previewWidget: WidgetConfig = {
    ...widget,
    position: {
      ...widget.position,
      w: customWidth,
      h: customHeight,
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1600px] h-[90vh] overflow-hidden p-0 gap-0">
        <div className="p-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle>Personnaliser le widget</DialogTitle>
            <DialogDescription>
              {widget.title} - Ajustez l'apparence et le comportement
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid grid-cols-[1fr,500px] gap-0 flex-1 overflow-hidden">
          {/* Colonne gauche : Aperçu en direct */}
          <div className="p-8 bg-gradient-to-br from-muted/30 to-muted/10 overflow-y-auto border-r-2 border-border">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-xl">Aperçu en direct</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Prévisualisation à l'échelle réelle du widget
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg border shadow-sm">
                  <div className="text-xs text-muted-foreground">Dimensions</div>
                  <div className="text-sm font-mono font-bold text-primary">
                    {customWidth} × {customHeight}
                  </div>
                </div>
              </div>

              {/* Conteneur de prévisualisation avec grille en fond */}
              <div className="flex-1 relative rounded-xl border-2 border-dashed border-primary/30 bg-background/50 backdrop-blur-sm p-8">
                {/* Grille de fond pour visualiser l'espace */}
                <div
                  className="absolute inset-8 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                      linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Widget en taille réelle */}
                <div className="relative h-full flex items-center justify-center">
                  <div className="w-full max-w-4xl">
                    <WidgetPreview
                      widget={previewWidget}
                      width={customWidth}
                      height={customHeight}
                    />
                  </div>
                </div>
              </div>

              {/* Informations résumées en bas */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center px-4 py-3 bg-background/80 backdrop-blur-sm rounded-lg border">
                    <span className="text-sm text-muted-foreground">Largeur</span>
                    <span className="font-mono font-bold text-base">
                      {customWidth}
                      {customWidth !== widget.position.w && (
                        <span className="text-orange-500 ml-1">*</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 bg-background/80 backdrop-blur-sm rounded-lg border">
                    <span className="text-sm text-muted-foreground">Hauteur</span>
                    <span className="font-mono font-bold text-base">
                      {customHeight}
                      {customHeight !== widget.position.h && (
                        <span className="text-orange-500 ml-1">*</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center px-4 py-3 bg-background/80 backdrop-blur-sm rounded-lg border">
                    <span className="text-sm text-muted-foreground">Mode</span>
                    <span className="font-semibold text-sm capitalize">
                      {previewWidget.settings.displayMode || 'normal'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 bg-background/80 backdrop-blur-sm rounded-lg border">
                    <span className="text-sm text-muted-foreground">Titre</span>
                    <span className="font-semibold text-sm">
                      {previewWidget.settings.showTitle !== false ? 'Affiché' : 'Masqué'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Légende des modifications */}
              {(customWidth !== widget.position.w || customHeight !== widget.position.h) && (
                <div className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <span className="text-orange-500 font-bold">*</span>
                  <span className="text-sm text-orange-600 font-medium">
                    Modifications non appliquées - Cliquez sur "Appliquer les dimensions"
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Colonne droite : Contrôles de personnalisation */}
          <div className="overflow-y-auto p-6 bg-background">
            <Tabs defaultValue="size" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="size">Taille</TabsTrigger>
            <TabsTrigger value="display">Affichage</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
          </TabsList>

          <TabsContent value="size" className="space-y-6">
            <div className="space-y-2">
              <Label>Tailles prédéfinies</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={widget.settings.size === 'small' ? 'default' : 'outline'}
                  onClick={() => handleSizeChange('small')}
                  className="justify-start"
                >
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Petit
                </Button>
                <Button
                  variant={widget.settings.size === 'medium' ? 'default' : 'outline'}
                  onClick={() => handleSizeChange('medium')}
                  className="justify-start"
                >
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Moyen
                </Button>
                <Button
                  variant={widget.settings.size === 'large' ? 'default' : 'outline'}
                  onClick={() => handleSizeChange('large')}
                  className="justify-start"
                >
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Grand
                </Button>
                <Button
                  variant={widget.settings.size === 'xlarge' ? 'default' : 'outline'}
                  onClick={() => handleSizeChange('xlarge')}
                  className="justify-start"
                >
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Très grand
                </Button>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-muted-foreground" />
                <Label>Dimensions personnalisées</Label>
              </div>

              <div className="space-y-4 p-4 rounded-lg bg-muted/50 border">
                {/* Largeur */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Largeur</Label>
                    <span className="text-sm font-mono font-semibold text-primary">
                      {customWidth} unités
                    </span>
                  </div>
                  <Slider
                    value={[customWidth]}
                    onValueChange={(value) => setCustomWidth(value[0])}
                    min={widget.position.minW || 2}
                    max={widget.position.maxW || 12}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Min: {widget.position.minW || 2} • Max: {widget.position.maxW || 12}
                  </p>
                </div>

                {/* Hauteur */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Hauteur</Label>
                    <span className="text-sm font-mono font-semibold text-primary">
                      {customHeight} unités
                    </span>
                  </div>
                  <Slider
                    value={[customHeight]}
                    onValueChange={(value) => setCustomHeight(value[0])}
                    min={widget.position.minH || 2}
                    max={widget.position.maxH || 6}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Min: {widget.position.minH || 2} • Max: {widget.position.maxH || 6}
                  </p>
                </div>

                <Button
                  onClick={handleCustomSizeApply}
                  className="w-full"
                  variant="default"
                  disabled={customWidth === widget.position.w && customHeight === widget.position.h}
                >
                  Appliquer les dimensions
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dimensions actuelles</Label>
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted">
                <div>
                  <p className="text-sm text-muted-foreground">Largeur</p>
                  <p className="text-2xl font-bold">{widget.position.w}</p>
                  <p className="text-xs text-muted-foreground">unités de grille</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hauteur</p>
                  <p className="text-2xl font-bold">{widget.position.h}</p>
                  <p className="text-xs text-muted-foreground">unités de grille</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="display" className="space-y-4">
            <div className="space-y-2">
              <Label>Mode d'affichage</Label>
              <Select
                value={widget.settings.displayMode || 'normal'}
                onValueChange={handleDisplayModeChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">
                    <div className="flex flex-col">
                      <span>Compact</span>
                      <span className="text-xs text-muted-foreground">
                        Affichage minimaliste
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="normal">
                    <div className="flex flex-col">
                      <span>Normal</span>
                      <span className="text-xs text-muted-foreground">
                        Affichage standard
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="detailed">
                    <div className="flex flex-col">
                      <span>Détaillé</span>
                      <span className="text-xs text-muted-foreground">
                        Toutes les informations
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Afficher le titre</Label>
                <p className="text-sm text-muted-foreground">
                  Masquer le titre du widget pour gagner de l'espace
                </p>
              </div>
              <Switch
                checked={widget.settings.showTitle !== false}
                onCheckedChange={handleTitleToggle}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  {widget.isLocked ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Unlock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="space-y-0.5">
                    <Label>Verrouiller la position</Label>
                    <p className="text-sm text-muted-foreground">
                      Empêche le déplacement et le redimensionnement
                    </p>
                  </div>
                </div>
                <Switch
                  checked={widget.isLocked || false}
                  onCheckedChange={() => toggleWidgetLock(widget.id)}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  {widget.isVisible ? (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="space-y-0.5">
                    <Label>Visibilité du widget</Label>
                    <p className="text-sm text-muted-foreground">
                      Masquer temporairement ce widget
                    </p>
                  </div>
                </div>
                <Switch
                  checked={widget.isVisible}
                  onCheckedChange={() => toggleWidgetVisibility(widget.id)}
                />
              </div>

              <div className="rounded-lg border border-destructive/50 p-4">
                <div className="space-y-2">
                  <Label className="text-destructive">Zone de danger</Label>
                  <p className="text-sm text-muted-foreground">
                    Supprimer définitivement ce widget du dashboard
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      removeWidget(widget.id);
                      onOpenChange(false);
                    }}
                    className="w-full"
                  >
                    Supprimer le widget
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t bg-background">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
