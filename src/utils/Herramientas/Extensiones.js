// TODO MOVE TO API
import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTIENE TODAS LAS EXTENCIONES
export const getExtensiones = async () => {
    const respuesta = PrivateInterceptor('Extenciones', 'GET')
    return respuesta
};