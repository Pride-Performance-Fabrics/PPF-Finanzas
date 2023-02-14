import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

//***************************** OBTIENE LOS EVENTOS  ***********************************//
export const getScheduler = async () => {
    const result = await PrivateInterceptor(`schedulerCalendar`, 'GET');
    return result;
}


//***************************** INSERTA NUEVO EVENTOS  ***********************************//
export const insertScheduler = async(data) => {
    const respuesta = await PrivateInterceptor(`schedulerCalendar`, 'POST', data)
    return respuesta;
 }
 
//***************************** ACTUALIZA LOS EVENTOS  ***********************************//
export const updateScheduler = async(data) => {
    const respuesta = await PrivateInterceptor(`schedulerCalendar`, 'PUT', data)
    return respuesta;
 }
 
//***************************** ELIMINA UN EVENTOS  ***********************************//
 export const deleteScheduler = async(id) => {
    const respuesta = await PrivateInterceptor(`schedulerCalendar/${id}`, 'DELETE')
    return respuesta;
 }

 //***************************** ELIMINA UN EVENTOS  ***********************************//
 export const updateEstadoScheduler = async(id) => {
    const respuesta = await PrivateInterceptor(`schedulerCalendar/${id}`, 'DELETE')
    return respuesta;
 }
 