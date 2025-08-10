import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaSuitcase, FaCreditCard } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { BookingService } from '../../services/firestoreService';
import { getExactPrice, formatPrice, regionDestinations, banlieueDestinations } from '../../data/completePricing';

interface SimpleBookingFormData {
  // Sélections principales
  vehicleType: string;
  serviceType: string;
  tripOption: 'aller-simple' | 'aller-retour';
  
  // Lieux
  pickupLocation: string;
  dropoffLocation: string;
  
  // Dates et heures
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  
  // Détails
  passengers: number;
  luggage: number;
  
  // Paiement
  paymentMode: 'credit' | 'cash';
  paymentMethod: string;
  
  // Contact
  specialRequests: string;
}

const paymentMethods = [
  { id: 'cash', name: 'Espèces' },
  { id: 'mobile-money', name: 'Mobile Money (Orange Money, Wave, Free Money)' },
  { id: 'bank-transfer', name: 'Virement bancaire' },
  { id: 'check', name: 'Chèque' },
  { id: 'card', name: 'Carte bancaire (CB, Visa, MasterCard)' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'other', name: 'Autres moyens électroniques' }
];

const vehicleOptions = [
  { id: 'berline', name: 'Berline (4 places)', icon: '🚗' },
  { id: 'suv', name: 'SUV (6 places)', icon: '🚙' },
  { id: 'toyota9', name: 'Toyota 9 places', icon: '🚐' },
  { id: 'van7', name: 'VAN (7 places)', icon: '🚐' },
  { id: 'minibus15', name: 'Minibus 15 places', icon: '🚌' },
  { id: 'minibus28', name: 'Minibus 28 places', icon: '🚌' },
  { id: 'minibus51', name: 'Minibus 51 places', icon: '🚌' },
  { id: 'utilitaire', name: 'Utilitaire (6 places)', icon: '🚚' }
];

const serviceOptions = [
  {
    id: 'airport-transfer',
    name: 'Transfert à l\'aéroport (AIBD)',
    description: 'Service fiable vers/depuis l\'aéroport',
    icon: '✈️'
  },
  {
    id: 'dakar-rental',
    name: 'Mise à disposition à Dakar',
    description: 'Véhicule avec chauffeur dans la capitale',
    icon: '🏙️'
  },
  {
    id: 'region-rental',
    name: 'Mise à disposition en région',
    description: 'Déplacements vers les régions',
    icon: '🗺️'
  }
];

// Tarifs de base pour estimation rapide
const basePrices: Record<string, Record<string, number>> = {
  'airport-transfer': {
    'berline': 25000,
    'suv': 40000,
    'utilitaire': 35000,
    'van7': 55000,
    'minibus15': 80000,
    'minibus28': 100000
  },
  'dakar-rental': {
    'berline': 55000  // journée
  },
  'region-rental': {
    'berline': 55000  // base journée
  }
};

const SimpleBookingForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<SimpleBookingFormData>({
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

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Calculer le prix exact selon le tableau
  useEffect(() => {
    if (formData.serviceType && formData.vehicleType && formData.dropoffLocation && formData.tripOption) {
      // Pour l'aéroport, la destination est toujours "Aéroport (AIBD)"
      let destination = formData.dropoffLocation;
      if (formData.serviceType === 'airport-transfer') {
        destination = 'Aéroport (AIBD)';
      }
      
      const exactPrice = getExactPrice(
        formData.serviceType,
        formData.vehicleType,
        destination,
        formData.tripOption
      );
      
      setEstimatedPrice(exactPrice);
    } else {
      setEstimatedPrice(null);
    }
  }, [formData.serviceType, formData.vehicleType, formData.dropoffLocation, formData.tripOption]);

  const handleInputChange = (field: keyof SimpleBookingFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      const shouldLogin = confirm('Vous devez être connecté pour finaliser votre réservation. Voulez-vous vous connecter maintenant ?');
      if (shouldLogin) {
        alert('Veuillez vous connecter via le menu ou créer un compte pour continuer.');
        return;
      } else {
        return;
      }
    }

    setIsLoading(true);

    try {
      const bookingData: Omit<import('../../services/firestoreService').BookingData, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: user.uid,
        userEmail: user.email || '',
        userName: user.displayName || 'Utilisateur',
        userPhone: user.phoneNumber || '',
        
        // Détails du trajet
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        zone: formData.serviceType === 'airport-transfer' ? 'Aéroport' : 
              formData.serviceType === 'dakar-rental' ? 'Dans Dakar' : 'Régions',
        destination: formData.serviceType === 'airport-transfer' ? 'Aéroport (AIBD)' : 
                    formData.dropoffLocation || 'À définir',
        
        // Service et véhicule
        service: serviceOptions.find(s => s.id === formData.serviceType)?.name || '',
        vehicleType: vehicleOptions.find(v => v.id === formData.vehicleType)?.name || '',
        option: formData.tripOption === 'aller-retour' ? 'Aller/Retour' : 'Aller simple',
        passengers: formData.passengers,
        
        // Prix
        price: estimatedPrice === null ? 'quote' : estimatedPrice,
        currency: 'FCFA',
        paymentStatus: 'pending' as const,
        
        // Dates
        scheduledDate: formData.departureDate,
        scheduledTime: formData.departureTime,
        
        // Statut
        status: 'pending' as const,
        
        // Informations supplémentaires
        specialRequests: `${formData.specialRequests}\n\nPaiement: ${formData.paymentMode === 'credit' ? 'À crédit' : 'Au comptant'} - ${paymentMethods.find(p => p.id === formData.paymentMethod)?.name || ''}\nValises: ${formData.luggage}\nRetour: ${formData.tripOption === 'aller-retour' ? `${formData.returnDate} à ${formData.returnTime}` : 'Non'}`
      };

      const bookingId = await BookingService.createBooking(bookingData);
      
      alert(`🎉 Réservation créée avec succès !\n\nNuméro de réservation: ${bookingId}\n\nVous recevrez une confirmation par email sous peu.`);
      
      // Réinitialiser le formulaire
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
      setEstimatedPrice(null);
      
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      alert('❌ Erreur lors de la création de la réservation. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <h2 className="text-3xl font-bold text-center mb-2">
          Réservation Rapide
        </h2>
        <p className="text-center text-blue-100">
          Réservez votre transport en quelques clics
        </p>
        
        {/* Indicateur d'étapes */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= currentStep ? 'bg-white text-blue-600' : 'bg-blue-400 text-blue-100'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Étape 1: Type de service et véhicule */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                <FaCar className="inline mr-2 text-blue-600" />
                Quel service souhaitez-vous ?
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {serviceOptions.map(service => (
                  <div
                    key={service.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.serviceType === service.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('serviceType', service.id)}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {formData.serviceType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Quel type de véhicule ?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {vehicleOptions.map(vehicle => (
                    <div
                      key={vehicle.id}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all text-center ${
                        formData.vehicleType === vehicle.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('vehicleType', vehicle.id)}
                    >
                      <div className="text-2xl mb-1">{vehicle.icon}</div>
                      <div className="text-sm font-medium text-gray-700">
                        {vehicle.name}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Étape 2: Lieux et dates */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
                  Lieu de prise en charge *
                </label>
                <input
                  type="text"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  placeholder="Adresse de départ"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2 text-gray-400" />
                  Destination {formData.serviceType === 'region-rental' ? '*' : '(optionnel)'}
                </label>
                {formData.serviceType === 'airport-transfer' ? (
                  <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
                    ✈️ Aéroport International Blaise Diagne (AIBD)
                  </div>
                ) : formData.serviceType === 'region-rental' ? (
                  <select
                    value={formData.dropoffLocation}
                    onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez une destination</option>
                    {regionDestinations.map(dest => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                ) : formData.serviceType === 'dakar-rental' ? (
                  <input
                    type="text"
                    value={formData.dropoffLocation}
                    onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                    placeholder="Quartier ou adresse (optionnel)"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.dropoffLocation}
                    onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                    placeholder="Adresse de destination"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Type de trajet
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripOption"
                    value="aller-simple"
                    checked={formData.tripOption === 'aller-simple'}
                    onChange={(e) => handleInputChange('tripOption', e.target.value as 'aller-simple' | 'aller-retour')}
                    className="mr-2"
                  />
                  Aller simple
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripOption"
                    value="aller-retour"
                    checked={formData.tripOption === 'aller-retour'}
                    onChange={(e) => handleInputChange('tripOption', e.target.value as 'aller-simple' | 'aller-retour')}
                    className="mr-2"
                  />
                  Aller-retour
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2 text-blue-600" />
                  Date de départ *
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaClock className="inline mr-2 text-blue-600" />
                  Heure de départ *
                </label>
                <input
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) => handleInputChange('departureTime', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {formData.tripOption === 'aller-retour' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de retour
                  </label>
                  <input
                    type="date"
                    min={formData.departureDate || minDate}
                    value={formData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Heure de retour
                  </label>
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => handleInputChange('returnTime', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Étape 3: Détails */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaUsers className="inline mr-2 text-blue-600" />
                  Nombre de passagers *
                </label>
                <select
                  value={formData.passengers}
                  onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {Array.from({ length: 51 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>
                      {num} passager{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaSuitcase className="inline mr-2 text-gray-600" />
                  Nombre de valises
                </label>
                <select
                  value={formData.luggage}
                  onChange={(e) => handleInputChange('luggage', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: 21 }, (_, i) => i).map(num => (
                    <option key={num} value={num}>
                      {num} valise{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Demandes spéciales (optionnel)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={3}
                placeholder="Siège bébé, arrêt supplémentaire, climatisation, etc..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        )}

        {/* Étape 4: Paiement et confirmation */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FaCreditCard className="inline mr-2 text-blue-600" />
                Mode de paiement
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="cash"
                    checked={formData.paymentMode === 'cash'}
                    onChange={(e) => handleInputChange('paymentMode', e.target.value as 'credit' | 'cash')}
                    className="mr-2"
                  />
                  Au comptant
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="credit"
                    checked={formData.paymentMode === 'credit'}
                    onChange={(e) => handleInputChange('paymentMode', e.target.value as 'credit' | 'cash')}
                    className="mr-2"
                  />
                  À crédit
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Moyen de paiement préféré
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionnez un moyen de paiement</option>
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Récapitulatif de votre réservation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service :</span>
                  <span>{serviceOptions.find(s => s.id === formData.serviceType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Véhicule :</span>
                  <span>{vehicleOptions.find(v => v.id === formData.vehicleType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date de départ :</span>
                  <span>{formData.departureDate} à {formData.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passagers :</span>
                  <span>{formData.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type de trajet :</span>
                  <span>{formData.tripOption === 'aller-retour' ? 'Aller-retour' : 'Aller simple'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-blue-600">
                  <span>Prix :</span>
                  <span>{formatPrice(estimatedPrice)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Boutons de navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-md font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Précédent
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={
                (currentStep === 1 && (!formData.serviceType || !formData.vehicleType)) ||
                (currentStep === 2 && (!formData.pickupLocation || !formData.departureDate || !formData.departureTime))
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !formData.paymentMethod}
              className="px-8 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Réservation en cours...' : '🎉 Confirmer la réservation'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SimpleBookingForm;