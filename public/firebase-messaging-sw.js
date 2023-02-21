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


const app = firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging(app)

messaging.onBackgroundMessage(payload =>{
    console.log("Recibiste un mensaje")
    console.log(payload)
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
        icon:"../../assets/SVG/Primario_H.svg"
    }

    return self.registration.showNotificacion(
        notificationTitle, notificationOptions
    )
})
