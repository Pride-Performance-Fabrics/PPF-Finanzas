import instancias from "../Api/backend";
import { validarRespuesta } from '../services/crypto';



export const PrivateInterceptorIPS = async(URL, method, body = undefined) => {
    let respuesta = null;
    const promesa = await fetch(`${instancias.API_URL_IPS}/${URL}?${Date.now()}`, { 
        method: method,
        headers: {
            "Content-Type": "application/json",
            'x-access-token': localStorage.getItem('ppfToken')
        },
        body: JSON.stringify(body)
    })

    await promesa.json()
        .then(function (res) {
            // console.log({res});
            // alert('stop')
            if(!res.data.valid){
                validarRespuesta(res);
            }
            respuesta =  res?.data;
        })
        .catch((error) => {
            respuesta =  {error: error};
            console.error(respuesta);
        })
        return respuesta;
}