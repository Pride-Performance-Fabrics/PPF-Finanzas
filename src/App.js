import React, { useReducer } from "react";
import { View, StyleSheet } from "react-native-web";
import { AuthContext } from "./auth/AuthContext";
import { authReducer } from "./auth/authReducer";
import { AppRouter } from "./routers/AppRouter";

import PrimeReact from 'primereact/api';
import { MemoProvider } from "./context/Memo/MemoContext";

const init = () => {
  return localStorage.getItem('ppfToken') || {
    logged: false
  };
}


function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init);


  return (
    <AuthContext.Provider >
      <View></View>
      <View style={styles.container} className={'animate__animated animate__fadeIn tableAnimate'} >
        <MemoContainer>
          <AppRouter />
        </MemoContainer>
      </View>
      {/* <Footer/> */}
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
