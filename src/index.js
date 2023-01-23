import React from 'react';
import ReactDOM from 'react-dom';
// import { hot } from "react-hot-loader/root";
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ESTILOS PRIMEREACT
// import "primereact/resources/themes/bootstrap4-light-purple/theme.css";  //theme
// import "primereact/resources/themes/saga-purple/theme.css";
// import "primereact/resources/themes/saga-purple/theme.css";
// import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import './styles/styles.scss';

// // Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept()

ReactDOM.render(
  <React.StrictMode>
    <App style={{ overflow:'hidden' }} className={'animate__animated animate__fadeIn tableAnimate'} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

