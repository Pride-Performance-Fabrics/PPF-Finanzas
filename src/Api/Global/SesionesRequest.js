import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTIENE TODA LA INFORMACION DE LOS PRODUCTOS
export const putVencimientoToken = async (idUser) => {
    console.log("Entro aqui holis soy token por vencer")
    const respuesta = PrivateInterceptor(`sesiones/${idUser}`, 'PUT')
    return respuesta
};