import React, { Fragment, useState, useEffect, useRef } from "react";

import instancias from "../../../../Api/backend";

import { useFormik } from 'formik';

import { decodeToken } from "react-jwt";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { toastShow } from '../../../../services/ToastService';

import { Dialog } from 'primereact/dialog';
import { validarRespuesta } from '../../../../services/crypto';

import { getMenuNuevo } from "../../../../Api/Menu/MenuRequest";

import {postAccesos} from "../../../../Api/IT/Accesos/AccesosRequest";


const ModalAccesos = ({ toast, datos, icono, nombre,className, getListadoAccesos }) => {

    // console.log(datos)

    const [accesosDialog, setAccesosDialog] = useState(false);
    const [formData, setFormData] = useState({});
    const [datosIniciales, setDatosIniciales] = useState(false)

    const [menus, setMenus] = useState([])

    const getListadoMenu = async () => {
        const tempo = await getMenuNuevo()
        setMenus(tempo)
    }

    const activoWeb = [
        {
            Id: true,
            Estado: "Activo"
        },
        {
            Id: false,
            Estado: "Inactivo"
        },

    ]

    const openNew = () => {
        setAccesosDialog(true)
        getListadoMenu()
    }

    const hideDialog = () => {
        setAccesosDialog(false)
    }

    const agregarAcceso = async (data) =>{
        // console.log(data)

        const resultado = await postAccesos(data)
        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Informacion ingresada Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            getListadoAccesos()
            // subTipos()
            // getTipoCuentas()
            return true;
        }else{
            toastShow(toast, 'error', 'Error', 'Error al editar la informacion');
            return true;
        }

        // console.log(data)
    }

    const inicioValores = {
        IdAcceso: -199,
        Acceso: "",
        ActivoWeb: 1,
        IdMenu: 0,
        Menu: '',
        IdMenuMenu: 0,
        Icon: '',
        URL: ''
    }

    const formik = useFormik({
        initialValues: typeof datos === 'object' ? datos: inicioValores ,
        validate: (data) => {
            let errors = {};

            if (!data.Acceso) {
                errors.Acceso = 'Se requiere el nombre del acceso.';
            }
            if (!data.IdMenu) {
                errors.IdMenu = 'Se requiere el nombre del acceso.';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarAcceso(data)

        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };



    return (
        <Fragment>
            <Button label={nombre} icon={icono} className={className} onClick={openNew} />
            {/* <Toast position="bottom-right" ref={toast}></Toast> */}
            <Dialog visible={accesosDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '25vw' }}
                onHide={hideDialog} header={<h2>Acceso</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" style={{ marginTop: 26 }} >
                                <span className="p-float-label">
                                    <InputText id="Acceso" name="Acceso" value={formik.values.Acceso} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Acceso') })} autoComplete="off" />
                                    <label htmlFor="Acceso" className={classNames({ 'p-error': isFormFieldValid('Acceso') })}>Nombre del Acceso</label>
                                </span>
                                {getFormErrorMessage('Acceso')}
                            </div>
                            <div className="field col-6 me-2" >
                                <label htmlFor="dropdown">Menu</label>
                                <Dropdown id="IdMenu" name="IdMenu" value={formik.values.IdMenu} onChange={formik.handleChange} options={menus} optionLabel="Menu"
                                    optionValue="IdMenu" />
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <label htmlFor="dropdown">Activo Web</label>
                                <Dropdown id="ActivoWeb" name="ActivoWeb" value={formik.values.ActivoWeb} onChange={formik.handleChange} options={activoWeb} optionLabel="Estado"
                                    optionValue="Id" />
                            </div>
                        </div>

                        <div className="p-dialog-footer">
                            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                            <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" />
                        </div>
                    </form>


                </div>

            </Dialog>

        </Fragment>
    )
}

export default ModalAccesos
