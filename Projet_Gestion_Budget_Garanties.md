# 💰 Projet d'Application de Gestion de Budget & Garanties

## 🧭 Vision Générale

Une application de **gestion financière visuelle et interactive**,
alliant **analyse de budget**, **scanner intelligent de tickets**,
**tableur moderne**, et **gestionnaire de garanties**.\
Objectif : donner à l'utilisateur une **vue personnalisée, fluide et
complète** de ses finances.

------------------------------------------------------------------------

## 🧩 Dashboard Personnalisable

### 🔧 Fonctionnalités

-   Dashboard **totalement modulaire** : ajout, suppression et
    déplacement libre de widgets.
-   Widgets redimensionnables avec plusieurs **grilles configurables**
    (12 ou 24 colonnes, mode libre).
-   **Menu latéral retractable** ultra-fin pour maximiser l'espace
    d'écran.

### 🧱 Exemples de Widgets

-   💰 Solde global / dépenses du mois\
-   📈 Graphique dépenses par catégorie\
-   🧾 Liste des derniers tickets scannés\
-   📅 Calendrier de paiements\
-   📊 Tableur Excel-like\
-   🔄 Objectif d'épargne\
-   🏪 Top magasins\
-   🕒 Garanties en cours / à expirer

------------------------------------------------------------------------

## 📸 Scan de Ticket de Caisse

### ⚙️ Fonctionnement

-   Photo ou upload du ticket.

-   OCR (Mindee / Google Vision / Tesseract) pour extraire :

    ``` json
    {
      "Magasin": "Carrefour",
      "Date": "27/10/2025",
      "Catégorie": "Alimentaire",
      "Articles": [{"Nom": "Pâtes", "Prix": 2.49}],
      "Total": 238.98,
      "Devise": "€"
    }
    ```

-   Édition manuelle possible avant validation.

-   Sauvegarde dans la base de données (Supabase / Firebase).

### 💡 Options Avancées

-   Catégorisation automatique par IA.\
-   Reconnaissance du logo du magasin.\
-   Historique visuel des tickets.

------------------------------------------------------------------------

## 📑 Tableur Moderne

### 🔍 Fonctionnalités

-   Tableur type Excel intégré (AG Grid / Handsontable).
-   Tri, filtres, formules, regroupements.
-   Ajout automatique des tickets scannés.
-   Export CSV / Excel.

### 🤖 Automatisations

-   Calculs de totaux, moyennes, graphiques dynamiques.
-   Colonnes configurables (Date, Catégorie, Montant, Devise, Tag).

------------------------------------------------------------------------

## 🧾 Gestion des Garanties

### 🎯 Objectif

Sauvegarde et suivi des **tickets de garantie** avec **rappels
automatiques** avant expiration.

### 📸 Ajout et Extraction

-   Upload / photo du ticket → scan OCR.\

-   Extraction automatique :

    ``` json
    {
      "Magasin": "Darty",
      "Produit": "Lave-linge Samsung 8kg",
      "Date d’achat": "2025-01-12",
      "Durée de garantie": "2 ans",
      "Fin de garantie": "2027-01-12",
      "Montant": 599.00
    }
    ```

-   Ajout manuel : numéro de série, type de garantie, pièces jointes.

### 🔔 Rappels & Notifications

-   Notification 30j et 7j avant fin de garantie.\
-   Widget "Garanties actives / expirant bientôt".\
-   Synchronisation possible avec Google / iCal.

### 📂 Organisation

-   Tri par **magasin, produit, date, statut**.\
-   Liens avec le tableur et les dépenses.\
-   Archivage automatique après expiration.

### 🔐 Sécurité

-   Données chiffrées (AES-256 + HTTPS).\
-   Export ZIP de toutes les garanties.\
-   Protection par PIN / biométrie.

------------------------------------------------------------------------

## 🧠 Stack Technique

  -----------------------------------------------------------------------
  Composant                       Technologies
  ------------------------------- ---------------------------------------
  Frontend                        Next.js, React, TypeScript, Tailwind
                                  CSS, shadcn/ui, Framer Motion

  Dashboard                       React Grid Layout

  Backend                         Supabase / Firebase / NestJS

  OCR                             Mindee / Google Vision

  Cloud                           Supabase Storage / Cloudinary

  Notifications                   OneSignal / Firebase Cloud Messaging
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 🚀 Extensions Futures

-   🔗 Connexion à la banque (Tink / Budget Insight).\
-   📊 Rapports automatiques.\
-   🎯 Objectifs et prévisions.\
-   💬 Partage de dashboard.\
-   🪙 Suivi des investissements.

------------------------------------------------------------------------

## 🧠 Expérience Utilisateur Exemple

1.  L'utilisateur prend en photo un ticket.\
2.  L'app détecte automatiquement le montant, la catégorie et le
    magasin.\
3.  Les données sont ajoutées au tableur et aux statistiques.\
4.  Pour un produit garanti, une **fiche garantie** est créée.\
5.  Un rappel s'affiche avant expiration de la garantie.

------------------------------------------------------------------------

**Auteur :** Florent\
**Rôle :** Développeur FullStack & Designer UX/UI\
**Date :** Octobre 2025
