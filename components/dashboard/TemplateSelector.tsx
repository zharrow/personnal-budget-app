'use client';

import { useState } from 'react';
import { DASHBOARD_TEMPLATES, DashboardTemplate } from '@/lib/dashboardTemplates';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutTemplate, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  onSelectTemplate: (template: DashboardTemplate) => void;
  currentTemplateId?: string;
}

export function TemplateSelector({ onSelectTemplate, currentTemplateId }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<DashboardTemplate['category']>('overview');

  const categories = [
    { value: 'overview', label: 'Vue d\'ensemble' },
    { value: 'analysis', label: 'Analyse' },
    { value: 'tracking', label: 'Suivi' },
  ];

  const handleSelectTemplate = (template: DashboardTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  const filteredTemplates = DASHBOARD_TEMPLATES.filter(
    (template) => template.category === selectedCategory
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <LayoutTemplate className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choisir un Template de Dashboard</DialogTitle>
          <DialogDescription>
            Sélectionnez un template pré-configuré pour organiser rapidement votre dashboard
          </DialogDescription>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={cn(
                    'group relative rounded-lg border-2 p-6 text-left transition-all hover:border-primary',
                    currentTemplateId === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card'
                  )}
                  style={{
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {/* Badge si template actuel */}
                  {currentTemplateId === template.id && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      <Check className="h-3 w-3" />
                      Actif
                    </div>
                  )}

                  {/* Icône et titre */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl" aria-hidden="true">
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>

                  {/* Nombre de widgets */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{template.widgets.length} widgets</span>
                    </div>
                  </div>

                  {/* Effet hover */}
                  <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
          <p>
            💡 <strong>Astuce :</strong> Après avoir appliqué un template, vous pouvez toujours
            personnaliser la position et la taille des widgets en activant le mode édition.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
