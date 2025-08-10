import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, isSupported } from 'firebase/messaging';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5bZhCQDkOw1pM8zopNUM-ZLpXgpO23mo",
  authDomain: "kairos-9b2c6.firebaseapp.com",
  projectId: "kairos-9b2c6",
  storageBucket: "kairos-9b2c6.firebasestorage.app",
  messagingSenderId: "842521732077",
  appId: "1:842521732077:web:36763f016412c49ea07de4",
  measurementId: "G-BGJCSG6DJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging (only in supported browsers)
export const messaging = isSupported() ? getMessaging(app) : null;

export default app;