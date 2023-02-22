importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');


const firebaseConfig = {
    apiKey: "AIzaSyBo7mD4fOYagQaLxVraqJb0qM3YPiO_ihk",
    authDomain: "ppf-finanzas.firebaseapp.com",
    projectId: "ppf-finanzas",
    storageBucket: "ppf-finanzas.appspot.com",
    messagingSenderId: "36541013773",
    appId: "1:36541013773:web:51580519b0cfe8c7729a44",
    measurementId: "G-8PHFXEVMZT"
  };

  firebase.initializeApp(firebaseConfig);

  // Retrieve firebase messaging
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });