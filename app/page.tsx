'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DraggableDashboard } from '@/components/dashboard/DraggableDashboard';
import { DashboardControls } from '@/components/dashboard/DashboardControls';
import { GridPreviewOverlay } from '@/components/dashboard/GridPreviewOverlay';
import { LayoutPreviewOverlay } from '@/components/dashboard/LayoutPreviewOverlay';
import { Transaction, Garantie, Categorie, GridLayoutPreset } from '@/types';
import { useWarrantyAlertsDemo } from '@/hooks/useWarrantyAlerts';
import { DEFAULT_LAYOUTS } from '@/lib/grid-presets';
import { useWidgets } from '@/contexts/WidgetContext';

// Données de démonstration
const mockTransactions: Transaction[] = [
  {
    id: '1',
    magasin: 'Carrefour',
    date: '2024-10-28',
    categorie: 'Alimentaire',
    articles: [{ nom: 'Courses', prix: 47.85 }],
    total: 47.85,
    devise: 'EUR',
    createdAt: '2024-10-28T14:30:00Z',
    updatedAt: '2024-10-28T14:30:00Z',
  },
  {
    id: '2',
    magasin: 'Total Energies',
    date: '2024-10-27',
    categorie: 'Transport',
    articles: [{ nom: 'Essence', prix: 65.4 }],
    total: 65.4,
    devise: 'EUR',
    createdAt: '2024-10-27T08:15:00Z',
    updatedAt: '2024-10-27T08:15:00Z',
  },
  {
    id: '3',
    magasin: 'Fnac',
    date: '2024-10-25',
    categorie: 'Électronique',
    articles: [{ nom: 'Casque', prix: 102.98 }],
    total: 102.98,
    devise: 'EUR',
    createdAt: '2024-10-25T16:45:00Z',
    updatedAt: '2024-10-25T16:45:00Z',
  },
  {
    id: '4',
    magasin: 'Pharmacie',
    date: '2024-10-24',
    categorie: 'Santé',
    articles: [{ nom: 'Médicaments', prix: 11.4 }],
    total: 11.4,
    devise: 'EUR',
    createdAt: '2024-10-24T11:20:00Z',
    updatedAt: '2024-10-24T11:20:00Z',
  },
  {
    id: '5',
    magasin: 'Netflix',
    date: '2024-10-20',
    categorie: 'Loisirs',
    articles: [{ nom: 'Abonnement', prix: 13.49 }],
    total: 13.49,
    devise: 'EUR',
    createdAt: '2024-10-20T00:01:00Z',
    updatedAt: '2024-10-20T00:01:00Z',
  },
];

const mockGaranties: Garantie[] = [
  {
    id: '1',
    magasin: 'Darty',
    produit: 'Lave-linge Samsung 8kg',
    dateAchat: '2023-01-15',
    dureeGarantie: '2 ans',
    finGarantie: '2025-01-15',
    montant: 599.0,
    statut: 'active',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    magasin: 'Boulanger',
    produit: 'MacBook Pro 14"',
    dateAchat: '2024-06-20',
    dureeGarantie: '1 an',
    finGarantie: '2025-06-20',
    montant: 2299.0,
    statut: 'active',
    createdAt: '2024-06-20T14:30:00Z',
    updatedAt: '2024-06-20T14:30:00Z',
  },
  {
    id: '3',
    magasin: 'Ikea',
    produit: 'Canapé Kivik',
    dateAchat: '2024-11-10',
    dureeGarantie: '10 ans',
    finGarantie: '2034-11-10',
    montant: 899.0,
    statut: 'active',
    createdAt: '2024-11-10T11:20:00Z',
    updatedAt: '2024-11-10T11:20:00Z',
  },
];

const mockCategoriesData: Record<Categorie, number> = {
  Alimentaire: 450.30,
  Transport: 280.15,
  Loisirs: 150.00,
  Santé: 85.40,
  Électronique: 102.98,
  Vêtements: 89.99,
  Logement: 950.00,
  Autre: 45.20,
};

export default function Home() {
  // Activer les notifications de démonstration
  useWarrantyAlertsDemo(mockGaranties);

  // Récupérer le layout actuel depuis le contexte
  const { currentLayout } = useWidgets();

  // État pour la prévisualisation de la grille
  const [hoveredPreset, setHoveredPreset] = useState<GridLayoutPreset | null>(null);

  // État pour la prévisualisation du layout
  const [hoveredLayoutId, setHoveredLayoutId] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenue sur votre gestionnaire de budget et garanties
            </p>
          </div>

          <DashboardControls
            onPresetHover={setHoveredPreset}
            onLayoutHover={setHoveredLayoutId}
          />
        </div>

        <DraggableDashboard
          transactions={mockTransactions}
          garanties={mockGaranties}
          categoriesData={mockCategoriesData}
          solde={2450.75}
          depensesMois={1234.50}
          variation={-12.5}
        />
      </div>

      {/* Overlay de prévisualisation de la grille */}
      <GridPreviewOverlay preset={hoveredPreset} isVisible={hoveredPreset !== null} />

      {/* Overlay de prévisualisation du layout */}
      <LayoutPreviewOverlay
        layoutId={hoveredLayoutId}
        layoutWidgets={hoveredLayoutId ? DEFAULT_LAYOUTS[hoveredLayoutId] : null}
        isVisible={hoveredLayoutId !== null}
        gridColumns={currentLayout.columns}
        rowHeight={currentLayout.rowHeight}
        gap={currentLayout.gap}
      />
    </DashboardLayout>
  );
}
