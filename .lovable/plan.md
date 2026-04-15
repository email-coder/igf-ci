

# Plan : Création de la page "Grandes Étapes de l'IGF"

## Contexte

Le site existant (igf.finances.gouv.ci) est bloqué, mais le contenu a été récupéré via le Wayback Machine. La page "Grandes Étapes" présente une chronologie historique de l'IGF de 1961 à 2020, avec des dates clés, des descriptions et des liens vers des décrets officiels (PDF).

## Ce qui sera créé

### 1. Page `src/pages/GrandesEtapes.tsx`

Une page chronologique verticale ("timeline") avec un design institutionnel moderne :

- **Header** : Bandeau avec titre "Grandes Étapes de l'IGF" + breadcrumb
- **Timeline verticale** : Ligne centrale verte avec des cartes alternées gauche/droite contenant :
  - Année en gros (badge vert)
  - Date et titre de l'événement
  - Description détaillée
  - Liens vers les décrets PDF (icone document)
  - Animation au scroll (fade-in avec ScrollSection)
- **Sidebar** : Liens rapides vers les autres sous-pages Présentation

Contenu intégré (15 étapes de 1961 à 2020) :
- 1961 : Création de l'IGSF
- 1964 : Contrôle Economique et Financier
- 1966 : Direction du Contrôle
- 1990, 1991, 1992 : Réorganisations
- 1996 : Naissance de l'appellation "IGF"
- 1999 : Renforcement des pouvoirs
- 2012 : Création de la BLC + Démarche Qualité
- 2014 : Rattachement au Premier Ministre
- 2015 : Audit des projets PTFs
- 2017 : Migration ISO 9001:2015
- 2018 : Certification ISO 9001:2015
- 2019 : Prix National d'Excellence
- 2020 : Renouvellement ISO + Contrôle fonds COVID-19

### 2. Mise à jour du routage

- Ajouter la route `/grandes-etapes` dans `App.tsx`
- Remplacer le lien `/historique` dans le Header (navigation) pour pointer vers `/grandes-etapes`
- Mettre à jour les liens dans la sidebar de `Presentation.tsx`

### 3. Design

- Timeline verticale avec ligne centrale verte (`border-primary`)
- Cartes avec `border-l-4 border-primary` et fond `bg-section-light`
- Badges d'année en `bg-primary text-white` circulaires sur la ligne
- Responsive : sur mobile, toutes les cartes à gauche avec la ligne à gauche
- Animations scroll-reveal via `ScrollSection`

## Détails techniques

- Nouveau fichier : `src/pages/GrandesEtapes.tsx`
- Fichiers modifiés : `src/App.tsx`, `src/components/layout/Header.tsx`, `src/pages/Presentation.tsx`
- Les liens PDF des décrets pointeront vers les URLs du site officiel (archives) ; ils pourront être remplacés plus tard via le CMS

