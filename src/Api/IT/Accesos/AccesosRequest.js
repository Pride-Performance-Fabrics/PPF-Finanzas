import { PrivateInterceptor } from "../../../interceptors/PrivateInterceptor";

//**************  OBTENER LOS ACCESOS DE LA PAGINA **************/

export const getAccesos = async () => {
    
    const result = await PrivateInterceptor(`accesos/`, 'GET');
    return result;
}

export const postAccesos = async (body) =>{
    console.log(body)
    const result = await PrivateInterceptor(`accesos/`, 'POST', body);
    return result;
}