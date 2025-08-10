import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'fr' | 'en' | 'it' | 'es' | 'mandingue';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
  availableLanguages: { code: SupportedLanguage; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<SupportedLanguage, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.vehicles': 'Véhicules',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.booking': 'Réserver',
    
    // Hero Section
    'hero.subtitle': 'Transport Premium au Sénégal',
    'hero.title': 'Votre Partenaire de Transport',
    'hero.description': 'KAIROS Car Services vous accompagne avec élégance, sécurité et ponctualité pour tous vos déplacements à Dakar et dans les régions du Sénégal.',
    'hero.cta.book': 'Réserver maintenant',
    'hero.cta.discover': 'Découvrir nos services',
    'hero.stats.experience': 'Années d\'expérience',
    'hero.stats.satisfaction': 'Clients satisfaits',
    'hero.stats.availability': 'Service disponible',
    'hero.stats.vehicles': 'Véhicules modernes',
    
    // Features
    'features.available': 'Disponible 24h/24',
    'features.secure': 'Service sécurisé',
    'features.coverage': 'Couverture nationale',
    'features.experienced': 'Chauffeurs expérimentés',
    
    // Services
    'services.title': 'Nos Services Premium',
    'services.subtitle': 'Des solutions de transport adaptées à tous vos besoins',
    
    // Vehicles
    'vehicles.title': 'Notre Flotte de Véhicules',
    'vehicles.subtitle': 'Des véhicules modernes et bien entretenus pour répondre à tous vos besoins de transport',
    'vehicles.book': 'Réserver ce véhicule',
    'vehicles.passengers': 'passagers',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Notre équipe est à votre disposition 24h/24 pour répondre à toutes vos questions',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Téléphone',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le message',
    
    // Footer
    'footer.description': 'Votre partenaire de confiance pour tous vos déplacements au Sénégal.',
    'footer.quicklinks': 'Liens rapides',
    'footer.contact.title': 'Contact',
    'footer.social': 'Suivez-nous',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.phone': 'Téléphone',
    'common.email': 'Email',
    'common.address': 'Adresse',
    'common.price': 'Prix',
    'common.fcfa': 'FCFA'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.vehicles': 'Vehicles',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.booking': 'Book Now',
    
    // Hero Section
    'hero.subtitle': 'Premium Transport in Senegal',
    'hero.title': 'Your Transport Partner',
    'hero.description': 'KAIROS Car Services accompanies you with elegance, safety and punctuality for all your travels in Dakar and regions of Senegal.',
    'hero.cta.book': 'Book Now',
    'hero.cta.discover': 'Discover our services',
    'hero.stats.experience': 'Years of experience',
    'hero.stats.satisfaction': 'Satisfied customers',
    'hero.stats.availability': 'Service available',
    'hero.stats.vehicles': 'Modern vehicles',
    
    // Features
    'features.available': 'Available 24/7',
    'features.secure': 'Secure service',
    'features.coverage': 'National coverage',
    'features.experienced': 'Experienced drivers',
    
    // Services
    'services.title': 'Our Premium Services',
    'services.subtitle': 'Transport solutions adapted to all your needs',
    
    // Vehicles
    'vehicles.title': 'Our Fleet',
    'vehicles.subtitle': 'Modern and well-maintained vehicles to meet all your transport needs',
    'vehicles.book': 'Book this vehicle',
    'vehicles.passengers': 'passengers',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Our team is available 24/7 to answer all your questions',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    
    // Footer
    'footer.description': 'Your trusted partner for all your travels in Senegal.',
    'footer.quicklinks': 'Quick Links',
    'footer.contact.title': 'Contact',
    'footer.social': 'Follow Us',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.phone': 'Phone',
    'common.email': 'Email',
    'common.address': 'Address',
    'common.price': 'Price',
    'common.fcfa': 'FCFA'
  },
  
  it: {
    // Navigation
    'nav.home': 'Casa',
    'nav.services': 'Servizi',
    'nav.vehicles': 'Veicoli',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatto',
    'nav.booking': 'Prenota',
    
    // Hero Section
    'hero.subtitle': 'Trasporti Premium in Senegal',
    'hero.title': 'Il Vostro Partner di Trasporto',
    'hero.description': 'KAIROS Car Services vi accompagna con eleganza, sicurezza e puntualità per tutti i vostri spostamenti a Dakar e nelle regioni del Senegal.',
    'hero.cta.book': 'Prenota Ora',
    'hero.cta.discover': 'Scopri i nostri servizi',
    'hero.stats.experience': 'Anni di esperienza',
    'hero.stats.satisfaction': 'Clienti soddisfatti',
    'hero.stats.availability': 'Servizio disponibile',
    'hero.stats.vehicles': 'Veicoli moderni',
    
    // Features
    'features.available': 'Disponibile 24/7',
    'features.secure': 'Servizio sicuro',
    'features.coverage': 'Copertura nazionale',
    'features.experienced': 'Autisti esperti',
    
    // Services
    'services.title': 'I Nostri Servizi Premium',
    'services.subtitle': 'Soluzioni di trasporto adatte a tutte le vostre esigenze',
    
    // Vehicles
    'vehicles.title': 'La Nostra Flotta',
    'vehicles.subtitle': 'Veicoli moderni e ben mantenuti per soddisfare tutte le vostre esigenze di trasporto',
    'vehicles.book': 'Prenota questo veicolo',
    'vehicles.passengers': 'passeggeri',
    
    // Contact
    'contact.title': 'Contattaci',
    'contact.subtitle': 'Il nostro team è disponibile 24/7 per rispondere a tutte le vostre domande',
    'contact.form.title': 'Inviateci un messaggio',
    'contact.form.name': 'Nome Completo',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Telefono',
    'contact.form.message': 'Messaggio',
    'contact.form.send': 'Invia Messaggio',
    
    // Footer
    'footer.description': 'Il vostro partner di fiducia per tutti i vostri viaggi in Senegal.',
    'footer.quicklinks': 'Collegamenti Rapidi',
    'footer.contact.title': 'Contatto',
    'footer.social': 'Seguici',
    
    // Common
    'common.loading': 'Caricamento...',
    'common.error': 'Errore',
    'common.success': 'Successo',
    'common.phone': 'Telefono',
    'common.email': 'Email',
    'common.address': 'Indirizzo',
    'common.price': 'Prezzo',
    'common.fcfa': 'FCFA'
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.vehicles': 'Vehículos',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.booking': 'Reservar',
    
    // Hero Section
    'hero.subtitle': 'Transporte Premium en Senegal',
    'hero.title': 'Su Socio de Transporte',
    'hero.description': 'KAIROS Car Services le acompaña con elegancia, seguridad y puntualidad para todos sus desplazamientos en Dakar y las regiones de Senegal.',
    'hero.cta.book': 'Reservar Ahora',
    'hero.cta.discover': 'Descubra nuestros servicios',
    'hero.stats.experience': 'Años de experiencia',
    'hero.stats.satisfaction': 'Clientes satisfechos',
    'hero.stats.availability': 'Servicio disponible',
    'hero.stats.vehicles': 'Vehículos modernos',
    
    // Features
    'features.available': 'Disponible 24/7',
    'features.secure': 'Servicio seguro',
    'features.coverage': 'Cobertura nacional',
    'features.experienced': 'Conductores experimentados',
    
    // Services
    'services.title': 'Nuestros Servicios Premium',
    'services.subtitle': 'Soluciones de transporte adaptadas a todas sus necesidades',
    
    // Vehicles
    'vehicles.title': 'Nuestra Flota',
    'vehicles.subtitle': 'Vehículos modernos y bien mantenidos para satisfacer todas sus necesidades de transporte',
    'vehicles.book': 'Reservar este vehículo',
    'vehicles.passengers': 'pasajeros',
    
    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Nuestro equipo está disponible 24/7 para responder a todas sus preguntas',
    'contact.form.title': 'Envíanos un mensaje',
    'contact.form.name': 'Nombre Completo',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Teléfono',
    'contact.form.message': 'Mensaje',
    'contact.form.send': 'Enviar Mensaje',
    
    // Footer
    'footer.description': 'Su socio de confianza para todos sus viajes en Senegal.',
    'footer.quicklinks': 'Enlaces Rápidos',
    'footer.contact.title': 'Contacto',
    'footer.social': 'Síguenos',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.phone': 'Teléfono',
    'common.email': 'Email',
    'common.address': 'Dirección',
    'common.price': 'Precio',
    'common.fcfa': 'FCFA'
  },
  
  mandingue: {
    // Navigation
    'nav.home': 'Kesso',
    'nav.services': 'Baara',
    'nav.vehicles': 'Mobili',
    'nav.about': 'An ka kuma',
    'nav.contact': 'Kontak',
    'nav.booking': 'Demande kè',
    
    // Hero Section
    'hero.subtitle': 'Transport Premium Senegal kono',
    'hero.title': 'Aw ka Transport Jatigi',
    'hero.description': 'KAIROS Car Services bè ka aw dɛmɛ ni cɛnya ye, lakana ye ani waati kɔrɔ ye aw ka taama bɛɛ kama Dakar ani Senegal sigida bɛɛ kɔnɔ.',
    'hero.cta.book': 'Sisan demande kè',
    'hero.cta.discover': 'An ka baara dɔn',
    'hero.stats.experience': 'San caman ka kɛ baara la',
    'hero.stats.satisfaction': 'Kiliyanw nisɔndiyalen',
    'hero.stats.availability': 'Baara bɛ yen',
    'hero.stats.vehicles': 'Mobili kura',
    
    // Features
    'features.available': 'Bɛ yen tile 24/7',
    'features.secure': 'Baara lakana',
    'features.coverage': 'Jamana bɛɛ la',
    'features.experienced': 'Mobili bolo kɛcogo dɔnnenw',
    
    // Services
    'services.title': 'An ka Baara Premium',
    'services.subtitle': 'Transport fɛɛrɛw minnu bɛ bɛn aw ka mago bɛɛ ma',
    
    // Vehicles
    'vehicles.title': 'An ka Mobili Jatebɔ',
    'vehicles.subtitle': 'Mobili kura ani minnu labɛnna ka ɲɛ walasa ka dɛmɛ aw ka transport mago bɛɛ la',
    'vehicles.book': 'Nin mobili demande kè',
    'vehicles.passengers': 'taama kɛla',
    
    // Contact
    'contact.title': 'An fɛ kuma',
    'contact.subtitle': 'An ka jɛkulu bɛ yen tile 24/7 walasa ka jaabi aw ka ɲininkali bɛɛ ma',
    'contact.form.title': 'Cikan dɔ ci an fɛ',
    'contact.form.name': 'Tɔgɔ bɛɛ',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Telefɔni',
    'contact.form.message': 'Cikan',
    'contact.form.send': 'Cikan ci',
    
    // Footer
    'footer.description': 'Aw ka jigi minnu bɛ se ka da a kan aw ka taama bɛɛ kama Senegal kɔnɔ.',
    'footer.quicklinks': 'Sira teliyamanw',
    'footer.contact.title': 'Kontak',
    'footer.social': 'An nɔfɛ',
    
    // Common
    'common.loading': 'Ka don...',
    'common.error': 'Fili',
    'common.success': 'Ɲɛtaa',
    'common.phone': 'Telefɔni',
    'common.email': 'Email',
    'common.address': 'Adirɛsi',
    'common.price': 'Sɔngɔ',
    'common.fcfa': 'FCFA'
  }
};

const availableLanguages = [
  { code: 'fr' as SupportedLanguage, name: 'Français', flag: '🇸🇳' },
  { code: 'en' as SupportedLanguage, name: 'English', flag: '🇺🇸' },
  { code: 'it' as SupportedLanguage, name: 'Italiano', flag: '🇮🇹' },
  { code: 'es' as SupportedLanguage, name: 'Español', flag: '🇪🇸' },
  { code: 'mandingue' as SupportedLanguage, name: 'Mandingue', flag: '🌍' }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('kairos-language') as SupportedLanguage;
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
      if (translations[browserLang]) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    localStorage.setItem('kairos-language', language);
    document.documentElement.lang = language;
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations['fr'][key] || key;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};