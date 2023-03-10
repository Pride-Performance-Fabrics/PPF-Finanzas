import React from "react";
import { useState, useEffect, useRef } from "react";


//************** Componentes PrimerReact **************/
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';

//************** Componentes generales **************/
import Card from "../../../components/Card/Card";
import Icon from "../../../components/icon/Icon";
import Loader from "../../../components/Loader/Loader";
import IconApp from "../../../components/icon/IconApp";
import AgGrid from "../../../components/Tables/AgGrid";


//************** Consultas generales **************/
import { getInvoices } from "../../../Api/Ventas/FacturasRequest";

//************** Servicios **************/

import { fechaLocalStringTemplate, fechaTemplate } from '../../../services/TemplatesServices';

//************** Componentes Especificos **************/
import ModalFacturas from "./ModalFacturas/ModalFacturas";

const FacturasScreen = () => {

    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const [data, setData] = useState([]);

  const  NumberInvoiceTemplate = (rowData) =>{
    return <ModalFacturas datos = {rowData}/>
  }


    const table = {
        Data: data,
        Columns: [
            // {
            //     field: 'IdInvoice',
            //     header: 'IdInvoice',
            //     className: 'colum-width-small',
            // },
            // {
            //     field: 'IdInvoiceIPS',
            //     header: 'IdInvoiceIPS',
            //     className: 'colum-width-Xsmall',
            //     frozen: 'true',
            //     alignFrozen: 'left'
               
            // },
            {
                field: 'NumberInvoice',
                header: 'Numero Factura',
                className: 'colum-width-large',
                body: (rowData) => NumberInvoiceTemplate(rowData),
                Format: "Template",
                frozen: 'true',
                alignFrozen: 'left',
                Sumary: 'count',
                // Filter: 'true',
                filter: true
            },
            {
                field: 'InvoiceDate',
                header: 'Fecha Factura',
                className: 'colum-width-medium',
                 Format: 'Template',
                body: (rowData) => fechaTemplate(rowData.InvoiceDate)
               
            },
            {
                field: 'CustomerName',
                header: 'Cliente',
                className: 'colum-width-large',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'StatusName',
                header: 'Estado',
                className: 'colum-width-medium',
                 // Format: 'Template',
                // body: e => statusBodyTemplate(e)
            },
            {
                field: 'RTNCustomer',
                header: 'RTN Cliente',
                className: 'colum-width-small',
            },
            {
                field: 'ShipTo',
                header: 'ShipTo',
                className: 'colum-width-Xlarge',
            }, 
            {
                field: 'BillTo',
                header: 'BillTo',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'Comment',
                header: 'Commentario',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'Amount',
                header: 'Total $',
                className: 'colum-width-medium',
                frozen: 'true',
                alignFrozen: 'right',
                Format: "Decimal",
                Sumary: 'sum'

            },
            {
                field: 'ValorLps',
                header: 'Total L',
                className: 'colum-width-medium',
                frozen: 'true',
                alignFrozen: 'right',
                Format: "Decimal",
                Sumary: 'sum'

            },
        ]
    }


    const getListadoFacturas = async () => {
        setLoading(true)
        const result = await getInvoices()
        console.log(result)
        setData(result)
        setLoading(false)
    }

    useEffect(() => {
        getListadoFacturas();
        window.document.title = 'PPF • Ventas Facturas';
    }, [])



    return (
        <div>
            <Loader loading={loading} />
            {/* <ConfirmDialog  /> */}
            <Card
                titulo={<div className="d-flex">
                    <h3 className="mx-3">Facturas</h3>
                    {/* <ModalClientes
                        toast={toast}
                        icono={aspectoBoton[0].Icono}
                        nombre={aspectoBoton[0].Nombre}
                        className={aspectoBoton[0].className}
                        getListadoClientes={getListadoClientes}
                    /> */}

                    <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line" loading={loading} onClick={getListadoFacturas} />
                </div>}
                contenido={
                    <div className='pt-4' style={{ height: '90vh' }}>
                        <Toast position="bottom-right" ref={toast} />


                        <AgGrid table={table} />
                    </div>
                }
            />
        </div>
    )
}

export default FacturasScreen