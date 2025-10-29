# Système de Design - BudgetApp

Ce document explique comment utiliser les principes de design appliqués à l'application, basés sur les concepts de profondeur, hiérarchie visuelle et micro-interactions.

## 🎨 Principes Appliqués

L'interface suit maintenant les principes du guide de design :
1. **Profondeur par superposition de couleurs et ombres**
2. **Hiérarchie visuelle claire**
3. **Animations contextuelles**
4. **Rythme et respiration**

---

## 🧰 Variables CSS Personnalisées

### Couleurs avec Nuances

```css
/* Surfaces élevées */
--background-elevated    /* Blanc pur pour éléments surélevés */
--background             /* Gris très clair pour fond principal */
--background-sunken      /* Gris pour éléments encastrés */

--card-elevated          /* Carte légèrement surélevée */
--card                   /* Carte standard */
```

### Ombres Directionnelles

Les ombres combinent une **ombre claire en haut** (lumière) et une **ombre sombre en bas** (profondeur) :

```css
--shadow-sm      /* Ombre subtile */
--shadow-md      /* Ombre moyenne (défaut pour cartes) */
--shadow-lg      /* Ombre prononcée (hover) */
--shadow-xl      /* Ombre très prononcée (drag, focus) */

/* Ombres inset pour effet encastré */
--shadow-inset           /* Ombre interne légère */
--shadow-inset-strong    /* Ombre interne prononcée */
```

---

## 🔧 Classes Utilitaires

### Profondeur

```tsx
// Appliquer une ombre directionnelle
<div className="depth-md">Carte avec profondeur</div>

// Effet encastré (pour tableaux, inputs)
<div className="depth-inset">Élément encastré</div>

// Surface élevée
<aside className="surface-elevated">Sidebar</aside>
```

### Effets Hover avec Profondeur

```tsx
// Carte qui se soulève au survol
<div className="depth-md hover-depth">
  Carte interactive
</div>

// Bouton avec effet de pression
<button className="press-effect">
  Cliquez-moi
</button>
```

### Glassmorphism

```tsx
// Effet verre avec blur et profondeur
<div className="glass-effect rounded-lg p-4">
  Contenu avec effet verre
</div>
```

### Bordures et Séparateurs

```tsx
// Bordure lumineuse en haut (simule l'éclairage)
<div className="light-border-top">
  Élément avec lumière supérieure
</div>

// Séparateur avec gradient
<div className="separator-depth" />
```

---

## 📐 Hiérarchie Typographique

```tsx
// Titre principal (2.25rem, bold)
<h1 className="text-display">Tableau de bord</h1>

// Titre de section (1.875rem, semibold)
<h2 className="text-headline">Mes transactions</h2>

// Titre de carte (1.25rem, semibold)
<h3 className="text-title">Solde actuel</h3>

// Texte avec emphase
<p className="text-body-emphasis">Information importante</p>
```

---

## 🎬 Animations Contextuelles

### Révélation au Scroll

```tsx
// Animation de montée progressive
<div className="reveal-on-scroll">
  Contenu qui apparaît au scroll
</div>
```

### Transitions Fluides

Les composants utilisent des transitions cohérentes :
- **Durée rapide** : `duration-200` (200ms) pour micro-interactions
- **Durée normale** : `duration-300` (300ms) pour transitions standards
- **Easing** : `ease-out` pour la plupart des animations

```tsx
<div className="transition-all duration-300 ease-out">
  Élément avec transition fluide
</div>
```

---

## 🧩 Exemples d'Application

### Widget avec Profondeur

```tsx
<BaseWidget title="Mon Widget">
  {/* Le BaseWidget applique automatiquement :
      - box-shadow: var(--shadow-md)
      - Bordure lumineuse en haut
      - Hover avec shadow-lg
      - Espacement rythmé
  */}
  <div className="space-y-4">
    <p>Contenu du widget</p>
  </div>
</BaseWidget>
```

### Sidebar avec Élévation

```tsx
<aside className="surface-elevated" style={{ boxShadow: 'var(--shadow-md)' }}>
  {/* Sidebar surélevée par rapport au fond principal */}
</aside>
```

### Élément de Navigation Interactif

```tsx
<motion.a
  className="hover-depth press-effect rounded-lg p-3"
  whileHover={{ scale: 1.02, x: 2 }}
  whileTap={{ scale: 0.98 }}
>
  <Icon />
  <span>Navigation</span>
</motion.a>
```

### Card Interactive

```tsx
<div className="
  depth-md hover-depth
  rounded-lg p-6
  bg-card border border-border
  transition-all duration-300
">
  {/* Carte avec profondeur qui s'élève au survol */}
  <h3 className="text-title mb-4">Titre</h3>
  <p>Contenu de la carte</p>
</div>
```

---

## 🌓 Mode Sombre

Toutes les variables sont adaptées automatiquement en mode sombre :
- Les **ombres claires** deviennent plus subtiles
- Les **ombres sombres** sont renforcées
- Les **surfaces élevées** sont plus claires que le fond
- Les **surfaces encastrées** sont plus sombres

Aucune action supplémentaire requise, ajoutez simplement la classe `.dark` au root.

---

## 📊 Rythme et Espacement

### Espacement Cohérent

```tsx
// Section complète (3rem de marge)
<section className="rhythm-section">
  {/* Contenu */}
</section>

// Groupe d'éléments (1.5rem de marge)
<div className="rhythm-group">
  <h3>Titre</h3>
  <p>Paragraphe</p>
</div>

// Espacement interne des widgets
<div className="space-y-4">
  {/* Enfants espacés de 1rem */}
</div>
```

---

## 🎯 Best Practices

### ✅ À Faire

1. **Utiliser les variables CSS** pour la cohérence
   ```tsx
   style={{ boxShadow: 'var(--shadow-md)' }}
   ```

2. **Combiner profondeur + mouvement** pour l'interaction
   ```tsx
   className="depth-md hover-depth press-effect"
   ```

3. **Respecter la hiérarchie typographique**
   ```tsx
   <h1 className="text-display">Important</h1>
   <p className="text-body">Secondaire</p>
   ```

4. **Ajouter des transitions fluides**
   ```tsx
   className="transition-all duration-300 ease-out"
   ```

### ❌ À Éviter

1. **Multiplier les ombres** sans intention
   - ❌ `shadow-xl shadow-lg` → Incohérent
   - ✅ `depth-md hover-depth` → Progression logique

2. **Animations gratuites** sans contexte
   - ❌ Rotation aléatoire sur tous les éléments
   - ✅ Animation au hover pour indiquer l'interactivité

3. **Oublier le mode sombre**
   - ❌ Couleurs hardcodées en RGB
   - ✅ Variables CSS adaptatives

4. **Espacement incohérent**
   - ❌ `mb-3` puis `mb-7` puis `mb-2`
   - ✅ `rhythm-section`, `rhythm-group`, `space-y-4`

---

## 🔗 Ressources

- **Guide complet** : `DesignPrinciples.md`
- **Variables CSS** : `app/globals.css`
- **Composants** : `components/widgets/BaseWidget.tsx`
- **Contextes** : Sidebar, Dashboard, Widgets

---

## 🚀 Prochaines Étapes

Pour appliquer ces principes à de nouveaux composants :

1. Partir de `BaseWidget` comme modèle
2. Utiliser les classes utilitaires (`depth-md`, `hover-depth`)
3. Appliquer la hiérarchie typographique
4. Ajouter des micro-interactions avec Framer Motion
5. Tester en mode clair ET sombre

**L'objectif** : Chaque élément respire, guide l'œil et surprend avec intention. ✨
