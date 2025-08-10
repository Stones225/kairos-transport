# KAIROS Car Services - Guide de Style & Composants

## 🎨 Palette de Couleurs

### Couleurs Principales
```css
/* Orange - Principal CTA et Accents */
--primary-orange: #FF7F50
  └── Usage: Boutons primaires, liens, icônes importantes, hover states
  └── Variants: 
      ├── bg-opacity-90 (hover)
      ├── bg-opacity-10 (backgrounds subtils)
      └── border-primary-orange

/* Blanc - Fond et Contenus */
--primary-white: #FFFFFF
  └── Usage: Backgrounds principaux, cards, modales
  └── Variants: bg-white, text-white

/* Gris Foncé - Textes et Éléments Secondaires */
--primary-darkGray: #333333
  └── Usage: Titres, textes principaux, éléments de navigation
  └── Variants: text-primary-darkGray, bg-primary-darkGray

/* Rouge - Alertes et Erreurs */
--primary-red: #E63946
  └── Usage: Messages d'erreur, alertes, boutons de suppression
  └── Variants: text-primary-red, bg-primary-red
```

### Couleurs Secondaires (Système)
```css
/* Grays */
--gray-50: #F9FAFB    /* Backgrounds très clairs */
--gray-100: #F3F4F6   /* Backgrounds clairs */
--gray-200: #E5E7EB   /* Borders */
--gray-300: #D1D5DB   /* Borders hover */
--gray-400: #9CA3AF   /* Text disabled */
--gray-500: #6B7280   /* Text secondary */
--gray-600: #4B5563   /* Text primary light */

/* Success & Info */
--green-50: #ECFDF5   /* Success background */
--green-500: #10B981  /* Success text */
--blue-50: #EFF6FF    /* Info background */
--blue-500: #3B82F6   /* Info text */
```

## 📝 Typographie

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Échelle Typographique
```css
/* Titres */
.text-4xl    /* 36px - H1 pages principales */
.text-3xl    /* 30px - H2 sections importantes */
.text-2xl    /* 24px - H3 sous-sections */
.text-xl     /* 20px - H4 et texte large */
.text-lg     /* 18px - Texte emphase */

/* Corps de texte */
.text-base   /* 16px - Texte standard */
.text-sm     /* 14px - Texte secondaire */
.text-xs     /* 12px - Labels, metadata */

/* Font Weights */
.font-normal    /* 400 - Texte standard */
.font-medium    /* 500 - Emphase légère */
.font-semibold  /* 600 - Emphase forte */
.font-bold      /* 700 - Titres importants */
```

## 🧱 Composants de Base

### 1. Boutons

#### Bouton Principal (CTA)
```tsx
<button className="bg-primary-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105">
  Réserver maintenant
</button>
```

#### Bouton Secondaire
```tsx
<button className="border-2 border-primary-darkGray text-primary-darkGray px-8 py-3 rounded-lg font-semibold hover:bg-primary-darkGray hover:text-white transition-all">
  En savoir plus
</button>
```

#### Bouton Outline Orange
```tsx
<button className="border-2 border-primary-orange text-primary-orange px-8 py-3 rounded-lg font-semibold hover:bg-primary-orange hover:text-white transition-all">
  Découvrir
</button>
```

### 2. Cards

#### Card Standard
```tsx
<div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
  {/* Contenu */}
</div>
```

#### Card avec Image
```tsx
<div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
  <img src="..." className="w-full h-48 object-cover" />
  <div className="p-6">
    {/* Contenu */}
  </div>
</div>
```

### 3. Forms

#### Input Standard
```tsx
<input 
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
  placeholder="Votre texte..."
/>
```

#### Select
```tsx
<select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent">
  <option value="">Sélectionner...</option>
</select>
```

#### Textarea
```tsx
<textarea 
  rows={4}
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
/>
```

### 4. Badges & Tags

#### Badge Orange
```tsx
<span className="inline-block bg-primary-orange text-white px-3 py-1 text-xs font-medium rounded-full">
  Nouveau
</span>
```

#### Tag Informatif
```tsx
<span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full">
  Climatisation
</span>
```

## 📱 Layout & Spacing

### Container Principal
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Contenu */}
</div>
```

### Sections
```tsx
<section className="py-20">
  {/* Section avec padding vertical large */}
</section>

<section className="py-12">
  {/* Section avec padding vertical moyen */}
</section>
```

### Grille Responsive
```tsx
{/* Grille adaptive */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Items */}
</div>

{/* Grille services */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

## 🎭 Animations & Transitions

### Transitions Standard
```css
/* Hover standard */
.transition-all

/* Hover avec scale */
.transition-all.transform.hover:scale-105

/* Card hover */
.hover:shadow-xl.transition-all.duration-300.transform.hover:-translate-y-2
```

### Loading States
```tsx
{/* Bouton loading */}
<button className="bg-gray-400 cursor-not-allowed" disabled>
  Chargement...
</button>

{/* Skeleton loading */}
<div className="animate-pulse bg-gray-200 h-4 rounded"></div>
```

## 🔲 States & Variants

### États des Boutons
```tsx
{/* Normal */}
<button className="bg-primary-orange text-white">Normal</button>

{/* Hover */}
<button className="bg-primary-orange text-white hover:bg-opacity-90">Hover</button>

{/* Disabled */}
<button className="bg-gray-400 text-gray-600 cursor-not-allowed" disabled>Disabled</button>

{/* Loading */}
<button className="bg-primary-orange text-white opacity-75 cursor-wait">Loading...</button>
```

### États des Inputs
```tsx
{/* Normal */}
<input className="border-gray-300 focus:ring-primary-orange focus:border-transparent" />

{/* Error */}
<input className="border-red-300 focus:ring-red-500 focus:border-red-300" />

{/* Success */}
<input className="border-green-300 focus:ring-green-500 focus:border-green-300" />
```

## 🎯 Iconographie

### Règles d'Usage
```tsx
{/* Icônes avec texte - même couleur */}
<FaCar className="text-primary-orange mr-2" />
<span className="text-primary-orange">Véhicule</span>

{/* Icônes seules - taille adaptée */}
<FaPhone className="text-2xl text-primary-orange" />

{/* Icônes dans boutons */}
<button className="...">
  <FaArrowRight className="ml-2" />
  Suivant
</button>
```

### Icônes Principales
- **FaCar** : Véhicules, transport
- **FaPlane** : Aéroport, voyages
- **FaMapMarkerAlt** : Localisation
- **FaPhone, FaWhatsapp** : Contact
- **FaUsers** : Capacité, groupes
- **FaCheck, FaCheckCircle** : Validation
- **FaTimes** : Fermeture, annulation

## 📐 Breakpoints Responsive

### Mobile First
```css
/* Mobile (default) */
@media (min-width: 0px) { ... }

/* Tablet */
@media (min-width: 640px) { sm: }

/* Desktop Small */
@media (min-width: 768px) { md: }

/* Desktop Large */
@media (min-width: 1024px) { lg: }

/* Desktop XL */
@media (min-width: 1280px) { xl: }
```

### Exemples d'Usage
```tsx
{/* Text responsive */}
<h1 className="text-2xl md:text-4xl lg:text-5xl">Titre</h1>

{/* Grille responsive */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

{/* Spacing responsive */}
<section className="py-12 md:py-20">
```

## 🎨 Dégradés & Effets

### Backgrounds Dégradés
```tsx
{/* Dégradé principal */}
<div className="bg-gradient-to-r from-primary-darkGray to-gray-600">

{/* Dégradé orange */}
<div className="bg-gradient-to-r from-primary-orange to-orange-600">

{/* Overlay image */}
<div className="absolute inset-0 bg-black bg-opacity-40">
```

### Shadows
```css
/* Card shadow */
.shadow-lg

/* Card hover */
.hover:shadow-xl

/* Subtle shadow */
.shadow-sm
```

## 🚨 Messages & Alertes

### Success
```tsx
<div className="p-4 bg-green-50 border border-green-400 text-green-700 rounded-lg">
  <strong>Succès !</strong> Votre action a été effectuée.
</div>
```

### Error
```tsx
<div className="p-4 bg-red-50 border border-red-400 text-red-700 rounded-lg">
  <strong>Erreur !</strong> Quelque chose s'est mal passé.
</div>
```

### Info
```tsx
<div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
  <div className="flex items-start">
    <FaInfoCircle className="text-blue-400 mr-3 mt-0.5" />
    <p className="text-blue-800">Information importante.</p>
  </div>
</div>
```

## 📋 Checklist Qualité

### ✅ Avant Commit
- [ ] Couleurs de la palette officielle utilisées
- [ ] Composants responsive (mobile-first)
- [ ] Transitions et hover states implémentés
- [ ] Accessibilité (alt texts, labels, focus)
- [ ] Performance (lazy loading images)
- [ ] TypeScript strict mode
- [ ] Pas d'erreurs console
- [ ] Test sur mobile/desktop

### ✅ Design Review
- [ ] Cohérence visuelle avec le reste de l'app
- [ ] Espacement et alignements corrects
- [ ] Typographie respectée
- [ ] États d'interaction (hover, focus, disabled)
- [ ] Messages d'erreur/succès appropriés
- [ ] Loading states implemented

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2024