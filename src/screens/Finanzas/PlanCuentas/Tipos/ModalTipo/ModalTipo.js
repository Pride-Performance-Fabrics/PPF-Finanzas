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
import { getTypes, postTypes } from "../../../../../Api/Finanzas/TypesRequest";
import TiposScreen from "../TiposScreen";


const ModalTipo = ({datos, tipos}) => {


    const [subTipoDialog, setSubTipoDialog] = useState(false);
    const toast = useRef(null);
    const [formData, setFormData] = useState({});


    const [types, setTypes] = useState([]);
    const [valueType, setValueType] = useState({});

    const openNew = () => {
        setSubTipoDialog(true)
        getListadoDropdown()
    }

    const hideDialog = () => {
        setSubTipoDialog(false)
    }


    const getListadoDropdown = async () => {
        const tempo = await getTypes();
        setTypes(tempo)
        // console.log(tempo)

    }

    const getTipoCuentas = async() =>{
        const result = await getTypes();
        // console.log(result)
    }

    const agregarTipo = async(data) =>{
        console.log(data)

        const resultado = await postTypes(data)

        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Cuenta Creada Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            // console.log(resultado)
            tipos()
            return true;
        }else{
            toastShow(toast, 'error', 'Error', 'Error al crear la cuenta');
            return true;
        }

        console.log(resultado)
    }

    const formik = useFormik({
        initialValues: {
            Id: -1998,
            IdType: 0,
            Type: '',
            Description: ''
        },
        validate: (data) => {
            let errors = {};
            if(!data.IdType){
                errors.IdType = 'Se requiere el numero de la cuenta'
            }
            else if (!/^[0-9]{1,10}$/i.test(data.IdType)) {
                errors.IdType = 'El numero de cuenta no debe contener letras';
            }
            if (!data.Type) {
                errors.Type = 'Se requiere el nombre del tipo de cuenta.';
            }
            if (!data.Description) {
                errors.Description = 'Se requiere una descripcion';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarTipo(data);

        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };

    // useEffect(() => {
    //     getListadoDropdown()
    // }, [])

    return (
        <Fragment>
            <Button label="Nuevo" icon="pi pi-plus" className="p-button-Primary mr-2" onClick={openNew} />
            <Toast position="bottom-right" ref={toast}></Toast>
            <Dialog visible={subTipoDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '25vw' }}
                onHide={hideDialog} header={<h2>Tipo Cuenta</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <InputText id="IdType" name="IdType" value={formik.values.IdType} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('IdType') })} autoComplete="off" />
                                    <label htmlFor="IdType" className={classNames({ 'p-error': isFormFieldValid('IdType') })}>Numero de Cuenta</label>
                                </span>
                                {getFormErrorMessage('IdType')}
                            </div>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <InputText id="Type" name="Type" value={formik.values.Type} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Type') })} autoComplete="off" />
                                    <label htmlFor="Type" className={classNames({ 'p-error': isFormFieldValid('Type') })}>Nombre Cuenta</label>
                                </span>
                                {getFormErrorMessage('Type')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div style={{width: "100%"}}  >
                                {/* <span className="p-float-label"> */}
                                <label htmlFor="Decripcion" className={classNames({ 'p-error': isFormFieldValid('Decripcion') })}>Decripcion</label>
                                    <InputText id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Description') })} autoComplete="off"  />
                                {/* </span> */}
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

export default ModalTipo;