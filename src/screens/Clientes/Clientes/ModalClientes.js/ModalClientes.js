import React, { Fragment, useState, useEffect, useRef } from "react";

//************** Componentes PrimerReact **************/
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';

//************** Componentes  **************/
import { useFormik } from 'formik';
import { InputTextarea } from "primereact/inputtextarea";


//************** Componentes generales **************/
import Card from "../../../../components/Card/Card";
import Icon from "../../../../components/icon/Icon";
import Loader from "../../../../components/Loader/Loader";
import IconApp from "../../../../components/icon/IconApp";
import AgGrid from "../../../../components/Tables/AgGrid";

//************** Consultas API **************/
import { getTerminos } from "../../../../Api/Global/TerminosRequest";
import { getTiposPagosClientes } from "../../../../Api/Global/TipoPagosRequest";
import { getUnidades } from "../../../../Api/Global/UnidadesRequest";
import { getEstadosClientesIPS } from "../../../../Api/Global/StatusRequest";
import { getUltimoIdCustomer } from "../../../../Api/Clientes/ClientesRequest";
import { postCustomer } from "../../../../Api/Clientes/ClientesRequest";

//************** Servicios Creados **************/
import { setDateTimeSQL, getLocalDateString1 } from '../../../../services/FechasService';
import { toastShow } from '../../../../services/ToastService';

const ModalClientes = ({ toast, datos, icono, nombre, className, getListadoClientes }) => {

    const [clientesDialog, setClientesDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({});
    const [datosIniciales, setDatosIniciales] = useState(false);
    const [date, setDate] = useState(new Date())

    const [terminos, setTerminos] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [tipoPagos, setTipoPagos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [ultimoId, setUltimoId] = useState(0);
    const [habilitar, setHabilitar] = useState(true)


    const inicioValores = {
        IdCustomer: ultimoId + 1,
        IdStatus: 1,
        RTN: '',
        CodigoCliente: '',
        Abreviacion: '',
        CustomerName: '',
        Address: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: '',
        Tel: '',
        Email: '',
        Contact: '',
        Tel2: '',
        Email2: '',
        Contact2: '',
        TipoPago: 0,
        IdOrderUnits: 0,
        CreditLimit: 0,
        IdTerms: 0,
        IdFreightTerms: 0,
        IdShipper: 0,
        IsShipTo: 0,
        IsBillTo: 0,
        DateCreate: new Date(),
        Comments: '',
        Porcentaje: 0,
        BlockFinanzas: 0,
        SalesEmail: 0,
    }



    const listadosDropdown = async () => {

        const tempoTerminos = await getTerminos();
        setTerminos(tempoTerminos)


        const tempoUnidades = await getUnidades();
        setUnidades(tempoUnidades)


        const tempoTipoPagos = await getTiposPagosClientes()
        setTipoPagos(tempoTipoPagos)


        const tempoEstados = await getEstadosClientesIPS()
        setEstados(tempoEstados)


    }


    const openNew = async () => {
        setClientesDialog(true)

        // getCustomers()
        listadosDropdown()
        const tempoUltimoId = await getUltimoIdCustomer()
        setUltimoId(tempoUltimoId[0].IdCustomer)
        console.log(tempoUltimoId[0].IdCustomer)

        typeof datos === 'object' ? formik.values.IdCustomer = datos.IdCustomer : formik.values.IdCustomer = tempoUltimoId[0].IdCustomer + 1
        // formik.values.IdCustomer = tempoUltimoId[0].IdCustomer + 1
    }

    const hideDialog = () => {
        setClientesDialog(false)
    }

    const agregarCLiente = async (data) => {
        typeof datos === 'object' ? data.DateCreate = datos.DateCreate : data.DateCreate = getLocalDateString1(new Date())
        console.log(data)
        const result = await postCustomer(data)

        if (result) {
            toastShow(toast, 'success', 'Creado', 'Cliente Creado Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            getListadoClientes()
            return true;
        } else {
            toastShow(toast, 'error', 'Error', 'Error al Crear el Cliente');
            return true;
        }
        // console.log(data)
    }


    const formik = useFormik({
        initialValues: typeof datos === 'object' ? datos : inicioValores,
        validate: (data) => {
            let errors = {};

            if (!data.CodigoCliente) {
                errors.CodigoCliente = 'Se requiere el nombre del acceso.';
            }
            if (!data.CustomerName) {
                errors.CustomerName = 'Se requiere el nombre del acceso.';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarCLiente(data)

        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };

    return (
        <Fragment>
            <Button label={nombre} icon={icono} className={className} onClick={openNew} />
            <Dialog visible={clientesDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '85vw', height: '45vw' }}
                onHide={hideDialog} >
                <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                    <div style={{ width: '100%', margin: 'auto', marginRight: '10%' }} className="d-flex flex-column  justify-content-center">
                        <Card
                            style={{marginTop: 15}}
                            id="cardTitulo"
                            className="cardContenedorClientes"
                            titulo={<h6  className="clientesHeaderCard">Información Cliente</h6>}
                            contenido={(
                                <div className="informacionClienteContainer" style={{ marginTop: 1 }} >
                                    <span className="p-float-label">
                                        <InputText id="IdCustomer" name="IdCustomer" value={formik.values.IdCustomer} onChange={formik.handleChange} autoFocus disabled={habilitar}
                                            className={classNames({ 'p-invalid': isFormFieldValid('IdCustomer') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="IdCustomer" className={classNames({ 'p-error': isFormFieldValid('IdCustomer') })}>Id Cliente</label>
                                    </span>
                                    {getFormErrorMessage('IdCustomer')}
                                    <span className="p-float-label">
                                        <InputText id="CodigoCliente" name="CodigoCliente" value={formik.values.CodigoCliente} onChange={formik.handleChange} autoFocus
                                            className={classNames({ 'p-invalid': isFormFieldValid('CodigoCliente') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="CodigoCliente" className={classNames({ 'p-error': isFormFieldValid('CodigoCliente') })}>Codigo Cliente</label>
                                    </span>
                                    {getFormErrorMessage('CodigoCliente')}
                                    <span className="p-float-label">
                                        <InputText id="RTN" name="RTN" value={formik.values.RTN} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('RTN') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="RTN" className={classNames({ 'p-error': isFormFieldValid('RTN') })}>RTN</label>
                                    </span>
                                    {getFormErrorMessage('RTN')}
                                    <span className="p-float-label">
                                        <InputText id="CustomerName" name="CustomerName" value={formik.values.CustomerName} onChange={formik.handleChange} s
                                            className={classNames({ 'p-invalid': isFormFieldValid('CustomerName') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="CustomerName" className={classNames({ 'p-error': isFormFieldValid('CustomerName') })}>Nombre Cliente</label>
                                    </span>
                                    {getFormErrorMessage('CustomerName')}
                                    <span className="p-float-label">
                                        <InputText id="Abreviacion" name="Abreviacion" value={formik.values.Abreviacion} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Abreviacion') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Abreviacion" className={classNames({ 'p-error': isFormFieldValid('Abreviacion') })}>Abreviacion</label>
                                    </span>
                                    {getFormErrorMessage('Abreviacion')}
                                    <span className="p-float-label">
                                        <Calendar value={date} onChange={(e) => setDate(e.value)} style={{ width: '100%' }} showIcon disabled></Calendar>
                                        <label htmlFor="dropdown">Fecha Creado     </label>
                                    </span>
                                    {getFormErrorMessage('Abreviacion')}
                                    <span className="p-float-label">
                                        <Dropdown id="IdStatus" name="IdStatus" value={formik.values.IdStatus} onChange={formik.handleChange} options={estados} optionLabel="StatusName"
                                            optionValue="IdStatus" style={{ width: '100%' }} className="dropDownButton" />
                                        <label htmlFor="dropdown">Estado     </label>
                                    </span>

                                </div>
                            )}
                        />
                        <Card
                            className="cardContenedorClientes"
                            titulo={<h6 className="clientesHeaderCard">Ubicación Cliente</h6>}
                            contenido={(
                                <div className="informacionClienteContainer" style={{ marginTop: 1 }}  >

                                    <span className="p-float-label">
                                        <InputText id="Address" name="Address" value={formik.values.Address} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Address') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Address" className={classNames({ 'p-error': isFormFieldValid('Address') })}>Direccion</label>
                                    </span>
                                    {getFormErrorMessage('Direccion')}
                                    <span className="p-float-label">
                                        <InputText id="City" name="City" value={formik.values.City} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('City') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="City" className={classNames({ 'p-error': isFormFieldValid('City') })}>Ciudad</label>
                                    </span>
                                    {getFormErrorMessage('City')}
                                    <span className="p-float-label">
                                        <InputText id="State" name="State" value={formik.values.State} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('State') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="State" className={classNames({ 'p-error': isFormFieldValid('State') })}>Estado</label>
                                    </span>
                                    {getFormErrorMessage('State')}
                                    <span className="p-float-label">
                                        <InputText id="Country" name="Country" value={formik.values.Country} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Country') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Country" className={classNames({ 'p-error': isFormFieldValid('Country') })}>Pais</label>
                                    </span>
                                    {getFormErrorMessage('Country')}
                                    <span className="p-float-label">
                                        <InputText id="ZipCode" name="ZipCode" value={formik.values.ZipCode} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('ZipCode') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="ZipCode" className={classNames({ 'p-error': isFormFieldValid('ZipCode') })}>ZipCode</label>
                                    </span>
                                    {getFormErrorMessage('ZipCode')}

                                </div>)}
                        />
                        <Card
                            className="cardContenedorClientes"
                            titulo={<h6 className="clientesHeaderCard">Contacto Cliente</h6>}
                            contenido={(
                                <div className="informacionClienteContainer" style={{ marginTop: 1 }} >

                                    <span className="p-float-label">
                                        <InputText id="Tel" name="Tel" value={formik.values.Tel} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Tel') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Tel" className={classNames({ 'p-error': isFormFieldValid('Tel') })}>Telefono</label>
                                    </span>
                                    {getFormErrorMessage('Tel')}
                                    <span className="p-float-label">
                                        <InputText id="Email" name="Email" value={formik.values.Email} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Email') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Email" className={classNames({ 'p-error': isFormFieldValid('Email') })}>Correo</label>
                                    </span>
                                    {getFormErrorMessage('Email')}
                                    <span className="p-float-label">
                                        <InputText id="Contact" name="Contact" value={formik.values.Contact} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Contact') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Contact" className={classNames({ 'p-error': isFormFieldValid('Contact') })}>Contacto</label>
                                    </span>
                                    {getFormErrorMessage('Contact')}
                                    <span className="p-float-label">
                                        <InputText id="Tel2" name="Tel2" value={formik.values.Tel2} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Tel2') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Tel2" className={classNames({ 'p-error': isFormFieldValid('Tel2') })}>Telefono 2</label>
                                    </span>
                                    {getFormErrorMessage('Tel2')}
                                    <span className="p-float-label">
                                        <InputText id="Email2" name="Email2" value={formik.values.Email2} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Email2') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Email2" className={classNames({ 'p-error': isFormFieldValid('Email2') })}>Correo 2</label>
                                    </span>
                                    {getFormErrorMessage('Email2')}
                                    <span className="p-float-label">
                                        <InputText id="Contact2" name="Contact2" value={formik.values.Contact2} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Contact2') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Contact2" className={classNames({ 'p-error': isFormFieldValid('Contact2') })}>Contacto 2</label>
                                    </span>
                                    {getFormErrorMessage('Contact2')}

                                </div>)}
                        />

                        <Card
                            className="cardContenedorClientes"
                            titulo={<h6 className="clientesHeaderCard">Información de Facturacion</h6>}
                            contenido={(
                                <div className="informacionClienteContainer" style={{ marginTop: 1 }} >
                                    <span className="p-float-label">
                                        <Dropdown id="TipoPago" name="TipoPago" value={formik.values.TipoPago} onChange={formik.handleChange} options={tipoPagos} optionLabel="Nombre"
                                            optionValue="IdTipoPago" style={{ width: '100%' }} className="dropDownButton" />
                                        <label htmlFor="dropdown">Tipo Pago</label>
                                    </span>
                                    <span className="p-float-label">
                                        <Dropdown id="IdOrderUnits" name="IdOrderUnits" value={formik.values.IdOrderUnits} onChange={formik.handleChange} options={unidades} optionLabel="UnitName"
                                            optionValue="IdUnit" style={{ width: '100%' }} className="dropDownButton" />
                                        <label htmlFor="dropdown">Unidades</label>
                                    </span>

                                    <span className="p-float-label">
                                        <InputText id="CreditLimit" name="CreditLimit" value={formik.values.CreditLimit} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('CreditLimit') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="CreditLimit" className={classNames({ 'p-error': isFormFieldValid('CreditLimit') })}>Limite Credito</label>
                                    </span>
                                    {getFormErrorMessage('CreditLimit')}
                                    <span className="p-float-label">
                                        <Dropdown id="IdTerms" name="IdTerms" value={formik.values.IdTerms} onChange={formik.handleChange} options={terminos} optionLabel="TermName"
                                            optionValue="IdTerm" style={{ width: '100%' }} className="dropDownButton" />
                                        <label htmlFor="dropdown">Terminos</label>
                                    </span>
                                    <span className="p-float-label">
                                        <Dropdown id="IdFreightTerms" name="IdFreightTerms" value={formik.values.IdFreightTerms} onChange={formik.handleChange} options={terminos} optionLabel="TermName"
                                            optionValue="IdTerm" style={{ width: '100%' }} className="dropDownButton" />
                                        <label htmlFor="dropdown">Terminos Flete</label>
                                    </span>
                                    <span className="p-float-label">
                                        <InputText id="Porcentaje" name="Porcentaje" value={formik.values.Porcentaje} onChange={formik.handleChange} 
                                            className={classNames({ 'p-invalid': isFormFieldValid('Porcentaje') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="Porcentaje" className={classNames({ 'p-error': isFormFieldValid('Porcentaje') })}>% Exportacion</label>
                                    </span>
                                    {getFormErrorMessage('Porcentaje')}
                                    <span className="p-float-label" >
                                        <InputTextarea id="Comments" name="Comments" value={formik.values.Comments} onChange={formik.handleChange} style={{ width: '100%' }}
                                            className={classNames({ 'p-invalid': isFormFieldValid('Comments') })} autoComplete="off" rows={1} cols={65} />
                                        <label htmlFor="Comments" className={classNames({ 'p-error': isFormFieldValid('Comments') })}>Comentario</label>
                                    </span>
                                    {getFormErrorMessage('Comments')}

                                    <div style={{ alignSelf: "center" }}>
                                        <span>
                                            <Checkbox id="IsShipTo" name="IsShipTo" checked={formik.values.IsShipTo} onChange={formik.handleChange} />
                                            <label style={{ marginLeft: 3 }}>IsShipTo</label>
                                        </span>

                                        <span style={{ marginLeft: 30 }}>
                                            <Checkbox id="IsBillTo" name="IsBillTo" checked={formik.values.IsBillTo} onChange={formik.handleChange} />
                                            <label style={{ marginLeft: 3 }}>IsBillTo</label>
                                            {/* align-self */}
                                        </span>
                                    </div>



                                </div>)}
                        />
                        {/* <div className="columnasFormulario2" >
                            <span className="p-float-label" >
                                <InputTextarea id="Comments" name="Comments" value={formik.values.Comments} onChange={formik.handleChange} style={{ width: '100%' }}
                                    className={classNames({ 'p-invalid': isFormFieldValid('Comments') })} autoComplete="off" rows={2} cols={65} />
                                <label htmlFor="Comments" className={classNames({ 'p-error': isFormFieldValid('Comments') })}>Comentario</label>
                            </span>
                            {getFormErrorMessage('Comments')}

                            <span>
                                <Checkbox id="IsShipTo" name="IsShipTo" checked={formik.values.IsShipTo} onChange={formik.handleChange} />
                                <label>IsShipTo</label>
                            </span>

                            <span style={{ marginLeft: 30 }}>
                                <Checkbox id="IsBillTo" name="IsBillTo" checked={formik.values.IsBillTo} onChange={formik.handleChange} />
                                <label>IsBillTo</label>
                            </span>

                        </div> */}
                        <div className="p-dialog-footer">
                            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                            <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" />
                        </div>

                    </div>
                </form>


            </Dialog>
        </Fragment>
    )
}

export default ModalClientes
