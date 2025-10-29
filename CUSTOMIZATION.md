# 🎨 Guide de Personnalisation Avancée du Dashboard

## Vue d'ensemble

Le système de personnalisation du dashboard offre un contrôle total sur l'apparence et la disposition des widgets, avec **détection de collision en temps réel**, **grille visible pendant le drag**, **retour visuel complet**, tailles précises et multiples presets de grille.

### 🎯 Retour Visuel Professionnel
- **Grille bleue en pointillés** apparaît automatiquement pendant le drag
- **Zone de drop bleu ciel** avec animation pulse montre où placer le widget
- **Widgets en collision** deviennent rouge clair avec animation de shake
- **Animations fluides** (60fps) pour une expérience naturelle

> 📘 Pour plus de détails sur le système visuel, voir [VISUAL_FEEDBACK.md](VISUAL_FEEDBACK.md)

## 🎯 Modes de Personnalisation

### Mode Édition Standard
- **Activation** : Bouton "Personnaliser" dans la barre de contrôle
- **Fonctionnalités** :
  - Déplacer les widgets par glisser-déposer
  - Redimensionner en tirant sur les coins
  - **Détection de collision activée** : Les widgets ne se chevauchent jamais
  - Bouton de personnalisation rapide sur chaque widget
  - Indicateur visuel (contour bleu) en mode édition

### Mode Sandbox
- **Activation** : Bouton "Sandbox" dans la barre de contrôle
- **Fonctionnalités** :
  - Toutes les fonctionnalités du mode édition
  - Permet de changer le type de grille à la volée
  - Tester différents layouts prédéfinis
  - Mode avancé pour expérimentations

## 📐 Systèmes de Grille

### 5 Presets de Grille Disponibles

#### 1. **Classique** (Par défaut)
- 12 colonnes
- Hauteur de ligne : 100px
- Espacement : 16px
- Compactage : Vertical
- **Idéal pour** : Usage standard, layouts équilibrés

#### 2. **Moderne**
- 24 colonnes
- Hauteur de ligne : 80px
- Espacement : 20px
- Compactage : Vertical
- **Idéal pour** : Contrôle précis, layouts complexes

#### 3. **Compact**
- 12 colonnes
- Hauteur de ligne : 80px
- Espacement : 8px
- Compactage : Vertical
- **Idéal pour** : Afficher plus de contenu, petits écrans

#### 4. **Spacieux**
- 12 colonnes
- Hauteur de ligne : 120px
- Espacement : 24px
- Compactage : Vertical
- **Idéal pour** : Grands écrans, mise en page aérée

#### 5. **Libre**
- 24 colonnes
- Hauteur de ligne : 60px
- Espacement : 12px
- Compactage : Aucun
- **Idéal pour** : Positionnement libre absolu

### Changement de Grille
1. Cliquez sur le bouton "Grille" dans les contrôles
2. Sélectionnez le preset souhaité
3. Les widgets s'adaptent automatiquement avec ajustement proportionnel

## 🧩 Personnalisation par Widget

### Accès aux Paramètres
- **En mode édition** : Cliquez sur l'icône ⚙️ en haut à droite du widget
- **Interface** : Dialog avec 3 onglets (Taille, Affichage, Avancé)

### Onglet Taille

#### Tailles Prédéfinies
- **Petit** : 3×2 unités
- **Moyen** : 4×2 unités
- **Grand** : 6×3 unités
- **Très grand** : 12×4 unités

#### Contraintes par Type de Widget
Chaque widget a des contraintes min/max spécifiques :

```
Solde Global        : 3-6 largeur, 2-3 hauteur
Dépenses Catégorie  : 4-12 largeur, 2-4 hauteur
Garanties           : 3-6 largeur, 2-4 hauteur
Transactions        : 4-12 largeur, 2-5 hauteur
```

#### Dimensions Actuelles
- Affiche la largeur et hauteur en unités de grille
- Montre les limites min/max pour référence

### Onglet Affichage

#### Modes d'Affichage
- **Compact** : Affichage minimaliste, idéal pour petits espaces
- **Normal** : Affichage standard avec toutes les informations importantes
- **Détaillé** : Affichage complet avec statistiques additionnelles

#### Titre du Widget
- **Toggle** : Afficher/Masquer le titre
- **Utilité** : Gagner de l'espace vertical en mode compact

### Onglet Avancé

#### Verrouillage
- **Icône** : 🔒 Cadenas
- **Effet** : Empêche le déplacement et le redimensionnement
- **Visuel** : Widget en opacité réduite quand verrouillé

#### Visibilité
- **Icône** : 👁️ Œil
- **Effet** : Masque temporairement le widget
- **Utilité** : Test de layouts sans suppression

#### Suppression
- **Zone de danger** : Bordure rouge
- **Action** : Suppression définitive du dashboard
- **Irréversible** : Nécessite réinitialisation pour récupérer

## 📋 Layouts Prédéfinis

### 3 Layouts Disponibles

#### Classic
- Disposition équilibrée en 3 colonnes
- Solde, Catégories, Garanties en haut
- Transactions en pleine largeur en bas

#### Modern
- Layout moderne avec grille 24 colonnes
- Widgets plus larges et aérés
- Mode d'affichage "Détaillé" par défaut

#### Compact
- 4 widgets compacts côte à côte
- Titres masqués pour économiser l'espace
- Mode d'affichage "Compact"

### Changement de Layout
1. Cliquez sur "Layout" dans les contrôles
2. Sélectionnez un preset
3. Le dashboard se réorganise immédiatement

## 🔧 Système de Détection de Collision

### Fonctionnement
- **preventCollision: true** : Active la détection
- Les widgets ne peuvent pas se chevaucher
- Déplacement automatique des widgets bloquant
- Comportement intelligent basé sur le compactType

### Comportements
- **Vertical** : Empile vers le haut, comble les espaces vides
- **Horizontal** : Organise de gauche à droite
- **Null** : Positionnement libre sans compactage

## 🎮 Utilisation Avancée

### Workflow de Personnalisation Recommandé

1. **Choisir la grille** appropriée à votre écran
   ```
   Petit écran → Compact
   Écran standard → Classique
   Grand écran → Spacieux ou Moderne
   ```

2. **Appliquer un layout** de base
   ```
   Débutant → Classic
   Avancé → Modern
   Densité maximale → Compact
   ```

3. **Ajuster individuellement** chaque widget
   - Taille selon importance
   - Mode d'affichage selon contenu
   - Verrouiller les positions finales

4. **Tester en mode Sandbox**
   - Expérimenter sans crainte
   - Tester différentes grilles
   - Comparer les layouts

### Astuces Pro

#### Optimisation de l'Espace
- Widgets importants : Taille Large/XLarge
- Widgets secondaires : Taille Small/Medium
- Mode Compact : Masquer les titres

#### Performance
- Limiter le nombre de widgets visibles (4-6 recommandé)
- Verrouiller les widgets finalisés
- Utiliser le compactType vertical pour meilleure organisation

#### Responsive
- **Desktop** : Grille Moderne (24 col) ou Spacieux
- **Tablet** : Grille Classique (12 col)
- **Mobile** : Grille Compact (12 col, petits gaps)

## 🚀 Raccourcis Clavier (À venir)

```
Ctrl + E     : Toggle mode édition
Ctrl + S     : Sauvegarder la configuration
Ctrl + R     : Réinitialiser
Ctrl + Shift + S : Toggle Sandbox
Suppr        : Supprimer widget sélectionné
```

## 💾 Persistance

### Actuellement
- État sauvegardé en mémoire (React Context)
- Perdu au rechargement de la page

### À Venir
- Sauvegarde automatique dans localStorage
- Synchronisation avec backend (Supabase)
- Profils de layouts multiples
- Import/Export de configurations

## 🐛 Résolution de Problèmes

### Les widgets se chevauchent
- ✅ **Solution** : preventCollision activé par défaut
- Vérifier que vous êtes en mode édition
- Essayer un autre preset de grille

### Widget trop petit/grand
- Utiliser les boutons de taille prédéfinis
- Vérifier les contraintes min/max du widget
- Redimensionner manuellement en mode édition

### Layout désordonné
- Utiliser un layout prédéfini
- Changer le type de compactage
- Réinitialiser si nécessaire

### Performance lente
- Réduire le nombre de widgets actifs
- Utiliser un rowHeight plus grand
- Désactiver les animations (à venir)

## 📊 Statistiques

### Capacités du Système
- **Types de widgets** : 8 différents
- **Presets de grille** : 5
- **Layouts prédéfinis** : 3
- **Tailles par widget** : 4 + custom
- **Modes d'affichage** : 3 par widget
- **Colonnes max** : 24
- **Widgets simultanés** : Illimité (recommandé : 4-8)

## 🎯 Cas d'Usage

### Analyste Financier
```
Grille : Moderne (24 col)
Layout : Modern
Widgets : Graphiques détaillés, Tableur pleine largeur
Mode : Détaillé partout
```

### Usage Personnel Simple
```
Grille : Classique (12 col)
Layout : Classic
Widgets : Solde, Transactions, 1-2 autres
Mode : Normal
```

### Power User
```
Grille : Libre (24 col)
Layout : Custom
Widgets : Tous visibles, organisés par priorité
Mode : Mix Compact/Détaillé selon besoin
```
