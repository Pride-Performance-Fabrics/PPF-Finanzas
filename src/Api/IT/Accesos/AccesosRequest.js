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