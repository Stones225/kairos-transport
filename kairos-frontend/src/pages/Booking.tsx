import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaSuitcase, FaCheck } from 'react-icons/fa';
import BookingForm from '../components/BookingForm/BookingForm';
import SimpleBookingForm from '../components/BookingForm/SimpleBookingForm';
import ModernBookingForm from '../components/BookingForm/ModernBookingForm';
import UltraModernBookingForm from '../components/BookingForm/UltraModernBookingForm';
import { useAuth } from '../contexts/AuthContext';

interface BookingFormData {
  vehicleType: string;
  serviceType: string;
  pickupLocation: string;
  destination: string;
  tripType: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
  luggage: number;
  phone: string;
  email: string;
  specialRequests: string;
  acceptTerms: boolean;
}

const Booking: React.FC = () => {
  const { user } = useAuth();
  const [formType, setFormType] = useState<'ultra' | 'modern' | 'simple' | 'legacy'>('ultra');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    vehicleType: '',
    serviceType: '',
    pickupLocation: '',
    destination: '',
    tripType: 'aller-simple',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    passengers: 1,
    luggage: 0,
    phone: '',
    email: '',
    specialRequests: '',
    acceptTerms: false,
  });

  const steps = [
    { number: 1, title: 'Service & Véhicule', description: 'Choisissez votre service' },
    { number: 2, title: 'Itinéraire & Dates', description: 'Définissez votre trajet' },
    { number: 3, title: 'Détails', description: 'Informations complémentaires' },
    { number: 4, title: 'Contact', description: 'Vos coordonnées' },
    { number: 5, title: 'Confirmation', description: 'Récapitulatif' }
  ];

  const vehicleTypes = [
    { 
      value: 'berline', 
      label: 'Berline', 
      capacity: '4 places',
      price: '25 000 FCFA',
      image: 'https://images.unsplash.com/photo-1502877338535-766e7375c5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      value: 'suv', 
      label: 'SUV', 
      capacity: '6 places',
      price: '30 000 FCFA',
      image: 'https://images.unsplash.com/photo-1519641643602-7ff500b74923?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      value: 'toyota-9', 
      label: 'Toyota 9 places', 
      capacity: '9 places',
      price: '35 000 FCFA',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      value: 'minibus-26', 
      label: 'Minibus', 
      capacity: '26 places',
      price: '45 000 FCFA',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const serviceTypes = [
    { 
      value: 'transfert-aeroport', 
      label: 'Transfert à l\'aéroport',
      description: 'Service fiable vers/depuis l\'aéroport AIBD',
      icon: '✈️'
    },
    { 
      value: 'mise-disposition-dakar', 
      label: 'Mise à disposition Dakar',
      description: 'Véhicule avec chauffeur dans la capitale',
      icon: '🚗'
    },
    { 
      value: 'mise-disposition-region', 
      label: 'Mise à disposition région',
      description: 'Déplacements vers les régions',
      icon: '🗺️'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    // TODO: Handle form submission
  };

  const calculateEstimatedPrice = () => {
    const vehicle = vehicleTypes.find(v => v.value === formData.vehicleType);
    if (!vehicle) return '---';
    
    const basePrice = parseInt(vehicle.price.replace(/\D/g, ''));
    const multiplier = formData.tripType === 'aller-retour' ? 1.5 : 1;
    
    return `${(basePrice * multiplier).toLocaleString()} FCFA`;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-primary-darkGray mb-6">
                Choisissez votre type de service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceTypes.map((service) => (
                  <div
                    key={service.value}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      formData.serviceType === service.value
                        ? 'border-primary-orange bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value }))}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">{service.icon}</div>
                      <h4 className="font-semibold text-primary-darkGray mb-2">
                        {service.label}
                      </h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary-darkGray mb-6">
                Sélectionnez votre véhicule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vehicleTypes.map((vehicle) => (
                  <div
                    key={vehicle.value}
                    className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      formData.vehicleType === vehicle.value
                        ? 'border-primary-orange ring-2 ring-primary-orange ring-opacity-20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, vehicleType: vehicle.value }))}
                  >
                    <img
                      src={vehicle.image}
                      alt={vehicle.label}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-primary-darkGray mb-1">
                        {vehicle.label}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{vehicle.capacity}</p>
                      <p className="text-primary-orange font-bold">{vehicle.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Lieu de prise en charge *
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  placeholder="Adresse de départ"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  placeholder="Adresse de destination"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Type de trajet *
                </label>
                <select
                  name="tripType"
                  value={formData.tripType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  required
                >
                  <option value="aller-simple">Aller simple</option>
                  <option value="aller-retour">Aller-retour</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Date de départ *
                </label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  <FaClock className="inline mr-2" />
                  Heure de départ *
                </label>
                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  required
                />
              </div>

              {formData.tripType === 'aller-retour' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-primary-darkGray mb-2">
                      <FaCalendarAlt className="inline mr-2" />
                      Date de retour
                    </label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-darkGray mb-2">
                      <FaClock className="inline mr-2" />
                      Heure de retour
                    </label>
                    <input
                      type="time"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  <FaUsers className="inline mr-2" />
                  Nombre de passagers *
                </label>
                <input
                  type="number"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  min="1"
                  max="26"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  <FaSuitcase className="inline mr-2" />
                  Nombre de valises
                </label>
                <input
                  type="number"
                  name="luggage"
                  value={formData.luggage}
                  onChange={handleInputChange}
                  min="0"
                  max="20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-darkGray mb-2">
                Demandes spéciales (optionnel)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                placeholder="Siège bébé, arrêt supplémentaire, etc..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Numéro WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  placeholder="+221 XX XXX XX XX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Adresse email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-primary-orange focus:ring-primary-orange border-gray-300 rounded"
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  J'accepte les{' '}
                  <a href="/terms" className="text-primary-orange hover:underline">
                    conditions générales d'utilisation
                  </a>{' '}
                  et la{' '}
                  <a href="/privacy" className="text-primary-orange hover:underline">
                    politique de confidentialité
                  </a>
                </span>
              </label>
            </div>
          </div>
        );

      case 5:
        const selectedVehicle = vehicleTypes.find(v => v.value === formData.vehicleType);
        const selectedService = serviceTypes.find(s => s.value === formData.serviceType);
        
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-primary-darkGray mb-2">
                Récapitulatif de votre réservation
              </h3>
              <p className="text-gray-600">
                Vérifiez vos informations avant de confirmer
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-primary-darkGray mb-4">Détails du service</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Service :</span> {selectedService?.label}
                </div>
                <div>
                  <span className="font-medium">Véhicule :</span> {selectedVehicle?.label}
                </div>
                <div>
                  <span className="font-medium">Départ :</span> {formData.pickupLocation}
                </div>
                <div>
                  <span className="font-medium">Destination :</span> {formData.destination || 'Non spécifiée'}
                </div>
                <div>
                  <span className="font-medium">Date :</span> {formData.departureDate}
                </div>
                <div>
                  <span className="font-medium">Heure :</span> {formData.departureTime}
                </div>
                <div>
                  <span className="font-medium">Passagers :</span> {formData.passengers}
                </div>
                <div>
                  <span className="font-medium">Valises :</span> {formData.luggage}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary-darkGray">
                    Prix estimé :
                  </span>
                  <span className="text-2xl font-bold text-primary-orange">
                    {calculateEstimatedPrice()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Show booking form for all users
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚗 Réserver votre transport
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Service de transport premium avec chauffeur professionnel
          </p>
          
          {/* User status */}
          <div className="mb-6">
            {user ? (
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                ✅ Connecté en tant que {user.displayName || user.email}
              </div>
            ) : (
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                ⚠️ Non connecté - Connexion requise pour finaliser la réservation
              </div>
            )}
          </div>
          
          <div className="flex justify-center space-x-2 mb-8">
            <button
              onClick={() => setFormType('ultra')}
              className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                formType === 'ultra'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              ✨ Ultra Moderne
            </button>
            <button
              onClick={() => setFormType('modern')}
              className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                formType === 'modern'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              🎯 Moderne
            </button>
            <button
              onClick={() => setFormType('simple')}
              className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                formType === 'simple'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              🚀 Rapide
            </button>
            <button
              onClick={() => setFormType('legacy')}
              className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                formType === 'legacy'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              📋 Étapes
            </button>
          </div>
        </div>
        
        <div className={`rounded-lg shadow-sm border border-gray-200 ${formType === 'ultra' ? 'p-2' : 'p-8 bg-white'}`}>
          {formType === 'ultra' ? (
            <UltraModernBookingForm />
          ) : formType === 'modern' ? (
            <ModernBookingForm />
          ) : formType === 'simple' ? (
            <SimpleBookingForm />
          ) : (
            <div className="text-center p-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Formulaire par étapes
              </h3>
              <p className="text-gray-600 mb-6">
                Le formulaire détaillé par étapes sera disponible prochainement.
              </p>
              <button
                onClick={() => setFormType('ultra')}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md font-medium hover:from-purple-700 hover:to-blue-700"
              >
                ← Utiliser le formulaire ultra moderne
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;