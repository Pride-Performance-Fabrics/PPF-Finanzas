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
import { postSubTypes} from "../../../../../Api/Finanzas/SubTypesRequest";
import { getTypes } from "../../../../../Api/Finanzas/TypesRequest";

const ModalSubTipos = ({ subTipos}) => {

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
        // console.log("types ",tempo)
       
    }

    const agregarSubTipo = async(data) =>{
        // console.log(data)
        let numeroIdSubtype = (data.IdSubType.toString()).length
        console.log(numeroIdSubtype)
        if(numeroIdSubtype < 3){
            console.log(data.IdSubType.toString()+"00")
        }
        data.IdType = typeof formik.values.IdType === 'object' ? formik.values.IdType.IdType : formik.values.IdType
        // console.log(data)

        const resultado = await postSubTypes(data)

        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Cuenta Creada Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            // console.log(resultado)
            subTipos()
            return true;
        }else{
            toastShow(toast, 'error', 'Error', 'Error al crear la cuenta');
            return true;
        }

        // console.log(resultado)
    }


    const formik = useFormik({
        initialValues: {
            Id: 0,
            IdSubType: 0,
            SubType: '',
            Description: '',
            IdType: 0,

        },
        validate: (data) => {
            let errors = {};
            if (!data.IdSubType) {
                errors.IdSubType = 'Se requiere el numero del tipo de cuenta.';
            }
            else if (!/^[0-9]{1,5}$/i.test(data.IdSubType)) {
                errors.IdSubType = 'El numero de cuenta no debe contener letras, ni mas de 5 digitos';
            }
            if (!data.SubType) {
                errors.SubType = 'Se requiere el nombre del tipo de cuenta.';
            }
            if (!data.IdType) {
                errors.IdType = 'Se requiere el tipo de cuenta al que pertenece.';
            }
            if (!data.Description) {
                errors.Description = 'Se requiere una descripcion';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarSubTipo(data)

        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };

    // useEffect(() => {
    //     getListadoDropdown()
    // },[])

    return (
        <Fragment>
            <Button label="Nuevo" icon="pi pi-plus" className="p-button-Primary mr-2" onClick={openNew} />
            <Toast position="bottom-right" ref={toast}></Toast>
            <Dialog visible={subTipoDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '25vw' }}
                onHide={hideDialog} header={<h2>Sub Tipo</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <InputText id="IdSubType" name="IdSubType" value={formik.values.IdSubType} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('IdSubType') })} autoComplete="off" />
                                    <label htmlFor="IdSubType" className={classNames({ 'p-error': isFormFieldValid('IdSubType') })}>Numero de Cuenta</label>
                                </span>
                                {getFormErrorMessage('IdSubType')}
                            </div>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <InputText id="SubType" name="SubType" value={formik.values.SubType} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('SubType') })} autoComplete="off" />
                                    <label htmlFor="SubType" className={classNames({ 'p-error': isFormFieldValid('SubType') })}>Nombre Cuenta</label>
                                </span>
                                {getFormErrorMessage('SubType')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                    <label htmlFor="dropdown">Tipo detalle</label>
                                    <Dropdown id="IdType" name="IdType" value={formik.values.IdType} onChange={formik.handleChange} options={types} optionLabel="Type" 
                                    optionValue="Id"
                                    />
                            </div>
                            <div className="field col-6 me-2"  >
                                    <label htmlFor="Decripcion" className={classNames({ 'p-error': isFormFieldValid('Decripcion') })}>Descripcion</label>
                                    <InputText id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Description') })} autoComplete="off"  />
    
                                {getFormErrorMessage('Description')}
                            </div>
                        </div>

                        <div className="p-dialog-footer">
                            <Button label="Cancelar"  type="button" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                            <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" />
                        </div>
                    </form>


                </div>

            </Dialog>

        </Fragment>
    )


}

export default ModalSubTipos;