// TODO MOVE TO API
import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// OBTENER MENU
export const getMenu = async (rolUser, idUser) => {
    const result = await PrivateInterceptor(`menu/${rolUser}/${idUser}`, 'GET');
    return result;

}

// OBTENER MENU NUEVO
export const getMenuNuevo = async () => {
    const result = await PrivateInterceptor(`menu`, 'GET');
    return result;
}

export const postMenu = async (body) => {
    console.log(body)
    const result = await PrivateInterceptor(`menu/IUMenu`, 'POST', body);
    return result;
}

