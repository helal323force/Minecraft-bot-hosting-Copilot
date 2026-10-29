import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyD-CPX3R-MmTE9_qJn3hzgd6XVckHy_BRw",
  authDomain: "minecraft-bot-hosting.firebaseapp.com",
  projectId: "minecraft-bot-hosting",
  storageBucket: "minecraft-bot-hosting.firebasestorage.app",
  messagingSenderId: "477684008962",
  appId: "1:477684008962:web:84773428fe03375617ff1b",
  measurementId: "G-8E8Z2FGXVQ"
};

const runtimeConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || firebaseConfig.measurementId
};

const missing = Object.entries(runtimeConfig)
  .filter(([_, v]) => !v)
  .map(([k]) => k);

if (missing.length) {
  throw new Error(`Firebase config missing values: ${missing.join(", ")}`);
}

export const app = getApps().length ? getApps()[0] : initializeApp(runtimeConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
