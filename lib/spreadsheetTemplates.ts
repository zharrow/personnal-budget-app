export interface SpreadsheetTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'mensuel' | 'annuel' | 'perso' | 'familial';
  previewImage?: string;
  columns: SpreadsheetColumn[];
  rows: SpreadsheetRow[];
}

export interface SpreadsheetColumn {
  id: string;
  label: string;
  width: number;
  type: 'text' | 'number' | 'currency' | 'date' | 'formula';
  editable?: boolean;
}

export interface SpreadsheetRow {
  id: string;
  cells: Record<string, any>;
  style?: {
    backgroundColor?: string;
    fontWeight?: 'bold' | 'normal';
    fontSize?: number;
    color?: string;
  };
  isHeader?: boolean;
  isTotal?: boolean;
}

export const SPREADSHEET_TEMPLATES: SpreadsheetTemplate[] = [
  {
    id: 'budget-mensuel-simple',
    name: 'Budget Mensuel Simple',
    description: 'Suivez vos revenus et dépenses mois par mois',
    icon: '📅',
    category: 'mensuel',
    previewImage: '/excels/Budget-mensuel-familial-excel-gratuit-Radin-Malin.png',
    columns: [
      { id: 'categorie', label: 'Catégorie', width: 200, type: 'text', editable: false },
      { id: 'janvier', label: 'Janvier', width: 100, type: 'currency', editable: true },
      { id: 'fevrier', label: 'Février', width: 100, type: 'currency', editable: true },
      { id: 'mars', label: 'Mars', width: 100, type: 'currency', editable: true },
      { id: 'avril', label: 'Avril', width: 100, type: 'currency', editable: true },
      { id: 'total', label: 'Total', width: 120, type: 'currency', editable: false },
    ],
    rows: [], // Sera rempli dynamiquement
  },

  {
    id: 'budget-familial-detaille',
    name: 'Budget Familial Détaillé',
    description: 'Gestion complète des finances familiales avec catégories détaillées',
    icon: '👨‍👩‍👧‍👦',
    category: 'familial',
    previewImage: '/excels/Budget-mensuel-familial-excel-gratuit-Radin-Malin.png',
    columns: [
      { id: 'categorie', label: 'Catégorie', width: 220, type: 'text', editable: false },
      { id: 'budgetPrevu', label: 'Budget Prévu', width: 120, type: 'currency', editable: true },
      { id: 'depenseReel', label: 'Dépense Réelle', width: 120, type: 'currency', editable: true },
      { id: 'ecart', label: 'Écart', width: 100, type: 'currency', editable: false },
      { id: 'pourcentage', label: '%', width: 80, type: 'number', editable: false },
    ],
    rows: [],
  },

  {
    id: 'suivi-epargne',
    name: 'Suivi d\'Épargne',
    description: 'Suivez l\'évolution de votre épargne et vos objectifs',
    icon: '💰',
    category: 'perso',
    previewImage: '/excels/il_1080xN.2752248762_jq5e.png',
    columns: [
      { id: 'mois', label: 'Mois', width: 120, type: 'text', editable: false },
      { id: 'soldeDebut', label: 'Solde Début', width: 130, type: 'currency', editable: true },
      { id: 'revenus', label: 'Revenus', width: 120, type: 'currency', editable: true },
      { id: 'depenses', label: 'Dépenses', width: 120, type: 'currency', editable: true },
      { id: 'epargne', label: 'Épargne', width: 120, type: 'currency', editable: true },
      { id: 'soldeFin', label: 'Solde Fin', width: 130, type: 'currency', editable: false },
    ],
    rows: [],
  },

  {
    id: 'tableau-annuel',
    name: 'Tableau Annuel',
    description: 'Vue d\'ensemble sur 12 mois avec totaux et moyennes',
    icon: '📊',
    category: 'annuel',
    previewImage: '/excels/maxresdefault.jpg',
    columns: [
      { id: 'categorie', label: 'Catégorie', width: 180, type: 'text', editable: false },
      { id: 'jan', label: 'Jan', width: 90, type: 'currency', editable: true },
      { id: 'fev', label: 'Fév', width: 90, type: 'currency', editable: true },
      { id: 'mar', label: 'Mar', width: 90, type: 'currency', editable: true },
      { id: 'avr', label: 'Avr', width: 90, type: 'currency', editable: true },
      { id: 'mai', label: 'Mai', width: 90, type: 'currency', editable: true },
      { id: 'jun', label: 'Jun', width: 90, type: 'currency', editable: true },
      { id: 'jul', label: 'Jul', width: 90, type: 'currency', editable: true },
      { id: 'aou', label: 'Aoû', width: 90, type: 'currency', editable: true },
      { id: 'sep', label: 'Sep', width: 90, type: 'currency', editable: true },
      { id: 'oct', label: 'Oct', width: 90, type: 'currency', editable: true },
      { id: 'nov', label: 'Nov', width: 90, type: 'currency', editable: true },
      { id: 'dec', label: 'Déc', width: 90, type: 'currency', editable: true },
      { id: 'total', label: 'Total Année', width: 120, type: 'currency', editable: false },
      { id: 'moyenne', label: 'Moyenne', width: 100, type: 'currency', editable: false },
    ],
    rows: [],
  },

  {
    id: 'depenses-categories',
    name: 'Dépenses par Catégories',
    description: 'Analyse détaillée de vos dépenses par poste',
    icon: '📋',
    category: 'mensuel',
    columns: [
      { id: 'categorie', label: 'Catégorie de Dépense', width: 220, type: 'text', editable: false },
      { id: 'montant', label: 'Montant', width: 120, type: 'currency', editable: true },
      { id: 'frequence', label: 'Fréquence', width: 120, type: 'text', editable: true },
      { id: 'mensuel', label: 'Coût Mensuel', width: 130, type: 'currency', editable: false },
      { id: 'pourcentage', label: '% du Budget', width: 120, type: 'number', editable: false },
      { id: 'notes', label: 'Notes', width: 200, type: 'text', editable: true },
    ],
    rows: [],
  },
];

export function getTemplateById(id: string): SpreadsheetTemplate | undefined {
  return SPREADSHEET_TEMPLATES.find((template) => template.id === id);
}

export function getTemplatesByCategory(category: SpreadsheetTemplate['category']): SpreadsheetTemplate[] {
  return SPREADSHEET_TEMPLATES.filter((template) => template.category === category);
}
