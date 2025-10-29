# 🎯 Guide des Fonctionnalités

## 1. Dashboard Personnalisable avec Drag & Drop

### Activer le mode édition
1. Cliquez sur le bouton **"Personnaliser"** en haut à droite du dashboard
2. Les widgets affichent maintenant un contour bleu et peuvent être déplacés
3. Glissez-déposez les widgets pour les réorganiser
4. Redimensionnez-les en tirant sur les coins
5. Cliquez sur **"Terminer"** pour sauvegarder

### Gérer la visibilité des widgets
1. Cliquez sur le bouton **"Widgets"** (icône œil)
2. Cochez/décochez les widgets que vous souhaitez afficher
3. Les widgets masqués disparaissent immédiatement

### Réinitialiser la disposition
1. Cliquez sur le bouton **"Paramètres"** (icône engrenage)
2. Sélectionnez **"Réinitialiser"**
3. Tous les widgets reviennent à leur position par défaut

## 2. Système de Notifications

### Centre de notifications
- **Icône cloche** dans la sidebar (en haut à droite)
- **Badge rouge** indique le nombre de notifications non lues
- Cliquez sur une notification pour la marquer comme lue
- Utilisez l'icône **poubelle** pour tout effacer
- Utilisez l'icône **check** pour tout marquer comme lu

### Types de notifications
- **⚠️ Garantie expire bientôt** : Alertes à 30j, 7j et 0j avant expiration
- **🎯 Objectif atteint** : Lorsque vous atteignez un objectif d'épargne
- **💰 Budget dépassé** : Alertes de dépassement budgétaire

### Toasts automatiques
- Apparaissent en bas à droite de l'écran
- Se ferment automatiquement après 5 secondes
- Peuvent être fermés manuellement avec le bouton X

## 3. Scanner de Tickets

### Upload d'un ticket
1. Naviguez vers **"Scan Ticket"** dans la sidebar
2. Cliquez sur **"Choisir un fichier"** ou glissez-déposez une image
3. L'aperçu s'affiche immédiatement
4. Cliquez sur **"Analyser le ticket"**

### Validation des données
1. Les données extraites apparaissent dans le panneau de droite
2. Cliquez sur **"Modifier"** pour corriger les informations
3. Modifiez le magasin, la date, la catégorie ou le total
4. Cliquez sur **"Enregistrer la transaction"**

## 4. Tableur des Transactions

### Tri et filtrage
- **Cliquez sur les en-têtes** (Date, Magasin, Montant) pour trier
- **Utilisez la barre de recherche** pour filtrer par magasin ou article
- **Sélectionnez une catégorie** pour filtrer par type de dépense

### Statistiques
- **Total des dépenses** : Somme de toutes les transactions filtrées
- **Nombre de transactions** : Compteur dynamique
- **Dépense moyenne** : Calculée automatiquement

## 5. Gestion des Garanties

### Ajouter une garantie
1. Cliquez sur **"Ajouter une garantie"**
2. Remplissez les informations :
   - Magasin
   - Produit
   - Date d'achat
   - Montant
   - Durée de garantie
   - Numéro de série (optionnel)
3. Cliquez sur **"Enregistrer la garantie"**

### Filtrer les garanties
- **Toutes** : Affiche toutes les garanties
- **Actives** : Garanties encore valides
- **Expirant bientôt** : Garanties qui expirent dans moins de 30 jours
- **Expirées** : Garanties qui ne sont plus valides

### Alertes automatiques
- **45 jours avant** : Notification de rappel (demo)
- **30 jours avant** : Première alerte
- **7 jours avant** : Alerte urgente
- **Le jour même** : Alerte finale

## 6. Widgets du Dashboard

### Widget Solde Global
- Affiche le solde actuel
- Dépenses du mois en cours
- Variation en pourcentage par rapport au mois précédent

### Widget Dépenses par Catégorie
- Top 5 des catégories de dépenses
- Barres de progression visuelles
- Pourcentages et montants

### Widget Garanties Actives
- Nombre total de garanties actives
- Badge d'alerte pour les garanties expirant bientôt
- Liste des 3 prochaines garanties à expirer

### Widget Transactions Récentes
- 5 dernières transactions
- Lien vers le tableur complet
- Informations : magasin, date, montant, catégorie

## 🎨 Personnalisation

### Thème et couleurs
Les couleurs s'adaptent automatiquement au thème système (clair/sombre) grâce à Tailwind CSS.

### Responsive Design
L'application s'adapte à toutes les tailles d'écran :
- **Desktop** : Layout à 3 colonnes
- **Tablet** : Layout à 2 colonnes
- **Mobile** : Layout à 1 colonne

## 🔔 Démo des Notifications

Au premier chargement du dashboard, deux notifications de démonstration s'affichent automatiquement après 3 secondes :
1. Une alerte de garantie expirant dans 45 jours
2. Une notification d'objectif d'épargne atteint

Ceci permet de tester le système de notifications sans attendre de vraies alertes.

## 📝 Notes Techniques

### Persistance des données
Actuellement, les données sont stockées en mémoire et seront perdues au rechargement de la page. L'intégration avec Supabase est prévue pour la persistance.

### Positions des widgets
Les positions des widgets sont sauvegardées dans le contexte React. Pour persister ces positions, il faudra les sauvegarder dans une base de données.

### OCR
Le scanner de tickets simule actuellement l'extraction OCR avec des données fictives. L'intégration avec Mindee ou Google Vision API est prévue.
