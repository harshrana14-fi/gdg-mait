import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCkUUJaI5ItrqliFngcvF66hrSqIPCKYso",
  authDomain: "gdg-mait-fc4aa.firebaseapp.com",
  projectId: "gdg-mait-fc4aa",
  storageBucket: "gdg-mait-fc4aa.appspot.com", // ✅ FIXED
  messagingSenderId: "932685606915",
  appId: "1:932685606915:web:8fccf60e1a2af443ee9e36"
};

// ✅ Initialize AFTER config
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ moved here
