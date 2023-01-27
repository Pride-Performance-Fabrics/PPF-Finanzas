import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTENER la vista de la cuentas existentes
export const getCuentas = async () => {
    const result = await PrivateInterceptor(`finanzas/planCuentas`, 'GET');
    return result;

}

export const getCuentasExistentes = async () => {
    const result = await PrivateInterceptor(`finanzas/planCuentas/accounts`, 'GET');
    return result;

}



