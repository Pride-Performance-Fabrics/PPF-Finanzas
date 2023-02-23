import { PrivateInterceptor } from "../../../interceptors/PrivateInterceptor";

export const getUsuarios = async() => {
    const respuesta = await PrivateInterceptor(`users/`, 'GET')
    return respuesta;
}

export const getUsersActivos = async() => {
    const respuesta = await PrivateInterceptor(`users/seleccionUsuarios`, 'GET')
    return respuesta;
}

export const getUsuariosFinanzas = async () =>{
    const respuesta = await PrivateInterceptor(`users/seleccionUsuariosFinanzas`, 'GET')
    return respuesta;
}

export const getUsuariosByRol = async() =>{
    const respuesta = await PrivateInterceptor(`users/seleccionUsuariosRol`, 'GET')
    return respuesta;
}

