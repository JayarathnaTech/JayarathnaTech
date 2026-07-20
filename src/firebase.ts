import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Provide safe fallback values for testing and build environments where env vars are not present
const firebaseConfig = {
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key-for-unit-tests",
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-auth-domain",
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project-id",
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock-sender-id",
    appId:             import.meta.env.VITE_FIREBASE_APP_ID || "mock-app-id",
    measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "mock-measurement-id",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Admin email comes from env, with the default admin as a safe fallback
export const ADMIN_EMAILS: string[] = [
    (import.meta.env.VITE_ADMIN_EMAIL as string ?? 'nidurangajayarathna@gmail.com').toLowerCase(),
].filter(Boolean);

export let analytics: Analytics | undefined = undefined;

isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
}).catch((err) => {
    console.error("Firebase Analytics initialization failed:", err);
});