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
                field: 'InvoiceDate',
                header: 'InvoiceDate',
                className: 'colum-width-medium',
                 Format: 'Template',
                body: (rowData) => fechaTemplate(rowData.InvoiceDate)
               
            },
            {
                field: 'CustomerName',
                header: 'CustomerName',
                className: 'colum-width-large',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'StatusName',
                header: 'StatusName',
                className: 'colum-width-medium',
                 // Format: 'Template',
                // body: e => statusBodyTemplate(e)
            },
            {
                field: 'RTNCustomer',
                header: 'RTNCustomer',
                className: 'colum-width-medium',
            },
            {
                field: 'ShipTo',
                header: 'ShipTo',
                className: 'colum-width-large',
            }, {
                field: 'BillTo',
                header: 'BillTo',
                className: 'colum-width-large',
            },
            {
                field: 'Comment',
                header: 'Comment',
                className: 'colum-width-Xlarge',
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