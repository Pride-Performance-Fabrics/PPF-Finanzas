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

const ModalFacturas = ({ datos }) => {
    console.log(datos)

    const [facturaDialog, setFacturaDialog] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    

    const obtenerListadoInvoiceDetails = async (idFactura) => {
        setLoading(true)
        const result = await getInvoicesDetails(idFactura)
        setData(result)
       setLoading(false)
    }

    const onChangeCheck = (tipo, valor, activo) =>{

    }

    const openNew = () => {
        setFacturaDialog(true)
        obtenerListadoInvoiceDetails(datos.IdInvoiceIPS)

    }

    const hideDialog = () => {
        setFacturaDialog(false);
    }


    const table = {
        Data: data,
        Columns: [
            {
                field: 'IsSelected',
                header: 'Selected',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'left',
                Format: "Template",
                body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(1, rowData.IsSelected, e.checked)} style={{ marginBottom: 5 }} checked={rowData.IsSelected} />,

            }, ,
            {
                field: 'ShipmentNo',
                header: 'Shipment No',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'left'

            },
            {
                field: 'SalesOrder',
                header: 'Sales Order',
                className: 'colum-width-medium',
                // body: (rowData) => NumberInvoiceTemplate(rowData),
                // Format: "Template",
                frozen: 'true',
                alignFrozen: 'left'
            },
            {
                field: 'CustomerName',
                header: 'Cliente',
                className: 'colum-width-large',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'StyleName',
                header: 'Style',
                className: 'colum-width-medium',
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
            {
                field: 'StyleCategory',
                header: 'Categoria',
                className: 'colum-width-medium',
            },
            {
                field: 'CompanyName',
                header: 'Cliente',
                className: 'colum-width-Xlarge',
            },
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
                header: 'Unit',
                className: 'colum-width-small',
            },
            {
                field: 'Porcentaje',
                header: 'Porcentaje',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.Porcentaje)
            },
            {
                field: 'BlockFinanzas',
                header: 'BlockFinanzas',
                className: 'colum-width-Xsmall',
                Format: "Template",
                body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(1, rowData.BlockFinanzas, e.checked)} style={{ marginBottom: 5 }} checked={rowData.BlockFinanzas} />,
            },
            {
                field: 'Price',
                header: 'Price',
                className: 'colum-width-Xsmall',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.Price)
            },
            {
                field: 'RollosF',
                header: 'Rollos',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.RollosF),
                Sumary:'sum'
            },
            {
                field: 'KgsF',
                header: 'Kgs',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.KgsF),
                Sumary:'sum'
            },
            {
                field: 'YdsF',
                header: 'Yds',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.YdsF),
                Sumary:'sum'
            },
            {
                field: 'LbsF',
                header: 'Lbs',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.LbsF),
                Sumary:'sum'

            },
            {
                field: 'PcsF',
                header: 'Pcs',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.PcsF),
                Sumary:'sum'

            },
            {
                field: 'PcsMalas',
                header: 'Pcs Malas',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.PcsMalas),
                Sumary:'sum'

            },
            {
                field: 'Price',
                header: 'Price',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.Price),
                Sumary:'sum'


            },
            {
                field: 'Amount',
                header: 'Amount',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'right',
                Format:"Template",
                body:(rowData) => decimalValueTemplate(rowData.Amount),
                Sumary:'sum'

            },


        ]
    }
    return (
        <Fragment>
            <Loader loading={loading} />
            <Button label={datos.NumberInvoice} icon="" className="p-button-text" onDoubleClick={openNew} style={{ color: "black", fontSize: 12 }} />
            <Dialog visible={facturaDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '95vw', height: '100vh' }}
                onHide={hideDialog}>
                <Card
                    titulo={"General"}
                    contenido={
                        <div style={{ width: '100%'}} className="informacionFacturaContainer">

                            <Card
                           
                                titulo={""}
                                className="cardContenedorFacturas"
                                contenido={
                                    <div className="justify-content-center"  style={{}} >
                                        <div>
                                            <span>No.Factura:</span>
                                            <InputText id="NumberInvoice" name="NumberInvoice" value={datos.NumberInvoice} style={{ width: 200}} />
                                        </div>
                                        <div className="mt-1" >
                                            <span style={{ width: 200 }}>Estado: </span>
                                            {/* <Dropdown id="IdStatus" name="IdStatus" value={datos.StatusName} style={{ height: 20 }}/> */}
                                            <InputText id="NumberInvoice" name="NumberInvoice" value={datos.StatusName} style={{ width: 160 }} />
                                        </div>
                                    </div>

                                }
                            />
                            <Card
                                
                                titulo={"Clientes"}
                                className="cardContenedorFacturas"
                                contenido={
                                    <div className="justify-content-center">
                                        <div className="d-flex flex-row" >
                                            <span align="right" id="InputText" >
                                                <span style={{ marginLeft: 15 }}> Cliente: </span>
                                                <InputText id="CustomerName" name="CustomerName" value={datos.CustomerName} style={{ width: "70%" }} />
                                            </span>

                                            <span  >
                                                <Checkbox style={{ marginLeft: 2 }} />
                                                <span>Block</span>
                                            </span>

                                        </div>
                                        <div className="d-flex flex-row">
                                            <span id="InputText">
                                                <span style={{marginLeft:-5}} >  Comprador: </span>

                                                <InputText id="CompanyName" name="CompanyName" value={datos.CompanyName} style={{ width: "70%" }} />
                                            </span>

                                            <span>
                                                <Checkbox style={{ marginLeft: 2 }} />
                                                <span>Contado</span>
                                            </span>

                                        </div>
                                        <div className="d-flex flex-row">
                                            <span id="InputText">
                                                <span style={{ marginLeft: 2 }}>Categoria: </span>
                                                <InputText id="StyleCategory" name="StyleCategory" value={datos.StyleCategory} style={{ width: 90 }} />
                                            </span>
                                            <span style={{ marginLeft: 5 }} id="InputText" >

                                                RTN: <InputText id="RTNCustomer" name="RTNCustomer" value={datos.RTNCustomer} style={{ width: 80 }} />
                                            </span>
                                        </div>
                                        <div className="d-flex flex-row" >
                                            <span id="InputText">
                                                <span style={{ marginLeft: 20 }}>Tipo:</span>
                                                <InputText id="TipoD" name="TipoD" value={datos.TipoD} style={{ width:90, marginLeft: 7 }} />
                                            </span>
                                            <span style={{ marginLeft: 5 }} id="InputText">
                                                Reg:<InputText id="Reg" name="Reg" value={datos.Reg} style={{ width: 80, marginLeft: 7 }} />
                                            </span>
                                            <span style={{ marginLeft: 5 }}>
                                                <Button id="btnEXO" label="Exonerado" style={{ fontSize: 7, width: 70}} />
                                            </span>
                                        </div>
                                    </div>
                                }
                            />
                            <Card
                                titulo={"Informacion Tipo Factura"}
                                className="cardContenedorFacturas"
                                contenido={
                                    <div className="d-flex flex-column  justify-content-center">
                                        <div className="InformacionTipoFactura" >
                                            <span>
                                                <span style={{ marginLeft: 19 }}>  CAI:  </span>
                                                <label>{datos.CAI}</label> <br/>
                                                {/* <InputText id="CAI" name="CAI" value={datos.CAI} style={{ width: 150, marginLeft: 5 }}  className="mb-1"/><br /> */}
                                            </span>
                                            <span>
                                                <span style={{ marginLeft: 16 }}> RTN: </span>
                                                <label>{datos.RTNEmpresa}</label><br/>
                                                {/* <InputText id="RTNEmpresa" name="RTNEmpresa" value={datos.RTNEmpresa} style={{ width: 150, marginLeft: 5 }}  className="mb-1"/><br /> */}
                                            </span>
                                            <span>
                                                <span style={{marginLeft: 5}}> No.Exo:  </span>
                                                <label>{datos.NoExoneracion}</label><br/>
                                                {/* <InputText id="RTNEmpresa" name="RTNEmpresa" value={datos.NoExoneracion} style={{ width: 150 }}  className="mb-1"/><br /> */}
                                            </span>
                                            <span>
                                                <span style={{marginLeft: 2}} >    Vence el:  </span>
                                                <InputText id="FechaVencido" name="FechaVencido" value={setDateTimeSQL (datos.FechaVencido)} style={{ width: 200 }}  className="mb-1"/><br />
                                            </span>
                                            <span>

                                                <span>Remision: </span> <InputText id="NumberInvoice" name="NumberInvoice" value={""} style={{ width: 200}} className="mb-1" /><br />
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
                                            <span >
                                                <span style={{ marginLeft: 25 }} >  Ship To: </span>
                                                <InputText id="ShipTo" name="ShipTo" value={datos.AddressShipTo} style={{ width: "75%" }} className="mb-1" /><br />
                                            </span>
                                            <span>
                                                <span style={{ marginLeft: 25 }}>  Bill To: </span>
                                                <InputText id="BillTo" name="BillTo" value={datos.AddressBillTo} style={{ width: "75%", marginLeft: 5 }} className="mb-1" /><br />
                                            </span>
                                            <span>
                                                <span>Tasa Cambio: </span>
                                                <InputText id="TasaCambio" name="TasaCambio" value={datos.TasaCambio} style={{ width: 60}} className="mb-1" />
                                                <span className="mx-2" >Valor Lps: </span>
                                                <InputText id="ValorLps" name="ValorLps" value={datos.ValorLps} style={{ width: 140 }} className="mb-1" /><br />
                                            </span>
                                            <span>
                                                <span style={{ marginLeft: 20 }}> Seguro: </span>
                                                <InputText id="NumberInvoice" name="NumberInvoice" value={datos.Seguro} style={{ width: 60,marginLeft: 3  }} className="mb-1" />
                                                Fecha Factura:<InputText id="FechaFactura" name="FechaFactura" value={setDateTimeSQL (datos.FechaFactura)} style={{ width: 140 }} className="mb-1" /><br />
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
                            <div className="totalesFactura">
                                <span>
                                    <span>Rollos: </span>
                                    <InputText id="RollosT" name="RollosT" value={decimalValueTemplate(datos.RollosT)} style={{ width: 85, height: 30 }} />
                                </span>
                                <span>
                                    <span>Kgs: </span>
                                    <InputText id="KgsT" name="KgsT" value={decimalValueTemplate(datos.KgsT)} style={{ width: 85, height: 30 }} />
                                </span>
                                <span>
                                    <span>Yds: </span>
                                    <InputText id="YdsT" name="YdsT" value={decimalValueTemplate(datos.YdsT)} style={{ width: 85, height: 30 }} />
                                </span>
                                <span>
                                    <span>Lbs: </span>
                                    <InputText id="LbsT" name="LbsT" value={decimalValueTemplate(datos.LbsT)} style={{ width: 85, height: 30 }} />
                                </span>
                                <span>
                                    <span>Pcs: </span>
                                    <InputText id="PcsT" name="PcsT" value={decimalValueTemplate(datos.PcsT)} style={{ width: 85, height: 30 }} />
                                </span>
                                <span>
                                    <span>Amount(s): </span>
                                    <InputText id="Amount" name="Amount" value={decimalValueTemplate(datos.Amount)} style={{ width: 85, height: 30 }} />
                                </span>
                                <span>
                                    <span>Units: </span>
                                    <InputText id="UnitName" name="UnitName" value={(datos.UnitName)} style={{ width: 85, height: 30 }} />
                                </span>
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
                <Card
                    titulo={"Detalle"}
                    className="DetalleFactura"
                    contenido={
                        <div>
                            <div className="">
                                <Button icon="ri-file-excel-2-line" style={{ color: "green", fontSize: 25 }} className="p-button-info p-button-text mx-2" />
                                <Button icon="ri-file-pdf-line" style={{ color: "black", fontSize: 25 }} className="p-button-info p-button-text" />

                                <span className="mx-5 text-uppercase" style={{ fontWeight: "bold" }}>{datos.TipoPago}</span>
                                <span>
                                    <span style={{ fontWeight: "bold" }} >Comments:</span>
                                    <InputText id="Comment" name="Comment" value={datos.Comment} className="mx-3" style={{ width: 700 }} />
                                </span>

                            </div>

                        </div>


                    }
                />


                 <div className="pt-1" style={{ height: '35vh' }}>
                            {/* <Toast position="bottom-right" ref={toast} /> */}


                            <AgGrid table={table} />
                        </div>


            </Dialog>
        </Fragment>
    )
}

export default ModalFacturas
