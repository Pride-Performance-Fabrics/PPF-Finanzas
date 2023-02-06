import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

export const getUsuarios = async() => {
    const respuesta = await PrivateInterceptor(`users/`, 'GET')
    return respuesta;
}
