import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2NT--XINYO03pKSLxlCxuO55A0kvztTo",
  authDomain: "hardware-s.firebaseapp.com",
  projectId: "hardware-s",
  storageBucket: "hardware-s.appspot.com",
  messagingSenderId: "1058733962327",
  appId: "1:1058733962327:web:e4a05c020cd4b601839f12"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};