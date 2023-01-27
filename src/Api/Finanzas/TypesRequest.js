import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTENER MENU
export const getTypes = async () => {
    const result = await PrivateInterceptor(`finanzas/Types`, 'GET');
    return result;

}