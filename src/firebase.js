import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-UrmwciZsZpEudXPi4F5zxvOzHRma3jM",
  authDomain: "velora-e682f.firebaseapp.com",
  projectId: "velora-e682f",
  storageBucket: "velora-e682f.firebasestorage.app",
  messagingSenderId: "10903607100",
  appId: "1:10903607100:web:5bc4af2876a000168f3039",
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();