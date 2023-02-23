import {initializeApp } from 'firebase/app';
import { deleteToken, getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBo7mD4fOYagQaLxVraqJb0qM3YPiO_ihk",
    authDomain: "ppf-finanzas.firebaseapp.com",
    projectId: "ppf-finanzas",
    storageBucket: "ppf-finanzas.appspot.com",
    messagingSenderId: "36541013773",
    appId: "1:36541013773:web:984b982aecf5e27b729a44",
    measurementId: "G-NRV7V3R80Q"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const messaging = getMessaging(firebaseApp);

 export const deleteTokenNotification = async() =>{
  deleteToken(messaging);
 }
  export const fetchToken = (setTokenFound, setTokenNotification) => {

    return getToken(messaging, {vapidKey: 'BC6rKSLnnTnbZ2dWAiOBX7WwHQdtuRjV_3FcoMBZKwPk4n2nBIPtLUaN2NpwnkpOCniiPu5TDC5t9JFl-7iGQwk'}).then((currentToken) => {
      if (currentToken) {
        // console.log('current token', currentToken);
        return(currentToken)
        // setTokenNotification(currentToken)
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }
  
  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
  });

  

  // export const messaging = getMessaging(app)