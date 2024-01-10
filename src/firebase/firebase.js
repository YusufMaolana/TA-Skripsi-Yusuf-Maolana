// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ7wL4i5CTCtsSo3pCh0i9OibKWoitcb0",
  authDomain: "react-imc-storage.firebaseapp.com",
  projectId: "react-imc-storage",
  storageBucket: "react-imc-storage.appspot.com",
  messagingSenderId: "382278118064",
  appId: "1:382278118064:web:6d7316889ab8e2941fa975",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
