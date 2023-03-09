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

//************** Servicios Creados **************/
import { fechaTemplate, decimalValueTemplate } from "../../../../services/TemplatesServices";

//************** Consultas API **************/

import { getInvoicesCustomer } from "../../../../Api/Ventas/FacturasRequest";

//************** Componentes Especificos **************/

import ModalFacturas from "../../../Ventas/Facturas/ModalFacturas/ModalFacturas";

const ModalFacturasCliente = ({ IdCustomer }) => {

    const [clienteFacturasDialog, setClienteFacturasDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])


    const NumberInvoiceTemplate = (rowData) => {
        return <ModalFacturas datos={rowData} />
    }


    const table = {
        Data: data,
        Columns: [
            {
                field: 'IdInvoiceIPS',
                header: 'IdInvoiceIPS',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'left'

            },
            {
                field: 'NumberInvoice',
                header: 'NumberInvoice',
                className: 'colum-width-medium',
                body: (rowData) => NumberInvoiceTemplate(rowData),
                Format: "Template",
                frozen: 'true',
                alignFrozen: 'left'
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
                header: 'StatusName',
                className: 'colum-width-medium',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)
            },
            {
                field: 'StyleCategory',
                header: 'StyleCategory',
                className: 'colum-width-medium',
            },
            {
                field: 'CustomerName',
                header: 'CustomerName',
                className: 'colum-width-large',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'UnitName',
                header: 'UnitName',
                className: 'colum-width-small',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'RollosT',
                header: 'RollosT',
                className: 'colum-width-Xsmall',
                Sumary: 'sum',
                Format: "Template",
                body: (rowData) => decimalValueTemplate(rowData.RollosT)
            }, {
                field: 'KgsT',
                header: 'KgsT',
                className: 'colum-width-Xsmall',
                Format: "Template",
                body: (rowData) => decimalValueTemplate(rowData.KgsT),
                Sumary: 'sum'
            },
            {
                field: 'YdsT',
                header: 'YdsT',
                className: 'colum-width-Xsmall',
                Format: "Template",
                body: (rowData) => decimalValueTemplate(rowData.YdsT),
                Sumary: 'sum'
            }, {
                field: 'LbsT',
                header: 'LbsT',
                className: 'colum-width-Xsmall',
                Format: "Template",
                body: (rowData) => decimalValueTemplate(rowData.LbsT),
                Sumary: 'sum'
            },
            {
                field: 'PcsT',
                header: 'PcsT',
                className: 'colum-width-Xsmall',
                Format: "Template",
                body: (rowData) => decimalValueTemplate(rowData.PcsT),
                Sumary: 'sum'
            },
            {
                field: 'TotalISV',
                header: 'TotalISV',
                className: 'colum-width-Xsmall',
                Format: "Template",
                body: (rowData) => decimalValueTemplate(rowData.TotalISV),
                frozen: 'true',
                alignFrozen: 'right',
                Sumary: 'sum'
            },
            {
                field: 'DescuentoRebajas',
                header: 'DescuentoRebajas',
                className: 'colum-width-Xsmall',
                Format: "Template",
                body: (rowData) => decimalValueTemplate(rowData.DescuentoRebajas),
                frozen: 'true',
                alignFrozen: 'right',
                Sumary: 'sum'
            },
            {
                field: 'Amount',
                header: 'Amount',
                className: 'colum-width-Xsmall',
                Format: "Template",
                body: (rowData) => decimalValueTemplate(rowData.Amount),
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
        console.log(result)
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

    return (
        <Fragment>
             <Loader loading={loading} />
            <Button className='p-button-rounded p-button-info p-button-text' icon='ri-wallet-line' onClick={openNew} />
            <Dialog visible={clienteFacturasDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '80vw', height: '80vh' }}
                onHide={hideDialog} header={<div className="d-flex">
                    <h3 className="mx-3">Facturas</h3>


                    <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line" loading={loading} onClick={obtenerFacturasCliente} />
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