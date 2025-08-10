import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Booking, BookingFormData, Vehicle, PriceSettings } from '../types/firebase';

class BookingService {
  private collectionName = 'bookings';

  // Créer une nouvelle réservation
  async createBooking(bookingData: BookingFormData, userId: string): Promise<string> {
    try {
      // Calculer le prix estimé
      const estimatedPrice = await this.calculatePrice(bookingData);
      
      const booking: Omit<Booking, 'id'> = {
        userId,
        vehicleId: '', // À assigner par l'admin
        pickupLocation: {
          address: bookingData.pickupAddress,
          latitude: 0, // À géocoder
          longitude: 0
        },
        dropoffLocation: {
          address: bookingData.dropoffAddress,
          latitude: 0,
          longitude: 0
        },
        scheduledDate: new Date(bookingData.date),
        scheduledTime: bookingData.time,
        estimatedDuration: 0, // À calculer
        estimatedDistance: 0, // À calculer
        basePrice: estimatedPrice.basePrice,
        distancePrice: estimatedPrice.distancePrice,
        totalPrice: estimatedPrice.total,
        currency: 'FCFA',
        status: 'pending',
        paymentStatus: 'pending',
        specialRequests: bookingData.specialRequests,
        passengers: bookingData.passengers,
        luggage: bookingData.luggage,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(collection(db, this.collectionName), {
        ...booking,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }
  }

  // Récupérer une réservation par ID
  async getBooking(bookingId: string): Promise<Booking | null> {
    try {
      const docRef = doc(db, this.collectionName, bookingId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          scheduledDate: data.scheduledDate?.toDate() || new Date(),
          completedAt: data.completedAt?.toDate(),
          cancelledAt: data.cancelledAt?.toDate()
        } as Booking;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la réservation:', error);
      throw error;
    }
  }

  // Récupérer les réservations d'un utilisateur
  async getUserBookings(userId: string, limitCount: number = 10): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const bookings: Booking[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        bookings.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          scheduledDate: data.scheduledDate?.toDate() || new Date(),
          completedAt: data.completedAt?.toDate(),
          cancelledAt: data.cancelledAt?.toDate()
        } as Booking);
      });

      return bookings;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations utilisateur:', error);
      throw error;
    }
  }

  // Calculer le prix d'une réservation
  private async calculatePrice(bookingData: BookingFormData): Promise<{basePrice: number, distancePrice: number, total: number}> {
    try {
      // Récupérer les paramètres de prix pour le type de véhicule
      const priceSettings = await this.getPriceSettings(bookingData.vehicleType);
      
      // Estimation de base (à améliorer avec une API de géolocalisation)
      const estimatedDistance = 10; // km (temporaire)
      const basePrice = priceSettings?.basePrice || 15000;
      const pricePerKm = priceSettings?.pricePerKm || 500;
      
      const distancePrice = estimatedDistance * pricePerKm;
      const total = basePrice + distancePrice;

      return {
        basePrice,
        distancePrice,
        total
      };
    } catch (error) {
      console.error('Erreur lors du calcul du prix:', error);
      // Prix par défaut en cas d'erreur
      return {
        basePrice: 15000,
        distancePrice: 5000,
        total: 20000
      };
    }
  }

  // Récupérer les paramètres de prix
  private async getPriceSettings(vehicleType: string): Promise<PriceSettings | null> {
    try {
      const q = query(
        collection(db, 'priceSettings'),
        where('vehicleType', '==', vehicleType)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as PriceSettings;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des prix:', error);
      return null;
    }
  }
}

export const bookingService = new BookingService();