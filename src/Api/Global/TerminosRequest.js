import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTIENE TODA LA INFORMACION DE LOS PRODUCTOS
export const getTerminos = async () => {
    const respuesta = PrivateInterceptor('generales/terminos', 'GET')
    return respuesta
};