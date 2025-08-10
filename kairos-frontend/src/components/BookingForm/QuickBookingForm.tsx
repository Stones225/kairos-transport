import React, { useState } from 'react';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaSuitcase } from 'react-icons/fa';

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
}

const QuickBookingForm: React.FC = () => {
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
  });

  const vehicleTypes = [
    { value: 'berline', label: 'Berline (4 places)' },
    { value: 'suv', label: 'SUV (6 places)' },
    { value: 'toyota-9', label: 'Toyota 9 places' },
    { value: 'minibus-26', label: 'Mini bus 26 places' },
  ];

  const serviceTypes = [
    { value: 'transfert-aeroport', label: 'Transfert à l\'aéroport' },
    { value: 'mise-disposition', label: 'Mise à disposition' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking form submitted:', formData);
    // TODO: Handle form submission
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary-darkGray mb-6 text-center">
        Réservation Rapide
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              <FaCar className="inline mr-2" />
              Type de véhicule *
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              required
            >
              <option value="">Sélectionner un véhicule</option>
              {vehicleTypes.map(vehicle => (
                <option key={vehicle.value} value={vehicle.value}>
                  {vehicle.label}
                </option>
              ))}
            </select>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              Type de service *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              required
            >
              <option value="">Sélectionner un service</option>
              {serviceTypes.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Location */}
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

          {/* Destination */}
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

          {/* Trip Type */}
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

          {/* Departure Date */}
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

          {/* Departure Time */}
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

          {/* Return Date - Only show if round trip */}
          {formData.tripType === 'aller-retour' && (
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
          )}

          {/* Return Time - Only show if round trip */}
          {formData.tripType === 'aller-retour' && (
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
          )}

          {/* Passengers */}
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

          {/* Luggage */}
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

          {/* Phone */}
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

          {/* Email */}
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

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary-orange text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Réserver maintenant
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickBookingForm;