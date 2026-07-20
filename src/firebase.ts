import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:             import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Admin email comes from env so it is never hardcoded in the public repo
export const ADMIN_EMAILS: string[] = [
    (import.meta.env.VITE_ADMIN_EMAIL as string ?? '').toLowerCase(),
].filter(Boolean);

export let analytics: Analytics | undefined = undefined;

isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
}).catch((err) => {
    console.error("Firebase Analytics initialization failed:", err);
});