// Types pour l'application de gestion de budget et garanties

// Types pour les transactions et tickets
export interface Transaction {
  id: string;
  magasin: string;
  date: string;
  categorie: string;
  articles: Article[];
  total: number;
  devise: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  nom: string;
  prix: number;
  quantite?: number;
}

// Types pour les garanties
export interface Garantie {
  id: string;
  magasin: string;
  produit: string;
  dateAchat: string;
  dureeGarantie: string; // ex: "2 ans"
  finGarantie: string;
  montant: number;
  numeroSerie?: string;
  typeGarantie?: 'constructeur' | 'magasin' | 'extension';
  statut: 'active' | 'expirant_bientot' | 'expiree';
  imageUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les widgets du dashboard
export type WidgetType =
  | 'solde_global'
  | 'graphique_depenses'
  | 'derniers_tickets'
  | 'calendrier_paiements'
  | 'tableur'
  | 'objectif_epargne'
  | 'top_magasins'
  | 'garanties';

export type WidgetSize = 'small' | 'medium' | 'large' | 'xlarge' | 'custom';
export type WidgetDisplayMode = 'compact' | 'normal' | 'detailed';
export type GridLayoutType = 'classic' | 'modern' | 'compact' | 'spacious' | 'custom';

export interface WidgetSettings {
  displayMode?: WidgetDisplayMode;
  size?: WidgetSize;
  showTitle?: boolean;
  customColors?: {
    background?: string;
    text?: string;
    accent?: string;
  };
  // Widget-specific settings
  [key: string]: any;
}

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
  };
  settings: WidgetSettings;
  isVisible: boolean;
  isLocked?: boolean; // Empêche le déplacement/redimensionnement
}

export interface GridLayoutPreset {
  id: string;
  name: string;
  description: string;
  columns: number;
  rowHeight: number;
  gap: number;
  compactType: 'vertical' | 'horizontal' | null;
}

// Types pour les catégories
export type Categorie =
  | 'Alimentaire'
  | 'Transport'
  | 'Logement'
  | 'Loisirs'
  | 'Santé'
  | 'Vêtements'
  | 'Électronique'
  | 'Autre';

// Types pour les statistiques
export interface StatistiquesDepenses {
  total: number;
  parCategorie: Record<Categorie, number>;
  parMagasin: Record<string, number>;
  evolution: {
    date: string;
    montant: number;
  }[];
}

// Types pour les objectifs d'épargne
export interface ObjectifEpargne {
  id: string;
  nom: string;
  montantCible: number;
  montantActuel: number;
  dateDebut: string;
  dateObjectif: string;
  icone?: string;
}

// Types pour les notifications
export interface Notification {
  id: string;
  type: 'garantie_expiration' | 'objectif_atteint' | 'budget_depassé';
  titre: string;
  message: string;
  date: string;
  isRead: boolean;
  relatedId?: string; // ID de la garantie, transaction, etc.
}

// Types pour les paramètres utilisateur
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  devise: string;
  langue: 'fr' | 'en';
  notifications: {
    garantiesExpiration: boolean;
    objectifsEpargne: boolean;
    budgetAlerts: boolean;
  };
  dashboard: {
    colonnes: 12 | 24;
    widgets: WidgetConfig[];
  };
}
