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
import { validarRespuesta } from '../../../../services/crypto';
import { getDateTimeString, getDate, getDateTimeStringUS, getDateTimeSQL, setDateTimeSQL1, getDateTimeSQL3 } from '../../../../services/FechasService';


import { getCuentasExistentes, postCrearCuenta } from "../../../../Api/Finanzas/PlanCuentasRequest";
import { getSubTypes, getCuentaSubType } from "../../../../Api/Finanzas/SubTypesRequest";
import { getTypes } from "../../../../Api/Finanzas/TypesRequest";
import { getCurrency } from "../../../../Api/Finanzas/CurrencyRequest";
import { getSubCategorias } from "../../../../Api/Finanzas/SubCategoriasRequest";
import { getCategorias } from "../../../../Api/Finanzas/CategoriasRequest"

export const ModalAgregarCuenta = ({ datos, cuentas, toast, habilitarEditar }) => {
    // console.log("datos", datos)

    const [cuentaDialog, setCuentaDialog] = useState(false);
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(null);
    const [value, setValue] = useState({})

    const [formData, setFormData] = useState({});
    // const toast = useRef(null);
    const [descriptionValue, setDescriptionValue] = useState();

    const [types, setTypes] = useState([]);
    const [valueType, setValueType] = useState({});

    const [categorias, setCategorias] = useState([])
    const [valueCategoria, setValueCategoria] = useState({});

    const [habilitarSubCategoria, setHabilitarSubCategoria] = useState(true)
    const [subCategorias, setSubCategorias] = useState([]);
    const [valueSubCategoria, setValueSubCategoria] = useState({});
    const [filterCategoria, setFilterCategoria] = useState({})

    const [filterSubCategoria, setFilterSubCategoria] = useState({});
    const [subCuenta, setSubCuenta] = useState([])

    const [currency, setCurrency] = useState([]);
    const [valueCurrency, setValueCurrency] = useState({})

    const [cuentasExistentes, setCuentasExistentes] = useState([]);
    const [valueCuentasExistente, setValueCuentasExistentes] = useState({});
    const [cuentaContenedor, setValueCuentaContenedor] = useState({})
    const [habilitarBoton, setHabilitarBoton] = useState(false);

    const [habilitado, setHabilitado] = useState(true);
    const [idCuenta, setIdCuenta] = useState({});

    const getListadoDropdown = async () => {

        const tempo4 = await getCategorias()
        setCategorias(tempo4)
        console.log('subtypes', tempo4)

        const tempo = await getSubCategorias();
        setSubCategorias(tempo)
        console.log('subCategorias', tempo)

        const tempo1 = await getTypes();
        setTypes(tempo1)

        // console.log('Types', tempo1)

        const tempo2 = await getCurrency();
        setCurrency(tempo2)

        console.log('Currency', tempo2)

        const tempo3 = await getCuentasExistentes()
        setCuentasExistentes(tempo3)

        // console.log('Cuentas Existentes', tempo3)

        const subDescription = tempo.filter(e => formik.values.IdSubType === e.IdSubType);
        // console.log(subDescription)
        formik.values.SubTypeDescription = subDescription[0].Description
        // console.log(subDescription)

        if (datos.IdContenedorAccount === 0) {
            // console.log("Sin")
        }
        else {
            setChecked(true)
            // console.log(datos.IdContenedorAccount)
            const contenedorCuenta = cuentasExistentes.filter(e => datos.IdContenedorAccount === e.IdAccount);
            // console.log("con", contenedorCuenta)
            setValueCuentaContenedor(contenedorCuenta)
            // datos.IdContenedorAccount = contenedorCuenta[0].Account

        }



    }

    // const cambiarType = () => {
    //     const sub = subTypes.filter(e => formik.values.IdType === e.IdType);
    //     // setValueSubType(sub)
    //     // console.log(sub, subTypes);
    //     setFilterSubType(sub)
    //     // setSubTypes(sub)
    //     // console.log("entro aqui", sub)
    // }

    const cambiarType = () => {

        let t = types.filter((e) => formik.values.IdType === e.IdType)
        console.log(t)
 
        let c = categorias.filter((e) => formik.values.IdCategoria === e.IdCategoria)
        console.log(c)
 
        
        let s = filterSubCategoria.filter((e) => formik.values.IdSubCategoria === e.IdSubCategoria)
        console.log(t,c,s)

        let idTemporal = t[0].CodigoType.toString() + c[0].IdCategoria.toString()+ s[0].CodigoSubCategoria.toString()
        // let idTemporal = t[0].CodigoType.toString() + c[0].CodigoCategoria.toString()+ s[0].CodigoSubCategoria.toString()
        console.log(idTemporal)
        formik.values.IdTipoCuenta = idTemporal
        formik.values.SubCategoriaDescription= s[0].Description
        
        setIdCuenta(idTemporal)

        

    }



    const openNew = () => {
        setCuentaDialog(true)
        getListadoDropdown()

    }

    const hideDialog = () => {
        setCuentaDialog(false)
    }

    const asignar = (tempoId) => {
        let idTemporal
        // console.log(formik.values)
        let ty = types.filter(e => formik.values.IdType === e.Id)
        // console.log(ty)
        // if (ty[0] != undefined) {
        //     if (tempoId[0].IdAccount === undefined) {
        //         let numeroTipo = (formik.values.IdType).toString();
        //         let tipo = numeroTipo.substring(0, 2);
        //         // let idTemporal = (valueSubType.IdSubType) + 1
        //         idTemporal = tipo + (formik.values.IdSub + 1)
        //         console.log(idTemporal)
        //         formik.values.IdAccount = idTemporal
        //         setIdCuenta(idTemporal);
        //     } else {
        //         const idNumeroCuenta = tempoId[0].IdAccount + 1
        //         console.log(idNumeroCuenta)
        //         console.log("cuenta")
        //         formik.values.IdAccount = idNumeroCuenta
        //         setIdCuenta(idNumeroCuenta);
        //     }

        // }

    }

    const asignarValor = (tempoId) => {
        let idTemporal
        // console.log(tempoId)

        if (tempoId[0].IdAccount === undefined) {
            let numeroTipo = (tempoId[0].IdType).toString();
            let tipo = numeroTipo.substring(0, 2);
            // let idTemporal = (valueSubType.IdSubType) + 1
            idTemporal = tipo + (tempoId[0].IdSubType + 1)
            // console.log(idTemporal)
            formik.values.IdAccount = idTemporal
            setIdCuenta(idTemporal);
        } else {
            const idNumeroCuenta = tempoId[0].IdAccount + 1
            // console.log(idNumeroCuenta)
            // console.log("cuenta")
            formik.values.IdAccount = idNumeroCuenta
            setIdCuenta(idNumeroCuenta);
        }


    }

    // const asignarValor = (valor) => {
    //     // let idTemporal
    //     // console.log(formik.values)
    //     // // console.log(tempoId)
    //     // let ty = types.filter(e => formik.values.IdType === e.Id)
    //     // let numeroTipo = ty[0].IdType.toString();
    //     // let tipo = numeroTipo.substring(0, 2);
    //     // console.log(numeroTipo)
    //     formik.values.IdAccount = valor
    //     // if (datos.IdType === formik.values.IdType) {
    //     // let ty = types.filter(e => formik.values.IdType === e.Id)
    //     // let numeroTipo = ty[0].IdType.toString();
    //     // let tipo = numeroTipo.substring(0, 2);
    //     // // console.log(numeroTipo)
    //     // formik.values.IdAccount = tipo
    //     // } else {
    //     //     // asignar()
    //     //     let ty = types.filter(e => formik.values.IdType === e.Id)
    //     //     let numeroTipo = ty[0].IdType.toString();
    //     //     let tipo = numeroTipo.substring(0, 2);
    //     //     // console.log(numeroTipo)
    //     //     formik.values.IdAccount = tipo

    //     // let tipo = numeroTipo.substring(0, 2);
    //     // // let idTemporal = (valueSubType.IdSubType) + 1
    //     // idTemporal = tipo + (formik.values.IdSubType + 1)
    //     // console.log(idTemporal)
    //     // // setIdCuenta(idTemporal);
    //     // formik.values.IdAccount = idTemporal
    //     // console.log(formik.values.IdAccount)
    //     // if (tempoId[0].IdAccount === undefined) {
    //     //     let ty = types.filter(e => formik.values.IdType === e.Id)
    //     //     let numeroTipo = ty[0].IdType.toString();
    //     //     console.log(numeroTipo)

    //     //     let tipo = numeroTipo.substring(0, 2);
    //     //     // let idTemporal = (valueSubType.IdSubType) + 1
    //     //     idTemporal = tipo + (formik.values.IdSubType + 1)
    //     //     // console.log(idTemporal)
    //     //     // setIdCuenta(idTemporal);
    //     //     formik.values.IdAccount = idTemporal
    //     //     console.log(formik.values.IdAccount)
    //     // } else {

    //     //     let ty = types.filter(e => formik.values.IdType === e.Id)
    //     //     let numeroTipo = ty[0].IdType.toString();
    //     //     console.log(numeroTipo)

    //     //     let tipo = numeroTipo.substring(0, 2);
    //     //     // let idTemporal = (valueSubType.IdSubType) + 1
    //     //     idTemporal = tipo + (formik.values.IdSubType + 1)
    //     //     // console.log(idTemporal)
    //     //     // setIdCuenta(idTemporal);
    //     //     formik.values.IdAccount = idTemporal
    //     //     console.log(formik.values.IdAccount)
    //     //     // const idNumeroCuenta = tempoId[0].IdAccount + 1
    //     //     // // console.log(idNumeroCuenta)
    //     //     // formik.values.IdAccount = idNumeroCuenta;
    //     //     // setIdCuenta(idNumeroCuenta);
    //     // }
    //     // }


    // }



    const agregarCuenta = async (data) => {

        const userInformation = decodeToken(localStorage.getItem(`ppfToken`));
        let user = userInformation.idUser

        // console.log(user)
        data.idUser = user

        // let numeroTipo = (valueType.IdType).toString();
        // let tipo = numeroTipo.substring(0, 2);

        // let numeroSubTipo = (valueSubType.IdSubType) + 1

        // const date = new Date()
        // // const numeroCuenta = idCuenta
        // data.Saldo = parseInt(formik.values.Saldo)
        // data.Currency = valueCurrency.IdCurrency === undefined ? datos.Currency : valueCurrency.IdCurrency
        // console.log(formik.values)


        data.IdType = (typeof formik.values.IdType === 'object' ? formik.values.IdType.IdType : formik.values.IdType)
        data.IdType = formik.values.IdType
        data.Type = formik.values.IdType
        data.IdAccount = parseInt(data.IdAccount)

        const ty = types.filter(e => data.IdType === e.IdType)
        // console.log(ty[0].Type)
        // data.Type = ty[0].Type
        // data.Type = (typeof formik.values.IdType === 'object' ? formik.values.IdType.Type : formik.values.Type)
        // data.IdSubType = typeof formik.values.IdSubType === 'object' ? formik.values.IdSubType.IdSubType : formik.values.IdSubType
        data.IdCurrency = formik.values.IdCurrency
        data.Currency = data.IdCurrency

        const cu = currency.filter(e => data.IdCurrency === e.IdCurrency)
        data.CuCurrency = cu[0].Currency

        // const su = subTypes.filter(e => data.IdSubType === e.IdSubType)
        // data.SubType = su[0].SubType

        // data.SubType = su[0].Id
        // console.log("fecha", setDateTimeSQL1(formik.values.Fecha))
        data.Fecha = setDateTimeSQL1(formik.values.Fecha)

        data.IdContenedorAccount = formik.values.IdContenedorAccount

        // data.SubType = datos.IdSubType === undefined ? valueSubType.IdSubType: datos.IdSubType 
        // data.idContenedorAccount = datos.IdContenedorAccount === 0 ? datos.IdContenedorAccount : cuentaContenedor.Account
        // data.IdAccount = idCuenta
        // data.Fecha = getDateTimeSQL(new Date())
        // // data.Fecha = setDateTimeSQL(new Date())
        // data.idUser = user

        // console.log("dataosmmmmmmmmmmmmmmmm", data)
        const resultado = await postCrearCuenta(data)
        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Cuenta Editada Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            cuentas()
            // console.log(resultado)
            return true;
        } else {
            toastShow(toast, 'error', 'Error', 'Error al Editar la cuenta');
            return true;
        }



    }

    const formik = useFormik({

        initialValues: datos,
        validate: (data) => {
            let errors = {};
            if (!data.Account) {
                errors.Account = 'Se requiere el nombre de la cuenta.';
            }
            if (!data.Description) {
                errors.Description = 'Se requiere una description';
            }
            // const fi = types.filter(e => datos.)

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarCuenta(data);

        }
    });

    useEffect(() => {
        cambiarType()
    }, [])

    // const [value1, setValue1] = useState(null);
    useEffect(async () => {
        // const sub = subTypes.filter(e => valueType.IdType === e.IdType);
        // setFilterSubType(sub)
        // console.log(sub)
        formik.values.SubTypeDescription = "";

        // console.log(formik.values)

        // setValueSubType({Description: "" })
        setIdCuenta(0)

        cambiarType()
        // console.log(formik.values.IdSub)
        // if(datos.IdType === formik.values.IdType){
        //     const tempoId = await getCuentaSubType(formik.values.IdSub, formik.values.IdSubType)
        //     console.log("entro aqui")
        //     asignarValor(tempoId)
        // }
        // console.log(datos)
        // console.log(formik.values)

    }, [formik.values.IdType]);

    useEffect(async () => {
        // console.log(formik.values)
        // const sub = subTypes.filter(e => formik.values.IdSubType === e.IdSubType);
        // formik.values.SubTypeDescription = sub[0].Description

        // const tempoId = await getCuentaSubType(sub[0].Id, formik.values.IdSubType)
        // if (datos.IdSub === formik.values.IdSub) {
        //     // console.log("entro aqui")
        //     asignarValor(tempoId)
        // }

    }, [formik.values.IdSubType])



    useEffect(() => {
        if (checked) {
            setHabilitado(false)
        } else {
            setHabilitado(true)
            setValueCuentasExistentes([])
        }
    }, [checked]);

    // useEffect(async () => {
    //     const tempoId = await getCuentaSubType(valueSubType.IdSubType)
    //     // console.log()
    //     asignarValor(tempoId)

    // }, [valueSubType])


    // Funciones de evaluacion de formik
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);





    return (
        <Fragment>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-button-text" aria-label="User" disabled={habilitarEditar}
                tooltip="Editar" tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }} onClick={openNew} />

            {/* <Toast  ref={toast}/> */}
            <Dialog visible={cuentaDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '35vw' }}
                onHide={hideDialog} header={<h2>Cuenta</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" style={{ marginTop: -20 }} >
                                <label htmlFor="IdType" className={classNames({ 'p-error': isFormFieldValid('IdType') })}>Tipo Cuenta</label>
                                <Dropdown id="IdType" name="IdType" value={formik.values.IdType} onChange={formik.handleChange} options={types} optionLabel="Type"
                                    optionValue="Id"
                                />
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
                            {
                                formik.values.IdType === 6 ?
                                    <div className="field col-6 me-2" >
                                        <span className="p-float-label">
                                            <Dropdown id="IdCategoria" name="IdCategoria" value={formik.values.IdCategoria} onChange={formik.handleChange} options={filterCategoria}
                                                optionLabel="Categoria" optionValue="IdCategoria" />
                                            <label htmlFor="dropdown">Categoria</label>
                                        </span>
                                    </div>
                                    : <div className="field col-6 me-2"><span>
                                    </span></div>
                            }

                            <div className="modal__input-contenedor" style={{ marginTop: 1 }} >
                                <span className="p-float-label">
                                    <InputText id="IdTipoCuenta" name="IdTipoCuenta" value={formik.values.IdTipoCuenta} onChange={formik.handleChange} autoFocus disabled
                                        className={classNames({ 'p-invalid': isFormFieldValid('IdTipoCuenta') })} autoComplete="off" style={{ width: "40%" }} />

                                    <label htmlFor="IdAccount" className={classNames({ 'p-error': isFormFieldValid('IdAccount') })}>No. Cuenta</label>

                                    <InputText id="Codigo" name="Codigo" value={formik.values.Codigo} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('Codigo') })} autoComplete="off" style={{ width: "50%", marginLeft: 4 }} />
                                </span>
                                {getFormErrorMessage('CodigoAccount')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <label htmlFor="dropdown">Tipo detalle</label>
                                <Dropdown id="IdSubCategoria" name="IdSubCategoria" value={formik.values.IdSubCategoria} onChange={formik.handleChange}
                                    options={filterSubCategoria} optionLabel="SubCategoria" optionValue="IdSubCategoria" />

                            </div>
                            <div className="field col-6 me-2"  >
                                <span className="p-float-label">
                                    <InputText id="IdAccount" name="IdAccount" value={formik.values.IdAccount} onChange={(e) => setIdCuenta(e.value)} autoFocus disabled
                                        className={classNames({ 'p-invalid': isFormFieldValid('IdAccount') })} autoComplete="off" />
                                    <label htmlFor="IdAccount" className={classNames({ 'p-error': isFormFieldValid('IdAccount') })}>Numero Cuenta</label>
                                </span>
                                {getFormErrorMessage('IdAccount')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2">
                                <span className="p-float-label p-input-icon-right">
                                    <InputTextarea id="SubTypeDescription" name="SubTypeDescription" rows={9} cols={30} value={formik.values?.SubTypeDescription}
                                        onChange={formik.handleChange} disabled />
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
                        <div className="modal__input-contenedor" style={{ marginTop: -55, width: "100%" }}>
                            <div className="field col-6 me-2">
                            </div>
                            <></>
                            <div className="field col-6 me-2" style={{ marginTop: -60, marginBottom: 50 }}>

                                {/* <span className="p-float-label" style={{ marginTop: -70 }} > */}
                                <label htmlFor="dropdown">Divisa</label>
                                <Dropdown id="IdCurrency" name="IdCurrency" value={formik.values.IdCurrency} onChange={formik.handleChange} options={currency} optionLabel="Currency"
                                    virtualScrollerOptions={{ itemSize: 38 }} optionValue="IdCurrency" />

                                {/* </span> */}
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
                                <Dropdown id="IdContenedorAccount" name="IdContenedorAccount" value={formik.values.IdContenedorAccount} style={{ marginTop: 20 }}
                                    onChange={formik.handleChange} options={cuentasExistentes} optionLabel="Account" optionValue="IdAccount"
                                    disabled={habilitado} />

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
                            <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" />
                        </div>
                    </form>


                </div>
            </Dialog>
        </Fragment>
    )

}

export default ModalAgregarCuenta;