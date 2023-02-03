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
import { postSubTypes, putSubTypes} from "../../../../../Api/Finanzas/SubTypesRequest";
import { getTypes, getSubTypes } from "../../../../../Api/Finanzas/TypesRequest";

const ModalEditarSubTipos = ({datos, subTipos }) => {

    console.log(datos )

    const [subTipoDialog, setSubTipoDialog] = useState(false);
    const toast = useRef();
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
        console.log(tempo)
       
    }

    const agregarSubTipo = async(data) =>{
        // console.log(data)

        
        // data.IdType = formik.values.Type
        // data.IdType = typeof formik.values.IdType === 'object' ? formik.values.IdType.IdType : formik.values.IdType
        // data.Type = formik.values.Type === datos.Type ? formik.values.Type : formik.values.IdType
        // data.IdType = typeof formik.values.IdType === 'object' ? formik.values.IdType.IdType : formik.values.IdTypeType
        data.IdType = formik.values.IdType
        const idType = types.filter(e => data.IdType === e.Id)
        data.IdTy = formik.values.IdType
        data.IdTypeType = idType[0].IdType
        data.Type = idType[0].Type
        // const Ty = types.filter(e => formik.values.IdType === e.IdType);
        // // console.log(Ty)
        // data.Type = Ty[0].Type
        // data.Type = Ty
        
        


        console.log(data)

        const resultado = await putSubTypes(data)

        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Cuenta Editada Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            // console.log(resultado)
            subTipos()
            // getTipoCuentas()
            return true;
        }else{
            toastShow(toast, 'error', 'Error', 'Error al editar la cuenta');
            return true;
        }

        // console.log(resultado)
    }


    const formik = useFormik({
        initialValues: datos,
        validate: (data) => {
            let errors = {};
            if (!data.IdSubType) {
                errors.IdSubType = 'Se requiere el numero del tipo de cuenta.';
            }
            else if (!/^[0-9]{2,10}$/i.test(data.IdSubType)) {
                errors.IdSubType = 'El numero de cuenta no debe contener letras';
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
           <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-button-text" aria-label="User"
                tooltip="Editar" tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }} onClick={openNew} />
            <Toast position="bottom-right" ref={toast}></Toast>
            <Dialog visible={subTipoDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '25vw' }}
                onHide={hideDialog} header={<h2>Sub Tipo</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>
                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                        {/* <div className="field col-6 me-2"  >
                                <span className="p-float-label">
                                    <InputText id="Id" name="Id" value={formik.values.Id} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Id') })} autoComplete="off" />
                                    <label htmlFor="Id" className={classNames({ 'p-error': isFormFieldValid('Id') })}>Numero de Cuenta</label>
                                </span>
                                {getFormErrorMessage('Id')}
                            </div> */}
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
                                    <Dropdown id="IdType" name="IdType" value={formik.values.IdType} onChange={formik.handleChange} options={types} optionValue ="Id" 
                                     optionLabel="Type" 
                                    // placeholder={formik.values.Type}
                                    />
                            </div>
                            <div className="field col-6 me-2"  >
                                    <label htmlFor="Decripcion" className={classNames({ 'p-error': isFormFieldValid('Decripcion') })}>Descripcion</label>
                                    <InputTextarea id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Description') })} autoComplete="off" cols={9} rows ={6} />
    
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

export default ModalEditarSubTipos;