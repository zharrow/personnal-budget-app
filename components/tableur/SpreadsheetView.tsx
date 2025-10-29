'use client';

import { SpreadsheetTemplate, SpreadsheetRow } from '@/lib/spreadsheetTemplates';
import { MOCK_MONTHLY_BUDGET, MonthlyBudgetRow, MOCK_BUDGET_SUMMARY } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface SpreadsheetViewProps {
  template: SpreadsheetTemplate;
}

export function SpreadsheetView({ template }: SpreadsheetViewProps) {
  // Générer les données en fonction du template
  const generateRows = (): SpreadsheetRow[] => {
    if (template.id === 'budget-mensuel-simple') {
      const rows: SpreadsheetRow[] = [];

      // Header Revenus
      rows.push({
        id: 'header-revenus',
        cells: { categorie: 'REVENUS', janvier: '', fevrier: '', mars: '', avril: '', total: '' },
        style: { backgroundColor: '#e8f5e9', fontWeight: 'bold', fontSize: 14 },
        isHeader: true,
      });

      // Données revenus
      MOCK_MONTHLY_BUDGET.filter(r => r.type === 'revenu').forEach((row, idx) => {
        rows.push({
          id: `revenu-${idx}`,
          cells: {
            categorie: row.categorie,
            janvier: row.janvier,
            fevrier: row.fevrier,
            mars: row.mars,
            avril: row.avril,
            total: row.total,
          },
        });
      });

      // Total revenus
      const totalRevenus = MOCK_MONTHLY_BUDGET.filter(r => r.type === 'revenu')
        .reduce((acc, r) => ({
          janvier: acc.janvier + r.janvier,
          fevrier: acc.fevrier + r.fevrier,
          mars: acc.mars + r.mars,
          avril: acc.avril + r.avril,
          total: acc.total + r.total,
        }), { janvier: 0, fevrier: 0, mars: 0, avril: 0, total: 0 });

      rows.push({
        id: 'total-revenus',
        cells: {
          categorie: 'Total Revenus',
          janvier: totalRevenus.janvier,
          fevrier: totalRevenus.fevrier,
          mars: totalRevenus.mars,
          avril: totalRevenus.avril,
          total: totalRevenus.total,
        },
        style: { backgroundColor: '#c8e6c9', fontWeight: 'bold' },
        isTotal: true,
      });

      // Ligne vide
      rows.push({
        id: 'empty-1',
        cells: { categorie: '', janvier: '', fevrier: '', mars: '', avril: '', total: '' },
      });

      // Header Dépenses
      rows.push({
        id: 'header-depenses',
        cells: { categorie: 'DÉPENSES', janvier: '', fevrier: '', mars: '', avril: '', total: '' },
        style: { backgroundColor: '#ffebee', fontWeight: 'bold', fontSize: 14 },
        isHeader: true,
      });

      // Données dépenses
      MOCK_MONTHLY_BUDGET.filter(r => r.type === 'depense').forEach((row, idx) => {
        rows.push({
          id: `depense-${idx}`,
          cells: {
            categorie: row.categorie,
            janvier: row.janvier,
            fevrier: row.fevrier,
            mars: row.mars,
            avril: row.avril,
            total: row.total,
          },
        });
      });

      // Total dépenses
      const totalDepenses = MOCK_MONTHLY_BUDGET.filter(r => r.type === 'depense')
        .reduce((acc, r) => ({
          janvier: acc.janvier + r.janvier,
          fevrier: acc.fevrier + r.fevrier,
          mars: acc.mars + r.mars,
          avril: acc.avril + r.avril,
          total: acc.total + r.total,
        }), { janvier: 0, fevrier: 0, mars: 0, avril: 0, total: 0 });

      rows.push({
        id: 'total-depenses',
        cells: {
          categorie: 'Total Dépenses',
          janvier: totalDepenses.janvier,
          fevrier: totalDepenses.fevrier,
          mars: totalDepenses.mars,
          avril: totalDepenses.avril,
          total: totalDepenses.total,
        },
        style: { backgroundColor: '#ffcdd2', fontWeight: 'bold' },
        isTotal: true,
      });

      // Ligne vide
      rows.push({
        id: 'empty-2',
        cells: { categorie: '', janvier: '', fevrier: '', mars: '', avril: '', total: '' },
      });

      // Solde
      rows.push({
        id: 'solde',
        cells: {
          categorie: 'SOLDE (Revenus - Dépenses)',
          janvier: totalRevenus.janvier - totalDepenses.janvier,
          fevrier: totalRevenus.fevrier - totalDepenses.fevrier,
          mars: totalRevenus.mars - totalDepenses.mars,
          avril: totalRevenus.avril - totalDepenses.avril,
          total: totalRevenus.total - totalDepenses.total,
        },
        style: { backgroundColor: '#e3f2fd', fontWeight: 'bold', fontSize: 15 },
        isTotal: true,
      });

      return rows;
    }

    if (template.id === 'budget-familial-detaille') {
      const rows: SpreadsheetRow[] = [];

      // Header
      rows.push({
        id: 'header-main',
        cells: { categorie: 'BUDGET FAMILIAL DÉTAILLÉ', budgetPrevu: '', depenseReel: '', ecart: '', pourcentage: '' },
        style: { backgroundColor: '#e3f2fd', fontWeight: 'bold', fontSize: 14 },
        isHeader: true,
      });

      // Revenus
      rows.push({
        id: 'revenus',
        cells: { categorie: 'Revenus totaux', budgetPrevu: 10750, depenseReel: 10750, ecart: 0, pourcentage: 100 },
        style: { backgroundColor: '#e8f5e9', fontWeight: 'bold' },
      });

      // Dépenses détaillées
      MOCK_MONTHLY_BUDGET.filter(r => r.type === 'depense').forEach((row, idx) => {
        const budgetPrevu = row.total * 1.1; // Budget prévu légèrement supérieur
        const ecart = budgetPrevu - row.total;
        const pourcentage = (row.total / budgetPrevu) * 100;

        rows.push({
          id: `depense-${idx}`,
          cells: {
            categorie: row.categorie,
            budgetPrevu: Math.round(budgetPrevu),
            depenseReel: row.total,
            ecart: Math.round(ecart),
            pourcentage: Math.round(pourcentage),
          },
        });
      });

      // Total dépenses
      const totalBudgetPrevu = Math.round(MOCK_BUDGET_SUMMARY.totalDepenses * 1.1);
      const totalEcart = totalBudgetPrevu - MOCK_BUDGET_SUMMARY.totalDepenses;

      rows.push({
        id: 'total-depenses',
        cells: {
          categorie: 'Total Dépenses',
          budgetPrevu: totalBudgetPrevu,
          depenseReel: MOCK_BUDGET_SUMMARY.totalDepenses,
          ecart: Math.round(totalEcart),
          pourcentage: Math.round((MOCK_BUDGET_SUMMARY.totalDepenses / totalBudgetPrevu) * 100),
        },
        style: { backgroundColor: '#ffcdd2', fontWeight: 'bold' },
        isTotal: true,
      });

      return rows;
    }

    if (template.id === 'suivi-epargne') {
      const rows: SpreadsheetRow[] = [];
      const mois = ['Janvier', 'Février', 'Mars', 'Avril'];
      let soldeDebut = 5000;

      mois.forEach((mois, idx) => {
        const monthData = MOCK_MONTHLY_BUDGET.reduce((acc, r) => {
          const monthKey = ['janvier', 'fevrier', 'mars', 'avril'][idx] as 'janvier' | 'fevrier' | 'mars' | 'avril';
          if (r.type === 'revenu') {
            acc.revenus += r[monthKey];
          } else {
            acc.depenses += r[monthKey];
          }
          return acc;
        }, { revenus: 0, depenses: 0 });

        const epargne = monthData.revenus * 0.15; // 15% d'épargne
        const soldeFin = soldeDebut + monthData.revenus - monthData.depenses - epargne;

        rows.push({
          id: `mois-${idx}`,
          cells: {
            mois,
            soldeDebut: Math.round(soldeDebut),
            revenus: monthData.revenus,
            depenses: monthData.depenses,
            epargne: Math.round(epargne),
            soldeFin: Math.round(soldeFin),
          },
        });

        soldeDebut = soldeFin;
      });

      // Ligne totale
      rows.push({
        id: 'total',
        cells: {
          mois: 'TOTAL / MOYENNE',
          soldeDebut: 5000,
          revenus: MOCK_BUDGET_SUMMARY.totalRevenus,
          depenses: MOCK_BUDGET_SUMMARY.totalDepenses,
          epargne: Math.round(MOCK_BUDGET_SUMMARY.totalRevenus * 0.15),
          soldeFin: Math.round(soldeDebut),
        },
        style: { backgroundColor: '#e3f2fd', fontWeight: 'bold' },
        isTotal: true,
      });

      return rows;
    }

    if (template.id === 'tableau-annuel') {
      const rows: SpreadsheetRow[] = [];

      // Header Revenus
      rows.push({
        id: 'header-revenus',
        cells: {
          categorie: 'REVENUS',
          jan: '', fev: '', mar: '', avr: '', mai: '', jun: '',
          jul: '', aou: '', sep: '', oct: '', nov: '', dec: '',
          total: '', moyenne: ''
        },
        style: { backgroundColor: '#e8f5e9', fontWeight: 'bold', fontSize: 14 },
        isHeader: true,
      });

      // Salaire sur 12 mois
      rows.push({
        id: 'salaire',
        cells: {
          categorie: 'Salaire',
          jan: 2500, fev: 2500, mar: 2500, avr: 2500, mai: 2500, jun: 2500,
          jul: 2500, aou: 2500, sep: 2500, oct: 2500, nov: 2500, dec: 2500,
          total: 30000, moyenne: 2500
        },
      });

      // Total revenus
      rows.push({
        id: 'total-revenus',
        cells: {
          categorie: 'Total Revenus',
          jan: 2500, fev: 2500, mar: 2500, avr: 2500, mai: 2500, jun: 2500,
          jul: 2500, aou: 2500, sep: 2500, oct: 2500, nov: 2500, dec: 2500,
          total: 30000, moyenne: 2500
        },
        style: { backgroundColor: '#c8e6c9', fontWeight: 'bold' },
        isTotal: true,
      });

      // Ligne vide
      rows.push({
        id: 'empty-1',
        cells: {
          categorie: '',
          jan: '', fev: '', mar: '', avr: '', mai: '', jun: '',
          jul: '', aou: '', sep: '', oct: '', nov: '', dec: '',
          total: '', moyenne: ''
        },
      });

      // Header Dépenses
      rows.push({
        id: 'header-depenses',
        cells: {
          categorie: 'DÉPENSES',
          jan: '', fev: '', mar: '', avr: '', mai: '', jun: '',
          jul: '', aou: '', sep: '', oct: '', nov: '', dec: '',
          total: '', moyenne: ''
        },
        style: { backgroundColor: '#ffebee', fontWeight: 'bold', fontSize: 14 },
        isHeader: true,
      });

      // Catégories principales de dépenses sur l'année
      const depenseCategories = [
        { categorie: 'Logement', mensuel: 850 },
        { categorie: 'Alimentation', mensuel: 380 },
        { categorie: 'Transport', mensuel: 180 },
        { categorie: 'Loisirs', mensuel: 100 },
      ];

      depenseCategories.forEach((cat, idx) => {
        rows.push({
          id: `depense-annuel-${idx}`,
          cells: {
            categorie: cat.categorie,
            jan: cat.mensuel, fev: cat.mensuel, mar: cat.mensuel, avr: cat.mensuel,
            mai: cat.mensuel, jun: cat.mensuel, jul: cat.mensuel, aou: cat.mensuel,
            sep: cat.mensuel, oct: cat.mensuel, nov: cat.mensuel, dec: cat.mensuel,
            total: cat.mensuel * 12,
            moyenne: cat.mensuel
          },
        });
      });

      // Total dépenses
      const totalDepenseMensuel = depenseCategories.reduce((acc, c) => acc + c.mensuel, 0);
      rows.push({
        id: 'total-depenses-annuel',
        cells: {
          categorie: 'Total Dépenses',
          jan: totalDepenseMensuel, fev: totalDepenseMensuel, mar: totalDepenseMensuel,
          avr: totalDepenseMensuel, mai: totalDepenseMensuel, jun: totalDepenseMensuel,
          jul: totalDepenseMensuel, aou: totalDepenseMensuel, sep: totalDepenseMensuel,
          oct: totalDepenseMensuel, nov: totalDepenseMensuel, dec: totalDepenseMensuel,
          total: totalDepenseMensuel * 12,
          moyenne: totalDepenseMensuel
        },
        style: { backgroundColor: '#ffcdd2', fontWeight: 'bold' },
        isTotal: true,
      });

      return rows;
    }

    if (template.id === 'depenses-categories') {
      const rows: SpreadsheetRow[] = [];

      // Categories de dépenses
      const categoriesData = [
        { categorie: 'Logement (Loyer + charges)', montant: 850, frequence: 'Mensuel', mensuel: 850 },
        { categorie: 'Alimentation', montant: 380, frequence: 'Mensuel', mensuel: 380 },
        { categorie: 'Transport', montant: 180, frequence: 'Mensuel', mensuel: 180 },
        { categorie: 'Assurances', montant: 240, frequence: 'Trimestriel', mensuel: 80 },
        { categorie: 'Loisirs & Sorties', montant: 100, frequence: 'Mensuel', mensuel: 100 },
        { categorie: 'Santé', montant: 50, frequence: 'Mensuel', mensuel: 50 },
        { categorie: 'Vêtements', montant: 200, frequence: 'Trimestriel', mensuel: 67 },
        { categorie: 'Électronique', montant: 100, frequence: 'Annuel', mensuel: 8 },
      ];

      const totalMensuel = categoriesData.reduce((acc, c) => acc + c.mensuel, 0);

      categoriesData.forEach((cat, idx) => {
        const pourcentage = (cat.mensuel / totalMensuel) * 100;
        rows.push({
          id: `cat-${idx}`,
          cells: {
            categorie: cat.categorie,
            montant: cat.montant,
            frequence: cat.frequence,
            mensuel: cat.mensuel,
            pourcentage: Math.round(pourcentage),
            notes: '',
          },
        });
      });

      // Total
      rows.push({
        id: 'total-categories',
        cells: {
          categorie: 'TOTAL MENSUEL',
          montant: '',
          frequence: '',
          mensuel: Math.round(totalMensuel),
          pourcentage: 100,
          notes: '',
        },
        style: { backgroundColor: '#e3f2fd', fontWeight: 'bold' },
        isTotal: true,
      });

      return rows;
    }

    return [];
  };

  const rows = generateRows();

  const formatCellValue = (value: any, columnType: string) => {
    if (value === '' || value === null || value === undefined) return '';

    if (columnType === 'currency') {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(value);
    }

    return value;
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/80">
              {template.columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left text-sm font-semibold border-r border-border last:border-r-0"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={cn(
                  'border-b border-border hover:bg-muted/30 transition-colors',
                  row.isHeader && 'bg-muted/50',
                  row.isTotal && 'bg-muted/40'
                )}
                style={{
                  backgroundColor: row.style?.backgroundColor,
                }}
              >
                {template.columns.map((column) => {
                  const cellValue = row.cells[column.id];
                  const isNumeric = column.type === 'currency' || column.type === 'number';
                  const isSoldeNegative = row.id === 'solde' && typeof cellValue === 'number' && cellValue < 0;

                  return (
                    <td
                      key={column.id}
                      className={cn(
                        'px-4 py-2.5 text-sm border-r border-border last:border-r-0',
                        isNumeric && 'text-right font-medium',
                        row.style?.fontWeight === 'bold' && 'font-semibold',
                        isSoldeNegative && 'text-destructive'
                      )}
                      style={{
                        fontSize: row.style?.fontSize,
                        fontWeight: row.style?.fontWeight,
                        color: row.style?.color,
                      }}
                    >
                      {formatCellValue(cellValue, column.type)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
