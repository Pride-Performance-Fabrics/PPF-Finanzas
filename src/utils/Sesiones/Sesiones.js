// TODO MOVER A API
import instancias from "../../Api/backend";

// ACTUALIZA EL TIEMPO DE VENCIMIENTO DEL TOKEN DEL USUARIO

export const VencimientoToken = async(idUser) =>{
// TODO PETICION -> FUNCION
    let respuesta = null;
    const promesa = await fetch(`${instancias.API_URL}/sesiones/${idUser}?${Date.now()}`, { 
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'x-access-token': localStorage.getItem('ppfToken')
        },
    })

    await promesa.json()
        .then(function (res) {
            respuesta =  res.data;
        })
        .catch((error) => {
            respuesta =  {error: error};
            console.error(respuesta);
        })
        return respuesta;
}