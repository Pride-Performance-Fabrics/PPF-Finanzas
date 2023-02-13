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

import { getCategorias } from "../../../../../Api/Finanzas/CategoriasRequest";
import { postSubCategorias } from "../../../../../Api/Finanzas/SubCategoriasRequest"
import { AssistWalker } from "@mui/icons-material";

const ModalSubCategoria = ({ toast, datos, icono, nombre, className, subCategorias }) => {

    const [subDialog, setSubDialog] = useState(false);
    const [formData, setFormData] = useState({});
    const [datosIniciales, setDatosIniciales] = useState(false)

    const [categorias, setCategorias] = useState([])

    const getListadoCategorias = async () => {
        const result = await getCategorias()
        setCategorias(result)
    }

    const openNew = () => {
        setSubDialog(true)
        getListadoCategorias()
    }

    const hideDialog = () => {
        setSubDialog(false)
    }

    const agregarSubCategoria = async (data) => {
        console.log(data)

        const resultado = await postSubCategorias(data)
        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Informacion ingresada Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            subCategorias()
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
        IdSubCategoria: -199,
        CodigoSubCategoria: 0,
        SubCategoria: "",
        Description: "",
        IdCategoria: 0,
        Categoria: 0,

    }

    const formik = useFormik({
        initialValues: typeof datos === 'object' ? datos : inicioValores,
        validate: (data) => {
            let errors = {};
            if (!data.CodigoSubCategoria) {
                errors.CodigoSubCategoria = 'Se requiere el numero de la SubCategoria.';
            }
            else if (!/^[0-9]{1,5}$/i.test(data.CodigoSubCategoria)) {
                errors.CodigoSubCategoria = 'El numero de cuenta no debe contener letras, ni mas de 3 digitos';
            }
            if (!data.SubCategoria) {
                errors.SubCategoria = 'Se requiere el nombre de la sub categora.';
            }
            if (!data.IdCategoria) {
                errors.IdCategoria = 'Se requiere la categoria al que pertenece.';
            }
            if (!data.Description) {
                errors.Description = 'Se requiere una descripcion';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarSubCategoria(data)

        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };

    return (
        <Fragment>
             <Button label={nombre} icon={icono} className={className} onClick={openNew} />
           
            <Dialog visible={subDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '25vw' }}
                onHide={hideDialog} header={<h2>SubCategoria</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <InputText id="CodigoSubCategoria" name="CodigoSubCategoria" value={formik.values.CodigoSubCategoria} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('CodigoSubCategoria') })} autoComplete="off" />
                                    <label htmlFor="CodigoSubCategoria" className={classNames({ 'p-error': isFormFieldValid('CodigoSubCategoria') })}>Numero de Cuenta</label>
                                </span>
                                {getFormErrorMessage('CodigoSubCategoria')}
                            </div>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <InputText id="SubCategoria" name="SubCategoria" value={formik.values.SubCategoria} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('SubCategoria') })} autoComplete="off" />
                                    <label htmlFor="SubCategoria" className={classNames({ 'p-error': isFormFieldValid('SubCategoria') })}>Nombre Cuenta</label>
                                </span>
                                {getFormErrorMessage('SubCategoria')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <label htmlFor="dropdown">Categoria</label>
                                <Dropdown id="IdCategoria" name="IdCategoria" value={formik.values.IdCategoria} onChange={formik.handleChange} options={categorias} optionLabel="Categoria"
                                    optionValue="IdCategoria"
                                />
                            </div>
                            <div className="field col-6 me-2"  >
                                <label htmlFor="Decripcion" className={classNames({ 'p-error': isFormFieldValid('Decripcion') })}>Descripcion</label>
                                <InputText id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} autoFocus
                                    className={classNames({ 'p-invalid': isFormFieldValid('Description') })} autoComplete="off" />

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

export default ModalSubCategoria
