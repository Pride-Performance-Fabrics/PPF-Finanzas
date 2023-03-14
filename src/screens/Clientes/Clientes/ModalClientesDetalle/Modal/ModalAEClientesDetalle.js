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
import { InputTextarea } from "primereact/inputtextarea";


//************** Componentes generales **************/
import Card from "../../../../../components/Card/Card";
import Icon from "../../../../../components/icon/Icon";
import Loader from "../../../../../components/Loader/Loader";
import IconApp from "../../../../../components/icon/IconApp";
import AgGrid from "../../../../../components/Tables/AgGrid";

//************** Componentes  **************/
import { useFormik } from 'formik';
import { decodeToken } from "react-jwt";

//************** Peticiones API  **************/
import { getEstadosClientesIPS } from "../../../../../Api/Global/StatusRequest";
import { getCustomers, getUltimoIdCustomerDetails, postCustomerDetails } from "../../../../../Api/Clientes/ClientesRequest";

//************** Servicios Creados **************/
import { setDateTimeSQL, getLocalDateString1 } from '../../../../../services/FechasService';
import { toastShow } from '../../../../../services/ToastService';


const ModalAEClientesDetalle = ({ toast, datos, icono, nombre, className,  obtenerCustomerDetails,  onClick }) => {
    const [clienteDetalleDialog, setClienteDetalleDialog] = useState(false);
    const [formData, setFormData] = useState({});
    const [date, setDate] = useState(new Date());

    const [clientes, setClientes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [ultimoId, setUltimoId] = useState(0);

    const obtenerListados = async() =>{
        const tempoClientes = await getCustomers()
        setClientes(tempoClientes)

        const tempoEstados = await getEstadosClientesIPS()
        setEstados(tempoEstados)

    }

    const openNewCliente = async () => {
        setClienteDetalleDialog(true);
        obtenerListados()

        const tempoUltimoId = await getUltimoIdCustomerDetails()
       
        setUltimoId(tempoUltimoId[0].IdDCustomer)

        typeof datos === 'object' ? formik.values.IdDCustomer = datos.IdDCustomer : formik.values.IdDCustomer = tempoUltimoId[0].IdDCustomer + 1

    }

    const hideDialogCliente = () => {
        setClienteDetalleDialog(false)
    }

    const agregarClienteDetalle = async (data) =>{

        const userInformation = decodeToken(localStorage.getItem(`ppfToken`));
        let user = userInformation.idUser
        data.IdUserEditWeb = user

        typeof datos === 'object' ? data.DateCreate = datos.DateCreate : data.DateCreate = getLocalDateString1(new Date())
        console.log(data)

        const result = await postCustomerDetails(data)
        if(result){
            toastShow(toast, 'success', 'Creado', 'Cliente Creado Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialogCliente()
            obtenerCustomerDetails()
            return true;
        }
        else{
            toastShow(toast, 'error', 'Error', 'Error al Crear el Cliente');
            return true;
        }
    }


    const inicioValores = {
        IdDCustomer: ultimoId + 1,
        IdCustomer: 0,
        IdStatus: 1,
        DateCreate: new Date(),
        RTN: '',
        CompanyName: '',
        Address: '',
        Contact: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: '',
        Tel: '',
        Email: '',
        IsShipTo: 0,
        IsBillTo: 0,
        IdBuyer: 0,
        IdUserEditWeb: 0
    }

    const formik = useFormik({
        initialValues: typeof datos === 'object' ? datos : inicioValores,
        validate: (data) => {
            let errors = {};

            if (!data.CompanyName) {
                errors.CompanyName = 'Se requiere el nombre del acceso.';
            }
            if (!data.CompanyName) {
                errors.CompanyName = 'Se requiere el nombre del acceso.';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarClienteDetalle(data)

        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };
    const selectCustomerNameTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.CustomerName}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const customerOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.CustomerName}</div>
            </div>
        );
    }




    return (
        <Fragment>
            <Button label={nombre} icon={icono} className={className} onClick={openNewCliente}/>
            <Dialog visible={clienteDetalleDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '70vw', height: '40vw' }}
                onHide={hideDialogCliente} header ="COMPRADOR FINAL">
                <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                    <div style={{ width: '100%', margin: 'auto', marginRight: '10%' }} className="d-flex flex-column  justify-content-center">
                        <Card
                            style={{ marginTop: 15 }}
                            id="cardTitulo"
                            className="cardContenedorClientes"
                            titulo={<h6 className="clientesHeaderCard">Información Cliente</h6>}
                            contenido={(
                                <div className="informacionClienteDetailsContainer" style={{ marginTop: 1 }} >
                                    <span className="p-float-label">
                                        <InputText id="IdDCustomer" name="IdDCustomer" value={formik.values.IdDCustomer} onChange={formik.handleChange} autoFocus disabled
                                            className={classNames({ 'p-invalid': isFormFieldValid('IdDCustomer') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="IdDCustomer" className={classNames({ 'p-error': isFormFieldValid('IdDCustomer') })}>CodigoCliente</label>
                                    </span>
                                    {getFormErrorMessage('IdDCustomer')}
                                    <span className="p-float-label">
                                        <InputText id="CompanyName" name="CompanyName" value={formik.values.CompanyName} onChange={formik.handleChange} s
                                            className={classNames({ 'p-invalid': isFormFieldValid('CompanyName') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="CompanyName" className={classNames({ 'p-error': isFormFieldValid('CompanyName') })}>Nombre Cliente</label>
                                    </span>
                                    {getFormErrorMessage('CompanyName')}
                                    <span className="p-float-label">
                                        <InputText id="RTN" name="RTN" value={formik.values.RTN} onChange={formik.handleChange}
                                            className={classNames({ 'p-invalid': isFormFieldValid('RTN') })} autoComplete="off" style={{ width: '100%' }} />
                                        <label htmlFor="RTN" className={classNames({ 'p-error': isFormFieldValid('RTN') })}>RTN</label>
                                    </span>
                                    {getFormErrorMessage('RTN')}
                                    <span className="p-float-label">
                                        <Dropdown id="IdCustomer" name="IdCustomer" value={formik.values.IdCustomer} onChange={formik.handleChange} options={clientes} optionLabel="CustomerName"
                                            optionValue="IdCustomer" style={{ width: '100%' }} className="dropDownButton" filter  filterBy="CustomerName" placeholder="Clientes"
                                            valueTemplate={selectCustomerNameTemplate} itemTemplate={customerOptionTemplate} />
                                        <label htmlFor="dropdown">Cliente   </label>
                                    </span>
                                    <span className="p-float-label">
                                        <Dropdown id="IdStatus" name="IdStatus" value={formik.values.IdStatus} onChange={formik.handleChange} options={estados} optionLabel="StatusName"
                                            optionValue="IdStatus" style={{ width: '100%' }} className="dropDownButton" />
                                        <label htmlFor="dropdown">Estado     </label>
                                    </span>

                                    <span className="p-float-label">
                                        <Calendar value={date} onChange={(e) => setDate(e.value)} style={{ width: '100%' }} showIcon disabled></Calendar>
                                        <label htmlFor="dropdown">Fecha Creado     </label>
                                    </span>
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
                                        <span style={{ marginLeft: 30 }}>
                                            <Checkbox id="IsBuyer" name="IsBuyer" checked={formik.values.IsBuyer} onChange={formik.handleChange} />
                                            <label style={{ marginLeft: 3 }}>IsBuyer</label>
                                        </span>
                                    </div>
                                   

                                </div>
                            )}
                        />
                          <Card
                            className="cardContenedorClientes"
                            titulo={<h6 className="clientesHeaderCard">Ubicación Cliente</h6>}
                            contenido={(
                                <div className="informacionClienteDetailsContainer" style={{ marginTop: 1 }}  >

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
                                <div className="informacionClienteDetailsContainer " style={{ marginTop: 1 }} >

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

                                </div>)}
                        />
                         <div className="p-dialog-footer">
                            <Button label="Cancelar"  type="button" icon="pi pi-times" className="p-button-text" onClick={hideDialogCliente} />
                            <Button type='submit' label="Guardar" icon="pi pi-check" className="p-button-text" />
                        </div>
                    </div>
                </form>

            </Dialog>
        </Fragment>
    )
}

export default ModalAEClientesDetalle
