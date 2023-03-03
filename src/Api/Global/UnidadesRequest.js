import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTIENE TODA LA INFORMACION DE LOS PRODUCTOS
export const getUnidades = async () => {
    const respuesta = PrivateInterceptor('generales/unidades', 'GET')
    return respuesta
};