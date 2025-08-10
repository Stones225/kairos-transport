// Types pour la base de données Firestore
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'client' | 'admin' | 'driver';
  createdAt: Date;
  updatedAt: Date;
  preferences?: {
    language: string;
    notifications: boolean;
  };
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'berline' | 'suv' | 'minibus' | 'bus';
  capacity: number;
  features: string[];
  basePrice: number;
  pricePerKm: number;
  images: string[];
  status: 'available' | 'maintenance' | 'booked';
  licensePlate: string;
  year: number;
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  experience: number; // années d'expérience
  rating: number;
  totalTrips: number;
  languages: string[];
  status: 'available' | 'busy' | 'offline';
  currentLocation?: {
    latitude: number;
    longitude: number;
    lastUpdated: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  driverId?: string;
  vehicleId: string;
  
  // Détails du voyage
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  dropoffLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  
  // Informations temporelles
  scheduledDate: Date;
  scheduledTime: string;
  estimatedDuration: number; // minutes
  estimatedDistance: number; // km
  
  // Tarification
  basePrice: number;
  distancePrice: number;
  totalPrice: number;
  currency: 'FCFA';
  
  // Statut et suivi
  status: 'pending' | 'confirmed' | 'driver_assigned' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: 'cash' | 'wave' | 'orange_money' | 'card';
  
  // Notes et préférences
  specialRequests?: string;
  passengers: number;
  luggage: boolean;
  
  // Tracking
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  driverId: string;
  vehicleId: string;
  rating: number; // 1-5
  comment?: string;
  categories: {
    punctuality: number;
    cleanliness: number;
    driving: number;
    courtesy: number;
  };
  createdAt: Date;
}

export interface PriceSettings {
  id: string;
  vehicleType: string;
  basePrice: number;
  pricePerKm: number;
  nightSurcharge: number; // %
  weekendSurcharge: number; // %
  airportSurcharge: number; // fixe
  minimumFare: number;
  cancellationFee: number;
  waitingTimePrice: number; // par minute
  lastUpdated: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking_confirmed' | 'driver_assigned' | 'trip_started' | 'trip_completed' | 'payment_received' | 'general';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

// Types pour les formulaires
export interface BookingFormData {
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  time: string;
  vehicleType: string;
  passengers: number;
  luggage: boolean;
  specialRequests?: string;
  contactPhone: string;
  contactEmail: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferences: {
    language: string;
    notifications: boolean;
  };
}