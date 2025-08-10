import {
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  ConfirmationResult,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserService, UserData } from './firestoreService';

export interface UserProfile {
  uid: string;
  phoneNumber: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  role: 'user' | 'driver' | 'admin';
  preferences?: {
    notifications: boolean;
    language: string;
    preferredVehicleType?: string;
  };
  loyaltyPoints?: number;
  address?: string;
}

class AuthService {
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  // Initialize reCAPTCHA verifier
  initializeRecaptcha() {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });
    }
    return this.recaptchaVerifier;
  }

  // Send SMS verification code
  async sendVerificationCode(phoneNumber: string): Promise<ConfirmationResult> {
    try {
      // Format phone number for Senegal (+221)
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+221${phoneNumber}`;
      
      const appVerifier = this.initializeRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      console.log('SMS sent successfully');
      return confirmationResult;
    } catch (error: any) {
      console.error('Error sending SMS:', error);
      throw new Error(`Failed to send verification code: ${error.message}`);
    }
  }

  // Verify SMS code and sign in
  async verifyCode(confirmationResult: ConfirmationResult, code: string): Promise<User> {
    try {
      const result = await confirmationResult.confirm(code);
      const user = result.user;
      
      // Create or update user profile in Firestore
      await this.createOrUpdateUserProfile(user);
      
      return user;
    } catch (error: any) {
      console.error('Error verifying code:', error);
      throw new Error(`Invalid verification code: ${error.message}`);
    }
  }

  // Sign up with email and password
  async signUpWithEmail(email: string, password: string, userData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address?: string;
  }): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Create user profile in Firestore
      await this.createOrUpdateUserProfile(user, userData);
      
      return user;
    } catch (error: any) {
      console.error('Error creating account:', error);
      throw new Error(`Failed to create account: ${error.message}`);
    }
  }

  // Sign in with email and password
  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(`Failed to sign in: ${error.message}`);
    }
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      throw new Error(`Failed to send reset email: ${error.message}`);
    }
  }

  // Create or update user profile in Firestore
  async createOrUpdateUserProfile(user: User, additionalData?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
  }): Promise<void> {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      const now = new Date();
      
      if (!userDoc.exists()) {
        // Create new user profile
        const newUserProfile: UserProfile = {
          uid: user.uid,
          phoneNumber: additionalData?.phoneNumber || user.phoneNumber || '',
          email: user.email || '',
          firstName: additionalData?.firstName || '',
          lastName: additionalData?.lastName || '',
          address: additionalData?.address || '',
          createdAt: now,
          updatedAt: now,
          isActive: true,
          role: 'user',
          loyaltyPoints: 0,
          preferences: {
            notifications: true,
            language: 'fr',
          }
        };
        
        await setDoc(userRef, newUserProfile);
        console.log('New user profile created');
      } else {
        // Update existing user profile
        const updates: any = {
          updatedAt: now,
          isActive: true,
        };
        
        if (additionalData?.firstName) updates.firstName = additionalData.firstName;
        if (additionalData?.lastName) updates.lastName = additionalData.lastName;
        if (additionalData?.phoneNumber) updates.phoneNumber = additionalData.phoneNumber;
        if (additionalData?.address) updates.address = additionalData.address;
        
        await setDoc(userRef, updates, { merge: true });
        console.log('User profile updated');
      }
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      throw error;
    }
  }

  // Get user profile from Firestore
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        ...updates,
        updatedAt: new Date(),
      }, { merge: true });
      
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Sign out user
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      // Clear reCAPTCHA verifier
      if (this.recaptchaVerifier) {
        this.recaptchaVerifier.clear();
        this.recaptchaVerifier = null;
      }
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}

export const authService = new AuthService();
export default authService;