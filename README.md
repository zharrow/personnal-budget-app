# 💰 BudgetApp - Gestion de Budget & Garanties

Une application moderne de **gestion financière visuelle et interactive**, alliant **analyse de budget**, **scanner intelligent de tickets**, **tableur moderne**, et **gestionnaire de garanties**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## 🚀 Fonctionnalités

### ✅ Implémenté
- **Dashboard Modulaire Ultra-Personnalisable** :
  - 5 presets de grille (Classique, Moderne, Compact, Spacieux, Libre)
  - 3 layouts prédéfinis (Classic, Modern, Compact)
  - Mode Édition standard + Mode Sandbox avancé
  - Sidebar rétractable avec centre de notifications

- **Système de Widgets Avancé** :
  - **Drag & Drop avec détection de collision** : Pas de chevauchement
  - **Tailles précises** : 4 templates + contraintes par type
  - **3 modes d'affichage** : Compact, Normal, Détaillé
  - **Personnalisation individuelle** : Dialog de configuration par widget
  - **Verrouillage** : Fixer la position des widgets importants
  - Activer/désactiver, supprimer, réorganiser librement

- **Widgets Interactifs** :
  - Vue d'ensemble du solde et dépenses
  - Graphiques de dépenses par catégorie
  - Dernières transactions
  - Garanties actives avec alertes

- **Système de Notifications** :
  - Toasts automatiques (5 secondes)
  - Centre de notifications dans la sidebar
  - Badge de comptage des non-lues
  - Alertes d'expiration de garanties (30j, 7j, 0j)

- **Scanner de Tickets** : Interface pour uploader et analyser des tickets (OCR à intégrer)
- **Tableur des Transactions** : Visualisation, tri et filtrage de toutes les dépenses
- **Gestion des Garanties** : Suivi des garanties produits avec dates d'expiration

### 🔜 À Venir
- Intégration OCR (Mindee / Google Vision)
- Connexion base de données (Supabase)
- Persistance des positions de widgets
- Export CSV/Excel
- Graphiques et statistiques avancées
- Mode sombre
- Application mobile PWA

## 🛠️ Stack Technique

- **Frontend** : Next.js 16 (App Router), React 19, TypeScript 5
- **Styling** : Tailwind CSS v4, shadcn/ui
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **Drag & Drop** : react-grid-layout
- **State Management** : React Context API
- **Build Tool** : Turbopack

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/budget-app.git
cd budget-app

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🔧 Scripts Disponibles

```bash
npm run dev      # Lance le serveur de développement avec Turbopack
npm run build    # Créé un build de production
npm run start    # Lance le serveur de production
npm run lint     # Vérifie le code avec ESLint
```

## 📁 Structure du Projet

```
budget-app/
├── app/                      # Pages Next.js (App Router)
│   ├── page.tsx             # Dashboard principal
│   ├── scan/                # Scanner de tickets
│   ├── tableur/             # Tableur des transactions
│   └── garanties/           # Gestion des garanties
├── components/
│   ├── layout/              # Composants de layout
│   │   ├── Sidebar.tsx      # Navigation latérale rétractable
│   │   └── DashboardLayout.tsx
│   ├── widgets/             # Widgets du dashboard
│   │   ├── BaseWidget.tsx
│   │   ├── SoldeWidget.tsx
│   │   ├── CategoriesWidget.tsx
│   │   ├── GarantiesWidget.tsx
│   │   └── RecentTransactionsWidget.tsx
│   └── ui/                  # Composants shadcn/ui
├── types/
│   └── index.ts             # Définitions TypeScript
├── lib/
│   └── utils.ts             # Fonctions utilitaires
└── public/                  # Assets statiques
```

## 🎨 Composants UI

L'application utilise [shadcn/ui](https://ui.shadcn.com/) pour les composants de base.

Pour ajouter de nouveaux composants :

```bash
npx shadcn@latest add [component-name]
```

## 💡 Fonctionnalités Détaillées

### Dashboard Ultra-Personnalisable
- **5 systèmes de grille** : Choix entre Classique (12 col), Moderne (24 col), Compact, Spacieux ou Libre
- **Layouts prédéfinis** : Classic, Modern, Compact pour démarrer rapidement
- **Drag & Drop intelligent** : Détection de collision, pas de chevauchement
- **Mode Sandbox** : Expérimentation avancée avec changements de grille à la volée
- **Personnalisation par widget** :
  - 4 tailles prédéfinies (Petit, Moyen, Grand, Très Grand)
  - 3 modes d'affichage (Compact, Normal, Détaillé)
  - Verrouillage de position
  - Configuration couleurs et options spécifiques
- **Guide complet** : Voir [CUSTOMIZATION.md](CUSTOMIZATION.md)

### Scanner de Tickets
- Upload de photos de tickets
- Extraction automatique des données (à venir)
- Validation et édition manuelle
- Catégorisation automatique

### Tableur Moderne
- Vue d'ensemble de toutes les transactions
- Tri et filtres avancés
- Recherche par magasin ou article
- Calculs automatiques

### Gestion des Garanties
- Suivi de toutes les garanties produits
- Alertes avant expiration
- Filtres par statut
- Stockage des informations détaillées

## 🔐 Sécurité

- Données utilisateur chiffrées (à implémenter)
- Protection par authentification (à venir)
- Pas de données sensibles dans le code

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

## 📄 Licence

MIT

## 👨‍💻 Auteur

**Florent** - Développeur FullStack & Designer UX/UI

---

*Développé avec ❤️ et Next.js*
