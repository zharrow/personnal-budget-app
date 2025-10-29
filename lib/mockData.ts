import { Transaction, Garantie, Categorie } from '@/types';

// Données mockées enrichies pour une démonstration complète
export const MOCK_TRANSACTIONS: Transaction[] = [
  // Janvier 2025
  { id: '1', magasin: 'Carrefour', date: '2025-01-05', categorie: 'Alimentaire', articles: [{ nom: 'Courses hebdomadaires', prix: 85.50 }], total: 85.50, devise: '€', createdAt: '2025-01-05', updatedAt: '2025-01-05' },
  { id: '2', magasin: 'EDF', date: '2025-01-10', categorie: 'Logement', articles: [{ nom: 'Électricité', prix: 120.00 }], total: 120.00, devise: '€', createdAt: '2025-01-10', updatedAt: '2025-01-10' },
  { id: '3', magasin: 'Total Energies', date: '2025-01-12', categorie: 'Transport', articles: [{ nom: 'Essence', prix: 60.00 }], total: 60.00, devise: '€', createdAt: '2025-01-12', updatedAt: '2025-01-12' },
  { id: '4', magasin: 'Netflix', date: '2025-01-15', categorie: 'Loisirs', articles: [{ nom: 'Abonnement', prix: 15.99 }], total: 15.99, devise: '€', createdAt: '2025-01-15', updatedAt: '2025-01-15' },
  { id: '5', magasin: 'Pharmacie', date: '2025-01-18', categorie: 'Santé', articles: [{ nom: 'Médicaments', prix: 25.80 }], total: 25.80, devise: '€', createdAt: '2025-01-18', updatedAt: '2025-01-18' },

  // Février 2025
  { id: '6', magasin: 'Carrefour', date: '2025-02-02', categorie: 'Alimentaire', articles: [{ nom: 'Courses hebdomadaires', prix: 92.30 }], total: 92.30, devise: '€', createdAt: '2025-02-02', updatedAt: '2025-02-02' },
  { id: '7', magasin: 'Zara', date: '2025-02-08', categorie: 'Vêtements', articles: [{ nom: 'Veste', prix: 79.90 }], total: 79.90, devise: '€', createdAt: '2025-02-08', updatedAt: '2025-02-08' },
  { id: '8', magasin: 'Restaurant Le Gourmet', date: '2025-02-14', categorie: 'Loisirs', articles: [{ nom: 'Dîner', prix: 65.00 }], total: 65.00, devise: '€', createdAt: '2025-02-14', updatedAt: '2025-02-14' },
  { id: '9', magasin: 'Total Energies', date: '2025-02-18', categorie: 'Transport', articles: [{ nom: 'Essence', prix: 55.00 }], total: 55.00, devise: '€', createdAt: '2025-02-18', updatedAt: '2025-02-18' },
  { id: '10', magasin: 'Fnac', date: '2025-02-22', categorie: 'Électronique', articles: [{ nom: 'Écouteurs Bluetooth', prix: 49.99 }], total: 49.99, devise: '€', createdAt: '2025-02-22', updatedAt: '2025-02-22' },

  // Mars 2025
  { id: '11', magasin: 'Carrefour', date: '2025-03-05', categorie: 'Alimentaire', articles: [{ nom: 'Courses hebdomadaires', prix: 88.70 }], total: 88.70, devise: '€', createdAt: '2025-03-05', updatedAt: '2025-03-05' },
  { id: '12', magasin: 'Orange', date: '2025-03-10', categorie: 'Autre', articles: [{ nom: 'Forfait mobile', prix: 19.99 }], total: 19.99, devise: '€', createdAt: '2025-03-10', updatedAt: '2025-03-10' },
  { id: '13', magasin: 'Cinéma Gaumont', date: '2025-03-15', categorie: 'Loisirs', articles: [{ nom: 'Billets x2', prix: 24.00 }], total: 24.00, devise: '€', createdAt: '2025-03-15', updatedAt: '2025-03-15' },
  { id: '14', magasin: 'Dentiste', date: '2025-03-20', categorie: 'Santé', articles: [{ nom: 'Consultation', prix: 70.00 }], total: 70.00, devise: '€', createdAt: '2025-03-20', updatedAt: '2025-03-20' },
  { id: '15', magasin: 'IKEA', date: '2025-03-25', categorie: 'Logement', articles: [{ nom: 'Lampe de bureau', prix: 34.99 }], total: 34.99, devise: '€', createdAt: '2025-03-25', updatedAt: '2025-03-25' },

  // Avril 2025
  { id: '16', magasin: 'Carrefour', date: '2025-04-03', categorie: 'Alimentaire', articles: [{ nom: 'Courses hebdomadaires', prix: 95.20 }], total: 95.20, devise: '€', createdAt: '2025-04-03', updatedAt: '2025-04-03' },
  { id: '17', magasin: 'Spotify', date: '2025-04-05', categorie: 'Loisirs', articles: [{ nom: 'Abonnement Premium', prix: 9.99 }], total: 9.99, devise: '€', createdAt: '2025-04-05', updatedAt: '2025-04-05' },
  { id: '18', magasin: 'Décathlon', date: '2025-04-12', categorie: 'Loisirs', articles: [{ nom: 'Chaussures running', prix: 89.99 }], total: 89.99, devise: '€', createdAt: '2025-04-12', updatedAt: '2025-04-12' },
  { id: '19', magasin: 'Total Energies', date: '2025-04-18', categorie: 'Transport', articles: [{ nom: 'Essence', prix: 62.00 }], total: 62.00, devise: '€', createdAt: '2025-04-18', updatedAt: '2025-04-18' },
  { id: '20', magasin: 'Amazon', date: '2025-04-25', categorie: 'Autre', articles: [{ nom: 'Livres', prix: 28.50 }], total: 28.50, devise: '€', createdAt: '2025-04-25', updatedAt: '2025-04-25' },
];

export const MOCK_GARANTIES: Garantie[] = [
  { id: 'g1', magasin: 'Fnac', produit: 'MacBook Pro 16"', dateAchat: '2024-01-15', dureeGarantie: '2 ans', finGarantie: '2026-01-15', montant: 2499.00, numeroSerie: 'FVFXK3MMQO5H', typeGarantie: 'constructeur', statut: 'active', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: 'g2', magasin: 'Boulanger', produit: 'iPhone 15 Pro', dateAchat: '2024-09-22', dureeGarantie: '2 ans', finGarantie: '2026-09-22', montant: 1229.00, numeroSerie: 'F17PH29KQXYZ', typeGarantie: 'magasin', statut: 'active', createdAt: '2024-09-22', updatedAt: '2024-09-22' },
  { id: 'g3', magasin: 'Darty', produit: 'Lave-vaisselle Bosch', dateAchat: '2023-03-10', dureeGarantie: '5 ans', finGarantie: '2028-03-10', montant: 649.99, numeroSerie: 'SN236I01IE', typeGarantie: 'extension', statut: 'active', createdAt: '2023-03-10', updatedAt: '2023-03-10' },
  { id: 'g4', magasin: 'Amazon', produit: 'Sony WH-1000XM5', dateAchat: '2024-06-01', dureeGarantie: '2 ans', finGarantie: '2026-06-01', montant: 379.00, numeroSerie: 'WH1000XM5789', typeGarantie: 'constructeur', statut: 'active', createdAt: '2024-06-01', updatedAt: '2024-06-01' },
];

export const MOCK_CATEGORIES_DATA: Record<Categorie, number> = {
  Alimentaire: 450.80,
  Transport: 237.00,
  Logement: 275.99,
  Loisirs: 304.96,
  Santé: 95.80,
  Vêtements: 79.90,
  Électronique: 49.99,
  Autre: 68.49,
};

export const MOCK_REVENUS = [
  { date: '2025-01-01', type: 'Salaire', montant: 2500, categorie: 'Revenus' },
  { date: '2025-02-01', type: 'Salaire', montant: 2500, categorie: 'Revenus' },
  { date: '2025-03-01', type: 'Salaire', montant: 2500, categorie: 'Revenus' },
  { date: '2025-04-01', type: 'Salaire', montant: 2500, categorie: 'Revenus' },
  { date: '2025-01-15', type: 'Freelance', montant: 450, categorie: 'Revenus' },
  { date: '2025-03-20', type: 'Prime', montant: 300, categorie: 'Revenus' },
];

// Données pour le tableur avec revenus et dépenses par mois
export interface MonthlyBudgetRow {
  categorie: string;
  janvier: number;
  fevrier: number;
  mars: number;
  avril: number;
  total: number;
  type: 'revenu' | 'depense';
}

export const MOCK_MONTHLY_BUDGET: MonthlyBudgetRow[] = [
  // Revenus
  { categorie: 'Salaire', janvier: 2500, fevrier: 2500, mars: 2500, avril: 2500, total: 10000, type: 'revenu' },
  { categorie: 'Revenus complémentaires', janvier: 450, fevrier: 0, mars: 300, avril: 0, total: 750, type: 'revenu' },

  // Dépenses
  { categorie: 'Alimentation', janvier: 360, fevrier: 385, mars: 370, avril: 395, total: 1510, type: 'depense' },
  { categorie: 'Logement (Loyer + charges)', janvier: 850, fevrier: 850, mars: 850, avril: 850, total: 3400, type: 'depense' },
  { categorie: 'Électricité / Gaz', janvier: 120, fevrier: 105, mars: 95, avril: 80, total: 400, type: 'depense' },
  { categorie: 'Eau', janvier: 45, fevrier: 45, mars: 45, avril: 45, total: 180, type: 'depense' },
  { categorie: 'Internet / Mobile', janvier: 50, fevrier: 50, mars: 50, avril: 50, total: 200, type: 'depense' },
  { categorie: 'Transport (Essence)', janvier: 60, fevrier: 55, mars: 62, avril: 58, total: 235, type: 'depense' },
  { categorie: 'Assurances', janvier: 120, fevrier: 0, mars: 120, avril: 0, total: 240, type: 'depense' },
  { categorie: 'Santé', janvier: 26, fevrier: 0, mars: 70, avril: 0, total: 96, type: 'depense' },
  { categorie: 'Loisirs & Sorties', janvier: 90, fevrier: 155, mars: 48, avril: 115, total: 408, type: 'depense' },
  { categorie: 'Vêtements', janvier: 0, fevrier: 80, mars: 0, avril: 0, total: 80, type: 'depense' },
  { categorie: 'Électronique & High-tech', janvier: 0, fevrier: 50, mars: 0, avril: 0, total: 50, type: 'depense' },
  { categorie: 'Autres achats', janvier: 29, fevrier: 20, mars: 35, avril: 29, total: 113, type: 'depense' },
];

// Calculer les totaux
export const MOCK_BUDGET_SUMMARY = {
  totalRevenus: MOCK_MONTHLY_BUDGET.filter(r => r.type === 'revenu').reduce((acc, r) => acc + r.total, 0),
  totalDepenses: MOCK_MONTHLY_BUDGET.filter(r => r.type === 'depense').reduce((acc, r) => acc + r.total, 0),
  get solde() {
    return this.totalRevenus - this.totalDepenses;
  },
};
