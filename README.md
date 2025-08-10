# 🚗 KAIROS - Service de Transport Premium au Sénégal

![KAIROS Banner](https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=300&fit=crop)

## 🌟 Description

**KAIROS** est une application web moderne de réservation de transport premium au Sénégal. Développée avec React et TypeScript, elle offre une expérience utilisateur exceptionnelle pour réserver des véhicules avec chauffeur.

## ✨ Fonctionnalités

### 🏠 **Landing Page**
- Hero section immersive avec image du Sénégal
- Formulaire de réservation rapide
- Présentation des services phares
- Indicateurs de confiance et statistiques

### 📋 **Pages Principales**
- **Accueil** : Vue d'ensemble et réservation rapide
- **Services** : Détails des prestations avec tarifs
- **Tarifs** : Tableau complet des prix (téléchargement PDF)
- **Réservation** : Formulaire multi-étapes complet
- **À propos** : Histoire, valeurs, équipe
- **Contact** : Formulaire + informations pratiques
- **FAQ** : Questions fréquentes avec recherche
- **Galerie** : Photos véhicules avec lightbox

### 🎨 **Design & UX**
- **Mobile-first** et entièrement responsive
- Palette officielle : Blanc (#FFFFFF), Gris foncé (#333333), Orange (#FF7F50), Rouge (#E63946)
- Animations subtiles (hover, fade-in)
- Navigation fluide avec menu hamburger mobile
- Composants réutilisables et modulaires

### 🔥 **Backend Firebase**
- **Authentication** : SMS OTP pour numéros sénégalais
- **Firestore** : Base de données NoSQL pour réservations, utilisateurs, tarifs
- **Storage** : Gestion des documents (devis PDF, justificatifs)
- **Functions** : Logique métier (génération PDF, notifications, paiements)
- **Messaging** : Notifications push temps réel

## 🛠 Technologies

### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling mobile-first
- **React Router** pour la navigation
- **React Icons** pour l'iconographie
- **Firebase SDK** v9+ (modular)

### Backend & Services
- **Firebase** (Auth, Firestore, Functions, Storage, Messaging)
- **Node.js** pour les Cloud Functions
- Intégrations futures : **Wave**, **Orange Money**, **Google Maps**

## 📁 Structure du Projet

```
kairos-frontend/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── BookingForm/
│   │       └── QuickBookingForm.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Pricing.tsx
│   │   ├── Booking.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── FAQ.tsx
│   │   └── Gallery.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   └── bookingService.ts
│   ├── config/
│   │   └── firebase.ts
│   └── utils/
├── public/
└── package.json
```

## ⚡ Installation & Démarrage

### Prérequis
- Node.js 16+
- npm ou yarn
- Compte Firebase avec projet configuré

### Installation
```bash
# Cloner le repository
git clone [repository-url]
cd KAIROS/kairos-frontend

# Installer les dépendances
npm install

# Configuration environnement
cp src/.env.example .env.local
# Remplir les variables Firebase dans .env.local

# Démarrer en mode développement
npm start
```

### Scripts Disponibles
```bash
npm start          # Serveur de développement
npm run build      # Build de production
npm test           # Tests unitaires
npm run lint       # Vérification du code
```

## 🔧 Configuration Firebase

### 1. Créer un projet Firebase
1. Aller sur [Firebase Console](https://console.firebase.google.com/)
2. Créer un nouveau projet
3. Activer Authentication, Firestore, Storage, Functions

### 2. Configuration Authentication
```javascript
// Activer l'authentification par téléphone
// Configurer reCAPTCHA pour le web
// Ajouter numéros de test si nécessaire
```

### 3. Variables d'environnement (.env.local)
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## 🎨 Guide de Style

### Couleurs
```css
/* Couleurs principales */
--primary-orange: #FF7F50    /* CTA, liens, accents */
--primary-white: #FFFFFF     /* Fond, zones de contenu */
--primary-darkGray: #333333  /* Textes, éléments secondaires */
--primary-red: #E63946       /* Alertes, erreurs */
```

### Typographie
- **Font principale** : Inter (Google Fonts)
- **Tailles** : Mobile-first avec breakpoints responsive
- **Poids** : 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Composants Réutilisables
- Boutons avec variantes (primary, secondary, outline)
- Cards avec shadow et hover effects
- Forms avec validation et états
- Navigation responsive avec menu mobile

## 📱 Services Intégrés

### Types de Services
1. **Transfert Aéroport** (25 000 - 45 000 FCFA)
2. **Mise à disposition Dakar** (8 000 - 25 000 FCFA/heure)
3. **Déplacements Régions** (Devis personnalisé)

### Types de Véhicules
- **Berline** (4 places) - Confort standard
- **SUV** (6 places) - Confort supérieur
- **Toyota 9 places** - Groupes familiaux
- **Minibus** (26 places) - Événements/collectif

## 🚀 Déploiement

L'application est déployée sur Firebase Hosting :
**🔗 https://kairos-9b2c6-5a2bd.web.app**

### Build de Production
```bash
npm run build
```

### Déploiement Firebase Hosting
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Login Firebase
firebase login

# Initialiser le projet
firebase init hosting

# Déployer
firebase deploy --only hosting
```

## 🔐 Sécurité

### Rules Firestore (firestore.rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Bookings - authenticated users only
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

## 🧪 Tests

### Tests Unitaires
```bash
npm test
```

### Tests d'Intégration
```bash
npm run test:integration
```

## 📈 Performance

### Optimisations Implémentées
- Lazy loading des images
- Code splitting par route
- Compression des assets
- Service Worker pour le cache
- Optimisation Lighthouse score

### Métriques Cibles
- **First Contentful Paint** : < 2s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **Accessibility Score** : > 90

## 🤝 Contribution

### Guidelines
1. Utiliser TypeScript strictement
2. Respecter la palette de couleurs officielle
3. Tests unitaires obligatoires pour nouveaux composants
4. Documentation des fonctions complexes
5. Mobile-first approach

### Workflow Git
```bash
git checkout -b feature/nom-de-la-feature
git commit -m "type: description courte"
git push origin feature/nom-de-la-feature
# Créer Pull Request
```

## 📞 Support

- **Email** : dev@kairoscarservices.sn
- **Documentation** : [Lien vers docs]
- **Issues** : GitHub Issues

## 📝 Licence

© 2024 KAIROS Car Services. Tous droits réservés.

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2024  
**Compatibilité** : Chrome 88+, Firefox 85+, Safari 14+, Edge 88+