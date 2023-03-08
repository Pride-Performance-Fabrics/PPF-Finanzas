import React, { Fragment, useState, useEffect, useRef } from "react";



//************** Componentes PrimerReact **************/
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';


//************** Componentes generales **************/
import Card from "../../../../components/Card/Card";
import Icon from "../../../../components/icon/Icon";
import Loader from "../../../../components/Loader/Loader";
import IconApp from "../../../../components/icon/IconApp";
import AgGrid from "../../../../components/Tables/AgGrid";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

//************** Consultas API **************/
import { getALLCustomersDetails, getCustomerDetails, putChecksCustomerDetails, putStatusCustomerDetails } from '../../../../Api/Clientes/ClientesRequest';

//************** Servicios **************/
import { fechaLocalStringTemplate, fechaTemplate } from '../../../../services/TemplatesServices';


//************** Componentes Especificos **************/
import ModalAEClientesDetalle from "./Modal/ModalAEClientesDetalle";


const ModalClientesDetails = ({ IdCustomer }) => {

    const [clientesDetailsDialog, setClientesDetailsDialog] = useState(false);
    // const [clienteDetalleDialog, setClienteDetalleDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState([]);
    const toast = useRef(null);
    const [habilitar, setHabilitar] = useState(false)


    let aspectoBoton = [
        {
            Id: 1,
            Nombre: "Nuevo",
            Icono: "pi pi-plus",
            className: "p-button-Primary mr-2"
        },

        {
            Id: 2,
            Nombre: "",
            Icono: "pi pi-pencil",
            className: "p-button-rounded p-button-info p-button-text"
        }
    ]

    const onChangeCheck = async (valor, IdDCustomer, e) => {

        console.log(valor, IdDCustomer, e)

        let checkValores = {
            Valor: valor,
            Activo: e,
         IdDCustomer: IdDCustomer,
         IdCustomer: IdCustomer
        }


        setLoading(true)
        const result = await putChecksCustomerDetails(checkValores)
        const temporal = result.map((item) => {
            // console.log(item)
            if (item.id === IdDCustomer) {
                item.IsShipTo = true
            }
            return item
        })

        setData(temporal)
        setLoading(false)

    }

    const statusBodyTemplate = (e) => {

        switch (e.IdStatus) {
            case 1:
                return <Tag style={{ width: 60 }} severity="success" value={e.StatusName} />
                break;
            case 2:
                return <Tag style={{ width: 60 }} severity="danger" value={e.StatusName} />
                break;
            case 7:
                return <Tag style={{ width: 60 }} severity="warnig" value={e.StatusName} />
                break;
            default:
                return <Tag style={{ width: 60 }} severity="info" value={e.StatusName} />
                break;

        }

    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Cambio de estado cancelado', life: 3000 });
    }

    const putStatus = async(datosCliente) =>{
        const result = await putStatusCustomerDetails(datosCliente)
        console.log(result)
        setData(result)

        console.log(datosCliente)

        datosCliente.IdStatus === 2 ? setHabilitar(true) : setHabilitar(false) 
    } 

    

    const cancelarCliente = async (rowData,valor) =>{
        console.log(rowData)
      
        let datosCliente = {
            IdCustomer: rowData.IdCustomer,
            IdDCustomer: rowData.IdDCustomer,
            IdStatus: valor
        }

        confirmDialog({
            message: '¿Está seguro que desea cambiar el estado del cliente?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept : () => putStatus(datosCliente),
            reject:  reject
        });

       
  
    }

    const botones = (rowData) => {
        // console.log(rowData)
        return (
            <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop: -6 }}>
                <ModalAEClientesDetalle
                    datos={rowData}
                    toast={toast}
                    icono={aspectoBoton[1].Icono}
                    nombre={aspectoBoton[1].Nombre}
                    className={aspectoBoton[1].className}
                    obtenerCustomerDetails={obtenerCustomerDetails}
                    // clienteDetalleDialog={clienteDetalleDialog}
                    // setClienteDetalleDialog={ setClienteDetalleDialog}
                />
                <Button label={''} className='p-button-rounded p-button-info p-button-text' icon='ri-close-circle-line' style={{ color: "red" }}
                onClick={() =>cancelarCliente(rowData, 2)} disabled={habilitar}/>
                <Button label={''} className='p-button-rounded p-button-info p-button-text' icon='ri-checkbox-circle-fill' style={{ color: "green" }}
                onClick={() =>cancelarCliente(rowData, 1)} disabled={!habilitar}/>
            </div>

        )
    }

    const table = {
        Data: data,
        Columns: [
            {
                field: 'IdDCustomer',
                header: 'Codigo Cliente',
                className: 'colum-width-small',
            },

            {
                field: 'StatusName',
                header: 'Estado',
                className: 'colum-width-Xsmall',
                Format: 'Template',
                body: e => statusBodyTemplate(e)

            },
            {
                field: 'DateCreate',
                header: 'DateCreate',
                className: 'colum-width-medium',
                Format: 'Template',
                body: (rowData) => fechaTemplate(rowData.DateCreate)
            },
            {
                field: 'CustomerName',
                header: 'Compañia',
                className: 'colum-width-large',
            },
            {
                field: 'IsBuyer',
                header: 'IsBuyer',
                className: 'colum-width-small',
                Format: "Template",
                align: "center",
                body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(1, rowData.IdDCustomer, e.checked)} style={{ marginBottom: 5 }} checked={rowData.IsBuyer} />,
            },
            {
                field: 'IsShipTo',
                header: 'IsShipTo',
                className: 'colum-width-small',
                Format: "Template",
                align: "center",
                body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(2, rowData.IdDCustomer, e.checked)} style={{ marginBottom: 5 }} checked={rowData.IsShipTo} />,
            },
            {
                field: 'IsBillTo',
                header: 'IsBillTo',
                className: 'colum-width-small',
                Format: "Template",
                align: "center",
                body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(3, rowData.IdDCustomer, e.checked)} style={{ marginBottom: 5 }} checked={rowData.IsBillTo} />,
            },

            {
                field: 'RTN',
                header: 'RTN',
                className: 'colum-width-small',
            },
            {
                field: 'Address',
                header: 'Direccion',
                className: 'colum-width-large',

            },

            {
                field: 'Contact',
                header: 'Contact',
                className: 'colum-width-medium',
            },
            {
                field: 'City',
                header: 'City',
                className: 'colum-width-small',
            },
            {
                field: 'State',
                header: 'State',
                className: 'colum-width-medium',
            },
            {
                field: 'Country',
                header: 'Country',
                className: 'colum-width-medium',
            },
            {
                field: 'ZipCode',
                header: 'ZipCode',
                className: 'colum-width-medium',
            },
            {
                field: 'Tel',
                header: 'Tel',
                className: 'colum-width-medium',
            },
            {
                field: 'Email',
                header: 'Email',
                className: 'colum-width-medium',
            },
            {
                header: 'Acciones',
                className: 'colum-width-small',
                body: (rowData) => botones(rowData),
                Format: "Template",
                frozen: 'true',
                alignFrozen: 'right',
            }

        ],
        key: 'IdCustomerDetails ',
        // scrollHeight: '100%',
    }

    const obtenerCustomerDetails = async () => {
        setLoading(true)
        const result = await getCustomerDetails(IdCustomer)
        console.log(result)
        setData(result)
        setLoading(false)
    }

    const openNew = () => {
        // setLoading(true)
        setClientesDetailsDialog(true)
        obtenerCustomerDetails(IdCustomer)
        setLoading(false)
    }

    const hideDialog = () => {
        setClientesDetailsDialog(false)
    }


    return (
        <Fragment>
            <Button className='p-button-rounded p-button-info p-button-text' icon='ri-file-user-line' style={{ color: "black" }} onClick={openNew} />
            <Dialog visible={clientesDetailsDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '80vw', height: '40vw' }}
                onHide={hideDialog}  header ="COMPRADORES FINALES"  >
                <Loader loading={loading} />
                <Card
                    titulo={<div className="d-flex">
                        {/* <h3 className="mx-3">Compradores Finales</h3> */}
                        <ModalAEClientesDetalle
                            toast={toast}
                            icono={aspectoBoton[0].Icono}
                            nombre={aspectoBoton[0].Nombre}
                            className={aspectoBoton[0].className}
                            obtenerCustomerDetails={obtenerCustomerDetails}
                            // clienteDetalleDialog={clienteDetalleDialog}
                            // setClienteDetalleDialog={ setClienteDetalleDialog}
                            onClick={true}
                        />
                        <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line" loading={loading} onClick={obtenerCustomerDetails} />
                    </div>}
                    contenido={
                        <div className='pt-4' style={{ height: '60vh' }}>
                            <Toast position="bottom-right" ref={toast} />


                            <AgGrid table={table} />
                        </div>
                    }
                />
            </Dialog>
        </Fragment>
    )
}

export default ModalClientesDetails