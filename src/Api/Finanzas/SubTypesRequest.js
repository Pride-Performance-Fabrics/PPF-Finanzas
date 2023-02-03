import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

//**************  OBTENER LOS SUBTYPES DE LAS CUENTAS **************/

export const getSubTypes = async () => {
    const result = await PrivateInterceptor(`finanzas/subTypes`, 'GET');
    return result;

}


//**************  OBTIENE LA ULTIMA CUENTA CON EL SUBTYPE INDICADO **************/

export const getCuentaSubType = async (Id, IdSubType) => {
    // console.log(Id, IdSubType)
    const result = await PrivateInterceptor(`finanzas/subTypes/ultimaCuenta/${Id}/${IdSubType}`, 'GET');
    return result;

}

export const getVistaSubType = async () => {
    const result = await PrivateInterceptor(`finanzas/subTypes/tipos`, 'GET');
    return result;

}


export const postSubTypes = async (data) => {
    // console.log(data)
    const result = await PrivateInterceptor(`finanzas/subTypes`, 'POST', data);
    return result;
}


export const putSubTypes = async (data) => {
    // console.log(data)
    const result = await PrivateInterceptor(`finanzas/subTypes`, 'PUT', data);
    return result;
}