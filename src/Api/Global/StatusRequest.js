import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTIENE TODA LA INFORMACION DE LOS PRODUCTOS
export const getEstadosPurchase = async () => {
    const respuesta = PrivateInterceptor('status/Purchase', 'GET')
    return respuesta
};

// OBTENER TODOS LOS ESTADOS Security
export const getEstadosSecurity = async () => {
    const respuesta = PrivateInterceptor('status/Security', 'GET')
    return respuesta
}
// OBTENER TODOS LOS ESTADOS Security
export const getEstadosSalidaTelaCruda = async () => {
    const respuesta = PrivateInterceptor('status/SalidaTelaCruda', 'GET')
    return respuesta
}