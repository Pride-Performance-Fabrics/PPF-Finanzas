import React, { useState, Fragment, useEffect } from "react";
import TodoList from "../TodoList/TodoList";
import { TabView, TabPanel } from 'primereact/tabview';
import Extensiones from "../Tools/Extensiones";
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import SchedulerHomeScreen from "./SchedulerHomeScreen";
import Card from "../../components/Card/Card";
import CardNotificaciones from "../../components/Card/CardNotifcaciones";

import { getNotificaciones } from "../../Api/Sheduler/ShedulerRequest";

import { getDateTimeSQL, setDateTimeSQL, getLocalDateTimeString } from "../../services/FechasService";

import { decodeToken } from "react-jwt";

import { getAccesosUsuario } from "../../Api/IT/Accesos/AccesosRequest";

import CardNotificacionesComponent from "../../components/CardNotificaciones/CardNotificacionesComponent";


const HomeScreen = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [notificaciones, setNotificaiones] = useState([]);
    const [accesos, setAccesos] = useState([]);
    const [habilitar, setHabilitar] = useState(true);
    const [displayModal, setDisplayModal] = useState(false);

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
        console.log(respuesta)
        notificacion(respuesta)
    }


    const notificacion = (data) => {
        console.log(data)
        data.map((item) => {
            return (
                <span>{item.title}</span>
            )
        })
    }




    useEffect(() => {
        window.document.title = 'PPF • Home';
        getAccesosByUsuario()
        ObtenerNotificaciones()
    }, [])
    return (
        <Fragment>
            <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/imagenes/PPFHome1.png'})`, 
            bottom: 0, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hiddden', overflowY:"auto"}}
                className="contenedor-imagen animate__animated animate__fadeIn animate__faster ">
                <div class="left" style={{ width: "80%", display: "flex" }}>

                </div>
                <div style={{ minWidth: "20%", display: "flex-column", marginRight: 20 }} className="contenidoCard"
                    hidden={habilitar} >
                        <CardNotificacionesComponent/>
                </div>


            </div>
        </Fragment>

    )
}

export default HomeScreen;