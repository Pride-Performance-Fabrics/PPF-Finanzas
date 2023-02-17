import React, { useState, Fragment, useEffect, useRef } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";

import { useFormik } from 'formik';

import { Toast } from 'primereact/toast';

const ModalNotificacion = () => {

    const [displayModal, setDisplayModal] = useState(false);

    const toast = useRef(null);
    const [formData, setFormData] = useState({});
    const [datos, setDatos] = useState({})

    return (
        <div>
            <Dialog header={<h2>Actividad</h2>} visible={displayModal} style={{ width: '50vw' }} onHide={hideDialog}>
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
                        <div className="field col-6 me-2" >
                            <label htmlFor="dropdown">Tipo Clase</label>
                            <Dropdown id="IdClase" name="IdClase" value={formik.values.IdClase} onChange={formik.handleChange} options={clases} optionLabel="Clase"
                                optionValue="IdClase"
                            />
                        </div>
                        <div style={{ width: "100%" }}  >
                            {/* <span className="p-float-label"> */}
                            <label htmlFor="Decripcion" className={classNames({ 'p-error': isFormFieldValid('Decripcion') })}>Decripcion</label>
                            <InputText id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} autoFocus
                                className={classNames({ 'p-invalid': isFormFieldValid('Description') })} autoComplete="off" />
                            {/* </span> */}
                            {getFormErrorMessage('Description')}
                        </div>
                    </div>

                    <div className="p-dialog-footer">
                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                        <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" />
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default ModalNotificacion
