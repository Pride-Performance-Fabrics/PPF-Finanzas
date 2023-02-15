import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTIENE TODA LA INFORMACION DE LOS PRODUCTOS
export const getPrioridades = async () => {
    const respuesta = PrivateInterceptor('prioridad', 'GET')
    return respuesta
};