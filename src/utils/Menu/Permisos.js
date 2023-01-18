// TODO MOVE TO API
import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";


// ACCESO DEL USUARIO CON PERMISO 4 DE COSTOS 
export const permisosByUsuario = async(Usuario) => {
    const result = await PrivateInterceptor('Accesos/PermisosCostos', 'POST',{
        Usuario : Usuario
    });
    return (result[0]?.acceso === 1 ? true : false);
    
}


// ACCESO DEL USUARIO CON PERMISO 5 DE LOS BOTONES
export const permisosByUsuarioBotones = async(Usuario) => {
    const result = await PrivateInterceptor('Accesos/PermisosBotones', 'POST',{
        Usuario : Usuario
    });
    return (result[0]?.acceso === 1 ? true : false);
    
}

// OBTENER LOS PERMISOS DE UN USUARIO
export const getPermisos = async(idUser) => {
    const respuesta = await PrivateInterceptor(`permisos/getPermisos/${idUser}`, 'GET')
    return respuesta;
}

// CAMBIAR LOS PERMISOS DE UN USUARIO
export const changePermisos = async(Permisos) => {
    const respuesta = await PrivateInterceptor(`permisos/cambiarPermisos`, 'PUT', Permisos)
    return respuesta;
}