import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { BookingService } from '../../services/firestoreService';
import { zones, vehicleTypes, serviceTypes, getPricing, formatPrice, PricingRule } from '../../data/pricing';

interface BookingFormData {
  zone: string;
  destination: string;
  service: string;
  vehicleType: string;
  option: string;
  passengers: number;
  scheduledDate: string;
  scheduledTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  specialRequests: string;
}

const BookingForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BookingFormData>({
    zone: '',
    destination: '',
    service: '',
    vehicleType: '',
    option: '',
    passengers: 1,
    scheduledDate: '',
    scheduledTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    specialRequests: ''
  });

  const [selectedZone, setSelectedZone] = useState('');
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);
  const [availableServices, setAvailableServices] = useState<typeof serviceTypes>([]);
  const [availableVehicles, setAvailableVehicles] = useState<typeof vehicleTypes>([]);
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);
  const [currentPricing, setCurrentPricing] = useState<PricingRule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  // Mettre à jour les destinations disponibles quand la zone change
  useEffect(() => {
    if (selectedZone) {
      const zone = zones.find(z => z.name === selectedZone);
      if (zone) {
        setAvailableDestinations(zone.destinations);
        setFormData(prev => ({ ...prev, zone: selectedZone, destination: '' }));
      }
    }
  }, [selectedZone]);

  // Mettre à jour les services disponibles
  useEffect(() => {
    if (formData.destination) {
      if (formData.destination === 'Dans Dakar') {
        setAvailableServices(serviceTypes.filter(s => s.id === 'rental'));
      } else if (['Pikine', 'Thiaroye', 'Mbao', 'Rufisque'].includes(formData.destination)) {
        setAvailableServices(serviceTypes.filter(s => s.id === 'all'));
      } else {
        setAvailableServices(serviceTypes.filter(s => s.id === 'transfer'));
      }
    }
  }, [formData.destination]);

  // Mettre à jour les véhicules disponibles
  useEffect(() => {
    if (formData.service) {
      if (formData.destination === 'Dans Dakar' && formData.service === 'Mise à disposition') {
        setAvailableVehicles(vehicleTypes.filter(v => v.id === 'berline'));
      } else if (['Pikine', 'Thiaroye', 'Mbao', 'Rufisque'].includes(formData.destination)) {
        setAvailableVehicles(vehicleTypes);
      } else {
        setAvailableVehicles(vehicleTypes);
      }
    }
  }, [formData.service, formData.destination]);

  // Mettre à jour les options disponibles
  useEffect(() => {
    if (formData.vehicleType && formData.service && formData.destination) {
      if (formData.destination === 'Dans Dakar' && formData.service === 'Mise à disposition') {
        setAvailableOptions(['Une heure', 'Au-delà de 3 heures (par heure)', 'Demi-journée', 'Journée']);
      } else if (['Pikine', 'Thiaroye', 'Mbao', 'Rufisque'].includes(formData.destination)) {
        setAvailableOptions(['Tous services']);
      } else if (formData.destination === 'Aéroport (AIBD)') {
        setAvailableOptions(['Aller simple', 'Aller/Retour']);
      } else {
        setAvailableOptions(['Aller simple', 'Aller/Retour']);
      }
    }
  }, [formData.vehicleType, formData.service, formData.destination]);

  // Calculer le prix
  useEffect(() => {
    if (formData.zone && formData.destination && formData.service && formData.vehicleType && formData.option) {
      const pricing = getPricing(
        formData.zone,
        formData.destination,
        formData.service,
        formData.vehicleType,
        formData.option
      );
      setCurrentPricing(pricing);
    } else {
      setCurrentPricing(null);
    }
  }, [formData.zone, formData.destination, formData.service, formData.vehicleType, formData.option]);

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Vous devez être connecté pour effectuer une réservation');
      return;
    }

    if (!currentPricing) {
      alert('Impossible de calculer le prix. Veuillez vérifier vos sélections.');
      return;
    }

    setIsLoading(true);

    try {
      const bookingData = {
        userId: user.uid,
        userEmail: user.email || '',
        userName: `${user.displayName || 'Utilisateur'}`,
        userPhone: user.phoneNumber || '',
        
        // Détails du trajet
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation || formData.destination,
        zone: formData.zone,
        destination: formData.destination,
        
        // Service et véhicule
        service: formData.service,
        vehicleType: formData.vehicleType,
        option: formData.option,
        passengers: formData.passengers,
        
        // Prix
        price: currentPricing.price,
        currency: currentPricing.currency,
        paymentStatus: 'pending' as const,
        
        // Dates
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        
        // Statut
        status: 'pending' as const,
        
        // Informations supplémentaires
        specialRequests: formData.specialRequests
      };

      const bookingId = await BookingService.createBooking(bookingData);
      
      alert(`Réservation créée avec succès ! ID: ${bookingId}`);
      
      // Réinitialiser le formulaire
      setFormData({
        zone: '',
        destination: '',
        service: '',
        vehicleType: '',
        option: '',
        passengers: 1,
        scheduledDate: '',
        scheduledTime: '',
        pickupLocation: '',
        dropoffLocation: '',
        specialRequests: ''
      });
      setSelectedZone('');
      setCurrentPricing(null);
      
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      alert('Erreur lors de la création de la réservation. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Réserver votre transport
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Zone et Destination */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionnez une zone</option>
                {zones.map(zone => (
                  <option key={zone.id} value={zone.name}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <select
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={!selectedZone}
              >
                <option value="">Sélectionnez une destination</option>
                {availableDestinations.map(dest => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Service et Véhicule */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de service
              </label>
              <select
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={!formData.destination}
              >
                <option value="">Sélectionnez un service</option>
                {availableServices.map(service => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de véhicule
              </label>
              <select
                value={formData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={!formData.service}
              >
                <option value="">Sélectionnez un véhicule</option>
                {availableVehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.name}>
                    {vehicle.name} ({vehicle.capacity} places)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Option et Passagers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Option
              </label>
              <select
                value={formData.option}
                onChange={(e) => handleInputChange('option', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={!formData.vehicleType}
              >
                <option value="">Sélectionnez une option</option>
                {availableOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de passagers
              </label>
              <select
                value={formData.passengers}
                onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {Array.from({ length: 28 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} passager{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Affichage du prix */}
          {currentPricing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Prix estimé
              </h3>
              <p className="text-3xl font-bold text-blue-900">
                {formatPrice(currentPricing.price, currentPricing.currency)}
              </p>
              {currentPricing.price === 'quote' && (
                <p className="text-sm text-blue-600 mt-2">
                  Un devis personnalisé vous sera envoyé
                </p>
              )}
            </motion.div>
          )}

          {/* Date et heure */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date souhaitée
              </label>
              <input
                type="date"
                min={minDate}
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heure souhaitée
              </label>
              <input
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Lieux */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lieu de prise en charge
              </label>
              <input
                type="text"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                placeholder="Adresse complète de départ"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lieu de dépose (optionnel)
              </label>
              <input
                type="text"
                value={formData.dropoffLocation}
                onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                placeholder="Adresse de destination si différente"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Demandes spéciales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Demandes spéciales (optionnel)
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={3}
              placeholder="Toute information supplémentaire..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Bouton de soumission */}
          <motion.button
            type="submit"
            disabled={isLoading || !currentPricing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-md font-semibold text-white transition-colors ${
              isLoading || !currentPricing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Création en cours...' : 'Confirmer la réservation'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingForm;