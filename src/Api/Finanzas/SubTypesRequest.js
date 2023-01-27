import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTENER MENU
export const getSubTypes = async () => {
    const result = await PrivateInterceptor(`finanzas/subTypes`, 'GET');
    return result;

}
