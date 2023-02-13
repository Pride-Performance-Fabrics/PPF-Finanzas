import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

//**************  OBTENER LAS CLASES DE FINANZAS **************/
export const getClasses = async () => {
    const result = await PrivateInterceptor(`finanzas/classes`, 'GET');
    return result;

}