import React, { Fragment, useState, useEffect, useRef } from "react";

//************** Componentes PrimerReact **************/
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { Calendar } from "primereact/calendar";

//************** Componentes generales **************/
import Card from "../../../../components/Card/Card";
import Icon from "../../../../components/icon/Icon";
import Loader from "../../../../components/Loader/Loader";
import IconApp from "../../../../components/icon/IconApp";
import AgGrid from "../../../../components/Tables/AgGrid";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

//************** Servicios Creados **************/
import { fechaTemplate, decimalValueTemplate } from "../../../../services/TemplatesServices";
import { toastShow } from "../../../../services/ToastService";

import { getDateProduction } from "../../../../services/FechasService";

//************** Consultas API **************/

import { getInvoicesCustomer, getInvoicesCustomerDates } from "../../../../Api/Ventas/FacturasRequest";

//************** Componentes Especificos **************/

import ModalFacturas from "../../../Ventas/Facturas/ModalFacturas/ModalFacturas";

const ModalFacturasCliente = ({icono, className,nombre, IdCustomer, NombreCustomer}) => {

    const [clienteFacturasDialog, setClienteFacturasDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [dates, setDates] = useState([new Date(), new Date()])


    const NumberInvoiceTemplate = (rowData) => {
        return <ModalFacturas datos={rowData} />
    }


    const table = {
        Data: data,
        Columns: [
            // {
            //     field: 'IdInvoiceIPS',
            //     header: 'IdInvoiceIPS',
            //     className: 'colum-width-Xsmall',
            //     frozen: 'true',
            //     alignFrozen: 'left'

            // },
            {
                field: 'NumberInvoice',
                header: 'NumberInvoice',
                className: 'colum-width-medium',
                body: (rowData) => NumberInvoiceTemplate(rowData),
                Format: "Template",
                frozen: 'true',
                alignFrozen: 'left',
                Sumary: 'count'
            },
            {
                field: 'FechaFactura',
                header: 'FechaFactura',
                className: 'colum-width-medium',
                Format: 'Template',
                body: (rowData) => fechaTemplate(rowData.FechaFactura)

            },
            {
                field: 'StatusName',
                header: 'Estado',
                className: 'colum-width-medium',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)
            },
            {
                field: 'StyleCategory',
                header: 'Categoria',
                className: 'colum-width-medium',
            },
            {
                field: 'CustomerName',
                header: 'Cliente',
                className: 'colum-width-large',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'UnitName',
                header: 'Unidad',
                className: 'colum-width-small',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'RollosT',
                header: 'Rollos',
                className: 'colum-width-Xsmall',
                Sumary: 'sum',
                Format: "Decimal"
            }, {
                field: 'KgsT',
                header: 'Kgs',
                className: 'colum-width-Xsmall',
                Format: "Decimal",
              
                Sumary: 'sum'
            },
            {
                field: 'YdsT',
                header: 'Yds',
                className: 'colum-width-Xsmall',
                Format: "Decimal",
              
                Sumary: 'sum'
            }, {
                field: 'LbsT',
                header: 'Lbs',
                className: 'colum-width-Xsmall',
                Format: "Decimal",
                Sumary: 'sum'
            },
            {
                field: 'PcsT',
                header: 'Pcs',
                className: 'colum-width-Xsmall',
                Format: "Decimal",
                Sumary: 'sum'
            },
            {
                field: 'TotalISV',
                header: 'Total ISV',
                className: 'colum-width-Xsmall',
                Format: "Decimal",
                Sumary: 'sum'
            },
            {
                field: 'DescuentoRebajas',
                header: 'DescuentoRebajas',
                className: 'colum-width-Xsmall',
                Format: "Decimal",
                Sumary: 'sum'
            },
            {
                field: 'Amount',
                header: 'Total $',
                className: 'small',
                Format: "Decimal",
                frozen: 'true',
                alignFrozen: 'right',
                Sumary: 'sum'
            },
            {
                field: 'ValorLps',
                header: 'Total L',
                className: 'small',
                Format: "Decimal",
                frozen: 'true',
                alignFrozen: 'right',
                Sumary: 'sum'
            },



            {
                field: 'Comment',
                header: 'Comment',
                className: 'colum-width-Xlarge',
            },
        ]
    }

    const obtenerFacturasCliente = async () => {
        setLoading(true)
        const result = await getInvoicesCustomer(IdCustomer)
        // console.log(result)
        setData(result)
        setLoading(false)
    }


    const openNew = () => {

        setClienteFacturasDialog(true)
        setLoading(false)
        obtenerFacturasCliente()
    }

    const hideDialog = () => {
        setClienteFacturasDialog(false)
    }

    const botones = () =>{
        if(nombre ===""){
            return   <Button className="p-button-rounded p-button-info p-button-text" 
            icon="ri-wallet-line" 
            onClick={openNew}/>
        }
        else{
           return <span style={{ color: "black", fontSize: 15 }}  onDoubleClick={openNew}>{nombre} </span>
    
        }
    }

    const obtenerFacturasFechaCliente = async() =>{
        setLoading(true)
        setData([])
        if (!dates[0] !== null) {
            if (!dates[1]) {
                // toastShow(toast, 'warn', 'Error', 'Seleccione dos fechas para buscar');
            }
            else {
                // const result = await getInvoicesDates(fechas)
                // console.log(result)

                const fechaFormato = getDateProduction(dates)
                console.log(fechaFormato)
            
                const result = await getInvoicesCustomerDates(fechaFormato, IdCustomer)
                console.log(result)
                setData(result)
              
                
            }

        } else {
            // toastShow(toast, 'error', 'Error', 'Debe de selecionar una fecha.');
        }

        setLoading(false)
    }

    return (
        <Fragment>
             <Loader loading={loading} />
            {/* <Button className={className} icon={icono} onClick={openNew} label={nombre} style={nombre=== "" ? {fontSize: 16 }: { color: "black", fontSize: 12 }}/> */}
            {botones()}
             <Dialog visible={clienteFacturasDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '80vw', height: '80vh' }}
                onHide={hideDialog} header={<div className="d-flex">
                    <h3 className="mx-3">Facturas: <strong>{NombreCustomer}</strong></h3>
                    <Calendar id="range" value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" showIcon style={{ height: 35 }} />
                    <Button className=" mx-2" icon="pi pi-search" loading={loading} onClick={obtenerFacturasFechaCliente} style={{ height: 35 }}  />
                    <Button  icon="ri-restart-line" loading={loading} onClick={obtenerFacturasFechaCliente} style={{ height: 35 }}  />
                </div>} >
                <Loader loading={loading} />


                <div className='pt-1' style={{ height: '65vh' }}>
                


                    <AgGrid table={table} />
                </div>

            </Dialog>
        </Fragment>
    )
}

export default ModalFacturasCliente