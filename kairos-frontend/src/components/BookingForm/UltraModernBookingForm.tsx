import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaUsers, 
  FaSuitcase, 
  FaCreditCard,
  FaLocationArrow,
  FaRocket,
  FaCheckCircle,
  FaExclamationTriangle,
  FaStar,
  FaRoute,
  FaMagic
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { BookingService } from '../../services/firestoreService';
import { getExactPrice, formatPrice, regionDestinations } from '../../data/completePricing';

interface UltraModernBookingFormData {
  vehicleType: string;
  serviceType: string;
  tripOption: 'aller-simple' | 'aller-retour';
  pickupLocation: string;
  dropoffLocation: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
  luggage: number;
  paymentMode: 'credit' | 'cash';
  paymentMethod: string;
  specialRequests: string;
}

const serviceOptions = [
  {
    id: 'airport-transfer',
    name: 'Transfert Aéroport',
    shortName: 'Aéroport',
    description: 'Transport vers/depuis l\'aéroport AIBD',
    icon: '✈️',
    color: 'from-blue-500 to-blue-700',
    features: ['Suivi de vol', 'Accueil personnalisé', 'Aide aux bagages']
  },
  {
    id: 'dakar-rental',
    name: 'Mise à disposition Dakar',
    shortName: 'Dakar',
    description: 'Véhicule avec chauffeur dans la capitale',
    icon: '🏙️',
    color: 'from-green-500 to-green-700',
    features: ['Chauffeur expérimenté', 'Connaissance de la ville', 'Flexibilité horaire']
  },
  {
    id: 'region-rental',
    name: 'Excursion Régions',
    shortName: 'Régions',
    description: 'Découverte des destinations du Sénégal',
    icon: '🌍',
    color: 'from-purple-500 to-purple-700',
    features: ['Guide local', 'Itinéraire personnalisé', 'Découverte culturelle']
  }
];

const vehicleOptions = [
  { 
    id: 'berline', 
    name: 'Berline Premium', 
    shortName: 'Berline',
    capacity: '4 places', 
    icon: '🚗',
    features: ['Climatisation', 'Wifi', 'Cuir'],
    image: 'https://images.unsplash.com/photo-1502877338535-766e7375c5e3?w=300&h=200&fit=crop'
  },
  { 
    id: 'suv', 
    name: 'SUV Confort', 
    shortName: 'SUV',
    capacity: '6 places', 
    icon: '🚙',
    features: ['Spacieux', 'Tout terrain', 'Sécurité'],
    image: 'https://images.unsplash.com/photo-1519641643602-7ff500b74923?w=300&h=200&fit=crop'
  },
  { 
    id: 'utilitaire', 
    name: 'Utilitaire Pro', 
    shortName: 'Utilitaire',
    capacity: '6 places', 
    icon: '🚚',
    features: ['Robuste', 'Grande capacité', 'Économique'],
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=300&h=200&fit=crop'
  },
  { 
    id: 'van7', 
    name: 'Van Familial', 
    shortName: 'VAN (7 personnes)',
    capacity: '7 places', 
    icon: '🚐',
    features: ['Famille nombreuse', 'Confortable', 'Modulable'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop'
  },
  { 
    id: 'minibus15', 
    name: 'Minibus Groupe', 
    shortName: 'Minibus 15 places',
    capacity: '15 places', 
    icon: '🚌',
    features: ['Groupe moyen', 'Climatisé', 'Confortable'],
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300&h=200&fit=crop'
  },
  { 
    id: 'minibus28', 
    name: 'Minibus Événement', 
    shortName: 'Minibus 28 places',
    capacity: '28 places', 
    icon: '🚐',
    features: ['Grand groupe', 'Événements', 'Professionnel'],
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300&h=200&fit=crop'
  }
];

const paymentMethods = [
  { id: 'cash', name: 'Espèces', icon: '💸' },
  { id: 'mobile-money', name: 'Mobile Money', icon: '📱' },
  { id: 'bank-transfer', name: 'Virement bancaire', icon: '🏦' },
  { id: 'card', name: 'Carte bancaire', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🌐' }
];

const UltraModernBookingForm: React.FC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [formData, setFormData] = useState<UltraModernBookingFormData>({
    vehicleType: '',
    serviceType: '',
    tripOption: 'aller-simple',
    pickupLocation: '',
    dropoffLocation: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    passengers: 1,
    luggage: 0,
    paymentMode: 'cash',
    paymentMethod: '',
    specialRequests: ''
  });

  // Auto-save dans localStorage
  useEffect(() => {
    const saved = localStorage.getItem('kairos-booking-draft');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setFormData(parsedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données sauvegardées:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kairos-booking-draft', JSON.stringify(formData));
  }, [formData]);

  // Calcul du prix en temps réel
  const calculatePrice = useCallback(() => {
    if (!formData.serviceType || !formData.vehicleType) return null;

    let destination = formData.dropoffLocation;
    if (formData.serviceType === 'airport-transfer') {
      destination = 'Aéroport (AIBD)';
    } else if (formData.serviceType === 'dakar-rental') {
      // Pour Dakar, utiliser l'option basée sur la durée
      return getExactPrice(formData.serviceType, formData.vehicleType, 'Dans Dakar', 'Journée');
    }

    if (!destination) return null;

    return getExactPrice(
      formData.serviceType,
      formData.vehicleType,
      destination,
      formData.tripOption
    );
  }, [formData.serviceType, formData.vehicleType, formData.dropoffLocation, formData.tripOption]);

  useEffect(() => {
    const price = calculatePrice();
    setEstimatedPrice(price);
  }, [calculatePrice]);

  const handleInputChange = (field: keyof UltraModernBookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Veuillez vous connecter pour finaliser votre réservation.');
      return;
    }

    setIsLoading(true);
    try {
      const selectedService = serviceOptions.find(s => s.id === formData.serviceType);
      const selectedVehicle = vehicleOptions.find(v => v.id === formData.vehicleType);
      
      const bookingData = {
        userId: user.uid,
        userEmail: user.email || '',
        userName: user.displayName || 'Utilisateur',
        userPhone: user.phoneNumber || '',
        
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        zone: formData.serviceType === 'airport-transfer' ? 'Aéroport' : 
              formData.serviceType === 'dakar-rental' ? 'Dans Dakar' : 'Régions',
        destination: formData.serviceType === 'airport-transfer' ? 'Aéroport (AIBD)' : 
                    formData.dropoffLocation || 'À définir',
        
        service: selectedService?.name || '',
        vehicleType: selectedVehicle?.shortName || '',
        option: formData.tripOption === 'aller-retour' ? 'Aller-retour' : 'Aller simple',
        passengers: formData.passengers,
        
        price: estimatedPrice || 'quote' as const,
        currency: 'FCFA',
        paymentStatus: 'pending' as const,
        
        scheduledDate: formData.departureDate,
        scheduledTime: formData.departureTime,
        status: 'pending' as const,
        
        specialRequests: `${formData.specialRequests}\n\nPaiement: ${formData.paymentMode === 'credit' ? 'À crédit' : 'Au comptant'} - ${paymentMethods.find(p => p.id === formData.paymentMethod)?.name || ''}\nValises: ${formData.luggage}\nRetour: ${formData.tripOption === 'aller-retour' ? `${formData.returnDate} à ${formData.returnTime}` : 'Non'}`
      };

      const bookingId = await BookingService.createBooking(bookingData);
      
      setShowSuccess(true);
      localStorage.removeItem('kairos-booking-draft'); // Nettoyer le brouillon
      
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          vehicleType: '',
          serviceType: '',
          tripOption: 'aller-simple',
          pickupLocation: '',
          dropoffLocation: '',
          departureDate: '',
          departureTime: '',
          returnDate: '',
          returnTime: '',
          passengers: 1,
          luggage: 0,
          paymentMode: 'cash',
          paymentMethod: '',
          specialRequests: ''
        });
        setCurrentStep(1);
      }, 3000);

    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert('Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }, []);

  const getStepValidation = (step: number): boolean => {
    switch (step) {
      case 1: return !!(formData.serviceType && formData.vehicleType);
      case 2: return !!(formData.pickupLocation && formData.departureDate && formData.departureTime);
      case 3: return true; // Étape optionnelle
      case 4: return !!(formData.paymentMethod);
      default: return true;
    }
  };

  const progressPercentage = ((currentStep - 1) / 3) * 100;

  // Animation de succès
  if (showSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">
            Réservation confirmée !
          </h3>
          <p className="text-gray-600 mb-4">
            Vous recevrez une confirmation par email sous peu.
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 2 }}
            className="h-1 bg-green-500 rounded mx-auto max-w-xs"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Barre de progression moderne */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">Étape {currentStep}/4</span>
          <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% complété</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          />
        </div>
      </div>

      {/* Prix en temps réel */}
      <AnimatePresence>
        {estimatedPrice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaStar className="text-green-500" />
                <span className="font-medium text-gray-700">Prix estimé:</span>
              </div>
              <motion.span
                key={estimatedPrice}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-green-600"
              >
                {formatPrice(estimatedPrice)}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-8">
        <AnimatePresence mode="wait">
          {/* Étape 1: Service & Véhicule */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl mb-4"
                >
                  🚗
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Quel service vous intéresse ?
                </h2>
                <p className="text-gray-600">
                  Choisissez le type de transport qui correspond à vos besoins
                </p>
              </div>

              {/* Services */}
              <div className="grid md:grid-cols-3 gap-6">
                {serviceOptions.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.serviceType === service.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'
                    }`}
                    onClick={() => handleInputChange('serviceType', service.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`} />
                    <div className="p-6 relative">
                      <div className="text-center">
                        <div className="text-3xl mb-3">{service.icon}</div>
                        <h3 className="font-bold text-gray-800 mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                        <div className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-500">
                              <FaCheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Véhicules */}
              {formData.serviceType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Sélectionnez votre véhicule
                    </h3>
                    <p className="text-gray-600">
                      Tous nos véhicules sont entretenus et conduits par des professionnels
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {vehicleOptions.map((vehicle, index) => (
                      <motion.div
                        key={vehicle.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.vehicleType === vehicle.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'
                        }`}
                        onClick={() => handleInputChange('vehicleType', vehicle.id)}
                      >
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20" />
                          <div className="absolute top-2 right-2 text-2xl">{vehicle.icon}</div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">
                            {vehicle.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">{vehicle.capacity}</p>
                          <div className="space-y-1">
                            {vehicle.features.slice(0, 2).map((feature, idx) => (
                              <div key={idx} className="flex items-center text-xs text-gray-500">
                                <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Étape 2: Itinéraire & Dates */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl mb-4"
                >
                  📍
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Planifiez votre trajet
                </h2>
                <p className="text-gray-600">
                  Définissez vos points de départ et d'arrivée
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaLocationArrow className="inline mr-2 text-green-500" />
                    Lieu de prise en charge *
                  </label>
                  <input
                    type="text"
                    value={formData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    placeholder="Entrez votre adresse de départ..."
                    className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Exemple: Plateau, Point E, Almadies...
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaRoute className="inline mr-2 text-red-500" />
                    Destination {formData.serviceType === 'region-rental' ? '*' : '(optionnel)'}
                  </label>
                  {formData.serviceType === 'airport-transfer' ? (
                    <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800">
                      ✈️ Aéroport International Blaise Diagne (AIBD)
                    </div>
                  ) : formData.serviceType === 'region-rental' ? (
                    <select
                      value={formData.dropoffLocation}
                      onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Sélectionnez votre destination</option>
                      {regionDestinations.map(dest => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData.dropoffLocation}
                      onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                      placeholder="Destination finale (optionnel)..."
                      className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  )}
                </div>
              </div>

              {/* Type de trajet */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Type de trajet
                </label>
                <div className="flex gap-4">
                  {['aller-simple', 'aller-retour'].map((option) => (
                    <motion.label
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.tripOption === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="tripOption"
                          value={option}
                          checked={formData.tripOption === option}
                          onChange={(e) => handleInputChange('tripOption', e.target.value as 'aller-simple' | 'aller-retour')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                          formData.tripOption === option
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.tripOption === option && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <span className="font-medium capitalize">
                          {option === 'aller-simple' ? 'Aller simple' : 'Aller-retour'}
                        </span>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Dates et heures */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaCalendarAlt className="inline mr-2 text-blue-500" />
                    Date de départ *
                  </label>
                  <input
                    type="date"
                    min={tomorrow}
                    value={formData.departureDate}
                    onChange={(e) => handleInputChange('departureDate', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaClock className="inline mr-2 text-blue-500" />
                    Heure de départ *
                  </label>
                  <input
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => handleInputChange('departureTime', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Dates de retour si aller-retour */}
              <AnimatePresence>
                {formData.tripOption === 'aller-retour' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <FaCalendarAlt className="inline mr-2 text-orange-500" />
                        Date de retour
                      </label>
                      <input
                        type="date"
                        min={formData.departureDate || tomorrow}
                        value={formData.returnDate}
                        onChange={(e) => handleInputChange('returnDate', e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <FaClock className="inline mr-2 text-orange-500" />
                        Heure de retour
                      </label>
                      <input
                        type="time"
                        value={formData.returnTime}
                        onChange={(e) => handleInputChange('returnTime', e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Étape 3: Détails */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl mb-4"
                >
                  👥
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Détails du voyage
                </h2>
                <p className="text-gray-600">
                  Aidez-nous à mieux vous servir
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaUsers className="inline mr-2 text-blue-500" />
                    Nombre de passagers *
                  </label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                    className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {Array.from({ length: 28 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} passager{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaSuitcase className="inline mr-2 text-gray-600" />
                    Nombre de valises
                  </label>
                  <select
                    value={formData.luggage}
                    onChange={(e) => handleInputChange('luggage', parseInt(e.target.value))}
                    className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {Array.from({ length: 21 }, (_, i) => i).map(num => (
                      <option key={num} value={num}>
                        {num} valise{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <FaMagic className="inline mr-2 text-purple-500" />
                  Demandes spéciales (optionnel)
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={4}
                  placeholder="Siège bébé, arrêt supplémentaire, climatisation, etc..."
                  className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />
                <p className="text-xs text-gray-500">
                  Mentionnez tout besoin spécifique pour votre confort
                </p>
              </div>
            </motion.div>
          )}

          {/* Étape 4: Paiement & Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl mb-4"
                >
                  💳
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Finalisation
                </h2>
                <p className="text-gray-600">
                  Choisissez votre mode de paiement et confirmez
                </p>
              </div>

              {/* Mode de paiement */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Mode de paiement
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: 'cash', label: 'Au comptant', desc: 'Paiement à la livraison du service' },
                    { id: 'credit', label: 'À crédit', desc: 'Paiement après facturation' }
                  ].map((mode) => (
                    <motion.label
                      key={mode.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.paymentMode === mode.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMode"
                          value={mode.id}
                          checked={formData.paymentMode === mode.id}
                          onChange={(e) => handleInputChange('paymentMode', e.target.value as 'credit' | 'cash')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                          formData.paymentMode === mode.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.paymentMode === mode.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{mode.label}</div>
                          <div className="text-sm text-gray-500">{mode.desc}</div>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Moyen de paiement */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Moyen de paiement préféré *
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Sélectionnez un moyen de paiement</option>
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id}>
                      {method.icon} {method.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Récapitulatif moderne */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
              >
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <FaCheckCircle className="mr-2 text-green-500" />
                  Récapitulatif de votre réservation
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service :</span>
                    <span className="font-medium">
                      {serviceOptions.find(s => s.id === formData.serviceType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Véhicule :</span>
                    <span className="font-medium">
                      {vehicleOptions.find(v => v.id === formData.vehicleType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date :</span>
                    <span className="font-medium">{formData.departureDate} à {formData.departureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passagers :</span>
                    <span className="font-medium">{formData.passengers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type :</span>
                    <span className="font-medium">
                      {formData.tripOption === 'aller-retour' ? 'Aller-retour' : 'Aller simple'}
                    </span>
                  </div>
                  <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Prix total :</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(estimatedPrice)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boutons de navigation modernes */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
            }`}
          >
            ← Précédent
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!getStepValidation(currentStep)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-lg transform hover:scale-105"
            >
              Suivant →
            </button>
          ) : (
            <motion.button
              type="submit"
              disabled={isLoading || !formData.paymentMethod || !user}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Réservation...
                </div>
              ) : (
                <div className="flex items-center">
                  <FaRocket className="mr-2" />
                  Confirmer ma réservation
                </div>
              )}
            </motion.button>
          )}
        </div>

        {!user && currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
          >
            <FaExclamationTriangle className="inline text-yellow-500 mr-2" />
            <span className="text-yellow-800 text-sm">
              Vous devez être connecté pour finaliser votre réservation
            </span>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default UltraModernBookingForm;