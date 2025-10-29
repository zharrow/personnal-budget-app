# Fonctionnalités du Dashboard - BudgetApp

Ce document décrit toutes les fonctionnalités avancées du système de dashboard personnalisable.

---

## 🎨 Nouveaux Widgets avec Graphiques

### 1. **ExpensesChartWidget** - Graphique en Barres
Affiche vos dépenses mensuelles sur les 6 derniers mois.

**Caractéristiques :**
- Graphique en barres avec Recharts
- Données groupées par mois
- Format automatique en euros
- Couleurs adaptatives (mode clair/sombre)

**Utilisation :**
```tsx
<ExpensesChartWidget transactions={transactions} />
```

---

### 2. **CategoryPieWidget** - Graphique Circulaire
Montre la répartition de vos dépenses par catégorie.

**Caractéristiques :**
- Graphique en camembert (pie chart)
- Pourcentages affichés sur les segments
- Légende interactive
- Couleurs personnalisées par catégorie

**Utilisation :**
```tsx
<CategoryPieWidget data={categoriesData} />
```

---

### 3. **BalanceLineWidget** - Courbe d'Évolution
Suit l'évolution de votre solde au fil du temps.

**Caractéristiques :**
- Graphique en aire (area chart)
- Gradient de remplissage
- Affiche les 10 derniers points
- Échelle dynamique

**Utilisation :**
```tsx
<BalanceLineWidget transactions={transactions} initialBalance={5000} />
```

---

### 4. **BudgetProgressWidget** - Barres de Progression
Affiche votre progression par rapport aux budgets définis par catégorie.

**Caractéristiques :**
- Barres de progression par catégorie
- Alertes visuelles si dépassement
- Budgets personnalisables
- Ratio dépensé/limite

**Utilisation :**
```tsx
<BudgetProgressWidget
  categoriesData={categoriesData}
  budgetLimits={customBudgets}
/>
```

---

## 📋 Système de Templates

### Templates Pré-configurés

#### 1. **Vue d'Ensemble** 📊
Dashboard équilibré avec tous les indicateurs essentiels.

**Widgets inclus :**
- Solde Global (4x2)
- Dépenses par Catégorie (4x3)
- Graphique des Dépenses (4x3)
- Transactions Récentes (4x3)
- Garanties (8x2)

**Idéal pour :** Usage quotidien général

---

#### 2. **Analyse Approfondie** 📈
Focus sur les graphiques et l'analyse détaillée.

**Widgets inclus :**
- Évolution du Solde (6x3)
- Graphique des Dépenses (6x3)
- Répartition Circulaire (4x3)
- Suivi du Budget (4x3)
- Solde Global (4x2)

**Idéal pour :** Analyse mensuelle, rapports

---

#### 3. **Suivi de Budget** 💰
Optimisé pour surveiller vos limites de dépenses.

**Widgets inclus :**
- Solde Global (6x2)
- Suivi du Budget (6x3)
- Graphique des Dépenses (6x3)
- Dépenses par Catégorie (6x2)

**Idéal pour :** Contrôle des dépenses, objectifs budgétaires

---

#### 4. **Minimaliste** ✨
Dashboard épuré avec l'essentiel.

**Widgets inclus :**
- Solde Global (12x2)
- Évolution du Solde (8x3)
- Transactions Récentes (4x3)

**Idéal pour :** Vue rapide, consultation mobile

---

#### 5. **Graphiques Détaillés** 📉
Maximum de visualisations pour une analyse complète.

**Widgets inclus :**
- Évolution du Solde (6x3)
- Graphique des Dépenses (6x3)
- Répartition Circulaire (6x3)
- Dépenses par Catégorie (6x3)

**Idéal pour :** Présentations, analyses visuelles

---

#### 6. **Focus Garanties** 🛡️
Suivi prioritaire des garanties et achats importants.

**Widgets inclus :**
- Garanties (12x3)
- Solde Global (4x2)
- Transactions Récentes (4x2)
- Dépenses par Catégorie (4x2)

**Idéal pour :** Gestion des garanties produits

---

## 💾 Sauvegarde Automatique

### Fonctionnement

Votre dashboard est **automatiquement sauvegardé** dans le navigateur (localStorage) :

- ✅ **Sauvegarde automatique** : Chaque modification est instantanément enregistrée
- ✅ **Restauration au démarrage** : Votre configuration est rechargée à chaque visite
- ✅ **Persistance locale** : Les données restent sur votre appareil
- ✅ **Pas de compte requis** : Fonctionne sans connexion

### Données Sauvegardées

```json
{
  "widgets": [...],           // Position et configuration des widgets
  "layout": {...},            // Grille (colonnes, espacement)
  "savedAt": "2025-01-..."   // Date de sauvegarde
}
```

---

## 📤 Export / Import

### Exporter Votre Dashboard

1. Cliquez sur l'icône **⚙️ Paramètres**
2. Sélectionnez **📥 Exporter le dashboard**
3. Un fichier JSON sera téléchargé : `dashboard-YYYY-MM-DD.json`

**Utilisations :**
- Sauvegarder plusieurs configurations
- Partager votre layout avec d'autres
- Créer des backups avant modifications

### Importer un Dashboard

1. Cliquez sur l'icône **⚙️ Paramètres**
2. Sélectionnez **📤 Importer un dashboard**
3. Choisissez votre fichier `.json`
4. Le dashboard sera restauré instantanément

**Format du fichier :**
```json
{
  "widgets": [...],
  "layout": {...},
  "exportedAt": "2025-01-...",
  "version": "1.0"
}
```

---

## 🎯 Guide d'Utilisation

### Appliquer un Template

1. Cliquez sur **📋 Templates**
2. Parcourez les catégories (Vue d'ensemble, Analyse, Suivi)
3. Cliquez sur un template pour l'appliquer
4. Votre dashboard sera réorganisé instantanément

### Personnaliser Après Application

Après avoir appliqué un template, vous pouvez :

1. Activer le **mode édition** (bouton Personnaliser)
2. Déplacer les widgets par glisser-déposer
3. Redimensionner avec les poignées
4. Masquer/afficher via le menu Widgets
5. Les modifications sont automatiquement sauvegardées

---

## 🔧 Options Avancées

### Menu Grille

Ajustez l'espacement et le nombre de colonnes :

- **Classic** : 12 colonnes, 100px de hauteur
- **Modern** : 16 colonnes, 80px de hauteur
- **Compact** : 12 colonnes, 60px de hauteur
- **Spacious** : 8 colonnes, 120px de hauteur

### Menu Layout

Réorganisations prédéfinies pour les widgets existants.

### Menu Widgets

Masquez/affichez individuellement chaque widget sans supprimer leur configuration.

---

## 📊 Types de Widgets Disponibles

| Widget | Type | Description |
|--------|------|-------------|
| **solde** | Indicateur | Solde global et variation |
| **categories** | Liste | Dépenses par catégorie |
| **garanties** | Table | Liste des garanties actives |
| **transactions** | Liste | Transactions récentes |
| **expenses-chart** | Graphique | Barres mensuelles |
| **category-pie** | Graphique | Camembert catégories |
| **balance-line** | Graphique | Courbe d'évolution |
| **budget-progress** | Barres | Progression budgets |

---

## 🚀 Prochaines Fonctionnalités

- [ ] Templates personnalisés (créer et sauvegarder vos propres templates)
- [ ] Synchronisation cloud (via Supabase)
- [ ] Export PDF du dashboard
- [ ] Widgets configurables (couleurs, limites)
- [ ] Thèmes de couleurs prédéfinis
- [ ] Partage de dashboard (lien public)

---

## 💡 Conseils

### Pour les Débutants
Commencez avec le template **Vue d'Ensemble** puis personnalisez progressivement.

### Pour l'Analyse
Utilisez **Graphiques Détaillés** pour des présentations ou des rapports mensuels.

### Pour le Contrôle Budgétaire
Le template **Suivi de Budget** avec le widget `budget-progress` est parfait.

### Sauvegarde Régulière
Exportez votre dashboard une fois par mois comme backup.

---

## 🛠️ Architecture Technique

### Stack
- **Graphiques** : Recharts (React + D3.js)
- **Grid Layout** : react-grid-layout
- **Persistance** : localStorage + export JSON
- **State** : React Context API

### Fichiers Clés
- `contexts/WidgetContext.tsx` - Gestion d'état et sauvegarde
- `lib/dashboardTemplates.ts` - Définition des templates
- `components/widgets/*` - Widgets individuels
- `components/dashboard/TemplateSelector.tsx` - Interface de sélection

---

**Votre dashboard, votre façon !** 🎨✨
