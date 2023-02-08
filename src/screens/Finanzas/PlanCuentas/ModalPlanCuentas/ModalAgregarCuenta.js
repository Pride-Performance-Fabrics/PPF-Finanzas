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
import Loader from "../../../../components/Loader/Loader";
import { validarRespuesta } from '../../../../services/crypto';
import { getDateTimeString, getDate, getDateTimeStringUS, getDateTimeSQL, setDateTimeSQL } from '../../../../services/FechasService';


import { getCuentasExistentes, postCrearCuenta } from "../../../../Api/Finanzas/PlanCuentasRequest";
import { getSubTypes, getCuentaSubType } from "../../../../Api/Finanzas/SubTypesRequest";
import { getTypes } from "../../../../Api/Finanzas/TypesRequest";
import { getCurrency } from "../../../../Api/Finanzas/CurrencyRequest";

export const ModalAgregarCuenta = ({ datos, cuentas }) => {
    // console.log(datos)

    const [cuentaDialog, setCuentaDialog] = useState(false);
    const [loading, setLoading] = useState(false)
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
    const [filterSubType, setFilterSubType] = useState([]);
    const [subCuenta, setSubCuenta] = useState([])

    const [currency, setCurrency] = useState([]);
    const [valueCurrency, setValueCurrency] = useState({})

    const [cuentasExistentes, setCuentasExistentes] = useState([]);
    const [valueCuentasExistente, setValueCuentasExistentes] = useState({});

    const [habilitado, setHabilitado] = useState(true);
    const [idCuenta, setIdCuenta] = useState({});
    const [habilitarBoton, setHabilitarBoton] = useState(false);


    const cambiarType = () => {

        const sub = subTypes.filter(e => valueType.Id === e.IdType);
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

        // console.log('Types', tempo1)

        const tempo2 = await getCurrency();
        setCurrency(tempo2)

        console.log('Currency', tempo2)

        const tempo3 = await getCuentasExistentes()
        setCuentasExistentes(tempo3)

        // console.log('Cuentas Existentes', tempo3)
    }


    const openNew = () => {
        setCuentaDialog(true)
        getListadoDropdown()
        setFilterSubType([])
        // console.log(idCuenta)
        // setIdCuenta(0)
        setValueSubType({description :""})
        setChecked(false)
        setHabilitarBoton(false)
    }

    const hideDialog = () => {
        setCuentaDialog(false)
    }

    const asignarValor = (tempoId) => {
        let idTemporal
        console.log(tempoId)

        if (tempoId[0].IdAccount === undefined) {
            let numeroTipo = (tempoId[0].IdType).toString();
            let tipo = numeroTipo.substring(0, 2);
            // let idTemporal = (valueSubType.IdSubType) + 1
            idTemporal = tipo + (tempoId[0].IdSubType + 1)
            console.log(idTemporal)
            formik.values.IdAccount = idTemporal
            setIdCuenta(idTemporal);
        } else {
            const idNumeroCuenta = tempoId[0].IdAccount + 1
            console.log(idNumeroCuenta)
            console.log("cuenta")
            formik.values.IdAccount = idNumeroCuenta
            setIdCuenta(idNumeroCuenta);
        }


    }



    const agregarCuenta = async (data) => {
        setHabilitarBoton(true)
        const userInformation = decodeToken(localStorage.getItem(`ppfToken`));
        let user = userInformation.idUser

        console.log(user)

        let numeroTipo = (valueType.IdType).toString();
        let tipo = numeroTipo.substring(0, 2);

        let numeroSubTipo = (valueSubType.IdSubType) + 1

        const date = new Date()
        const numeroCuenta = idCuenta
        data.Saldo = parseInt(formik.values.Saldo)
        data.Currency = valueCurrency.IdCurrency === undefined ? 1 : valueCurrency.IdCurrency
        data.SubType = valueSubType.Id
        data.Type = valueType.Id
        data.IdContenedorAccount = checked === false ? 0 : valueCuentasExistente.IdAccount
        // data.IdAccount = idCuenta
        data.Fecha = getDateTimeSQL(new Date())
        data.ActiveStatus = 3
        // data.Fecha = setDateTimeSQL(new Date())
        data.idUser = user

        console.log(data.Fecha)
        const resultado = await postCrearCuenta(data)
        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Cuenta Creada Correctamente.');
            cuentas()
            setFormData({})
            formik.resetForm(formData)
          
            hideDialog()
            valueType.IdType = ""
            valueType.Type = ""

            valueCuentasExistente.IdAccount = ""
            idCuenta=""
            valueCurrency.IdCurrency = ""
            setFilterSubType({})
            setIdCuenta(0)
            valueCurrency.Currency= ""
            valueSubType.Description = ""
            setChecked(false)
            console.log(resultado)
            return true;
        } else {
            toastShow(toast, 'error', 'Error', 'Error al crear la cuenta');
            return true;
        }



    }

    const formik = useFormik({
        initialValues: {
            SubType: '',
            Type: '',
            Account: '',
            IdAccount: '',
            Description: '',
            Currency: 1,
            Saldo: 0,
            Fecha: '',
            IdContenedorAccount: '',
            ActiveStatus: 3,
            idUser: 0,
            id: -1

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
            await agregarCuenta(data);

        }
    });


    // const [value1, setValue1] = useState(null);
    useEffect(() => {
        setValueSubType({ Description: "" })
        setIdCuenta(0)
        // setIdCuenta({IdAccount : ""})
        cambiarType()
        // setDescriptionValue(valueSubType.Description)
        // console.log()
    }, [valueType]);

    useEffect(() => {
        if (checked) {
            setHabilitado(false)
        } else {
            setHabilitado(true)
            setValueCuentasExistentes([])
        }
    }, [checked]);

    useEffect(async () => {

        const tempoId = await getCuentaSubType(valueSubType.Id, valueSubType.IdSubType)
        // console.log()
        if (!tempoId.error) {
            asignarValor(tempoId)
        }
        // console.log(tempoId)

    }, [valueSubType])


    // Funciones de evaluacion de formik
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };


    return (
        <Fragment>
            <Button label="Nueva Cuenta" icon="pi pi-plus" className="p-button-Primary mr-2" onClick={openNew} />
            <Toast position="bottom-right" ref={toast}></Toast>
            <Loader loading={loading} />
            <Dialog visible={cuentaDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '35vw' }}
                onHide={hideDialog} header={<h2>Cuenta</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
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
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <Dropdown id="IdSubType" name="IdSubType" value={valueSubType} onChange={(e) => setValueSubType(e.value)} options={filterSubType} optionLabel="SubType" />
                                    <label htmlFor="dropdown">Tipo detalle</label>
                                </span>
                            </div>
                            <div className="field col-6 me-2"  >
                                {/* <span className="p-float-label">
                                    <InputText id="IdAccount" name="IdAccount" value={idCuenta} onChange={(e) => setIdCuenta(e.value)} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('IdAccount') })} autoComplete="off" />
                                    <label htmlFor="IdAccount" className={classNames({ 'p-error': isFormFieldValid('IdAccount') })}>Numero Cuenta</label>
                                </span> */}
                                <span className="p-float-label">
                                    <InputText id="IdAccount" name="IdAccount" value={formik.values.IdAccount} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('IdAccount') })} autoComplete="off" />
                                    <label htmlFor="IdAccount" className={classNames({ 'p-error': isFormFieldValid('IdAccount') })}>Numero Cuenta</label>
                                </span>
                                {getFormErrorMessage('IdAccount')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
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
                                        virtualScrollerOptions={{ itemSize: 38 }} placeholder={formik.values.Currency} optionValue="IdCurrency" />
                                    <label htmlFor="dropdown">Divisa</label>
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
                                    <Dropdown id="IdContenedorAccount" name="IdContenedorAccount" value={valueCuentasExistente}
                                        onChange={(e) => setValueCuentasExistentes(e.value)} options={cuentasExistentes} optionLabel="Account"
                                        disabled={habilitado} />
                                </span>
                            </div>
                        </div>
                        <div className="modal__input-contenedor" >
                            <div className="field col-6 me-2"> </div><></>
                            <div className="modal__input-contenedor" >
                                <span className="p-float-label" >
                                    <InputText id="Saldo" name="Saldo" value={formik.values.Saldo} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-disabled': isFormFieldValid('Saldo') })} autoComplete="off" />
                                    <label htmlFor="Saldo" className={classNames({ 'p-error': isFormFieldValid('Saldo') })}>Saldo Inicial</label>
                                </span>

                            </div>
                        </div>
                        <div className="p-dialog-footer">
                            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                            <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" disabled= {habilitarBoton} />
                        </div>
                    </form>


                </div>
            </Dialog>
        </Fragment>
    )

}

export default ModalAgregarCuenta;
