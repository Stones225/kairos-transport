import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Types pour Firestore
export interface BookingData {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  
  // Détails du trajet
  pickupLocation: string;
  dropoffLocation: string;
  zone: string;
  destination: string;
  
  // Service et véhicule
  service: string;
  vehicleType: string;
  option: string;
  passengers: number;
  
  // Prix et paiement
  price: number | 'quote';
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  
  // Dates et heures
  scheduledDate: string;
  scheduledTime: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Statut de la réservation
  status: 'pending' | 'confirmed' | 'driver_assigned' | 'in_progress' | 'completed' | 'cancelled';
  
  // Informations supplémentaires
  specialRequests?: string;
  driverId?: string;
  vehicleId?: string;
  
  // Suivi
  pickupTime?: Date;
  dropoffTime?: Date;
}

export interface UserData {
  id?: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'driver' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Profil utilisateur
  address?: string;
  preferredVehicleType?: string;
  loyaltyPoints?: number;
}

export interface DriverData {
  id?: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: Date;
  
  // Statut et disponibilité
  isActive: boolean;
  isAvailable: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  
  // Évaluations
  rating: number;
  totalRides: number;
  
  // Informations personnelles
  photoUrl?: string;
  languages: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleData {
  id?: string;
  driverId: string;
  type: string; // berline, suv, van, etc.
  brand: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  capacity: number;
  
  // État et maintenance
  isActive: boolean;
  isAvailable: boolean;
  lastMaintenance: Date;
  nextMaintenance: Date;
  
  // Équipements
  features: string[]; // climatisation, wifi, etc.
  
  // Images
  images: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

// Service Firestore pour les réservations
export class BookingService {
  private static collection = 'bookings';

  static async createBooking(booking: Omit<BookingData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const bookingData = {
        ...booking,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, this.collection), bookingData);
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }
  }

  static async getBookingById(id: string): Promise<BookingData | null> {
    try {
      const docRef = doc(db, this.collection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as BookingData;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la réservation:', error);
      throw error;
    }
  }

  static async getUserBookings(userId: string): Promise<BookingData[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const bookings: BookingData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        bookings.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as BookingData);
      });
      
      return bookings;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations utilisateur:', error);
      throw error;
    }
  }

  static async updateBookingStatus(id: string, status: BookingData['status']): Promise<void> {
    try {
      const docRef = doc(db, this.collection, id);
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  }

  static async assignDriver(bookingId: string, driverId: string, vehicleId: string): Promise<void> {
    try {
      const docRef = doc(db, this.collection, bookingId);
      await updateDoc(docRef, {
        driverId,
        vehicleId,
        status: 'driver_assigned',
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Erreur lors de l\'assignation du chauffeur:', error);
      throw error;
    }
  }
}

// Service pour les utilisateurs
export class UserService {
  private static collection = 'users';

  static async createUser(user: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const userData = {
        ...user,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, this.collection), userData);
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }

  static async getUserById(id: string): Promise<UserData | null> {
    try {
      const docRef = doc(db, this.collection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as UserData;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  }

  static async updateUser(id: string, updates: Partial<UserData>): Promise<void> {
    try {
      const docRef = doc(db, this.collection, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  }
}

// Service pour les chauffeurs
export class DriverService {
  private static collection = 'drivers';

  static async getAvailableDrivers(): Promise<DriverData[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('isActive', '==', true),
        where('isAvailable', '==', true),
        orderBy('rating', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const drivers: DriverData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        drivers.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          licenseExpiry: data.licenseExpiry?.toDate()
        } as DriverData);
      });
      
      return drivers;
    } catch (error) {
      console.error('Erreur lors de la récupération des chauffeurs disponibles:', error);
      throw error;
    }
  }
}

// Service pour les véhicules
export class VehicleService {
  private static collection = 'vehicles';

  static async getAvailableVehiclesByType(type: string): Promise<VehicleData[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('type', '==', type),
        where('isActive', '==', true),
        where('isAvailable', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      const vehicles: VehicleData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        vehicles.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          lastMaintenance: data.lastMaintenance?.toDate(),
          nextMaintenance: data.nextMaintenance?.toDate()
        } as VehicleData);
      });
      
      return vehicles;
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules:', error);
      throw error;
    }
  }
}

// Service pour les statistiques
export class AnalyticsService {
  static async getBookingStats(userId?: string): Promise<{
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  }> {
    try {
      let q;
      if (userId) {
        q = collection(db, 'bookings');
        // TODO: Implémenter les requêtes spécifiques avec where
      } else {
        q = collection(db, 'bookings');
      }
      
      const querySnapshot = await getDocs(q);
      const stats = {
        total: 0,
        pending: 0,
        completed: 0,
        cancelled: 0
      };
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as BookingData;
        stats.total++;
        
        switch (data.status) {
          case 'pending':
          case 'confirmed':
          case 'driver_assigned':
            stats.pending++;
            break;
          case 'completed':
            stats.completed++;
            break;
          case 'cancelled':
            stats.cancelled++;
            break;
        }
      });
      
      return stats;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}