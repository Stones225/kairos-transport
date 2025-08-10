# Configuration Firebase pour KAIROS Car Services

## 📋 Vue d'ensemble

Ce guide détaille la configuration complète de Firebase pour la plateforme KAIROS Car Services, incluant Authentication, Firestore, Storage, Cloud Functions et Cloud Messaging.

## 🚀 Étape 1 : Création du Projet Firebase

### 1. Créer le projet
1. Aller sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquer "Ajouter un projet"
3. Nom du projet : `kairos-car-services`
4. Activer Google Analytics (recommandé)
5. Sélectionner le compte Analytics existant ou en créer un

### 2. Ajouter une application Web
1. Dans la console Firebase, cliquer sur l'icône Web `</>`
2. Nom de l'app : `KAIROS Frontend`
3. Cocher "Configurer aussi Firebase Hosting"
4. Enregistrer la configuration

## 🔐 Étape 2 : Configuration Authentication

### 1. Activer l'authentification
```bash
# Dans la console Firebase
Authentication > Get started > Méthode de connexion
```

### 2. Configurer l'authentification par téléphone
```javascript
// Activer le fournisseur "Téléphone"
// Configuration pour le Sénégal (+221)
```

### 3. Configuration reCAPTCHA
```html
<!-- Ajouter dans public/index.html -->
<div id="recaptcha-container"></div>
```

### 4. Numéros de test (Développement)
```javascript
// Dans Authentication > Settings > Numéros de téléphone de test
+221123456789 : 123456
+221987654321 : 654321
```

### 5. Règles de sécurité Auth
```javascript
// Pas de règles spécifiques nécessaires pour Authentication
// La sécurité est gérée au niveau Firestore
```

## 🗃️ Étape 3 : Configuration Firestore Database

### 1. Créer la base de données
```bash
# Dans la console Firebase
Firestore Database > Créer une base de données > Mode test (temporaire)
# Région : europe-west1 (pour de meilleures performances)
```

### 2. Structure des collections

#### Collection `users`
```javascript
{
  uid: string,                    // ID utilisateur Firebase
  phoneNumber: string,            // +221XXXXXXXXX
  email?: string,
  firstName?: string,
  lastName?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  isActive: boolean,
  role?: 'customer' | 'driver' | 'admin',
  preferences: {
    notifications: boolean,
    language: 'fr' | 'en',
    preferredVehicleType?: string
  }
}
```

#### Collection `bookings`
```javascript
{
  id: string,                     // Auto-généré
  userId: string,                 // Référence vers users
  customerInfo: {
    name: string,
    email: string,
    phone: string
  },
  serviceDetails: {
    serviceType: 'transfert-aeroport' | 'mise-disposition-dakar' | 'mise-disposition-region',
    vehicleType: 'berline' | 'suv' | 'toyota-9' | 'minibus-26',
    tripType: 'aller-simple' | 'aller-retour'
  },
  itinerary: {
    pickupLocation: string,
    destination?: string,
    departureDate: string,
    departureTime: string,
    returnDate?: string,
    returnTime?: string
  },
  passengers: {
    count: number,
    luggage: number,
    specialRequests?: string
  },
  pricing: {
    basePrice: number,
    totalPrice: number,
    currency: 'FCFA',
    breakdown: {
      vehiclePrice: number,
      tripMultiplier: number,
      additionalFees: number
    }
  },
  status: 'pending' | 'confirmed' | 'assigned' | 'in-progress' | 'completed' | 'cancelled',
  assignedDriver?: {
    driverId: string,
    driverName: string,
    driverPhone: string,
    vehicleInfo: {
      make: string,
      model: string,
      licensePlate: string,
      color: string
    }
  },
  payment?: {
    status: 'pending' | 'partial' | 'completed' | 'failed',
    method: 'cash' | 'card' | 'wave' | 'orange-money' | 'bank-transfer',
    amountPaid: number,
    paymentDate?: Timestamp,
    transactionId?: string
  },
  timestamps: {
    createdAt: Timestamp,
    updatedAt: Timestamp,
    confirmedAt?: Timestamp,
    completedAt?: Timestamp
  },
  notes?: {
    customerNotes?: string,
    internalNotes?: string
  }
}
```

#### Collection `vehicles`
```javascript
{
  id: string,
  type: 'berline' | 'suv' | 'toyota-9' | 'minibus-26',
  make: string,
  model: string,
  year: number,
  licensePlate: string,
  color: string,
  capacity: {
    passengers: number,
    luggage: number
  },
  features: string[],
  status: 'available' | 'in-use' | 'maintenance' | 'inactive',
  assignedDriverId?: string,
  images: string[],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Collection `drivers`
```javascript
{
  id: string,
  userId: string,                 // Référence vers users
  personalInfo: {
    firstName: string,
    lastName: string,
    phone: string,
    email?: string,
    licenseNumber: string,
    licenseExpiryDate: Timestamp
  },
  status: 'available' | 'busy' | 'offline' | 'inactive',
  currentBookingId?: string,
  assignedVehicleId?: string,
  rating: {
    average: number,
    count: number
  },
  location?: {
    latitude: number,
    longitude: number,
    lastUpdated: Timestamp
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Collection `pricing`
```javascript
{
  vehicleType: string,
  serviceType: string,
  basePrice: number,
  hourlyRate?: number,
  minimumHours?: number,
  tripMultipliers: {
    'aller-retour': number
  },
  additionalFees?: {
    nightSurcharge: number,      // 22h-6h
    weekendSurcharge: number,    // Samedi-Dimanche
    holidaySurcharge: number     // Jours fériés
  },
  isActive: boolean,
  effectiveDate: Timestamp,
  updatedAt: Timestamp
}
```

### 3. Règles de sécurité Firestore
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Admins can read all users
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      // Users can read/write their own bookings
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      
      // Drivers can read bookings assigned to them
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/drivers/$(request.auth.uid)) &&
        resource.data.assignedDriver.driverId == request.auth.uid;
      
      // Admins can read/write all bookings
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      
      // Allow creating new bookings for authenticated users
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Vehicles collection - read for authenticated users
    match /vehicles/{vehicleId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Drivers collection
    match /drivers/{driverId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Pricing collection - read for all, write for admins only
    match /pricing/{pricingId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 📁 Étape 4 : Configuration Storage

### 1. Activer Cloud Storage
```bash
# Dans la console Firebase
Storage > Commencer
# Région : europe-west1 (cohérent avec Firestore)
```

### 2. Structure des dossiers
```
/users/{userId}/
  ├── profile-photos/
  └── documents/

/bookings/{bookingId}/
  ├── quotes/
  ├── receipts/
  └── additional-documents/

/vehicles/{vehicleId}/
  └── photos/

/drivers/{driverId}/
  ├── profile-photo/
  └── documents/
      ├── license/
      └── certifications/
```

### 3. Règles de sécurité Storage
```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Users can read/write their own files
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Booking files - accessible by user and assigned driver
    match /bookings/{bookingId}/{allPaths=**} {
      allow read: if request.auth != null && 
        (isBookingOwner(bookingId) || isAssignedDriver(bookingId));
      allow write: if request.auth != null && isBookingOwner(bookingId);
    }
    
    // Vehicle photos - readable by authenticated users
    match /vehicles/{vehicleId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && isAdmin();
    }
    
    // Driver files
    match /drivers/{driverId}/{allPaths=**} {
      allow read: if request.auth != null && 
        (request.auth.uid == getDriverUserId(driverId) || isAdmin());
      allow write: if request.auth != null && 
        request.auth.uid == getDriverUserId(driverId);
    }
    
    // Helper functions
    function isAdmin() {
      return get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isBookingOwner(bookingId) {
      return get(/databases/(default)/documents/bookings/$(bookingId)).data.userId == request.auth.uid;
    }
    
    function isAssignedDriver(bookingId) {
      return get(/databases/(default)/documents/bookings/$(bookingId)).data.assignedDriver.driverId == request.auth.uid;
    }
    
    function getDriverUserId(driverId) {
      return get(/databases/(default)/documents/drivers/$(driverId)).data.userId;
    }
  }
}
```

## ⚡ Étape 5 : Cloud Functions

### 1. Initialiser Functions
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Login Firebase
firebase login

# Dans le dossier du projet
firebase init functions
# Choisir TypeScript
# Installer dépendances
```

### 2. Structure des Functions
```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Trigger lors de création de réservation
export const onBookingCreated = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const bookingData = snap.data();
    
    // Envoyer notification SMS au client
    // Envoyer email de confirmation
    // Générer PDF de devis
    // Notifier l'équipe admin
  });

// Fonction de génération de PDF
export const generateBookingPDF = functions.https.onCall(async (data, context) => {
  // Vérifier authentification
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }
  
  // Générer PDF avec bibliothèque (jsPDF, Puppeteer)
  // Sauvegarder dans Storage
  // Retourner URL de téléchargement
});

// Fonction de calcul de prix
export const calculateBookingPrice = functions.https.onCall(async (data, context) => {
  const { vehicleType, serviceType, tripType, duration } = data;
  
  // Récupérer les tarifs depuis Firestore
  const pricingDoc = await admin.firestore()
    .collection('pricing')
    .where('vehicleType', '==', vehicleType)
    .where('serviceType', '==', serviceType)
    .where('isActive', '==', true)
    .get();
  
  // Calculer le prix selon les règles métier
  // Retourner détail du prix
});

// Assigner automatiquement un chauffeur
export const assignDriver = functions.https.onCall(async (data, context) => {
  const { bookingId } = data;
  
  // Trouver chauffeur disponible
  // Assigner à la réservation
  // Envoyer notifications
});
```

### 3. Déployer Functions
```bash
firebase deploy --only functions
```

## 📱 Étape 6 : Cloud Messaging (Notifications Push)

### 1. Configurer Messaging
```bash
# Dans la console Firebase
Project Settings > Cloud Messaging
# Générer une nouvelle paire de clés
```

### 2. Service Worker (public/firebase-messaging-sw.js)
```javascript
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

## 🔧 Étape 7 : Configuration Environnement

### 1. Variables d'environnement (.env.local)
```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyC...
REACT_APP_FIREBASE_AUTH_DOMAIN=kairos-car-services.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=kairos-car-services
REACT_APP_FIREBASE_STORAGE_BUCKET=kairos-car-services.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
REACT_APP_ENVIRONMENT=development

# External Services
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
REACT_APP_COMPANY_PHONE=+221XXXXXXXXX
REACT_APP_COMPANY_EMAIL=contact@kairoscarservices.sn
```

### 2. Configuration Firebase (src/config/firebase.ts)
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Messaging conditionnel
let messaging: any = null;
isSupported().then((supported) => {
  if (supported) {
    messaging = getMessaging(app);
  }
});
export { messaging };

export default app;
```

## 🚀 Étape 8 : Déploiement

### 1. Configuration Hosting
```bash
firebase init hosting
# Public directory: build
# Single-page app: Yes
# Overwrite index.html: No
```

### 2. Build et Déploiement
```bash
# Build de production
npm run build

# Déployer tout
firebase deploy

# Déployer uniquement l'hosting
firebase deploy --only hosting

# Déployer uniquement les functions
firebase deploy --only functions
```

## 📊 Étape 9 : Monitoring & Analytics

### 1. Configurer Analytics
```javascript
// Déjà configuré lors de la création du projet
// Tracking automatique des pages et événements
```

### 2. Performance Monitoring
```bash
# Ajouter dans l'app
import { getPerformance } from 'firebase/performance';
const perf = getPerformance(app);
```

### 3. Crashlytics (Optionnel pour Web)
```javascript
// Pas disponible pour Web, utiliser Sentry à la place
```

## 🔐 Sécurité & Maintenance

### 1. Checklist Sécurité
- [ ] Règles Firestore en mode production
- [ ] Règles Storage configurées
- [ ] Variables d'environnement sécurisées
- [ ] HTTPS uniquement
- [ ] Validation côté server (Functions)

### 2. Monitoring Régulier
- [ ] Quotas Firebase
- [ ] Performance des requêtes
- [ ] Erreurs Functions
- [ ] Coûts d'utilisation

### 3. Sauvegarde
```bash
# Export régulier de Firestore
firebase firestore:export gs://kairos-car-services-backups/$(date +%Y%m%d)
```

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2024  
**Support** : dev@kairoscarservices.sn