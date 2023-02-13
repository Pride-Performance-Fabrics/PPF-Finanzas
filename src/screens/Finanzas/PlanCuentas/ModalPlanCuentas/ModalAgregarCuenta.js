import React, { Fragment, useState, useEffect, useRef } from "react";

import instancias from "../../../../Api/backend";

import { Formik, useFormik } from 'formik';

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
import { getSubCategorias } from "../../../../Api/Finanzas/SubCategoriasRequest";
import { getCategorias } from "../../../../Api/Finanzas/CategoriasRequest"

export const ModalAgregarCuenta = ({ datos, cuentas, toast, icono, nombre, className, habilitarEditar }) => {
    // console.log(datos)

    const [cuentaDialog, setCuentaDialog] = useState(false);
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(null);
    const [value, setValue] = useState({})

    const [formData, setFormData] = useState({});
    // const toast = useRef(null);
    const [descriptionValue, setDescriptionValue] = useState({});

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
    const [filterCuentas, setFilterCuentas] = useState([])

    const [habilitado, setHabilitado] = useState(true);
    const [idCuenta, setIdCuenta] = useState({});
    const [habilitarBoton, setHabilitarBoton] = useState(false);



    const cambiarType = () => {

        let t = types.filter((e) => formik.values.IdType === e.IdType)
        // console.log(t)

        let c = categorias.filter((e) => formik.values.IdCategoria === e.IdCategoria)
        // console.log(c)


        let s = filterSubCategoria.filter((e) => formik.values.IdSubCategoria === e.IdSubCategoria)
        // console.log(t, c, s)

        let idTemporal = t[0].CodigoType.toString() + c[0].IdCategoria.toString() + s[0].CodigoSubCategoria.toString()
        // let idTemporal = t[0].CodigoType.toString() + c[0].CodigoCategoria.toString()+ s[0].CodigoSubCategoria.toString()
        // console.log(idTemporal)
        formik.values.IdTipoCuenta = idTemporal
        formik.values.SubCategoriaDescription = s[0].Description

        setIdCuenta(idTemporal)
        // console.log(cuentasExistentes)
        let filCuentas = cuentasExistentes.filter((e) => formik.values.IdSubCategoria === e.SubCategoria)
        // console.log(formik.values.IdSubCategoria)
        setFilterCuentas(filCuentas)



    }


    const getListadoDropdown = async () => {
        const tempo4 = await getCategorias()
        setCategorias(tempo4)
        // console.log('subtypes', tempo4)

        const tempo = await getSubCategorias();
        setSubCategorias(tempo)
        // console.log('subCategorias', tempo)

        const tempo1 = await getTypes();
        setTypes(tempo1)

        // console.log('Types', tempo1)

        const tempo2 = await getCurrency();
        setCurrency(tempo2)

        // console.log('Currency', tempo2)

        const tempo3 = await getCuentasExistentes()
        setCuentasExistentes(tempo3)
        // console.log(tempo3)

        if (typeof datos === 'object') {
            datos.IdContenedorAccount > 0 ? setChecked(true) : setChecked(false)

            let c = tempo4.filter((e) => datos.IdType === e.IdType)
            setFilterCategoria(c)
            // console.log("aqui",  c)
    
    
            let s = tempo.filter((e) => datos.IdCategoria === e.IdCategoria)
            setFilterSubCategoria(s)
            // console.log("aqui", s)

            let filCuentas = tempo3.filter((e) => datos.IdSubCategoria === e.SubCategoria)
            // console.log(filCuentas)
            setFilterCuentas(filCuentas)
        }



        // console.log('Cuentas Existentes', tempo3)
    }

    


    const openNew = () => {
        setCuentaDialog(true)
        getListadoDropdown()
        setFilterSubCategoria([])
        // console.log(idCuenta)
        // setIdCuenta(0)
        setValueSubCategoria({ description: "" })
        setChecked(false)
        setHabilitarBoton(false)
        // valoresDatos()
       

    }



    const hideDialog = () => {
        setCuentaDialog(false)
    }

    const asignarValor = (tempoId) => {
        let idTemporal
        // console.log(tempoId)

        if (tempoId[0].IdAccount === undefined) {
            let numeroTipo = (tempoId[0].IdType).toString();
            let tipo = numeroTipo.substring(0, 2);
            // let idTemporal = (valueSubType.IdSubType) + 1
            // idTemporal = tipo + (tempoId[0].IdSubType + 1)
            idTemporal = tipo + (tempoId[0].IdSubType)
            // console.log(idTemporal)
            formik.values.IdTipoCuenta = idTemporal
            // formik.values.IdAccount = idTemporal
            // setIdCuenta(idTemporal);
        } else {
            // console.log(tempoId[0], valueSubType.IdSubType, filterSubType.IdSubType)
            let id = valueType.CodigoType.toString() + valueSubCategoria.CodigoSubCategoria.toString()
            // console.log(id)
            formik.values.IdTipoCuenta = id
            setIdCuenta(id)

            // const idNumeroCuenta = tempoId[0].IdAccount + 1
            // console.log(idNumeroCuenta)
            // console.log("cuenta")
            // formik.values.IdAccount = idNumeroCuenta
            // setIdCuenta(idNumeroCuenta);
        }


    }



    const agregarCuenta = async (data) => {

        setHabilitarBoton(true)
        const userInformation = decodeToken(localStorage.getItem(`ppfToken`));
        let user = userInformation.idUser

        // console.log(user)

        // console.log(data)

        // let numeroTipo = (valueType.CodigoType).toString();
        // let tipo = numeroTipo.substring(0, 2);

        // let numeroSubTipo = (valueSubCategoria.CodigoSubCategoria) + 1

        const date = new Date()
        data.Fecha = getDateTimeSQL(new Date())
        data.IdUser = user
        data.CodigoAccount = formik.values.CodigoAccount
        if(!checked){
            data.IdContenedorAccount = 0
        }
        // const numeroCuenta = idCuenta
        // data.Saldo = parseInt(formik.values.Saldo)
        // data.Currency = valueCurrency.IdCurrency === undefined ? 1 : valueCurrency.IdCurrency
        // data.SubType = valueSubCategoria.IdSubCategoria
        // data.Type = valueType.Id
        // data.IdContenedorAccount = checked === false ? 0 : valueCuentasExistente.IdAccount
        // // data.IdAccount = idCuenta
        // data.ActiveStatus = 3
        // // data.Fecha = setDateTimeSQL(new Date())
        // data.idUser = user

        // console.log(data.Fecha)
        const resultado = await postCrearCuenta(data)
        if(resultado[0].ERROR === 0){
            toastShow(toast, 'success', 'Creado', 'Cuenta Creada Correctamente.');
            cuentas()
            setFormData({})
            formik.resetForm(formData)

            hideDialog()

            setChecked(false)
            // console.log(resultado)
            return true;
                    setHabilitarBoton()
        }
        else{
            toastShow(toast, 'error', 'Error', `${resultado[0].MENSAJE}`);
            setHabilitarBoton(false);
            return true;
        }
        // if (resultado) {

        //     toastShow(toast, 'success', 'Creado', 'Cuenta Creada Correctamente.');
        //     cuentas()
        //     setFormData({})
        //     formik.resetForm(formData)

        //     hideDialog()

        //     setChecked(false)
        //     console.log(resultado)
        //     return true;
        // } else {
        //     toastShow(toast, 'error', 'Error', 'Error al crear la cuenta');
        //     return true;
        // }



    }




    const inicioValores = {
        IdAccount: -1000,
        CodigoAccount: 0,
        Account: '',
        Codigo: 0,
        IdCurrency: 1,
        IdTipoCuenta: 0,
        IdType: 0,
        IdCategoria: 0,
        IdSubCategoria: 0,
        SubCategoriaDescription: '',
        Description: '',
        IdCurrency: 1,
        Saldo: 0,
        Fecha: '',
        IdContenedorAccount: 0,
        ActiveStatus: 3,
        IdUser: 0


    }

    const formik = useFormik({
        initialValues: typeof datos === 'object' ? datos : inicioValores,
        validate: (data) => {
            let errors = {};
            if (!data.Account) {
                errors.Account = 'Se requiere el nombre de la cuenta.';
            }
            if (!data.CodigoAccount) {
                errors.Account = 'Se requiere el numero de cuenta.';
            }
            else if (!/^[0-9]{1,3}$/i.test(data.CodigoAccount)) {
                errors.CodigoAccount = 'El numero de cuenta no debe contener letras, ni mas de 3 digitos';
            }
            if (!data.IdType) {
                errors.IdType = 'Se requiere el tipo la cuenta.';
            }
            if (!data.IdSubCategoria) {
                errors.IdSubCategoria = 'Se requiere la SubCategoria de la cuenta.';
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


    useEffect(() => {
        setValueSubCategoria({ Description: "" })
        setIdCuenta(0)

        const cate = categorias.filter(e => formik.values.IdType === e.IdType);
        setFilterCategoria(cate)

        let idTemporal

        if (formik.values.IdType !== 6) {
            formik.values.IdCategoria = formik.values.IdType
        }

        formik.values.SubCategoriaDescription = ""


    }, [formik.values.IdType]);

    useEffect(() => {

        // formik.values.IdCategoria === 2 ? setHabilitarSubCategoria(false) : setHabilitarSubCategoria(true)

        setValueSubCategoria({ Description: "" })
        setIdCuenta(0)
        // console.log(subCategorias)
        const sub = subCategorias.filter(e => formik.values.IdCategoria === e.IdCategoria);
        // console.log(sub)

        setFilterSubCategoria(sub)

        // if (formik.values.IdType !== 6) {
        //     console.log("console.log")
        // } else {

        // }


    }, [formik.values.IdCategoria]);

    useEffect(() => {
        if (checked) {
            setHabilitado(false)
        } else {
            setHabilitado(true)
            setValueCuentasExistentes([])
        }
    }, [checked]);

    useEffect(async () => {
        cambiarType()

        // console.log('CAMBIO');

        // let id = .CodigoType.toString() + valueSubCategoria.IdSubCategoria.toString()
        // console.log(id)
        // formik.values.IdTipoCuenta = id
        // setIdCuenta(id)
        // console.log(tempoId)

    }, [formik.values])

    // useEffect(()=>{
    //     if(!checked){
    //         formik.values.IdContenedorAccount = 0
    //     }
    // },[checked])



    // Funciones de evaluacion de formik
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };


    return (
        <Fragment>
            <Button label={nombre} icon={icono} className={className} onClick={openNew} />
            {/* <Toast position="bottom-right" ref={toast}></Toast> */}
            <Loader loading={loading} />
            <Dialog visible={cuentaDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw', height: '35vw' }}
                onHide={hideDialog} header={<h2>Cuenta</h2>}>
                <div style={{ width: '100%', margin: 'auto' }}>

                    <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <Dropdown id="IdType" name="IdType" value={formik.values.IdType} onChange={formik.handleChange} options={types}
                                        optionLabel="Type" optionValue="IdType" />
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

                                    <InputText id="CodigoAccount" name="CodigoAccount" value={formik.values.CodigoAccount} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('CodigoAccount') })} autoComplete="off" style={{ width: "50%", marginLeft: 4 }} />
                                </span>
                                {getFormErrorMessage('CodigoAccount')}
                            </div>
                        </div>
                        <div className="modal__input-contenedor" style={{ width: "100%" }}>

                            <div className="field col-6 me-2" >
                                <span className="p-float-label">
                                    <Dropdown id="IdSubCategoria" name="IdSubCategoria" value={formik.values.IdSubCategoria} onChange={formik.handleChange}
                                        options={filterSubCategoria} optionLabel="SubCategoria" optionValue="IdSubCategoria" />
                                    <label htmlFor="dropdown">SubCategoria</label>
                                </span>
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

                        <div className="modal__input-contenedor" style={{ width: "100%" }}>
                            <div className="field col-6 me-2">
                                <span className="p-float-label p-input-icon-right">

                                    <InputTextarea value={formik.values.SubCategoriaDescription} rows={5} cols={30} />
                                </span>
                                {getFormErrorMessage('Mail')}
                            </div>
                            <div className="field col-6 me-2" >
                                <span className="p-float-label"  >
                                    <Dropdown id="IdCurrency" name="IdCurrency" value={formik.values.IdCurrency} onChange={formik.handleChange}
                                        options={currency} optionLabel="Currency" optionValue="IdCurrency"
                                        virtualScrollerOptions={{ itemSize: 38 }} />
                                    <label htmlFor="dropdown">Divisa</label>
                                </span>
                            </div>
                        </div>

                        <div className="modal__input-contenedor" style={{ marginTop: -30, width: "100%" }}>
                            <div className="field col-6 me-2">

                            </div>
                            <div className="field col-6 me-2" >
                                <span >
                                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}> </Checkbox>
                                    <label htmlFor="ingredient1" className="ml-2" style={{ marginLeft: 5 }}>  Es una cuenta secundaria</label>
                                </span>
                                <span className="p-float-label" style={{ marginTop: 20 }}>
                                    <Dropdown id="IdContenedorAccount" name="IdContenedorAccount" value={formik.values.IdContenedorAccount} optionValue="IdAccount"
                                        onChange={formik.handleChange} options={filterCuentas} optionLabel="Account"
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
                            <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" disabled={habilitarBoton} />
                        </div>
                    </form>


                </div>
            </Dialog>
        </Fragment>
    )

}

export default ModalAgregarCuenta;
