import React, { useReducer, useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native-web";
import { AuthContext } from "./auth/AuthContext";
import { authReducer } from "./auth/authReducer";
import { AppRouter } from "./routers/AppRouter";
import { Toast } from "primereact/toast";
// import LoginScreen from "../screens/Login/LoginScreen";

import PrimeReact from 'primereact/api';
import { MemoProvider } from "./context/Memo/MemoContext";
import 'remixicon/fonts/remixicon.css';

import { fetchToken, onMessageListener, deleteTokenNotification } from './firebase';

import {handleLogout } from './services/crypto'


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
    } else {
      console.log(permission);
    }
  })
}


function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  // const [isTokenFound, setTokenFound] = useState(false);
  // const [tokenNotification, setTokenNotification] = useState('a');
  const toast = useRef(null)
  requestPermission()
  // fetchToken(setTokenFound, setTokenNotification);

  onMessageListener().then(payload => {
    
   
    let tipo = payload.data.Tipo
    console.log(payload)

    switch (tipo) {
      case '1':
        toast.current.show({
          backgroundColor: "blue",
          severity: 'success', summary: payload.notification.title, detail: payload.notification.body, life: 6000
        });

        setNotification({ title: payload.notification.title, body: payload.notification.body })
        console.log(payload);

        break;
      case '2':
        toast.current.show({
          backgroundColor: "blue",
          severity: 'warn', summary: payload.notification.title, detail: payload.notification.body, life: 90000
        });

        setNotification({ title: payload.notification.title, body: payload.notification.body })
        console.log(payload);
        break;

      default:
        toast.current.show({
          backgroundColor: "blue",
          severity: 'success', summary: payload.notification.title, detail: payload.notification.body, life: 6000
        });

        setNotification({ title: payload.notification.title, body: payload.notification.body })
        console.log(payload);
        break;
    }

    if(payload.data.cierreSesion === 'true'){
      handleLogout()
    }
   

    // if (tipo === '2') {
    //   toast.current.show({
    //     backgroundColor: "blue",
    //     severity: 'warn', summary: payload.notification.title, detail: payload.notification.body, life: 6000
    //   });

    //   setNotification({ title: payload.notification.title, body: payload.notification.body })
    //   console.log(payload);
    // } else {
    //   toast.current.show({
    //     backgroundColor: "blue",
    //     severity: 'success', summary: payload.notification.title, detail: payload.notification.body, life: 6000
    //   });

    //   setNotification({ title: payload.notification.title, body: payload.notification.body })
    //   console.log(payload);
    // }

  }).catch(err => console.log('failed: ', err));




  //  useEffect(() => {
  //   isTokenFound === true ?  console.log(tokenNotification) : deleteTokenNotification()
  //  },[isTokenFound])


  return (

    <AuthContext.Provider value={{ user, dispatch }}>
      <Toast ref={toast} />
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
