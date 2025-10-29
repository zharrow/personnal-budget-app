'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpreadsheetTemplate, SPREADSHEET_TEMPLATES } from '@/lib/spreadsheetTemplates';
import { TemplateSelector } from '@/components/tableur/TemplateSelector';
import { SpreadsheetView } from '@/components/tableur/SpreadsheetView';
import { MOCK_MONTHLY_BUDGET, MOCK_BUDGET_SUMMARY } from '@/lib/mockData';
import { Download } from 'lucide-react';

export default function TableurPage() {
  const [currentTemplate, setCurrentTemplate] = useState<SpreadsheetTemplate>(
    SPREADSHEET_TEMPLATES[0] // Budget Mensuel Simple par défaut
  );

  const handleSelectTemplate = (template: SpreadsheetTemplate) => {
    setCurrentTemplate(template);
  };

  const handleExport = () => {
    // TODO: Implémenter l'export CSV/Excel
    alert('Export à venir...');
  };

  // Calculer les statistiques basées sur le template actuel
  const totalRevenus = MOCK_BUDGET_SUMMARY.totalRevenus;
  const totalDepenses = MOCK_BUDGET_SUMMARY.totalDepenses;
  const solde = MOCK_BUDGET_SUMMARY.solde;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Tableur Budgétaire
            </h1>
            <p className="text-muted-foreground">
              Organisez vos finances avec des templates personnalisés
            </p>
          </div>

          <div className="flex items-center gap-3">
            <TemplateSelector
              onSelectTemplate={handleSelectTemplate}
              currentTemplateId={currentTemplate.id}
            />
            <Button onClick={handleExport} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Revenus</p>
              <p className="text-3xl font-bold text-green-600">
                +{totalRevenus.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </p>
            </div>
          </Card>

          <Card className="p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Dépenses</p>
              <p className="text-3xl font-bold text-red-600">
                -{totalDepenses.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </p>
            </div>
          </Card>

          <Card className="p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Solde</p>
              <p className={`text-3xl font-bold ${solde >= 0 ? 'text-blue-600' : 'text-destructive'}`}>
                {solde.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </p>
            </div>
          </Card>
        </div>

        {/* Template Info */}
        <Card className="p-4 bg-muted/30" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{currentTemplate.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{currentTemplate.name}</h3>
              <p className="text-sm text-muted-foreground">{currentTemplate.description}</p>
            </div>
          </div>
        </Card>

        {/* Spreadsheet View */}
        <SpreadsheetView template={currentTemplate} />
      </div>
    </DashboardLayout>
  );
}
