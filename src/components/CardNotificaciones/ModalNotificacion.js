import React, { useState, Fragment, useEffect, useRef } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";

import { useFormik } from 'formik';

import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import { getEstadosActividad, getActividad } from "../../Api/Global/StatusRequest";
import { putEstadoActividad } from "../../Api/Sheduler/ShedulerRequest";
import { Label } from "@mui/icons-material";

import { getDateTimeSQL, setDateTimeSQL, getLocalDateTimeString } from "../../services/FechasService";

const ModalNotificacion = ({ displayModal, onHideDialog, datos, setDatos }) => {
    console.log(datos)

    const toast = useRef(null);
    const [formData, setFormData] = useState({});
    const [estados, setEstados] = useState([]);
    // const[hideModal, setHideModal] = useState(displayModal)





    const obtenerListados = async () => {
        const result = await getEstadosActividad()
        setEstados(result)
        getPrioridadesTag(datos)

    }


    useEffect(() => {
        console.log(displayModal);
    }, [displayModal])

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

    const onChangeEstado = async (e, IdStatus) => {
        console.log(IdStatus)
        let data = {
            IdCalendar: datos.IdCalendar,
            Status: IdStatus
        }
        const respuesta = await putEstadoActividad(data)
        console.log(respuesta)
        setDatos(respuesta[0])
        // const result = await getActividad(datos.Id)

    }

    const getPrioridadesTag = (datos) => {
        console.log(datos)
        switch (datos.IdPriority) {
            case 1:
                return <Tag style={{ width: 70 }} severity="success" value={datos.Priority} />
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
    const headerDialog = (datos) => {
        return (
            <div className="columnasheader" >
                <div style={{ width:"110%"}}>

              <span style={{fontSize: "1rem", fontWeight:"bold"}} >{datos.title}</span><br />
                </div>
            
              <div style={{float: "right", marginRight:3}}>
                            {
                                getPrioridadesTag(datos)
                            }
                            
                        </div>
            </div>
        );
    }

    useEffect(() => {
        obtenerListados()
        
    }, [])


    return (
        <div>
            <Dialog header={headerDialog(datos)} visible={displayModal} style={{ width: '20vw' }} onHide={onHideDialog}>
                <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>

                    <div className="modal__input-contenedor" style={{ width: "100%" }}>{ }
                        <div className="field col-6 me-2" style={{ width: "78%", marginTop: -20 }}>
                            {/* <span style={{fontSize: "1rem", fontWeight:"bold"}}>{datos.title}</span><br /> */}
                            <label> Vencimiento: {getLocalDateTimeString(datos.endDate)}</label><br />
                            <label>Nota: {datos.notes}</label><br />
                        </div>
                        {/* <div className="field col-6 me-2" style={{ marginTop: -15, width: "10%" }} >
                            {
                                getPrioridadesTag(datos)
                            }
                            
                        </div><br/> */}
                    </div>
                    <div className="modal__input-contenedor" style={{ width: "100%" }}>
                    <label htmlFor="dropdown">Estado de la Actividad</label>
                    </div>
                    <div className="modal__input-contenedor" style={{ width: "100%" }}>

                        <div className="columnasCheck" >
                            {/* <label htmlFor="dropdown">Estado de la Actividad</label><br /> */}

                            {
                                estados.map((item) => {
                                    // console.log(estados.some((e) => e.IdStatus === datos.IdStatus),)
                                    return (
                                        <div >
                                            <Checkbox values={item.IdStatus} onChange={(e) => onChangeEstado(e.checked, item.IdStatus)} checked={estados.some((e) => datos.IdStatus === item.IdStatus)} />
                                            <label htmlFor={item.IdStatus}>{item.StatusName}</label>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>

                </form>
            </Dialog>
        </div>
    )
}

export default ModalNotificacion
