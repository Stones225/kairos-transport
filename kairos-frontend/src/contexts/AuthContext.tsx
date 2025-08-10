import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types/firebase';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  user: FirebaseUser | null; // Alias pour compatibilité
  userProfile: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer le profil utilisateur depuis Firestore
  const fetchUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return { id: userId, ...userDoc.data() } as User;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil utilisateur:', error);
      return null;
    }
  };

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = await fetchUserProfile(result.user.uid);
      setUserProfile(profile);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Fonction d'inscription
  const register = async (email: string, password: string, userData: Partial<User>): Promise<void> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Mettre à jour le profil Firebase Auth
      await updateProfile(result.user, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });

      // Créer le profil utilisateur dans Firestore
      const newUser: User = {
        id: result.user.uid,
        email: result.user.email!,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        role: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          language: 'fr',
          notifications: true
        }
      };

      await setDoc(doc(db, 'users', result.user.uid), {
        ...newUser,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setUserProfile(newUser);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Fonction de déconnexion
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error: any) {
      throw new Error('Erreur lors de la déconnexion');
    }
  };

  // Fonction de réinitialisation du mot de passe
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Fonction de mise à jour du profil utilisateur
  const updateUserProfile = async (data: Partial<User>): Promise<void> => {
    if (!currentUser) throw new Error('Aucun utilisateur connecté');

    try {
      const updatedData = {
        ...data,
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', currentUser.uid), updatedData, { merge: true });
      
      // Mettre à jour le profil local
      setUserProfile(prev => prev ? { ...prev, ...data, updatedAt: new Date() } : null);

      // Mettre à jour Firebase Auth si nécessaire
      if (data.firstName || data.lastName) {
        await updateProfile(currentUser, {
          displayName: `${data.firstName || userProfile?.firstName} ${data.lastName || userProfile?.lastName}`
        });
      }
    } catch (error: any) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }
  };

  // Messages d'erreur localisés
  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Aucun utilisateur trouvé avec cette adresse email.';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect.';
      case 'auth/email-already-in-use':
        return 'Cette adresse email est déjà utilisée.';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères.';
      case 'auth/invalid-email':
        return 'Adresse email invalide.';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Veuillez réessayer plus tard.';
      default:
        return 'Une erreur inattendue s\'est produite.';
    }
  };

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Récupérer le profil utilisateur
        const profile = await fetchUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    user: currentUser, // Alias pour compatibilité
    userProfile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};