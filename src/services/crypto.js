import cryptoJS from 'crypto-js';
import { VencimientoToken } from '../utils/Sesiones/Sesiones';

// Importacion de librerias decodificaion de token
import { isExpired, decodeToken } from "react-jwt";


const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';


export let tiempoToken = new Date();
localStorage.setItem('tiempoToken', new Date());

export const encrypt = (text) => {
    // TODO CAMBIAR createCipher por otro
    const encrypted = cryptoJS.AES.encrypt(text, password).toString();
    return encrypted;
}

export const decrypt = (text) => {
    const decrypted = cryptoJS.AES.encrypt(algorithm, password);
    return decrypted;
}

export const verifyToken = (token) => {
    const old = localStorage.getItem('ppfToken');
    if (token !== old) {
        localStorage.setItem('ppfToken', token);
        // console.log('cambio', typeof token);
        tiempoToken = new Date();
        localStorage.setItem('tiempoToken', new Date());
    } else {
        // console.log('no cambio');
    }
}

// Cierre de Sesion y redireccion a Login
export const handleLogout = async() => {
    const ppfToken = localStorage.getItem('ppfToken');
    const decoded = decodeToken(ppfToken);
    if(!isExpired(ppfToken)){
        VencimientoToken(decoded.idUser);
    }
    localStorage.removeItem('tiempoToken');
    localStorage.removeItem('tiempoDieSesion');
    localStorage.removeItem('ppfToken');
    localStorage.removeItem(0);
    localStorage.removeItem(1);
    localStorage.removeItem(2);
    localStorage.removeItem('ppfToken');
    window.localStorage.removeItem('ppfToken');
    localStorage.setItem('ppfToken', null);
    window.location.href = ``;
}

export const validarRespuesta = (res) => {
    if (isExpired(res.token) || res.auth === false) {
        handleLogout();
    }else{
        verifyToken(res.token);
    }
}