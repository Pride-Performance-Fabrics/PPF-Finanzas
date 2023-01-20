// TODO MOVER A API
import { PrivateInterceptor } from "../../../interceptors/PrivateInterceptor";

// OBTENER TODOS LOS dbo.Roles 
export const getRoles = async() => {
    const respuesta = await PrivateInterceptor(`Roles`, 'GET')
    return respuesta;
}