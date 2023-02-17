import React, { useState, Fragment, useEffect, useRef} from "react";

import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";

import CardNotificaciones from "../Card/CardNotifcaciones";

import { getNotificaciones } from "../../Api/Sheduler/ShedulerRequest";

import { getDateTimeSQL, setDateTimeSQL, getLocalDateTimeString } from "../../services/FechasService";

import { decodeToken } from "react-jwt";

import { getAccesosUsuario } from "../../Api/IT/Accesos/AccesosRequest";

import { useFormik } from 'formik';

import { Toast } from 'primereact/toast';

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
        console.log(respuesta)
        // notificacion(respuesta)
    }


    const open = (item) => {
        setDisplayModal(true)
        console.log(item)
        setDatos(item)
    }

    const hideDialog = () => {
        setDisplayModal(false)
    }

    const formik = useFormik({
        initialValues: datos,
        validate: (data) => {
            let errors = {};
            if (!data.Type) {
                errors.SubType = 'Se requiere el nombre del tipo de cuenta.';
            }
            if (!data.Description) {
                errors.Description = 'Se requiere una descripcion';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            // await agregarTipo(data);

        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };



    useEffect(() => {
        getAccesosByUsuario()
        ObtenerNotificaciones()
    }, [])


    return (
        <div>
            <div style={{ minWidth: "20%", display: "flex-column", marginRight: 20 }} className="contenidoCard"
                hidden={habilitar} >
                {notificaciones.map((item) => {
                    let fecha = getLocalDateTimeString(item.endDate)
                    return (
                        <div onClick={() => open(item)}>
                            <CardNotificaciones
                                titulo={""}
                                className="cardNotificaciones"
                                contenido={
                                    <div className='pt-1' style={{ height: '10vh' }}>
                                        <span>{item.title}</span><br />
                                        <span>Prioridad: {item.Priority}</span><br />
                                        <span>Vencimiento: {fecha}</span>
                                    </div>
                                }
                            />

                        </div>
                    )
                })}


            </div>

        </div>
    )
}

export default CardNotificacionesComponent
