// TODO MOVER A API
import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

export const getUserByRol = async(IdRol) => {
    const respuesta = await PrivateInterceptor(`users/usuariosByRol/${IdRol}`, 'GET')
    return respuesta;
}


// OBTENER TODOS LOS dbo.User con su ID, UserName, Usuario
export const getUsersBasic = async() => {
    const respuesta = await PrivateInterceptor(`users/seleccionUsuarios`, 'GET')
    return respuesta;
}

// MODIFICA UN USUARIO
export const updateUser = async(user) => {
    const respuesta = await PrivateInterceptor(`users`, 'PUT', user)
    return respuesta;
}

// MODIFICAR CONTRASEÑA DE UN USUARIO
export const updatePassword = async(user) => {
    const respuesta = await PrivateInterceptor(`users/password`, 'PUT', user)
    return respuesta;
}