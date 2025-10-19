import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWqHFb2DYFWahvJQhI-1uTMCb18JsH408",
    authDomain: "sugarsaathi.firebaseapp.com",
    projectId: "sugarsaathi",
    storageBucket: "sugarsaathi.firebasestorage.app",
    messagingSenderId: "451294816417",
    appId: "1:451294816417:web:76013c92398e348ff768e0",
    measurementId: "G-PW0M7LBC5M"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 