// TODO MOVER A API
import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

// AGREGA UNA NUEVA TAREA A LA LISTA

export const guardarTask = async(Task) =>{
    const result = await PrivateInterceptor('ToDo/', 'POST', Task);
    return result;
}

// OBTIENE LAS TAREAS
export const getTodoList = async({IdRol, idUser}) =>{
    const result = await PrivateInterceptor(`ToDo/get/${idUser}/${IdRol}`, 'GET');
    return result;
}

// OBTIENE LAS TAREAS POR ROL
export const getTodoListByRol = async(IdRol, body) =>{
    const result = await PrivateInterceptor(`ToDo/rol/${IdRol}`, 'POST', body);
    return result;
}

// BORRAR TAREA
export const deleteTask = async(IdToDo) => {
    const result = await PrivateInterceptor(`ToDo/remove/${IdToDo}`, 'GET');
    return result;
}
// BORRAR TAREA
export const arreglo = async() => {
    const result = await PrivateInterceptor(`ToDo/arreglo`, 'GET');
    return result;
}