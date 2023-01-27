import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTENER MENU
export const getCurrency = async () => {
    const result = await PrivateInterceptor(`finanzas/currency`, 'GET');
    return result;

}