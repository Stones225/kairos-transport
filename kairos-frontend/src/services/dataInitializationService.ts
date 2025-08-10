import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { pricingRules, zones, vehicleTypes, serviceTypes } from '../data/pricing';

export class DataInitializationService {
  // Initialiser les règles de tarification dans Firestore
  static async initializePricingRules(): Promise<void> {
    try {
      console.log('🚀 Initialisation des règles de tarification...');
      
      const pricingCollection = collection(db, 'pricingRules');
      
      // Vérifier si les données existent déjà
      const existingRules = await getDocs(pricingCollection);
      if (!existingRules.empty) {
        console.log('✅ Les règles de tarification existent déjà');
        return;
      }
      
      // Ajouter toutes les règles de tarification
      const promises = pricingRules.map(async (rule) => {
        const docRef = doc(pricingCollection, rule.id);
        await setDoc(docRef, {
          ...rule,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      await Promise.all(promises);
      console.log(`✅ ${pricingRules.length} règles de tarification ajoutées`);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation des règles:', error);
      throw error;
    }
  }

  // Initialiser les zones dans Firestore
  static async initializeZones(): Promise<void> {
    try {
      console.log('🚀 Initialisation des zones...');
      
      const zonesCollection = collection(db, 'zones');
      
      const promises = zones.map(async (zone) => {
        const docRef = doc(zonesCollection, zone.id);
        await setDoc(docRef, {
          ...zone,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      await Promise.all(promises);
      console.log(`✅ ${zones.length} zones ajoutées`);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation des zones:', error);
      throw error;
    }
  }

  // Initialiser les types de véhicules dans Firestore
  static async initializeVehicleTypes(): Promise<void> {
    try {
      console.log('🚀 Initialisation des types de véhicules...');
      
      const vehiclesCollection = collection(db, 'vehicleTypes');
      
      const promises = vehicleTypes.map(async (vehicle) => {
        const docRef = doc(vehiclesCollection, vehicle.id);
        await setDoc(docRef, {
          ...vehicle,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      await Promise.all(promises);
      console.log(`✅ ${vehicleTypes.length} types de véhicules ajoutés`);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation des véhicules:', error);
      throw error;
    }
  }

  // Initialiser les types de services dans Firestore
  static async initializeServiceTypes(): Promise<void> {
    try {
      console.log('🚀 Initialisation des types de services...');
      
      const servicesCollection = collection(db, 'serviceTypes');
      
      const promises = serviceTypes.map(async (service) => {
        const docRef = doc(servicesCollection, service.id);
        await setDoc(docRef, {
          ...service,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      await Promise.all(promises);
      console.log(`✅ ${serviceTypes.length} types de services ajoutés`);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation des services:', error);
      throw error;
    }
  }

  // Créer des véhicules d'exemple
  static async createSampleVehicles(): Promise<void> {
    try {
      console.log('🚀 Création de véhicules d\'exemple...');
      
      const vehiclesCollection = collection(db, 'vehicles');
      
      const sampleVehicles = [
        {
          id: 'vehicle-berline-001',
          driverId: 'driver-001',
          type: 'berline',
          brand: 'Toyota',
          model: 'Camry',
          year: 2022,
          color: 'Noir',
          plateNumber: 'DK-2024-AB',
          capacity: 4,
          isActive: true,
          isAvailable: true,
          lastMaintenance: new Date('2024-01-15'),
          nextMaintenance: new Date('2024-04-15'),
          features: ['Climatisation', 'GPS', 'Bluetooth'],
          images: ['https://images.unsplash.com/photo-1502877338535-766e7375c5e3']
        },
        {
          id: 'vehicle-suv-001',
          driverId: 'driver-002',
          type: 'suv',
          brand: 'Toyota',
          model: 'Land Cruiser',
          year: 2023,
          color: 'Blanc',
          plateNumber: 'DK-2023-CD',
          capacity: 7,
          isActive: true,
          isAvailable: true,
          lastMaintenance: new Date('2024-01-20'),
          nextMaintenance: new Date('2024-04-20'),
          features: ['Climatisation', 'GPS', 'WiFi', '4x4'],
          images: ['https://images.unsplash.com/photo-1519641643602-7ff500b74923']
        },
        {
          id: 'vehicle-van-001',
          driverId: 'driver-003',
          type: 'van7',
          brand: 'Toyota',
          model: 'HiAce',
          year: 2022,
          color: 'Argent',
          plateNumber: 'DK-2022-EF',
          capacity: 7,
          isActive: true,
          isAvailable: true,
          lastMaintenance: new Date('2024-01-10'),
          nextMaintenance: new Date('2024-04-10'),
          features: ['Climatisation', 'GPS', 'Espace bagages'],
          images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957']
        }
      ];
      
      const promises = sampleVehicles.map(async (vehicle) => {
        const docRef = doc(vehiclesCollection, vehicle.id);
        await setDoc(docRef, {
          ...vehicle,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      await Promise.all(promises);
      console.log(`✅ ${sampleVehicles.length} véhicules d'exemple créés`);
      
    } catch (error) {
      console.error('❌ Erreur lors de la création des véhicules:', error);
      throw error;
    }
  }

  // Créer des chauffeurs d'exemple
  static async createSampleDrivers(): Promise<void> {
    try {
      console.log('🚀 Création de chauffeurs d\'exemple...');
      
      const driversCollection = collection(db, 'drivers');
      
      const sampleDrivers = [
        {
          id: 'driver-001',
          userId: 'user-driver-001',
          name: 'Abdou Diallo',
          email: 'abdou.diallo@kairos.sn',
          phone: '+221771234567',
          licenseNumber: 'SN-DRV-001',
          licenseExpiry: new Date('2025-12-31'),
          isActive: true,
          isAvailable: true,
          rating: 4.8,
          totalRides: 145,
          languages: ['Français', 'Wolof', 'Anglais'],
          currentLocation: {
            lat: 14.6937,
            lng: -17.4441,
            address: 'Plateau, Dakar'
          }
        },
        {
          id: 'driver-002',
          userId: 'user-driver-002',
          name: 'Fatou Sall',
          email: 'fatou.sall@kairos.sn',
          phone: '+221772345678',
          licenseNumber: 'SN-DRV-002',
          licenseExpiry: new Date('2025-10-15'),
          isActive: true,
          isAvailable: true,
          rating: 4.9,
          totalRides: 98,
          languages: ['Français', 'Wolof'],
          currentLocation: {
            lat: 14.7645,
            lng: -17.3660,
            address: 'Almadies, Dakar'
          }
        },
        {
          id: 'driver-003',
          userId: 'user-driver-003',
          name: 'Moussa Kane',
          email: 'moussa.kane@kairos.sn',
          phone: '+221773456789',
          licenseNumber: 'SN-DRV-003',
          licenseExpiry: new Date('2026-03-20'),
          isActive: true,
          isAvailable: false, // En mission
          rating: 4.7,
          totalRides: 203,
          languages: ['Français', 'Pulaar', 'Anglais'],
          currentLocation: {
            lat: 14.6928,
            lng: -17.4467,
            address: 'Médina, Dakar'
          }
        }
      ];
      
      const promises = sampleDrivers.map(async (driver) => {
        const docRef = doc(driversCollection, driver.id);
        await setDoc(docRef, {
          ...driver,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      await Promise.all(promises);
      console.log(`✅ ${sampleDrivers.length} chauffeurs d'exemple créés`);
      
    } catch (error) {
      console.error('❌ Erreur lors de la création des chauffeurs:', error);
      throw error;
    }
  }

  // Initialiser toutes les données
  static async initializeAllData(): Promise<void> {
    try {
      console.log('🚀 Démarrage de l\'initialisation complète des données...');
      
      await this.initializeZones();
      await this.initializeServiceTypes();
      await this.initializeVehicleTypes();
      await this.initializePricingRules();
      await this.createSampleVehicles();
      await this.createSampleDrivers();
      
      console.log('🎉 Initialisation complète terminée avec succès !');
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation complète:', error);
      throw error;
    }
  }
}