export interface PricingRule {
  id: string;
  zone: string;
  destination: string;
  service: string;
  vehicleType: string;
  option: string;
  price: number | 'quote'; // 'quote' pour "à la demande"
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Zone {
  id: string;
  name: string;
  type: 'city' | 'suburb' | 'airport' | 'region';
  destinations: string[];
}

export interface VehicleType {
  id: string;
  name: string;
  capacity: number;
  description: string;
  imageUrl?: string;
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  category: 'transfer' | 'rental' | 'tour';
}

// Données de tarification basées sur votre tableau
export const zones: Zone[] = [
  {
    id: 'dakar',
    name: 'Dans Dakar',
    type: 'city',
    destinations: ['Dans Dakar']
  },
  {
    id: 'banlieue',
    name: 'Banlieue',
    type: 'suburb',
    destinations: ['Pikine', 'Thiaroye', 'Mbao', 'Rufisque']
  },
  {
    id: 'airport',
    name: 'Aéroport',
    type: 'airport',
    destinations: ['Aéroport (AIBD)']
  },
  {
    id: 'regions',
    name: 'Régions',
    type: 'region',
    destinations: ['Diamniadio', 'Touba', 'Thiès', 'Mbour', 'Saly', 'Saint-Louis', 'Kaolack', 'Tambacounda', 'Ziguinchor', 'Cap Skirring']
  }
];

export const vehicleTypes: VehicleType[] = [
  {
    id: 'berline',
    name: 'Berline (4 places)',
    capacity: 4,
    description: 'Véhicule confortable pour 4 passagers'
  },
  {
    id: 'suv',
    name: 'SUV (6 places)',
    capacity: 6,
    description: 'SUV spacieux pour 6 passagers'
  },
  {
    id: 'toyota9',
    name: 'Toyota 9 places',
    capacity: 9,
    description: 'Toyota spacieux pour 9 passagers'
  },
  {
    id: 'van7',
    name: 'VAN (7 places)',
    capacity: 7,
    description: 'Van pour 7 passagers'
  },
  {
    id: 'minibus15',
    name: 'Minibus 15 places',
    capacity: 15,
    description: 'Minibus pour groupes de 15 personnes'
  },
  {
    id: 'minibus28',
    name: 'Minibus 28 places',
    capacity: 28,
    description: 'Minibus pour groupes de 28 personnes'
  },
  {
    id: 'minibus51',
    name: 'Minibus 51 places',
    capacity: 51,
    description: 'Grand minibus pour groupes de 51 personnes'
  },
  {
    id: 'utilitaire',
    name: 'Utilitaire (6 places)',
    capacity: 6,
    description: 'Véhicule utilitaire pour 6 passagers'
  }
];

export const serviceTypes: ServiceType[] = [
  {
    id: 'airport-transfer',
    name: 'Transfert à l\'aéroport (AIBD)',
    description: 'Service de transfert vers/depuis l\'aéroport AIBD',
    category: 'transfer'
  },
  {
    id: 'dakar-rental',
    name: 'Mise à disposition à Dakar',
    description: 'Véhicule avec chauffeur dans Dakar',
    category: 'rental'
  },
  {
    id: 'region-rental',
    name: 'Mise à disposition en région',
    description: 'Déplacements vers les régions du Sénégal',
    category: 'rental'
  }
];

// Règles de tarification complètes
export const pricingRules: PricingRule[] = [
  // Dans Dakar - Mise à disposition
  {
    id: 'dakar-rental-berline-1h',
    zone: 'Dans Dakar',
    destination: 'Dans Dakar',
    service: 'Mise à disposition',
    vehicleType: 'Berline',
    option: 'Une heure',
    price: 10000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'dakar-rental-berline-3h',
    zone: 'Dans Dakar',
    destination: 'Dans Dakar',
    service: 'Mise à disposition',
    vehicleType: 'Berline',
    option: 'Au-delà de 3 heures (par heure)',
    price: 8000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'dakar-rental-berline-halfday',
    zone: 'Dans Dakar',
    destination: 'Dans Dakar',
    service: 'Mise à disposition',
    vehicleType: 'Berline',
    option: 'Demi-journée',
    price: 40000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'dakar-rental-berline-fullday',
    zone: 'Dans Dakar',
    destination: 'Dans Dakar',
    service: 'Mise à disposition',
    vehicleType: 'Berline',
    option: 'Journée',
    price: 55000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Banlieue - À la demande
  {
    id: 'banlieue-pikine-quote',
    zone: 'Banlieue',
    destination: 'Pikine',
    service: 'Tous services',
    vehicleType: 'Tous véhicules',
    option: 'Tous services',
    price: 'quote',
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'banlieue-thiaroye-quote',
    zone: 'Banlieue',
    destination: 'Thiaroye',
    service: 'Tous services',
    vehicleType: 'Tous véhicules',
    option: 'Tous services',
    price: 'quote',
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'banlieue-mbao-quote',
    zone: 'Banlieue',
    destination: 'Mbao',
    service: 'Tous services',
    vehicleType: 'Tous véhicules',
    option: 'Tous services',
    price: 'quote',
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'banlieue-rufisque-quote',
    zone: 'Banlieue',
    destination: 'Rufisque',
    service: 'Tous services',
    vehicleType: 'Tous véhicules',
    option: 'Tous services',
    price: 'quote',
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Aéroport - Transferts
  {
    id: 'airport-berline-oneway',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'Berline',
    option: 'Aller simple',
    price: 25000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-berline-roundtrip',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'Berline',
    option: 'Aller/Retour',
    price: 40000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-utilitaire-oneway',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'Utilitaire',
    option: 'Aller simple',
    price: 35000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-utilitaire-roundtrip',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'Utilitaire',
    option: 'Aller/Retour',
    price: 60000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-suv-oneway',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'SUV',
    option: 'Aller simple',
    price: 40000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-suv-roundtrip',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'SUV',
    option: 'Aller/Retour',
    price: 70000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-van7-oneway',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'VAN (7 personnes)',
    option: 'Aller simple',
    price: 55000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-van7-roundtrip',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'VAN (7 personnes)',
    option: 'Aller/Retour',
    price: 100000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-minibus15-oneway',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'Minibus de 15 places',
    option: 'Aller simple',
    price: 80000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-minibus15-roundtrip',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'Minibus de 15 places',
    option: 'Aller/Retour',
    price: 140000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-minibus28-oneway',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'Minibus de 28 places',
    option: 'Aller simple',
    price: 100000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'airport-minibus28-roundtrip',
    zone: 'Aéroport',
    destination: 'Aéroport (AIBD)',
    service: 'Transfert',
    vehicleType: 'Minibus de 28 places',
    option: 'Aller/Retour',
    price: 180000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Régions - Diamniadio
  {
    id: 'regions-diamniadio-berline-oneway',
    zone: 'Régions',
    destination: 'Diamniadio',
    service: 'Transfert',
    vehicleType: 'Berline',
    option: 'Aller simple',
    price: 25000,
    currency: 'FCFA',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  // TODO: Ajouter les autres destinations des régions
];

// Fonction utilitaire pour obtenir le prix d'un service
export const getPricing = (
  zone: string,
  destination: string,
  service: string,
  vehicleType: string,
  option: string
): PricingRule | null => {
  return pricingRules.find(rule =>
    rule.zone === zone &&
    rule.destination === destination &&
    rule.service === service &&
    (rule.vehicleType === vehicleType || rule.vehicleType === 'Tous véhicules') &&
    (rule.option === option || rule.option === 'Tous services') &&
    rule.isActive
  ) || null;
};

// Fonction pour formater le prix
export const formatPrice = (price: number | 'quote', currency: string = 'FCFA'): string => {
  if (price === 'quote') {
    return 'Sur devis';
  }
  return `${price.toLocaleString()} ${currency}`;
};