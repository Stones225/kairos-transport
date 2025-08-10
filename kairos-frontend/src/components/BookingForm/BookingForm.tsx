import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaSuitcase } from 'react-icons/fa';
import { BookingService } from '../../services/firestoreService';

const bookingSchema = z.object({
  vehicleType: z.string().min(1, 'Type de véhicule requis'),
  serviceType: z.string().min(1, 'Type de service requis'),
  pickupLocation: z.string().min(1, 'Lieu de prise en charge requis'),
  destination: z.string().optional(),
  tripType: z.enum(['aller-simple', 'aller-retour']).default('aller-simple'),
  departureDate: z.string().min(1, 'Date de départ requise'),
  departureTime: z.string().min(1, 'Heure de départ requise'),
  returnDate: z.string().optional(),
  returnTime: z.string().optional(),
  passengers: z.coerce.number().min(1).max(26),
  luggage: z.coerce.number().min(0).max(20).optional(),
  phone: z.string().min(1, 'Numéro requis'),
  email: z.string().email('Email invalide'),
});

type BookingFormInputs = z.infer<typeof bookingSchema>;

const vehicleTypes = [
  { value: 'berline', label: 'Berline (4 places)' },
  { value: 'suv', label: 'SUV (6 places)' },
  { value: 'toyota-9', label: 'Toyota 9 places' },
  { value: 'minibus-26', label: 'Mini bus 26 places' },
];

const serviceTypes = [
  { value: 'transfert-aeroport', label: "Transfert à l'aéroport" },
  { value: 'mise-disposition', label: 'Mise à disposition' },
];

const BookingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormInputs>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tripType: 'aller-simple',
      passengers: 1,
      luggage: 0,
    },
  });

  const tripType = watch('tripType');

  const onSubmit = async (data: BookingFormInputs) => {
    try {
      await BookingService.createBooking(data as any);
      alert('Réservation enregistrée');
      reset();
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert('Erreur lors de la réservation');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary-darkGray mb-6 text-center">
        Réservation Rapide
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              <FaCar className="inline mr-2" />
              Type de véhicule *
            </label>
            <select
              {...register('vehicleType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            >
              <option value="">Sélectionner un véhicule</option>
              {vehicleTypes.map(vehicle => (
                <option key={vehicle.value} value={vehicle.value}>
                  {vehicle.label}
                </option>
              ))}
            </select>
            {errors.vehicleType && (
              <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              Type de service *
            </label>
            <select
              {...register('serviceType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            >
              <option value="">Sélectionner un service</option>
              {serviceTypes.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            {errors.serviceType && (
              <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              <FaMapMarkerAlt className="inline mr-2" />
              Lieu de prise en charge *
            </label>
            <input
              type="text"
              {...register('pickupLocation')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              placeholder="Adresse de départ"
            />
            {errors.pickupLocation && (
              <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              <FaMapMarkerAlt className="inline mr-2" />
              Destination
            </label>
            <input
              type="text"
              {...register('destination')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              placeholder="Adresse de destination"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              Type de trajet *
            </label>
            <select
              {...register('tripType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
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
              {...register('departureDate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            />
            {errors.departureDate && (
              <p className="text-red-500 text-sm mt-1">{errors.departureDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              <FaClock className="inline mr-2" />
              Heure de départ *
            </label>
            <input
              type="time"
              {...register('departureTime')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            />
            {errors.departureTime && (
              <p className="text-red-500 text-sm mt-1">{errors.departureTime.message}</p>
            )}
          </div>

          {tripType === 'aller-retour' && (
            <>
              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Date de retour
                </label>
                <input
                  type="date"
                  {...register('returnDate')}
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
                  {...register('returnTime')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              <FaUsers className="inline mr-2" />
              Nombre de passagers *
            </label>
            <input
              type="number"
              {...register('passengers', { valueAsNumber: true })}
              min={1}
              max={26}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            />
            {errors.passengers && (
              <p className="text-red-500 text-sm mt-1">{errors.passengers.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              <FaSuitcase className="inline mr-2" />
              Nombre de valises
            </label>
            <input
              type="number"
              {...register('luggage', { valueAsNumber: true })}
              min={0}
              max={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus-border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              Numéro WhatsApp *
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus-border-transparent"
              placeholder="+221 XX XXX XX XX"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-darkGray mb-2">
              Adresse email *
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus-border-transparent"
              placeholder="votre.email@exemple.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-orange text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? 'Envoi...' : 'Réserver maintenant'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

