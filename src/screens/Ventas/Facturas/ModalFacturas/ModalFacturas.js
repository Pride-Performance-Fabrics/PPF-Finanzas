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

const ModalFacturas = ({ datos }) => {
    console.log(datos)

    const [facturaDialog, setFacturaDialog] = useState(false);
    const [data, setData] = useState([]);

    const obtenerListadoInvoiceDetails = async (idFactura) => {
        const result = await getInvoicesDetails(idFactura)
        setData(result)
        // console.log(result)
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
                header: 'IsSelected',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'left'

            }, ,
            {
                field: 'ShipmentNo',
                header: 'ShipmentNo',
                className: 'colum-width-Xsmall',
                frozen: 'true',
                alignFrozen: 'left'

            },
            {
                field: 'SalesOrder',
                header: 'SalesOrder',
                className: 'colum-width-medium',
                // body: (rowData) => NumberInvoiceTemplate(rowData),
                // Format: "Template",
                frozen: 'true',
                alignFrozen: 'left'
            },
            {
                field: 'CustomerName',
                header: 'CustomerName',
                className: 'colum-width-large',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'StyleName',
                header: 'StyleName',
                className: 'colum-width-medium',
                //  Format: 'Template',
                // body: (rowData) => fechaTemplate(rowData.InvoiceDate)

            },

            {
                field: 'WDescription',
                header: 'WDescription',
                className: 'colum-width-medium',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)
            },
            {
                field: 'ColorName',
                header: 'ColorName',
                className: 'colum-width-medium',
            },
            {
                field: 'CustomerOrder',
                header: 'PO',
                className: 'colum-width-large',
            },
            {
                field: 'StyleCategory',
                header: 'StyleCategory',
                className: 'colum-width-large',
            },
            {
                field: 'CompanyName',
                header: 'CompanyName',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'StatusName',
                header: 'StatusName',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'TermName',
                header: 'TermName',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'UnitName',
                header: 'UnitName',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'Porcentaje',
                header: 'Porcentaje',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'BlockFinanzas',
                header: 'BlockFinanzas',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'Price',
                header: 'Price',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'RollosF',
                header: 'RollosF',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'KgsF',
                header: 'KgsF',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'YdsF',
                header: 'YdsF',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'LbsF',
                header: 'LbsF',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'PcsF',
                header: 'PcsF',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'PcsMalas',
                header: 'PcsMalas',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'Price',
                header: 'Price',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'Amount',
                header: 'Amount',
                className: 'colum-width-Xlarge',
            },


        ]
    }
    return (
        <Fragment>
            <Button label={datos.NumberInvoice} icon="" className="p-button-text" onDoubleClick={openNew} style={{ color: "black", fontSize: 12 }} />
            <Dialog visible={facturaDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '95vw', height: '45vw' }}
                onHide={hideDialog}>
                <Card
                    titulo={"General"}
                    contenido={

                        <div style={{ width: '100%', margin: 'auto', marginRight: '10%' }} className="informacionFacturaContainer">

                            <Card
                                titulo={""}
                                className="cardContenedorClientes"
                                contenido={
                                    <div className="justify-content-center">
                                        <div>
                                            <span>No.Factura:</span>
                                            <InputText id="NumberInvoice" name="NumberInvoice" value={datos.NumberInvoice} style={{ width: 200, marginLeft: 10 }} />
                                        </div>
                                        <div style={{marginTop:5}}>
                                            <span style={{ width: 200, marginLeft: 30 }}>Estado: </span>
                                            {/* <Dropdown id="IdStatus" name="IdStatus" value={datos.StatusName} style={{ height: 20 }}/> */}
                                            <InputText id="NumberInvoice" name="NumberInvoice" value={datos.StatusName} style={{ width: 200 }} />
                                        </div>
                                    </div>

                                }
                            />
                            <Card
                                style={{ width: 1000 }}
                                titulo={"Clientes"}
                                className="cardContenedorFacturas"
                                contenido={
                                    <div className="justify-content-center">
                                        <div className="d-flex flex-row" align="right" >
                                            <span align="right" >
                                                <span style={{ marginLeft: 30 }}> Cliente:</span>
                                                <InputText id="CustomerName" name="CustomerName" value={datos.CustomerName} style={{ width: 220, marginLeft: 5 }} />
                                            </span>

                                            <span align="right" >
                                                <Checkbox style={{ marginLeft: 5 }} />
                                                <span>Block</span>
                                            </span>

                                        </div>
                                        <div className="d-flex flex-row">
                                            <span>
                                            <span style={{  }}>  Comprador:</span>
                                               
                                                <InputText id="CompanyName" name="CompanyName" value={datos.CompanyName} style={{ width: 220, marginLeft:7 }} />
                                            </span>

                                            <span>
                                                <Checkbox style={{ marginLeft: 5 }} />
                                                <span>Contado</span>
                                            </span>

                                        </div>
                                        <div className="d-flex flex-row">
                                            <span>
                                                <span style={{ marginLeft: 12 }}>  Categoria:</span>
                                                <InputText id="StyleCategory" name="StyleCategory" value={datos.StyleCategory} style={{ width: 90, marginLeft: 5 }} />
                                            </span>
                                            <span style={{ marginLeft: 5 }} >

                                                RTN: <InputText id="RTNCustomer" name="RTNCustomer" value={datos.RTNCustomer} style={{ width: 90 }} />
                                            </span>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <span>
                                                <span style={{ marginLeft: 40 }}>Tipo:</span>
                                                <InputText id="NumberInvoice" name="NumberInvoice" value={datos.NumberInvoice} style={{ width: 90, marginLeft: 7 }} />
                                            </span>
                                            <span style={{ marginLeft: 5 }}>
                                                Reg:<InputText id="NumberInvoice" name="NumberInvoice" value={datos.NumberInvoice} style={{ width: 90, marginLeft: 7 }} />
                                            </span>
                                            <span style={{ marginLeft: 10 }}>
                                                <Button label="Exonerados" style={{ fontSize: 10 }} />
                                            </span>
                                        </div>
                                    </div>
                                }
                            />
                            <Card
                                titulo={"Informacion Tipo Factura"}
                                className="cardContenedorClientes"
                                contenido={
                                    <div className="d-flex flex-column  justify-content-center">
                                        <div className="InformacionTipoFactura" >
                                            <span>
                                                <span style={{marginLeft: 55}}>CAI: </span>
                                                  <label>{datos.CAI}</label><br />
                                            </span>
                                            <span>
                                                <span style={{marginLeft: 50}}>RTN: </span>
                                                  <label>{datos.RTNEmpresa}</label><br />
                                            </span>
                                            <span>
                                                <span style={{marginLeft: 30}}>  No.Exo:</span>
                                                 <label style={{  marginLeft: 5 }}>{datos.NoExoneracion}</label><br />
                                            </span>
                                            <span> 
                                              <span style={{marginLeft: 20}}>Vence el:</span>
                                                <InputText id="FechaVencido" name="FechaVencido" value={datos.FechaVencido} style={{ width: 250, marginLeft: 5 }} /><br />
                                            </span>
                                            <span>

                                            <span style={{marginLeft: 10}}> Remision: </span> <InputText id="NumberInvoice" name="NumberInvoice" value={""} style={{ width: 250, marginLeft:5 }} /><br />
                                            </span>
                                        </div>
                                    </div>
                                }
                            />
                            <Card
                                titulo={"Direccion"}
                                className="cardContenedorFacturas"
                                contenido={
                                    <div className=" justify-content-center">
                                        <div >
                                            <span>
                                                <span style={{ marginLeft: 43 }} > Ship To: </span>
                                                <InputText id="ShipTo" name="ShipTo" value={datos.ShipTo} style={{ width: "75%" }} /><br />
                                            </span>
                                            <span>
                                                <span style={{ marginLeft: 45 }}> Bill To: </span>
                                                <InputText id="BillTo" name="BillTo" value={datos.BillTo} style={{ width: "75%", marginLeft: 5 }} /><br />
                                            </span>
                                            <span>
                                                <span> Tasa Cambio: </span>
                                                <InputText id="TasaCambio" name="TasaCambio" value={datos.TasaCambio} style={{ width: 120, marginLeft: 10 }} />
                                                <span style={{ marginLeft: 20 }}>  Valor Lps: </span>
                                                <InputText id="ValorLps" name="ValorLps" value={datos.ValorLps} style={{ width: 115 }} /><br />
                                            </span>
                                            <span>
                                                <span style={{ marginLeft: 45 }}> Seguro: </span>
                                                <InputText id="NumberInvoice" name="NumberInvoice" value={datos.NumberInvoice} style={{ width: 120 }} />
                                                Fecha Factura:<InputText id="FechaFactura" name="FechaFactura" value={datos.FechaFactura} style={{ width:115 }} /><br />
                                            </span>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    }
                />
                <Card
                titulo = {"Totales"}
                contenido ={
                    <div className="totalesFactura">
                        <span>
                            <span>Rollos: </span>
                            <InputText id="RollosT" name="RollosT" value={datos.RollosT} style={{ width: 85,height:30 }} />
                        </span>
                        <span>
                            <span>Kgs: </span>
                            <InputText id="KgsT" name="KgsT" value={datos.KgsT} style={{ width: 85,height:30 }} />
                        </span>
                        <span>
                            <span>Yds: </span>
                            <InputText id="YdsT" name="YdsT" value={datos.YdsT} style={{ width: 85,height:30 }} />
                        </span>
                        <span>
                            <span>Lbs: </span>
                            <InputText id="LbsT" name="LbsT" value={datos.LbsT} style={{ width: 85,height:30 }} />
                        </span>
                        <span>
                            <span>Pcs: </span>
                            <InputText id="PcsT" name="PcsT" value={datos.PcsT} style={{ width: 85,height:30 }} />
                        </span>
                        <span>
                            <span>Amount(s): </span>
                            <InputText id="Amount" name="Amount" value={datos.Amount} style={{ width: 85,height:30 }} />
                        </span>
                        <span>
                            <span>Units: </span>
                            <InputText id="UnitName" name="UnitName" value={datos.UnitName} style={{ width: 85,height:30 }} />
                        </span>
                    </div>

                }/>
                 <Card
                titulo = {"Detalle"}
                contenido ={
                    <div>
                         <div className="totalesFactura">
                         <Button label="Submit" aria-label="Submit"  />
                         </div>

                    </div>

                }
                
                />

                <Card
                    titulo={""}
                    contenido={
                        <div className='pt-4' style={{ height: '40vh' }}>
                            {/* <Toast position="bottom-right" ref={toast} /> */}


                            <AgGrid table={table} />
                        </div>
                    }
                />


            </Dialog>
        </Fragment>
    )
}

export default ModalFacturas
