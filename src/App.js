import React, { useReducer, useEffect } from "react";
import { View, StyleSheet } from "react-native-web";
import { AuthContext } from "./auth/AuthContext";
import { authReducer } from "./auth/authReducer";
import { AppRouter } from "./routers/AppRouter";
// import LoginScreen from "../screens/Login/LoginScreen";

import PrimeReact from 'primereact/api';
import { MemoProvider } from "./context/Memo/MemoContext";
import 'remixicon/fonts/remixicon.css';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getToken, onMessage } from "firebase/messaging";

import { messaging } from "./firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const messaging = getMessaging(app);

// const tok  = getToken(messaging, {vapidKey: "BC6rKSLnnTnbZ2dWAiOBX7WwHQdtuRjV_3FcoMBZKwPk4n2nBIPtLUaN2NpwnkpOCniiPu5TDC5t9JFl-7iGQwk"});

PrimeReact.ripple = true;
PrimeReact.zIndex = {
  modal: 1100,    // dialog, sidebar
  overlay: 1000,  // dropdown, overlaypanel
  menu: 1000,     // overlay menus
  tooltip: 1100,   // tooltip
  toast: 1200     // toast
}

const init = () => {
  return localStorage.getItem('ppfToken') || {
    logged: false
  };
}

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }else{
      console.log(permission);
    }
  })
}





function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init);
  requestPermission()

  const activarMensajes  = async() => {
    const tokenFirebase = await getToken(messaging, {
     vapidKey: "BC6rKSLnnTnbZ2dWAiOBX7WwHQdtuRjV_3FcoMBZKwPk4n2nBIPtLUaN2NpwnkpOCniiPu5TDC5t9JFl-7iGQwk"
    }).catch(error => console.log("Error al generar el token", error))
    console.log(tokenFirebase)


    if(tokenFirebase) console.log("tu token:" , tokenFirebase)
    if(!tokenFirebase) console.log("no tienes token")
 }


 useEffect(() => {
  activarMensajes()
    onMessage(messaging, message =>{
     console.log("tu mensaje", message)
    })
 },[])
 

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      
      <View style={styles.container} className={'animate__animated animate__fadeIn tableAnimate'} >
        <MemoContainer>
          <AppRouter />
        </MemoContainer>
      </View>
    </AuthContext.Provider>

  );
}

const styles = StyleSheet.create({
  overflow: 'hidden'
})



const MemoContainer = ({ children }) => {
  return <MemoProvider>{children}</MemoProvider>
}

export default App;
