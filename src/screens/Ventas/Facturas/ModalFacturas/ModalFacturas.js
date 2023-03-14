import React, { Fragment, useState, useEffect, useRef } from "react";


//************** Componentes generales **************/
import Card from "../../../../components/Card/Card";
import Icon from "../../../../components/icon/Icon";
import Loader from "../../../../components/Loader/Loader";
import IconApp from "../../../../components/icon/IconApp";
import AgGrid from "../../../../components/Tables/AgGrid";


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

//************** Consultas API **************/
import { getInvoicesDetails } from "../../../../Api/Ventas/FacturasRequest";

import { setDateTimeSQL, getDate } from "../../../../services/FechasService";

import { decimalValueTemplate } from "../../../../services/TemplatesServices";

import ModalFacturasCliente from "../../../Clientes/Clientes/ModalClientes/ModalFacturasCliente";

const ModalFacturas = ({ datos }) => {
    // console.log(datos)

    const [facturaDialog, setFacturaDialog] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mostrar, setMostrar] = useState(false)


    const obtenerListadoInvoiceDetails = async (idFactura) => {
        setLoading(true)
        const result = await getInvoicesDetails(idFactura)
        setData(result)
        setLoading(false)
    }

    const onChangeCheck = (tipo, valor, activo) => {

    }

    let aspectoBoton = [
        {
            Id: 1,
            Icono: "",
            className: "p-button-text"
        }
    ]

    const openNew = () => {
        setLoading(true)
        setFacturaDialog(true)
        obtenerListadoInvoiceDetails(datos.IdInvoiceIPS)
        // setLoading(false)

    }

    const hideDialog = () => {
        setFacturaDialog(false);
    }

    useEffect(() => {
        datos.IdInvoiceType === 2 ? setMostrar(true) : setMostrar(false)
    }, [])

    const ColumnsFacturasImexDetails = [
        {
            field: 'StatusName',
            header: 'Estado',
            className: 'colum-width-small',
        },
        {
            field: 'Producto',
            header: 'Producto',
            className: 'colum-width-small',
        },
        {
            field: 'UnitName',
            header: 'Unidad',
            className: 'colum-width-small',
        },
        {
            field: 'Moneda',
            header: 'Moneda',
            className: 'colum-width-small',
        },
        {
            field: 'RollosF',
            header: 'Items',
            className: 'colum-width-small',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'KgsF',
            header: 'Cantidad/Kgs',
            className: 'colum-width-small',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'LbsF',
            header: 'Libras',
            className: 'colum-width-small',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'Price',
            header: 'Precio',
            className: 'colum-width-small',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'Amount',
            header: 'SubTotal',
            className: 'colum-width-medium',
            Format: "Decimal",
            Sumary: 'sum'

        },
        {
            field: 'Descuento',
            header: 'Descuento',
            className: 'colum-width-medium',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'PISV',
            header: '% ISV',
            className: 'colum-width-medium',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'ISV',
            header: 'ISV',
            className: 'colum-width-medium',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'Total',
            header: 'Total',
            className: 'colum-width-medium',
            frozen: 'true',
            alignFrozen: 'right',
            Format: "Decimal",
            Sumary: 'sum'

        },


    ]

    const ColumnsFacturasProduccion = [
        // {
        //     field: 'IsSelected',
        //     header: 'Selected',
        //     className: 'colum-width-Xsmall',
        //     frozen: 'true',
        //     alignFrozen: 'left',
        //     Format: "Template",
        //     body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(1, rowData.IsSelected, e.checked)} style={{ marginBottom: 5 }} checked={rowData.IsSelected} />,

        // }, ,
        // {
        //     field: 'ShipmentNo',
        //     header: 'Shipment No',
        //     className: 'colum-width-Xsmall',
        //     frozen: 'true',
        //     alignFrozen: 'left'

        // },
        {
            field: 'PC',
            header: 'PC',
            className: 'colum-width-small',
            frozen: 'true',
            alignFrozen: 'left'

        },
        {
            field: 'SalesOrder',
            header: 'Orden Venta',
            className: 'colum-width-medium',
            // body: (rowData) => NumberInvoiceTemplate(rowData),
            // Format: "Template",
            frozen: 'true',
            alignFrozen: 'left'
        },
        // {
        //     field: 'CustomerName',
        //     header: 'Cliente',
        //     className: 'colum-width-large',
        //     // Format: 'Template',
        //     // body: e => statusBodyTemplate(e)

        // },
        {
            field: 'StyleName',
            header: 'Estilo',
            className: 'colum-width-large',
            //  Format: 'Template',
            // body: (rowData) => fechaTemplate(rowData.InvoiceDate)

        },

        {
            field: 'WDescription',
            header: 'Densidad',
            className: 'colum-width-medium',
            // Format: 'Template',
            // body: e => statusBodyTemplate(e)
        },
        {
            field: 'ColorName',
            header: 'Color',
            className: 'colum-width-medium',
        },
        {
            field: 'CustomerOrder',
            header: 'PO',
            className: 'colum-width-small',
        },
        // {
        //     field: 'StyleCategory',
        //     header: 'Categoria',
        //     className: 'colum-width-medium',
        // },
        // {
        //     field: 'CompanyName',
        //     header: 'Cliente',
        //     className: 'colum-width-Xlarge',
        // },
        {
            field: 'StatusName',
            header: 'Estado',
            className: 'colum-width-small',
        },
        {
            field: 'TermName',
            header: 'Termino',
            className: 'colum-width-small',
        },
        {
            field: 'UnitName',
            header: 'Unidad',
            className: 'colum-width-small',
        },
        // {
        //     field: 'Porcentaje',
        //     header: 'Porcentaje',
        //     className: 'colum-width-Xsmall',
        //     // frozen: 'true',
        //     // alignFrozen: 'right',
        //     Format: "Template",
        //     body: (rowData) => decimalValueTemplate(rowData.Porcentaje)
        // },
        // {
        //     field: 'BlockFinanzas',
        //     header: 'BlockFinanzas',
        //     className: 'colum-width-Xsmall',
        //     Format: "Template",
        //     body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(1, rowData.BlockFinanzas, e.checked)} style={{ marginBottom: 5 }} checked={rowData.BlockFinanzas} />,
        // },
        {
            field: 'RollosF',
            header: 'Rollos',
            className: 'colum-width-Xsmall',
            // frozen: 'true',
            // alignFrozen: 'right',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'KgsF',
            header: 'Kgs',
            className: 'colum-width-Xsmall',
            // frozen: 'true',
            // alignFrozen: 'right',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'YdsF',
            header: 'Yds',
            className: 'colum-width-Xsmall',
            Format: "Decimal",
            Sumary: 'sum'
        },
        {
            field: 'LbsF',
            header: 'Lbs',
            className: 'colum-width-Xsmall',
            Format: "Decimal",
            Sumary: 'sum'

        },
        {
            field: 'PcsF',
            header: 'Pcs',
            className: 'colum-width-Xsmall',
            Format: "Decimal",
            Sumary: 'sum'

        },
        {
            field: 'PcsMalas',
            header: 'Pcs Malas',
            className: 'colum-width-Xsmall',
            Format: "Decimal",
            Sumary: 'sum'

        },
        {
            field: 'Price',
            header: 'Precio',
            className: 'colum-width-Xsmall',
            Format: "Decimal",
            Sumary: 'sum'


        },
        {
            field: 'Amount',
            header: 'Total',
            className: 'colum-width-medium',
            frozen: 'true',
            alignFrozen: 'right',
            Format: "Decimal",
            Sumary: 'sum'

        },


    ]


    const table = {
        Data: data,
        Columns: datos.IdInvoiceType === 1 ? ColumnsFacturasProduccion : ColumnsFacturasImexDetails

    }
    return (
        <Fragment>
            <Button label={datos.NumberInvoice} icon="" className="p-button-text" onDoubleClick={openNew} style={{ color: "black", fontSize: 12 }} />
            <Dialog visible={facturaDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '95vw', height: '100vh' }}
                onHide={hideDialog} header={<div><h3> No.Factura: <strong>{datos.NumberInvoice}</strong> </h3></div>}>
                <div id="ModalFactura">
                    {/* {loading + ""} */}
                    <Loader loading={loading} querySelector="#ModalFactura" />

                    {/* <div className="d-flex flex-column justify-content-center"></div> */}
                    <Card
                        titulo={"General"}
                        contenido={
                            <div className="d-flex flex-row">

                                <Card
                                    // style={{wid}}
                                    titulo={""}
                                    className="cardContenedorGeneral"
                                    contenido={
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="me-3">

                                                <div className="mt-1" >
                                                    <span >Estado: </span>
                                                    <label id="StatusName" name="StatusName"> {datos.StatusName}</label>
                                                    {/* <InputText id="NumberInvoice" name="NumberInvoice" value={datos.StatusName} style={{ width: 160 }} /> */}
                                                </div>
                                                <div>
                                                    <span > Fecha Factura:  </span>
                                                    <label id="FechaFactura" name="FechaFactura">{setDateTimeSQL(datos.FechaFactura)}</label>
                                                </div>
                                                <div>
                                                    <span > Tipo Factura:  </span>
                                                    <label id="IdInvoiceType" name="IdInvoiceType">{datos.TipoFactura}</label>
                                                </div>

                                                <div>
                                                    <span >  CAI:  </span>
                                                    <label>{datos.CAI}</label>
                                                    {/* <InputText id="CAI" name="CAI" value={datos.CAI} style={{ width: 150, marginLeft: 5 }}  className="mb-1"/><br /> */}
                                                </div>


                                            </div>

                                            <div className="InformacionTipoFactura" >

                                                <span>
                                                    <span > No.Exo:  </span>
                                                    <label>{datos.NoExoneracion}</label><br />
                                                    {/* <InputText id="RTNEmpresa" name="RTNEmpresa" value={datos.NoExoneracion} style={{ width: 150 }}  className="mb-1"/><br /> */}
                                                </span>
                                                <span>
                                                    <span  >    Vence el:  </span>
                                                    <label id="FechaVencido" name="FechaVencido">{setDateTimeSQL(datos.FechaVencido)}</label><br />
                                                    {/* <InputText id="FechaVencido" name="FechaVencido" value={setDateTimeSQL (datos.FechaVencido)} style={{ width: 200 }}  className="mb-1"/><br /> */}
                                                </span>
                                                <span>

                                                    <span>Remision: </span>
                                                    <label id="NumberInvoice" name="NumberInvoice"></label>
                                                    {/* <InputText id="NumberInvoice" name="NumberInvoice" value={""} style={{ width: 200}} className="mb-1" /><br /> */}
                                                </span>
                                                <div>
                                                    <span > RTN: </span>
                                                    <label>{datos.RTNEmpresa}</label>
                                                    {/* <InputText id="RTNEmpresa" name="RTNEmpresa" value={datos.RTNEmpresa} style={{ width: 150, marginLeft: 5 }}  className="mb-1"/><br /> */}
                                                </div>
                                                <div hidden={!mostrar}>
                                                    <span > Tipo Arancel: </span>
                                                    <label>{datos.Aranceles}</label>
                                                    {/* <InputText id="RTNEmpresa" name="RTNEmpresa" value={datos.RTNEmpresa} style={{ width: 150, marginLeft: 5 }}  className="mb-1"/><br /> */}
                                                </div>
                                            </div>
                                        </div>

                                    }
                                />
                                <Card

                                    titulo={"Clientes"}
                                    className="cardContenedorClientesG"
                                    contenido={
                                        <div className="justify-content-center">
                                            <div className="d-flex flex-row" >
                                                <div id="InputText">
                                                    <span id="ClienteFactura" > Cliente: </span>
                                                    {/* <label id="CustomerName" name="CustomerName"> {datos.CustomerName}</label> */}
                                                    <ModalFacturasCliente
                                                        icono={aspectoBoton[0].Icono}
                                                        className={aspectoBoton[0].className}
                                                        nombre={datos.CustomerName}
                                                        IdCustomer={datos.IdCustomer}
                                                        NombreCustomer={datos.CustomerName}
                                                    />
                                                    {/* <InputText id="CustomerName" name="CustomerName" value={datos.CustomerName} style={{ width: "70%" }} /> */}
                                                </div>

                                                {/* <span  >
                                                <Checkbox style={{ marginLeft: 2 }} />
                                                <span>Block</span>
                                            </span> */}

                                            </div>
                                            <div className="d-flex flex-row">
                                                <div id="InputText" hidden={mostrar}>
                                                    <span  >  Comprador: </span>
                                                    <label id="CompanyName" name="CompanyName"> {datos.CompanyName} </label>
                                                    {/* <InputText id="CompanyName" name="CompanyName" value={datos.CompanyName} style={{ width: "70%" }} /> */}
                                                </div>

                                                {/* <span>
                                                <Checkbox style={{ marginLeft: 2 }} />
                                                <span>Contado</span>
                                            </span> */}

                                            </div>
                                            <div className="d-flex flex-row">
                                                <span id="InputText">
                                                    <span >Categoria: </span>
                                                    <label id="StyleCategory" name="StyleCategory"> {datos.StyleCategory}</label>
                                                    {/* <InputText id="StyleCategory" name="StyleCategory" value={datos.StyleCategory} style={{ width: 90 }} /> */}
                                                </span>
                                                <span id="InputText" >
                                                    <span style={{ marginLeft: 15 }}>RTN: </span>
                                                    <label id="RTNCustomer" name="RTNCustomer">{datos.RTNCustomer}</label>
                                                    {/* RTN: <InputText id="RTNCustomer" name="RTNCustomer" value={datos.RTNCustomer} style={{ width: 80 }} /> */}
                                                </span>
                                            </div>
                                            <div className="d-flex flex-row" >
                                                <span id="InputText">
                                                    <span >Tipo:</span>
                                                    <label id="TipoD" name="TipoD"> {datos.TipoD}</label>
                                                    {/* <InputText id="TipoD" name="TipoD" value={datos.TipoD} style={{ width:90, marginLeft: 7 }} /> */}
                                                </span>
                                                <span style={{ marginLeft: 20 }} id="InputText">
                                                    <span> Reg: </span>
                                                    <label id="Reg" name="Reg"> {datos.Reg}</label>
                                                    {/* Reg:<InputText id="Reg" name="Reg" value={datos.Reg} style={{ width: 80, marginLeft: 7 }} /> */}
                                                </span>
                                                {/* <span style={{ marginLeft: 5 }}>
                                                <Button id="btnEXO" label="Exonerado" style={{ fontSize: 7, width: 70}} />
                                            </span> */}
                                            </div>
                                            <div>
                                                <span id="InputText" hidden={!mostrar}>
                                                    <span >Registro:  </span>
                                                    <label id="Registro" name="Registro"> {datos.Registro}</label>
                                                    {/* <InputText id="TipoD" name="TipoD" value={datos.TipoD} style={{ width:90, marginLeft: 7 }} /> */}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                />

                                <Card
                                    titulo={"Direccion"}
                                    className="cardContenedorFacturas"
                                    contenido={
                                        <div className="justify-content-center">
                                            <div id="IDcontenedorFacturas" >
                                                <div >
                                                    <span>  Ship To:
                                                        <label style={{ display: "block" }} id="ShipTo" name="ShipTo" className="mx-2"> {datos.AddressShipTo}</label>
                                                    </span>
                                                    {/* <InputText id="ShipTo" name="ShipTo" value={datos.AddressShipTo} style={{ width: "75%" }} className="mb-1" /><br /> */}
                                                </div>
                                                <div>
                                                    <span >  Bill To: </span>
                                                    <label id="BillTo" name="BillTo" className="mx-2"> {datos.AddressBillTo}</label>
                                                    {/* <InputText id="BillTo" name="BillTo" value={datos.AddressBillTo} style={{ width: "75%", marginLeft: 5 }} className="mb-1" /><br /> */}
                                                </div>
                                                <div hidden={mostrar}>
                                                    <span>Tasa Cambio: </span>
                                                    <label id="TasaCambio" name="TasaCambio"> {datos.TasaCambio}</label>
                                                    {/* <InputText id="TasaCambio" name="TasaCambio" value={datos.TasaCambio} style={{ width: 60}} className="mb-1" /> */}
                                                    <span className="mx-2" >Valor Lps: </span>
                                                    <label id="ValorLps" name="ValorLps"> {decimalValueTemplate(datos.ValorLps)}</label>
                                                    {/* <InputText id="ValorLps" name="ValorLps" value={datos.ValorLps} style={{ width: 140 }} className="mb-1" /><br /> */}
                                                    <span className="mx-2"> Seguro: </span>
                                                    <label id="Seguro" name="Seguro"> {decimalValueTemplate(datos.Seguro)}</label>
                                                </div>
                                                <span>

                                                    {/* <InputText id="NumberInvoice" name="NumberInvoice" value={datos.Seguro} style={{ width: 60,marginLeft: 3  }} className="mb-1" /> */}

                                                    {/* <InputText id="FechaFactura" name="FechaFactura" value={setDateTimeSQL (datos.FechaFactura)} style={{ width: 140 }} className="mb-1" /><br /> */}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        }
                    />
                    <Card
                        titulo={"Totales"}
                        contenido={
                            <div>
                                <div className=" totalesFactura ">

                                    <div>
                                        <span>
                                            <span>{datos.IdInvoiceType === 2 ? "Items:" : "Rollos:"} </span>
                                            <label id="RollosT" name="RollosT">{decimalValueTemplate(datos.RollosT)}</label>
                                            {/* <InputText  value={decimalValueTemplate(datos.RollosT)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span hidden={mostrar}>
                                            <span>Kgs: </span>
                                            <label id="KgsT" name="KgsT"> {decimalValueTemplate(datos.KgsT)}</label>
                                            {/* <InputText id="KgsT" name="KgsT" value={decimalValueTemplate(datos.KgsT)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span hidden={mostrar}>
                                            <span>Yds: </span>
                                            <label id="YdsT" name="YdsT"> {decimalValueTemplate(datos.YdsT)}</label>
                                            {/* <InputText id="YdsT" name="YdsT" value={decimalValueTemplate(datos.YdsT)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span>
                                            <span>{datos.IdInvoiceType === 2 ? "Cantidad:" : "Lbs:"} </span>
                                            <label id="LbsT" name="LbsT"> {decimalValueTemplate(datos.LbsT)}</label>
                                            {/* <InputText id="LbsT" name="LbsT" value={decimalValueTemplate(datos.LbsT)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span hidden={mostrar} >
                                            <span>Pcs: </span>
                                            <label id="PcsT" name="PcsT">{decimalValueTemplate(datos.PcsT)}</label>
                                            {/* <InputText id="PcsT" name="PcsT" value={decimalValueTemplate(datos.PcsT)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span hidden={mostrar}>
                                            <span>Units: </span>
                                            <label id="UnitName" name="UnitName">{(datos.UnitName)}</label>
                                            {/* <InputText id="UnitName" name="UnitName" value={(datos.UnitName)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span hidden={!mostrar}>
                                            <span>Dto/Rebajas: </span>
                                            <label id="UnitName" name="UnitName">{decimalValueTemplate(datos.DescuentoRebajas)}</label>
                                            {/* <InputText id="UnitName" name="UnitName" value={(datos.UnitName)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span hidden={!mostrar}>
                                            <span>SubTotal: </span>
                                            <label id="UnitName" name="UnitName">{decimalValueTemplate(datos.Amount)}</label>
                                            {/* <InputText id="UnitName" name="UnitName" value={(datos.UnitName)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span hidden={!mostrar}>
                                            <span>ISV: </span>
                                            <label id="UnitName" name="UnitName">{decimalValueTemplate(datos.ISV)}</label>
                                            {/* <InputText id="UnitName" name="UnitName" value={(datos.UnitName)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                    </div>

                                    <div className="Amounts" >
                                        <span>
                                            <span>Amount $: </span>
                                            <label id="Amount" name="Amount">{decimalValueTemplate(datos.Amount)}</label>
                                            {/* <InputText id="Amount" name="Amount" value={decimalValueTemplate(datos.Amount)} style={{ width: 100, height: 30 }} /> */}
                                        </span>
                                        <span hidden={mostrar}>
                                            <span > Amount Lps: </span>
                                            <label id="ValorLps" name="ValorLps"> {decimalValueTemplate(datos.ValorLps)}</label>
                                        </span>

                                    </div>

                                </div>
                                <div className="my-2">
                                    <span>
                                        <span>{datos.ValorLetras}</span>
                                    </span>
                                    <span className="mx-5">
                                        <span>{datos.ValorLetrasLps}</span>
                                    </span>
                                </div>
                            </div>


                        } />
                    <div hidden={mostrar}>
                        <Card

                            titulo={"Detalle"}
                            className="DetalleFactura"
                            contenido={
                                <div style={{ display: "flex", alignItems: "center" }} >
                                    <Button icon="ri-file-excel-2-line" style={{ color: "green", fontSize: 25 }} className="p-button-info p-button-text mx-2" hidden />
                                    <Button icon="ri-file-pdf-line" style={{ color: "black", fontSize: 25 }} className="p-button-info p-button-text" hidden />

                                    <span className="mx-5 text-uppercase" style={{ fontWeight: "bold", color: "red" }}>{datos.TipoPago}</span>
                                    <span>
                                        <span style={{ fontWeight: "bold" }} >Comments:  </span>
                                        <label id="Comment" name="Comment">{datos.Comment}</label>
                                        {/* <InputText id="Comment" name="Comment" value={datos.Comment} className="mx-3" style={{ width: 700 }} /> */}
                                    </span>

                                </div>
                            }
                        />
                    </div>



                    <div className="pt-1" style={{ height: '38vh' }}>
                        {/* <Toast position="bottom-right" ref={toast} /> */}


                        <AgGrid table={table} />
                    </div>


                </div>
            </Dialog>
        </Fragment>
    )
}

export default ModalFacturas
