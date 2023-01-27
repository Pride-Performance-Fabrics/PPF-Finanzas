import React, { Fragment, useState, useEffect, useRef } from "react";

import instancias from "../../../../Api/backend";

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { toastShow } from '../../../../services/ToastService'
import { Dialog } from 'primereact/dialog';
import { validarRespuesta } from '../../../../services/crypto';

import { getCuentasExistentes } from "../../../../Api/Finanzas/PlanCuentasRequest";
import { getSubTypes } from "../../../../Api/Finanzas/SubTypesRequest";
import { getTypes } from "../../../../Api/Finanzas/TypesRequest";
import { getCurrency } from "../../../../Api/Finanzas/CurrencyRequest";

export const ModalAgregarCuenta = () => {

    const [cuentaDialog, setCuentaDialog] = useState(false);
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(null);
    const [value, setValue] = useState({})

    const [formData, setFormData] = useState({});
    const toast = useRef(null);
    const [descriptionValue, setDescriptionValue] = useState({});

    const [types, setTypes] = useState([]);
    const [valueType, setValueType] = useState({});

    const [subTypes, setSubTypes] = useState([]);
    const [valueSubType, setValueSubType] = useState({});
    const [filterSubType, setFilterSubType] = useState([])

    const [currency, setCurrency] = useState([]);
    const [valueCurrency, setValueCurrency] = useState({})

    const [cuentasExistentes, setCuentasExistentes] = useState([]);
    const [valueCuentasExistente, setValueCuentasExistentes] = useState({});

    const [habilitado, setHabilitado] = useState(true);


    const cambiarType = () =>{
        
        
        const sub = subTypes.filter(e => valueType.IdType === e.IdType);
        // setValueSubType(sub)
        // console.log(sub, subTypes);
        setFilterSubType(sub)
        // setSubTypes(sub)
        
        
        // console.log(typeSubType)
    }


    const getListadoDropdown = async () => {
        const tempo = await getSubTypes();
        setSubTypes(tempo)
        console.log('subtypes', tempo)

        const tempo1 = await getTypes();
        setTypes(tempo1)

        console.log('Types', tempo1)

        const tempo2 = await getCurrency();
        setCurrency(tempo2)

        console.log('Currency', tempo2)

        const tempo3 = await getCuentasExistentes()
        setCuentasExistentes(tempo3)

        console.log('Cuentas Existentes', tempo3)
    }


    const openNew = () => {
        setCuentaDialog(true)
        getListadoDropdown()
    }

    const hideDialog = () => {
        setCuentaDialog(false)
    }

    const seleccionarCuentasExistentes = (e) => {
        console.log(e)
        setChecked(true)
        if (checked) {
            setHabilitado(false)
        } else {
            setHabilitado(true)
        }
    }

    const formik = useFormik({
        initialValues: {
            SubType: '',
            Type: '',
            Account: '',
            IdAccount: '',
            Description: '',
            Currency: '',
            Saldo: 0,
            Fecha: '',
            idContenedorAccount: ''
        },
        validate: (data) => {
            let errors = {};
            if (!data.Account) {
                errors.Account = 'Se requiere el nombre de la cuenta.';
            }
            if (!data.Description) {
                errors.Description = 'Se requiere una description';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            // await agregarUsuario(data.SubType, data.Type,
            //     data.Account, data.IdAccount, data.Description,
            //     data.Currency, data.Saldo, data.Fecha, data. idContenedorAccount);
            // setShowMessage(true);
        }
    });

    // const [value1, setValue1] = useState(null);
    useEffect(() => {
        setValueSubType({ Description: "" })
        cambiarType()
        // setDescriptionValue(valueSubType.Description)
        console.log()
    }, [valueType]);

    useEffect(() => {
        if (checked) {
            setHabilitado(false)
        } else {
            setHabilitado(true)
        }
    }, [checked])



    // Funciones de evaluacion de formik
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <Fragment>

            <Button label="Nueva Cuenta" icon="pi pi-plus" className="p-button-Primary mr-2" onClick={openNew} />
            <Toast position="bottom-right" ref={toast}></Toast>
            <Dialog visible={cuentaDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '35vw' }}
            onHide={hideDialog} header={<h2>Cuenta</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>
                    
                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{width: "100%"}}>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <Dropdown id="IdType" name="IdType" value={valueType} onChange={(e) => setValueType(e.value)} options={types} optionLabel="Type" />
                                    <label htmlFor="IdType" className={classNames({ 'p-error': isFormFieldValid('IdType') })}>Tipo Cuenta</label>
                                </span>
                            </div>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <InputText id="Account" name="Account" value={formik.values.Account} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Account') })} autoComplete="off" />
                                    <label htmlFor="Account" className={classNames({ 'p-error': isFormFieldValid('Account') })}>Nombre Cuenta</label>
                                </span>
                                {getFormErrorMessage('Account')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor"  style={{width: "100%"}}>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <Dropdown id="IdSubType" name="IdSubType" value={valueSubType} onChange={(e) => setValueSubType(e.value)} options={filterSubType} optionLabel="SubType" />
                                    <label htmlFor="dropdown">Tipo detalle</label>
                                </span>
                            </div>
                            <div className="field col-6 me-2"  >
                                <span className="p-float-label">
                                    <InputText id="IdAccount" name="IdAccount" value={formik.values.IdAccount} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('IdAccount') })} autoComplete="off" />
                                    <label htmlFor="IdAccount" className={classNames({ 'p-error': isFormFieldValid('IdAccount') })}>Numero Cuenta</label>
                                </span>
                                {getFormErrorMessage('IdAccount')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor"  style={{width: "100%"}}>
                            <div className="field col-6 me-2">
                                <span className="p-float-label p-input-icon-right">
                                    <InputTextarea value={valueSubType?.Description} rows={9} cols={30} />
                                </span>
                                {getFormErrorMessage('Mail')}
                            </div>
                            <div className="field col-6 me-2">
                                <span className="p-float-label">
                                    <InputText id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Description') })} autoComplete="off" />
                                    <label htmlFor="Description" className={classNames({ 'p-error': isFormFieldValid('Description') })}>Descripcion</label>
                                </span>
                                {getFormErrorMessage('Description')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ marginTop: -25, width: "100%" }}>
                            <div className="field col-6 me-2">
                            </div>
                            <></>
                            <div className="field col-6 me-2" >

                                <span className="p-float-label" style={{ marginTop: -70 }} >
                                    <Dropdown id="IdCurrency" name="IdCurrency" value={valueCurrency} onChange={(e) => setValueCurrency(e.value)} options={currency} optionLabel="Currency"
                                        virtualScrollerOptions={{ itemSize: 38 }} placeholder={formik.values.Currency} />
                                    <label htmlFor="dropdown">Currency</label>
                                </span>
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ marginTop: -25, width: "100%" }}>
                            <div className="field col-6 me-2">


                            </div>
                            <></>
                            <div className="field col-6 me-2" >
                                <span >
                                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}> </Checkbox>
                                    <label htmlFor="ingredient1" className="ml-2" style={{ marginLeft: 5 }}>  Es una cuenta secundaria</label>
                                </span>
                                <span className="p-float-label" style={{ marginTop: 20 }}>
                                    <Dropdown id=" idContenedorAccount" name=" idContenedorAccount" value={valueCuentasExistente}
                                        onChange={(e) => setValueCuentasExistentes(e.value)} options={cuentasExistentes} optionLabel="Account"
                                        disabled={habilitado} />
                                </span>
                            </div>
                        </div>
                        <div className="modal__input-contenedor" >
                            <div className="field col-6 me-2"> </div><></>
                            <div className="modal__input-contenedor" >
                                <span className="p-float-label" >
                                    <InputText id="saldo" name="saldo" value={formik.values.Description} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-disabled': isFormFieldValid('saldo') })} autoComplete="off" />
                                    <label htmlFor="Saldo" className={classNames({ 'p-error': isFormFieldValid('saldo') })}>Saldo Inicial</label>
                                </span>
                               
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

export default ModalAgregarCuenta;
