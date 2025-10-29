# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [0.2.0] - 2025-10-29

### ✨ Ajouté
- **Système de Drag & Drop pour les widgets**
  - Implémentation complète avec react-grid-layout
  - Mode édition activable/désactivable
  - Redimensionnement et déplacement des widgets
  - Grille à 12 colonnes avec auto-stacking

- **Système de Notifications**
  - Context API pour la gestion des notifications
  - Toasts automatiques avec auto-dismiss (5 secondes)
  - Centre de notifications dans la sidebar
  - Badge de comptage des notifications non lues
  - Support de plusieurs types (success, warning, error)

- **Alertes d'expiration de garanties**
  - Hook personnalisé `useWarrantyAlerts`
  - Alertes automatiques à 30, 7 et 0 jours avant expiration
  - Notifications de démonstration au chargement

- **Contrôles du Dashboard**
  - Bouton "Personnaliser" pour activer le mode édition
  - Dropdown "Widgets" pour gérer la visibilité
  - Option de réinitialisation des positions
  - Bouton de notification avec badge

### 🔧 Modifié
- Dashboard principal converti en composant client avec hooks
- Sidebar mise à jour avec icône de notification
- Layout racine avec providers (WidgetContext, NotificationContext)
- Structure des dossiers enrichie (contexts/, hooks/)

### 📚 Documentation
- README.md mis à jour avec nouvelles fonctionnalités
- CLAUDE.md enrichi avec architecture complète
- Nouveau fichier FEATURES.md avec guide d'utilisation détaillé
- CHANGELOG.md créé

## [0.1.0] - 2025-10-29

### ✨ Ajouté
- **Initialisation du projet**
  - Configuration Next.js 16 avec TypeScript
  - Tailwind CSS v4
  - shadcn/ui configuré

- **Pages principales**
  - Dashboard avec widgets
  - Scanner de tickets
  - Tableur des transactions
  - Gestion des garanties

- **Composants**
  - Sidebar rétractable avec Framer Motion
  - DashboardLayout
  - 5 widgets (Solde, Catégories, Garanties, Transactions, Base)

- **Types TypeScript**
  - Définitions complètes pour Transaction, Garantie, Widget, etc.

- **Documentation**
  - README.md
  - CLAUDE.md
  - Projet_Gestion_Budget_Garanties.md (spécifications)

### 🎨 Design
- Interface moderne en français
- Responsive design (mobile, tablet, desktop)
- Animations fluides avec Framer Motion
- Theme système (clair/sombre)

### 🛠️ Outils
- ESLint configuré
- Build avec Turbopack
- Hot reload en développement
