import React, { Fragment, useState, useEffect, useRef } from "react";


import { useFormik } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { toastShow } from '../../../services/ToastService';
import { Dialog } from 'primereact/dialog';
import {MultiSelect} from 'primereact/multiselect'

const ModalSchedulerHome = () => {

    const [SchedulerDialog, setSchedulerDialog] = useState(false);
    const [formData, setFormData] = useState({});

    const openNew = () => {
        setSchedulerDialog(true)
        // getListadoCategorias()
    }

    const hideDialog = () => {
        setSchedulerDialog(false);
    }

    const diasRecordatorios = [
        {
            id: 1,
            nombre: "Un dia antes",

        },
        {
            id: 2,
            nombre: "Dos dias antes",

        },
        {
            id: 3,
            nombre: "Tres dias antes",

        },
        {
            id: 5,
            nombre: "Cinco dias antes",

        },
        {
            id: 7,
            nombre: "Una semana antes",

        },
        {
            id: 15,
            nombre: "Dos semanas antes",

        },

    ]



    const inicioValores = {
        IdCalendar: -199,
        IdUser: 0,
        IdRol: 0,
        startDate: new Date(),
        endDate: new Date(),
        title: 0,
        allDay: 0,
        rRule: null,
        exDate: null,
        notes: "",
        members: [],
        createDate: new Date(),
        status: 5,
        Priority: 3,
        reminder: 3,
        IdUserEdit: 0

    }


    const formik = useFormik({
        initialValues: inicioValores,
        validate: (data) => {
            let errors = {};

            if (!data.title) {
                errors.title = 'Se requiere el nombre del pago.';
            }
            if (!data.notes) {
                errors.notes = 'Se requiere una nota del pago';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            // await agregarSubCategoria(data)

        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };
    return (
        <div>
            <Button label="Nuevo" icon="pi pi-plus" className="p-button-Primary mr-2" onClick={openNew} />
            <Dialog visible={SchedulerDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '40vw' }}
                onHide={hideDialog} header={<h2>Pago</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>

                            <span className="p-float-label" style={{ width: "100%" }}>
                                <InputText id="title" name="title" value={formik.values.title} onChange={formik.handleChange} autoFocus
                                    className={classNames({ 'p-invalid': isFormFieldValid('title') })} autoComplete="off" />
                                <label htmlFor="title" className={classNames({ 'p-error': isFormFieldValid('title') })}>Titulo</label>
                            </span>
                            {getFormErrorMessage('title')}

                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <label htmlFor="dropdown">Fecha Inicio</label>
                                <Calendar id="startDate" value={formik.values.startDate} onChange={formik.handleChange} showIcon />
                            </div>
                            <div className="field col-6 me-2"  >
                                <label htmlFor="dropdown">Fecha Finalizacion</label>
                                <Calendar id="endDate" value={formik.values.endDate} onChange={formik.handleChange} showIcon />
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>

                            <span className="p-float-label" style={{ width: "100%" }}>
                                <InputTextarea id="notes" name="notes" value={formik.values.notes} onChange={formik.handleChange} autoFocus
                                    className={classNames({ 'p-invalid': isFormFieldValid('notes') })} autoComplete="off" />
                                <label htmlFor="notes" className={classNames({ 'p-error': isFormFieldValid('notes') })}>Nota</label>
                            </span>
                            {getFormErrorMessage('notes')}
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <label htmlFor="dropdown">Prioridad</label>
                                <Dropdown id="Prioridad" name="Prioridad" value={formik.values.Prioridad} onChange={formik.handleChange} options={''} optionLabel="Priority"
                                    optionValue="Prioridad"
                                />
                            </div>
                            <div className="field col-6 me-2"  >
                                <label htmlFor="dropdown">Recordatorio</label>
                                <Dropdown id="reminder" name="reminder" value={formik.values.reminder} onChange={formik.handleChange} options={diasRecordatorios} optionLabel="nombre"
                                    optionValue="reminder"
                                />
                            </div>
                        </div>

                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <label htmlFor="dropdown">Miembros</label>
                                <MultiSelect value={formik.values.members} options={diasRecordatorios} onChange={formik.handleChange}
                                 optionLabel="nombre" placeholder="Miembros" optionValue="id" />
                            </div>
                            <div className="field col-6 me-2"  >
                                <label htmlFor="dropdown">Estado</label>
                                <Dropdown id="reminder" name="reminder" value={formik.values.reminder} onChange={formik.handleChange} options={diasRecordatorios} optionLabel="nombre"
                                    optionValue="reminder"
                                />
                            </div>
                        </div>
                        <div className="p-dialog-footer">
                            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                            <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" />
                        </div>
                    </form>


                </div>

            </Dialog>

        </div>
    )
}

export default ModalSchedulerHome
