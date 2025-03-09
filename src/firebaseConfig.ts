import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyZ76I_r3_2xodS8FpBhcY4fsP4aiqvM4",
    authDomain: "itcc-1e0bd.firebaseapp.com",
    projectId: "itcc-1e0bd",
    storageBucket: "itcc-1e0bd.firebasestorage.app",
    messagingSenderId: "74446989042",
    appId: "1:74446989042:web:bccf0d991b570e35b1926b",
    measurementId: "G-CDC5Q3GTR2"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
