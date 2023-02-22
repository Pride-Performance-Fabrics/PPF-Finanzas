import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

//***************************** OBTIENE LOS EVENTOS  ***********************************//
export const getScheduler = async () => {
    const result = await PrivateInterceptor(`schedulerCalendar`, 'GET');
    return result;
}


//***************************** INSERTA NUEVO EVENTOS  ***********************************//
export const insertScheduler = async(data) => {
   console.log(data)
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
   console.log(id)
    const respuesta = await PrivateInterceptor(`schedulerCalendar/cancelarActividad/${id}`, 'PUT')
    return respuesta;
 }

 export const getNotificaciones = async() => {
   const respuesta = await PrivateInterceptor(`schedulerCalendar/notificaciones`, 'GET')
   return respuesta;
 }

 export const putEstadoActividad = async(data) => {
   console.log(data)
   const respuesta = await PrivateInterceptor(`schedulerCalendar/cambiarEstado`, 'PUT', data)
   return respuesta;
 }

 export const getActividad = async(id) => {
   console.log(id)
   const respuesta = await PrivateInterceptor(`schedulerCalendar/obtenerActividad/${id}`, 'GET')
   return respuesta;
 }


 export const getCantidadActividades = async() => {

  const respuesta = await PrivateInterceptor(`schedulerCalendar/cantidadActividades`, 'GET')
  return respuesta;
}

export const getTodasActividades = async() =>{
  const respuesta = await PrivateInterceptor(`schedulerCalendar/allActivities`, 'GET')
  return respuesta;
}



 