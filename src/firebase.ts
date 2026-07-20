import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgCy7pWivBfdvLu5z4-MrgOJzYtiFDFJo",
    authDomain: "jayarathnatech-49463.firebaseapp.com",
    projectId: "jayarathnatech-49463",
    storageBucket: "jayarathnatech-49463.firebasestorage.app",
    messagingSenderId: "243968983586",
    appId: "1:243968983586:web:bc0eedc4987e5cadfb807b",
    measurementId: "G-VKW70VTXN9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const ADMIN_EMAILS = [
    "nidurangajayarathna@gmail.com"
];

export let analytics: Analytics | undefined = undefined;

isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
}).catch((err) => {
    console.error("Firebase Analytics initialization failed:", err);
});