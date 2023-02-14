import React, { Fragment, useState, useEffect, useRef } from "react";

import instancias from "../../../../../Api/backend";

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
import { toastShow } from '../../../../../services/ToastService';

import { Dialog } from 'primereact/dialog';
import { validarRespuesta } from '../../../../../services/crypto';

import { getTypes } from "../../../../../Api/Finanzas/TypesRequest";

import { postCategorias } from "../../../../../Api/Finanzas/CategoriasRequest"


const ModalCategoria = ({ toast, datos, icono, nombre, className, categorias }) => {

    console.log(datos)

    const [accesosDialog, setAccesosDialog] = useState(false);
    const [formData, setFormData] = useState({});
    const [datosIniciales, setDatosIniciales] = useState(false)

    const [types, setTypes] = useState([])

    const getListadoTypes = async () => {
        const tempo = await getTypes()
        setTypes(tempo)
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
        getListadoTypes()
    }

    const hideDialog = () => {
        setAccesosDialog(false)
    }

    const agregarCategoria = async (data) => {
        console.log(data)

        const resultado = await postCategorias(data)
        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Informacion ingresada Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            categorias()
            // subTipos()
            // getTipoCuentas()
            return true;
        } else {
            toastShow(toast, 'error', 'Error', 'Error al editar la informacion');
            return true;
        }

        // console.log(data)
    }

    const inicioValores = {
        IdCategoria: -199,
        CodigoCategoria: 0,
        Categoria: "",
        Description: "",
        IdType: 0,
        Type: ''

    }

    const formik = useFormik({
        initialValues: typeof datos === 'object' ? datos : inicioValores,
        validate: (data) => {
            let errors = {};
            if (!data.CodigoCategoria) {
                errors.CodigoCategoria = 'Se requiere el numero de cuenta.';
            }
            else if (!/^[0-9]{1}$/i.test(data.CodigoCategoria)) {
                errors.CodigoCategoria = 'El numero de cuenta no debe contener letras, ni mas de un digitos';
            }

            if (!data.Categoria) {
                errors.Categoria = 'Se requiere el nombre de la categoria.';
            }
            if (!data.IdType) {
                errors.IdType = 'Se requiere el nombre del tipo.';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarCategoria(data)

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
                onHide={hideDialog} header={<h2>Categoria</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>

                            <div className="field col-6 me-2" style={{ marginTop: 26 }} >
                                <span className="p-float-label">
                                    <InputText id="CodigoCategoria" name="CodigoCategoria" value={formik.values.CodigoCategoria} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('CodigoCategoria') })} autoComplete="off" />
                                    <label htmlFor="CodigoCategoria" className={classNames({ 'p-error': isFormFieldValid('CodigoCategoria') })}>Nombre CodigoCategoria</label>
                                </span>
                                {getFormErrorMessage('CodigoCategoria')}
                            </div>
                            <div className="field col-6 me-2" style={{ marginTop: 26 }} >
                                <span className="p-float-label">
                                    <InputText id="Categoria" name="Categoria" value={formik.values.Categoria} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Categoria') })} autoComplete="off" />
                                    <label htmlFor="Categoria" className={classNames({ 'p-error': isFormFieldValid('Categoria') })}>Nombre Categoria</label>
                                </span>
                                {getFormErrorMessage('Categoria')}
                            </div>

                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" style={{ marginTop: -15 }} >

                                <label htmlFor="dropdown" className="p-float-label">Tipo Cuenta</label>
                                <Dropdown id="IdType" name="IdType" value={formik.values.IdType} onChange={formik.handleChange} options={types} optionLabel="Type"
                                    optionValue="IdType" />
                            </div>
                            <div className="field col-6 me-2" style={{ marginTop: 10 }}  >
                                <span className="p-float-label">
                                    <InputText id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Description') })} autoComplete="off" />
                                    <label htmlFor="Description" className={classNames({ 'p-error': isFormFieldValid('Description') })}>Descripcion</label>
                                </span>
                                {getFormErrorMessage('Description')}
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

export default ModalCategoria
