import React, { useState, Fragment, useEffect, useRef} from "react";

import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import {Tag} from "primereact/tag";

import CardNotificaciones from "../Card/CardNotifcaciones";

import { getNotificaciones } from "../../Api/Sheduler/ShedulerRequest";

import { getDateTimeSQL, setDateTimeSQL, getLocalDateTimeString } from "../../services/FechasService";

import { decodeToken } from "react-jwt";

import { getAccesosUsuario } from "../../Api/IT/Accesos/AccesosRequest";

import { useFormik } from 'formik';

import { Toast } from 'primereact/toast';

import ModalNotificacion from "./ModalNotificacion";

const CardNotificacionesComponent = () => {

    const [notificaciones, setNotificaiones] = useState([]);
    const [accesos, setAccesos] = useState([]);
    const [habilitar, setHabilitar] = useState(true);
    const [displayModal, setDisplayModal] = useState(false);

    const toast = useRef(null);
    const [formData, setFormData] = useState({});
    const[datos, setDatos] =useState({})

    const getAccesosByUsuario = async () => {
        const userInformation = decodeToken(localStorage.getItem(`ppfToken`));
        let user = userInformation.idUser

        const result = await getAccesosUsuario(user)
        const ordenado = result.accesos.split(',').sort();
        setAccesos(ordenado)
        const accesoHabilitar = ordenado.some((item) => item === "4")
        setHabilitar(!accesoHabilitar)

    }


    const ObtenerNotificaciones = async () => {
        const respuesta = await getNotificaciones()

        setNotificaiones(respuesta)
        // console.log(respuesta)
        // notificacion(respuesta)
    }


    const open = (item) => {
        setDisplayModal(true)
        setDatos(item)
    }

    const onHideDialog = () =>{
        // console.log("cerrar")
        setDisplayModal(false)
        // console.log(setDisplayModal)
    }


    useEffect(() => {
        getAccesosByUsuario()
        ObtenerNotificaciones()
    }, [])

    useEffect(() => {
        ObtenerNotificaciones()
    },[displayModal])

    const getPrioridadesTag = (datos) => {
        // console.log(datos)
        switch (datos.IdPriority) {
            case 1:
                return <Tag style={{ width: 70, opacity:8 }} severity="success" value={datos.Priority} />
                break;
            case 2:
                return <Tag style={{ width: 70 }} severity="info" value={datos.Priority} />
                break;
            case 3:
                return <Tag style={{ width: 70 }} severity="warning" value={datos.Priority} />
                break;
            case 4:
                return <Tag style={{ width: 70 }} severity="danger" value={datos.Priority} />
                break;

            default:
                break;
        }
    }


    return (
        <div>
            <div style={{ minWidth: "20%", display: "flex-column", marginRight: 20 }} className="contenidoCard"
                hidden={habilitar} >
                {notificaciones.map((item) => {
                    let fecha = getLocalDateTimeString(item.endDate)
                    return (
                        <div onClick={() => open(item)}>
                            <CardNotificaciones 
                                key= {item.IdCalendar}
                                titulo={""}
                                className="cardNotificaciones"
                                contenido={
                                    <div className='pt-1' style={{ height: '8vh' }} >
                                        <div  style={{float: "right", marginRight:3}}>
                                         {getPrioridadesTag(item)}
                                        </div>
                                        <span>{item.title}</span><br />
                                        <span>Prioridad: {item.Priority}</span><br />
                                        <span>Vencimiento: {fecha}</span>
                                    </div>
                                }
                            />

                        </div>
                    )
                })}
                <ModalNotificacion displayModal={displayModal} onHideDialog = {onHideDialog} datos = {datos} setDatos = {setDatos}/>


            </div>

        </div>
    )
}

export default CardNotificacionesComponent
