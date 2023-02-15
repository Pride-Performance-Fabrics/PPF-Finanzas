import { PrivateInterceptor } from "../../../interceptors/PrivateInterceptor";

export const getUsuarios = async() => {
    const respuesta = await PrivateInterceptor(`users/`, 'GET')
    return respuesta;
}

export const getUsersActivos = async() => {
    const respuesta = await PrivateInterceptor(`users/seleccionUsuarios`, 'GET')
    return respuesta;
}

