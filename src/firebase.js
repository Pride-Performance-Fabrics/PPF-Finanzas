// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging,  getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBo7mD4fOYagQaLxVraqJb0qM3YPiO_ihk",
    authDomain: "ppf-finanzas.firebaseapp.com",
    projectId: "ppf-finanzas",
    storageBucket: "ppf-finanzas.appspot.com",
    messagingSenderId: "36541013773",
    appId: "1:36541013773:web:984b982aecf5e27b729a44",
    measurementId: "G-NRV7V3R80Q"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
//   const messaging = getMessaging(app);

  export const messaging = getMessaging(app)