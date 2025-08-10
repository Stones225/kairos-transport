import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { BookingService } from '../../services/firestoreService';
import { getExactPrice, formatPrice, regionDestinations } from '../../data/completePricing';

interface BookingFormData {
  // Service et véhicule
  serviceType: string;
  vehicleType: string;
  
  // Détails du trajet
  pickupLocation: string;
  dropoffLocation: string;
  tripOption: 'aller-simple' | 'aller-retour';
  
  // Dates et heures
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  
  // Détails du voyage
  passengers: number;
  luggage: number;
  specialRequests: string;
  
  // Paiement
  paymentMode: 'credit' | 'cash';
  paymentMethod: string;
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
  { id: 'berline', name: 'Berline (4 places)', description: 'Confortable pour petits groupes' },
  { id: 'suv', name: 'SUV (6 places)', description: 'Spacieux et moderne' },
  { id: 'toyota9', name: 'Toyota 9 places', description: 'Idéal pour groupes moyens' },
  { id: 'van7', name: 'VAN (7 places)', description: 'Polyvalent et pratique' },
  { id: 'minibus15', name: 'Minibus 15 places', description: 'Pour groupes importants' },
  { id: 'minibus28', name: 'Minibus 28 places', description: 'Transport de groupe' },
  { id: 'minibus51', name: 'Minibus 51 places', description: 'Grand transport collectif' },
  { id: 'utilitaire', name: 'Utilitaire (6 places)', description: 'Pratique avec espace bagages' }
];

const serviceOptions = [
  { id: 'airport-transfer', name: 'Transfert à l\'aéroport (AIBD)' },
  { id: 'dakar-rental', name: 'Mise à disposition à Dakar' },
  { id: 'region-rental', name: 'Mise à disposition en région' }
];

const ModernBookingForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: '',
    vehicleType: '',
    pickupLocation: '',
    dropoffLocation: '',
    tripOption: 'aller-simple',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    passengers: 1,
    luggage: 0,
    specialRequests: '',
    paymentMode: 'cash',
    paymentMethod: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Calculer le prix exact
  useEffect(() => {
    if (formData.serviceType && formData.vehicleType && formData.tripOption) {
      let destination = formData.dropoffLocation;
      if (formData.serviceType === 'airport-transfer') {
        destination = 'Aéroport (AIBD)';
      }
      
      if (destination || formData.serviceType === 'airport-transfer') {
        const exactPrice = getExactPrice(
          formData.serviceType,
          formData.vehicleType,
          destination,
          formData.tripOption
        );
        setEstimatedPrice(exactPrice);
      }
    } else {
      setEstimatedPrice(null);
    }
  }, [formData.serviceType, formData.vehicleType, formData.dropoffLocation, formData.tripOption]);

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      // Show login modal or redirect to login
      const shouldLogin = confirm('Vous devez être connecté pour finaliser votre réservation. Voulez-vous vous connecter maintenant ?');
      if (shouldLogin) {
        // For now, just alert - you can integrate with login modal later
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
        
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        zone: formData.serviceType === 'airport-transfer' ? 'Aéroport' : 
              formData.serviceType === 'dakar-rental' ? 'Dans Dakar' : 'Régions',
        destination: formData.serviceType === 'airport-transfer' ? 'Aéroport (AIBD)' : 
                    formData.dropoffLocation || 'À définir',
        
        service: serviceOptions.find(s => s.id === formData.serviceType)?.name || '',
        vehicleType: vehicleOptions.find(v => v.id === formData.vehicleType)?.name || '',
        option: formData.tripOption === 'aller-retour' ? 'Aller-retour' : 'Aller simple',
        passengers: formData.passengers,
        
        price: estimatedPrice === null ? 'quote' : estimatedPrice,
        currency: 'FCFA',
        paymentStatus: 'pending' as const,
        
        scheduledDate: formData.departureDate,
        scheduledTime: formData.departureTime,
        
        status: 'pending' as const,
        
        specialRequests: `${formData.specialRequests}\n\nDétails:\n- Paiement: ${formData.paymentMode === 'credit' ? 'À crédit' : 'Au comptant'}\n- Moyen: ${paymentMethods.find(p => p.id === formData.paymentMethod)?.name || ''}\n- Valises: ${formData.luggage}\n- Retour: ${formData.tripOption === 'aller-retour' ? `${formData.returnDate} à ${formData.returnTime}` : 'Non'}`
      };

      const bookingId = await BookingService.createBooking(bookingData);
      
      alert(`🎉 Réservation créée avec succès !\n\nNuméro: ${bookingId}`);
      
      // Reset form
      setFormData({
        serviceType: '',
        vehicleType: '',
        pickupLocation: '',
        dropoffLocation: '',
        tripOption: 'aller-simple',
        departureDate: '',
        departureTime: '',
        returnDate: '',
        returnTime: '',
        passengers: 1,
        luggage: 0,
        specialRequests: '',
        paymentMode: 'cash',
        paymentMethod: ''
      });
      setEstimatedPrice(null);
      
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      alert('❌ Erreur lors de la création de la réservation. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          
          {/* Section: Type de Service */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Type de service</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Sélectionnez le service de transport qui correspond à vos besoins.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Service souhaité *
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    value={formData.serviceType}
                    onChange={(e) => handleInputChange('serviceType', e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  >
                    <option value="">Choisissez un service</option>
                    {serviceOptions.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                    <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Type de véhicule *
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                    disabled={!formData.serviceType}
                  >
                    <option value="">Sélectionnez un véhicule</option>
                    {vehicleOptions.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} - {vehicle.description}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                    <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Itinéraire */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Itinéraire</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Indiquez les lieux de prise en charge et de destination.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="pickup" className="block text-sm/6 font-medium text-gray-900">
                  Lieu de prise en charge *
                </label>
                <div className="mt-2">
                  <input
                    id="pickup"
                    type="text"
                    value={formData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    placeholder="Adresse complète de départ"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="destination" className="block text-sm/6 font-medium text-gray-900">
                  Destination {formData.serviceType === 'region-rental' ? '*' : '(optionnel)'}
                </label>
                <div className="mt-2">
                  {formData.serviceType === 'airport-transfer' ? (
                    <div className="w-full rounded-md bg-indigo-50 px-3 py-1.5 text-base text-indigo-800 outline-1 -outline-offset-1 outline-indigo-300">
                      ✈️ Aéroport International Blaise Diagne (AIBD)
                    </div>
                  ) : formData.serviceType === 'region-rental' ? (
                    <div className="grid grid-cols-1">
                      <select
                        value={formData.dropoffLocation}
                        onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        required
                      >
                        <option value="">Sélectionnez une destination</option>
                        {regionDestinations.map(dest => (
                          <option key={dest} value={dest}>{dest}</option>
                        ))}
                      </select>
                      <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                        <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={formData.dropoffLocation}
                      onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                      placeholder="Adresse de destination (optionnel)"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Dates et Horaires */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Dates et horaires</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Précisez quand vous souhaitez voyager.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">Type de trajet</legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="aller-simple"
                      type="radio"
                      name="trip-option"
                      value="aller-simple"
                      checked={formData.tripOption === 'aller-simple'}
                      onChange={(e) => handleInputChange('tripOption', e.target.value)}
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    />
                    <label htmlFor="aller-simple" className="block text-sm/6 font-medium text-gray-900">
                      Aller simple
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="aller-retour"
                      type="radio"
                      name="trip-option"
                      value="aller-retour"
                      checked={formData.tripOption === 'aller-retour'}
                      onChange={(e) => handleInputChange('tripOption', e.target.value as 'aller-simple' | 'aller-retour')}
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    />
                    <label htmlFor="aller-retour" className="block text-sm/6 font-medium text-gray-900">
                      Aller-retour
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="departure-date" className="block text-sm/6 font-medium text-gray-900">
                    Date de départ *
                  </label>
                  <div className="mt-2">
                    <input
                      id="departure-date"
                      type="date"
                      min={minDate}
                      value={formData.departureDate}
                      onChange={(e) => handleInputChange('departureDate', e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="departure-time" className="block text-sm/6 font-medium text-gray-900">
                    Heure de départ *
                  </label>
                  <div className="mt-2">
                    <input
                      id="departure-time"
                      type="time"
                      value={formData.departureTime}
                      onChange={(e) => handleInputChange('departureTime', e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      required
                    />
                  </div>
                </div>

                {formData.tripOption === 'aller-retour' && (
                  <>
                    <div className="sm:col-span-3">
                      <label htmlFor="return-date" className="block text-sm/6 font-medium text-gray-900">
                        Date de retour
                      </label>
                      <div className="mt-2">
                        <input
                          id="return-date"
                          type="date"
                          min={formData.departureDate || minDate}
                          value={formData.returnDate}
                          onChange={(e) => handleInputChange('returnDate', e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="return-time" className="block text-sm/6 font-medium text-gray-900">
                        Heure de retour
                      </label>
                      <div className="mt-2">
                        <input
                          id="return-time"
                          type="time"
                          value={formData.returnTime}
                          onChange={(e) => handleInputChange('returnTime', e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Section: Détails du voyage */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Détails du voyage</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Informations complémentaires sur votre transport.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="passengers" className="block text-sm/6 font-medium text-gray-900">
                  Nombre de passagers *
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="passengers"
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  >
                    {Array.from({ length: 51 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} passager{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                    <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="luggage" className="block text-sm/6 font-medium text-gray-900">
                  Nombre de valises
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="luggage"
                    value={formData.luggage}
                    onChange={(e) => handleInputChange('luggage', parseInt(e.target.value))}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {Array.from({ length: 21 }, (_, i) => i).map(num => (
                      <option key={num} value={num}>
                        {num} valise{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                    <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="special-requests" className="block text-sm/6 font-medium text-gray-900">
                  Demandes spéciales
                </label>
                <div className="mt-2">
                  <textarea
                    id="special-requests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Siège bébé, arrêt supplémentaire, climatisation, etc..."
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Toute information supplémentaire pour améliorer votre expérience.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Paiement */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Paiement</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Choisissez vos préférences de paiement.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">Mode de paiement</legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="cash-payment"
                      type="radio"
                      name="payment-mode"
                      value="cash"
                      checked={formData.paymentMode === 'cash'}
                      onChange={(e) => handleInputChange('paymentMode', e.target.value)}
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    />
                    <label htmlFor="cash-payment" className="block text-sm/6 font-medium text-gray-900">
                      Au comptant
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="credit-payment"
                      type="radio"
                      name="payment-mode"
                      value="credit"
                      checked={formData.paymentMode === 'credit'}
                      onChange={(e) => handleInputChange('paymentMode', e.target.value)}
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    />
                    <label htmlFor="credit-payment" className="block text-sm/6 font-medium text-gray-900">
                      À crédit
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="payment-method" className="block text-sm/6 font-medium text-gray-900">
                    Moyen de paiement préféré *
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="payment-method"
                      value={formData.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      required
                    >
                      <option value="">Sélectionnez un moyen de paiement</option>
                      {paymentMethods.map(method => (
                        <option key={method.id} value={method.id}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                    <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                      <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prix estimé */}
          {(formData.serviceType && formData.vehicleType) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-50 border border-indigo-200 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                Récapitulatif de votre réservation
              </h3>
              <div className="space-y-2 text-sm text-indigo-800">
                <div className="flex justify-between">
                  <span>Service :</span>
                  <span className="font-medium">
                    {serviceOptions.find(s => s.id === formData.serviceType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Véhicule :</span>
                  <span className="font-medium">
                    {vehicleOptions.find(v => v.id === formData.vehicleType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Passagers :</span>
                  <span className="font-medium">{formData.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type :</span>
                  <span className="font-medium">
                    {formData.tripOption === 'aller-retour' ? 'Aller-retour' : 'Aller simple'}
                  </span>
                </div>
                <hr className="border-indigo-300" />
                <div className="flex justify-between text-base font-bold text-indigo-900">
                  <span>Prix :</span>
                  <span>{formatPrice(estimatedPrice)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button 
            type="button" 
            className="text-sm/6 font-semibold text-gray-900"
            onClick={() => window.history.back()}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading || !formData.serviceType || !formData.vehicleType || !formData.paymentMethod}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Création...' : 'Confirmer la réservation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModernBookingForm;