import React from "react";
import { useState, useEffect, useRef } from "react";


//************** Componentes PrimerReact **************/
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

//************** Componentes generales **************/
import Card from "../../../components/Card/Card";
import Icon from "../../../components/icon/Icon";
import Loader from "../../../components/Loader/Loader";
import IconApp from "../../../components/icon/IconApp";
import AgGrid from "../../../components/Tables/AgGrid";


//************** Consultas generales **************/
import { getInvoices, getInvoicesDates } from "../../../Api/Ventas/FacturasRequest";

//************** Servicios **************/

import { fechaLocalStringTemplate, fechaTemplate } from '../../../services/TemplatesServices';
import { toastShow } from "../../../services/ToastService";

import { getDateProduction } from "../../../services/FechasService";

//************** Componentes Especificos **************/
import ModalFacturas from "./ModalFacturas/ModalFacturas";

import ModalFacturasCliente from "../../Clientes/Clientes/ModalClientes/ModalFacturasCliente";


const FacturasScreen = () => {

    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([new Date(), new Date()])

    const NumberInvoiceTemplate = (rowData) => {
        return <ModalFacturas datos={rowData} />
    }

    let aspectoBoton = [
        {
            Id: 1,
            Icono: "",
            className: "p-button-text"
        }
    ]

    const FacturasClienteTemplate = (rowData) => {
        return <ModalFacturasCliente
            icono={aspectoBoton[0].Icono}
            className={aspectoBoton[0].className}
            nombre={rowData.CustomerName}
            IdCustomer={rowData.IdCustomer}
            NombreCustomer={rowData.CustomerName}
        />
    }

    const tipoFacturaTemplate = (rowData) => {
        return (<Tag style={{
            width: 120, backgroundColor: rowData.IdInvoiceCategory === 4 ? "#A4D2EB" : "#F7F7F7",
            color: "black"
        }} value={rowData.TipoFactura} />)

        // if(rowData.IdInvoiceCategory === 4){
        //    console.log(rowData.IdInvoiceCategory)
        // }
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
                Format: 'DateTime',
                // body: (rowData) => fechaTemplate(rowData.InvoiceDate)

            },
            {
                field: 'TipoFactura',
                header: 'Tipo Factura',
                className: 'colum-width-medium',
                Format: "Template",
                body: (rowData) => tipoFacturaTemplate(rowData),
                filter: true,
                align: "center"
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'CustomerName',
                header: 'Cliente',
                className: 'colum-width-large',
                body: (rowData) => FacturasClienteTemplate(rowData),
                Format: 'Template',
                filter: true
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
        // console.log(result)
        setData(result)
        setLoading(false)
    }

    const obtenerFacturasFechas = async () => {
        // console.log(setDateTimeSQL(dates[0]))
        // console.log(setDateTimeSQL(dates[1]))
        setLoading(true)
        setData([])
        if (!dates[0] !== null) {
            if (!dates[1]) {
                toastShow(toast, 'warn', 'Error', 'Seleccione dos fechas para buscar');
            }
            else {
                // const result = await getInvoicesDates(fechas)
                // console.log(result)

                const fechaFormato = getDateProduction(dates)
                console.log(fechaFormato)
            
                const result = await getInvoicesDates(fechaFormato)
                console.log(result)
                setData(result)
              
                
            }

        } else {
            toastShow(toast, 'error', 'Error', 'Debe de selecionar una fecha.');
        }

        setLoading(false)

        // let fecha1 = setDateTimeSQL(dates[0])
        // let fecha2 = setDateTimeSQL(dates[1])

        // let fechas = [
        //     fecha1, fecha2
        // ]


    }

    useEffect(() => {
        // getListadoFacturas();
        window.document.title = 'PPF • Ventas Facturas';
    }, [])





    return (
        <div>
            <Loader loading={loading} />
            {/* <ConfirmDialog  /> */}
            <Card
                titulo={<div className="d-flex" style={{ alignItems: "center" }}>
                    <h3 className="mx-3">Facturas</h3>
                    {/* <ModalClientes toast={toast} icono={aspectoBoton[0].Icono} nombre={aspectoBoton[0].Nombre} className={aspectoBoton[0].className} getListadoClientes={getListadoClientes}
                    /> */}

                    <Calendar id="range" value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" showIcon style={{ height: 35 }} />
                    <Button className=" mx-2" icon="pi pi-search" loading={loading} onClick={obtenerFacturasFechas} />
                    <Button className="mx-2" icon="ri-restart-line" loading={loading} onClick={obtenerFacturasFechas} />
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