'use client';

import { useState } from 'react';
import { SPREADSHEET_TEMPLATES, SpreadsheetTemplate } from '@/lib/spreadsheetTemplates';
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
import { FileSpreadsheet, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TemplateSelectorProps {
  onSelectTemplate: (template: SpreadsheetTemplate) => void;
  currentTemplateId?: string;
}

export function TemplateSelector({ onSelectTemplate, currentTemplateId }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SpreadsheetTemplate['category']>('mensuel');

  const categories = [
    { value: 'mensuel', label: 'Mensuel' },
    { value: 'annuel', label: 'Annuel' },
    { value: 'familial', label: 'Familial' },
    { value: 'perso', label: 'Personnel' },
  ];

  const handleSelectTemplate = (template: SpreadsheetTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  const filteredTemplates = SPREADSHEET_TEMPLATES.filter(
    (template) => template.category === selectedCategory
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choisir un Template de Tableur</DialogTitle>
          <DialogDescription>
            Sélectionnez un template pour organiser rapidement votre budget
          </DialogDescription>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={cn(
                    'group relative rounded-lg border-2 p-4 text-left transition-all hover:border-primary',
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
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground z-10">
                      <Check className="h-3 w-3" />
                      Actif
                    </div>
                  )}

                  {/* Preview Image */}
                  {template.previewImage && (
                    <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={template.previewImage}
                        alt={template.name}
                        fill
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}

                  {/* Icône et titre */}
                  <div className="flex items-start gap-3">
                    <div className="text-3xl" aria-hidden="true">
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Nombre de colonnes */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{template.columns.length} colonnes</span>
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
            💡 <strong>Astuce :</strong> Les templates sont pré-remplis avec vos données pour une
            visualisation immédiate. Vous pourrez modifier toutes les cellules après sélection.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
