// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-914c9.firebaseapp.com",
  projectId: "real-estate-914c9",
  storageBucket: "real-estate-914c9.firebasestorage.app",
  messagingSenderId: "545773276792",
  appId: "1:545773276792:web:71d76227bd71378840e78d"
}; 

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 