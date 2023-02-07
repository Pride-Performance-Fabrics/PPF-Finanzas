import { PrivateInterceptor } from "../../../interceptors/PrivateInterceptor";

//**************  OBTENER LOS ACCESOS DE LA PAGINA **************/

export const getAccesos = async () => {
    
    const result = await PrivateInterceptor(`accesos/`, 'GET');
    return result;
}

//**************  GENERA EL CRUD DEL MODULO DE ACCESOS **************/
export const postAccesos = async (body) =>{
    console.log(body)
    const result = await PrivateInterceptor(`accesos/`, 'POST', body);
    return result;
}

//**************  OBTENER EL LISTDO DE LOS MENU CON SUS ACCESSOS **************/
export const getAccesosModulos = async () => {
    
    const result = await PrivateInterceptor(`accesos/AccessGroup`, 'GET');
    return result;
}

//**************  OBTIENE LOS ACCESOS DE UN USUARIO **************/

export const getAccesosUsuario = async(idUser) => {
    const respuesta = await PrivateInterceptor(`accesos/${idUser}`, 'GET')
    return respuesta;
}


//**************  CAMBIAR ACCESOS **************/

export const cambiarAccesos = async(accesos) => {
    // console.log(accesos)
    const respuesta = await PrivateInterceptor(`accesos/cambiarAccesos`, 'PUT', accesos)
    return respuesta;
}


//**************  OBTIENE LOS ACCESOS DE LOS ROLES **************/

export const getAccesosRoles = async(IdRol) => {
    const respuesta = await PrivateInterceptor(`accesos/roles/${IdRol}`, 'GET')
    return respuesta;
}

//**************  CAMBIAR ACCESOS DE LOS ROLES**************/

export const cambiarAccesosRoles = async(accesos) => {
    // console.log(accesos)
    const respuesta = await PrivateInterceptor(`accesos/cambiarAccesosRoles`, 'PUT', accesos)
    return respuesta;
}