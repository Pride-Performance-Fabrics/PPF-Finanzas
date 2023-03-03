import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTIENE TODA LA INFORMACION DE LOS PRODUCTOS
export const getTiposPagosClientes= async () => {
    const respuesta = PrivateInterceptor('generales/tipoPagos', 'GET')
    return respuesta
};