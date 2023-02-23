import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

/// Envia una nueva notificacion
export const setNotificacionesWeb = async (data) => {
    console.log(data)
    const respuesta = PrivateInterceptor('notificaciones', 'POST', data)
    return respuesta
};