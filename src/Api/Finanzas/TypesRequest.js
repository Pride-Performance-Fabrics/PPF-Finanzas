import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTENER MENU
export const getTypes = async () => {
    const result = await PrivateInterceptor(`finanzas/Types`, 'GET');
    return result;

}

export const postTypes = async (data) => {
    console.log(data)
    const result = await PrivateInterceptor(`finanzas/Types`, 'POST', data);
    return result;
}

export const putTypes = async (data) => {
    console.log(data)
    const result = await PrivateInterceptor(`finanzas/Types`, 'PUT', data);
    return result;
}