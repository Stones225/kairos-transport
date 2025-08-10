// Données complètes de tarification selon le tableau fourni
export interface CompletePricingRule {
  zone: string;
  destination: string;
  service: string;
  vehicleType: string;
  option: string;
  price: number;
  currency: string;
}

export const completePricingRules: CompletePricingRule[] = [
  // Dans Dakar - Mise à disposition - Berline
  { zone: 'Dans Dakar', destination: 'Dans Dakar', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Une heure', price: 10000, currency: 'FCFA' },
  { zone: 'Dans Dakar', destination: 'Dans Dakar', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Au-delà de 3 heures (par heure)', price: 8000, currency: 'FCFA' },
  { zone: 'Dans Dakar', destination: 'Dans Dakar', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Demi-journée', price: 40000, currency: 'FCFA' },
  { zone: 'Dans Dakar', destination: 'Dans Dakar', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  // Aéroport - Transfert - Tous véhicules
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 25000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 40000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'Utilitaire', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'Utilitaire', option: 'Aller-retour', price: 60000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'SUV', option: 'Aller simple', price: 40000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'SUV', option: 'Aller-retour', price: 70000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'VAN (7 personnes)', option: 'Aller simple', price: 55000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'VAN (7 personnes)', option: 'Aller-retour', price: 100000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'Minibus 15 places', option: 'Aller simple', price: 80000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'Minibus 15 places', option: 'Aller-retour', price: 140000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'Minibus 28 places', option: 'Aller simple', price: 100000, currency: 'FCFA' },
  { zone: 'Aéroport', destination: 'Aéroport (AIBD)', service: 'Transfert', vehicleType: 'Minibus 28 places', option: 'Aller-retour', price: 180000, currency: 'FCFA' },

  // Régions - Transfert et Mise à disposition - Berline
  { zone: 'Régions', destination: 'Diamniadio', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 25000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Diamniadio', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 40000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Diamniadio', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Lac Rose', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 30000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Lac Rose', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 45000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Lac Rose', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Toubab Dialaw', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 30000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Toubab Dialaw', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 45000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Toubab Dialaw', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Popenguine', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Popenguine', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Popenguine', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Guéréo', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Guéréo', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Guéréo', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Somone', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Somone', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Somone', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Bandia', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Bandia', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Bandia', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Ngerigne', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Ngerigne', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Ngerigne', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Saly', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Saly', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Saly', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Mbour', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Mbour', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Mbour', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Nianing', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 45000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Nianing', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Warang', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 45000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Warang', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Joal', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Joal', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 65000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Fatick', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 65000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Fatick', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 65000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Kaolack', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 75000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Kaolack', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 65000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Fatala', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 90000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Fatala', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 65000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Thiès', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 35000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Thiès', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 55000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Thiès', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 55000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Lompoul', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 90000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Lompoul', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 120000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Lompoul', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 65000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Saint-Louis', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 110000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Saint-Louis', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 150000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Saint-Louis', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 65000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Louga', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 90000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Louga', service: 'Transfert', vehicleType: 'Berline', option: 'Aller-retour', price: 120000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Louga', service: 'Mise à disposition', vehicleType: 'Berline', option: 'Journée', price: 65000, currency: 'FCFA' },

  { zone: 'Régions', destination: 'Gambie avant frontière', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 100000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Gambie', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 150000, currency: 'FCFA' },
  { zone: 'Régions', destination: 'Ziguinchor', service: 'Transfert', vehicleType: 'Berline', option: 'Aller simple', price: 250000, currency: 'FCFA' }
];

// Destinations par zone pour faciliter la sélection
export const regionDestinations = [
  'Diamniadio', 'Lac Rose', 'Toubab Dialaw', 'Popenguine', 'Guéréo', 'Somone', 
  'Bandia', 'Ngerigne', 'Saly', 'Mbour', 'Nianing', 'Warang', 'Joal', 
  'Fatick', 'Kaolack', 'Fatala', 'Thiès', 'Lompoul', 'Saint-Louis', 
  'Louga', 'Gambie avant frontière', 'Gambie', 'Ziguinchor'
];

export const banlieueDestinations = [
  'Pikine', 'Thiaroye', 'Mbao', 'Rufisque'
];

// Fonction pour obtenir le prix exact selon le tableau
export const getExactPrice = (
  serviceType: string,
  vehicleType: string,
  destination: string,
  option: string
): number | null => {
  // Convertir les IDs en noms complets
  const serviceMapping: Record<string, string> = {
    'airport-transfer': 'Transfert',
    'dakar-rental': 'Mise à disposition',
    'region-rental': 'Transfert' // Pour les régions, on peut avoir les deux types
  };

  const vehicleMapping: Record<string, string> = {
    'berline': 'Berline',
    'suv': 'SUV',
    'utilitaire': 'Utilitaire',
    'van7': 'VAN (7 personnes)',
    'minibus15': 'Minibus 15 places',
    'minibus28': 'Minibus 28 places',
    'minibus51': 'Minibus 51 places',
    'toyota9': 'Toyota 9 places'
  };

  const optionMapping: Record<string, string> = {
    'aller-simple': 'Aller simple',
    'aller-retour': 'Aller-retour'
  };

  const serviceName = serviceMapping[serviceType];
  const vehicleName = vehicleMapping[vehicleType];
  const optionName = optionMapping[option] || option;

  console.log('Recherche prix:', { serviceType, vehicleType, destination, option });
  console.log('Mappé vers:', { serviceName, vehicleName, destination, optionName });

  // Rechercher dans les règles de tarification complètes
  let rule = completePricingRules.find(r =>
    r.service === serviceName &&
    r.vehicleType === vehicleName &&
    r.destination === destination &&
    r.option === optionName
  );

  // Si pas trouvé et c'est une région, essayer "Mise à disposition"
  if (!rule && serviceType === 'region-rental') {
    rule = completePricingRules.find(r =>
      r.service === 'Mise à disposition' &&
      r.vehicleType === vehicleName &&
      r.destination === destination &&
      r.option === 'Journée'
    );
  }

  // Si pas trouvé et c'est Dakar, utiliser les tarifs de base
  if (!rule && serviceType === 'dakar-rental') {
    rule = completePricingRules.find(r =>
      r.service === 'Mise à disposition' &&
      r.vehicleType === vehicleName &&
      r.zone === 'Dans Dakar' &&
      r.option === 'Journée'
    );
  }

  console.log('Règle trouvée:', rule);
  return rule ? rule.price : null;
};

// Fonction pour formater le prix
export const formatPrice = (price: number | null): string => {
  if (price === null) {
    return 'Sur devis';
  }
  return `${price.toLocaleString()} FCFA`;
};