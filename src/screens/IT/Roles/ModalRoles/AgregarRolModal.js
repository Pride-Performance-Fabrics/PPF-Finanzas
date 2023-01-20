import React, { useState, useRef, Fragment } from 'react';

import instancias from "../../../../Api/backend";

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { toastShow } from '../../../../services/ToastService'
import { Dialog } from 'primereact/dialog';
import { validarRespuesta } from '../../../../services/crypto';



export const AgregarRolModal = () => {
    const toast = useRef(null);
    const [formData, setFormData] = useState({});
    const [rolDialog, setRolDialog] = useState(false);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Rol Creado Existosamente', detail: 'Se creo un nuevo rol', life: 3000 });
    }

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se han ingresado los campos correctamente', life: 3000 });
    }


    const agregarRol = async () => {
        // TODO PETICION -> FUNCION
        const promesa = await fetch(`${instancias.API_URL}/roles/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('ppfToken')
            },
            body: JSON.stringify({
                Rol: formik.values.Rol,
                Description: formik.values.Description
            })
        })
        await promesa.json()
            .then(function (res) {
                validarRespuesta(res);
                if (res.rowsAffected) {
                    showError()
                    return true;
                   
                } else {
                    showSuccess()
                    setFormData({})
                    formik.resetForm(formData)
                    hideDialog()
                    return true;
                }
            })
            .catch((error) => {
                console.error(error)
                return false;
            })
    }
    const openNew = () => {
        setRolDialog(true);
    }

    const hideDialog = () => {
        setRolDialog(false);
    }

    const formik = useFormik({
        initialValues: {
            Rol: '',
            Description: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.Rol) {
                errors.Rol = 'El rol es requerido.';
            }

            return errors;
        },
        onSubmit: async (data) => {

            if (isFormFieldValid) {
                setFormData(data);
                await agregarRol();
            } else {
            }
        }
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <Fragment>
            <Button label="Agregar Nuevo Rol" icon="pi pi-plus" className="p-button-Primary mr-2" onClick={openNew} />
            <Toast position="bottom-right" ref={toast}></Toast>
            <Dialog visible={rolDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }} onHide={hideDialog}>
                <div style={{ width: '100%', margin: 'auto' }}>
                    <h2>Nuevo Rol</h2>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field" style={{ marginTop: 30 }}>
                            <span className="p-float-label">
                                <InputText id="Rol" name="Rol" value={formik.values.Rol} onChange={formik.handleChange} 
                                    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('Rol') })} />
                                <label htmlFor="Rol" className={classNames({ 'p-error': isFormFieldValid('Rol') })}>Rol</label>
                            </span>
                            {getFormErrorMessage('Rol')}
                        </div>
                        <div className="field" style={{ marginTop: 30 }}>
                            <span className="p-float-label">
                                <InputText id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} 
                                    className={classNames({ 'p-invalid': isFormFieldValid('Description') })} />
                                <label htmlFor="Description" className={classNames({ 'p-error': isFormFieldValid('Descripcion') })}>Description</label>
                            </span>
                            {getFormErrorMessage('Description')}
                        </div>
                        
                        <div className="p-dialog-footer">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                            <Button type='submit' label="Save" icon="pi pi-check" className="p-button-text" />
                        </div>
                    </form>
                </div>
            </Dialog>
        </Fragment>
    );

}

export default AgregarRolModal;