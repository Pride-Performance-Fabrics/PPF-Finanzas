import React from "react";
import { useState, useEffect, useRef } from "react";

//************** Componentes PrimerReact **************/
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';


//************** Componentes generales **************/
import Card from "../../../components/Card/Card";
import Icon from "../../../components/icon/Icon";
import Loader from "../../../components/Loader/Loader";
import IconApp from "../../../components/icon/IconApp";
import AgGrid from "../../../components/Tables/AgGrid";

//************** Consultas API **************/
import { getCustomers } from "../../../Api/Clientes/ClientesRequest";

//************** Servicios **************/
import { fechaLocalStringTemplate, fechaTemplate } from '../../../services/TemplatesServices';


//************** Componentes Especificos **************/

import ModalClientesDetails from "./ModalClientesDetalle/ModalClientesDetails";
import ModalClientes from "./ModalClientes.js/ModalClientes";


const ClientesScreen = () => {

    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const toast = useRef(null);
    const [data, setData] = useState([]);

    
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


    const onChangeCheck = async (activo, IdAcceso, e) => {

        // let  activosAccesos = {
        //     Acceso: activo,
        //     Activo: e,
        //     IdAcceso: IdAcceso
        // }

        // const result = await putActividadAcceso(activosAccesos)
        // const temporal = result.map((item) => {
        //     console.log(item)
        //     if (item.id === IdAcceso) {
        //         console.log(item)
        //         item.ActivoAPP = true
               
        //     }

        //     return item
        // })

        // setData(temporal)

        // setData(result)


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

    const botones = (rowData) => {
        // console.log(rowData)
        return (
            <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop: -6 }}>
                   <ModalClientes
                    datos={rowData}
                    toast={toast}
                    icono={aspectoBoton[1].Icono}
                    nombre={aspectoBoton[1].Nombre}
                    className={aspectoBoton[1].className}
                    getListadoClientes={getListadoClientes}
                />
                <ModalClientesDetails IdCustomer = {rowData.IdCustomer} />
                <Button label={''} className='p-button-rounded p-button-info p-button-text' icon='ri-close-circle-line' style={{color:"red"}} />
            </div>

        )
    }

    const table = {
        Data: data,
        Columns: [
            {
                field: 'IdCustomer',
                header: 'IdCustomer',
                className: 'colum-width-small',
            },
            {
                field: 'DateCreate',
                header: 'DateCreate',
                className: 'colum-width-medium',
                Format: 'Template',
                body: (rowData) => fechaTemplate(rowData.DateCreate)
            },
            {
                field: 'StatusName',
                header: 'Estado',
                className: 'colum-width-Xsmall',
                Format: 'Template',
                body: e => statusBodyTemplate(e)

            },
            {
                field: 'CodigoCliente',
                header: 'Codigo Cliente',
                className: 'colum-width-small',
                // Format: 'Template',
                // body: e => statusBodyTemplate(e)

            },
            {
                field: 'Abreviacion',
                header: 'Abreviacion',
                className: 'colum-width-small',
                align: "center",

            },
            {
                field: 'RTN',
                header: 'RTN',
                className: 'colum-width-small',
            },
            {
                field: 'CustomerName',
                header: 'Compañia',
                className: 'colum-width-large',
            },
            {
                field: 'Porcentaje',
                header: '% Exportacion',
                className: 'colum-width-large',
            },
            {
                field: 'IsShipTo',
                header: 'IsShipTo',
                className: 'colum-width-small',
                Format: "Template",
                align: "center",
                body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(1, rowData.IsShipTo, e.checked)} style={{ marginBottom: 5 }} checked={rowData.IsShipTo} />,
            },
            {
                field: 'IsBillTo',
                header: 'IsBillTo',
                className: 'colum-width-small',
                Format: "Template",
                align: "center",
                body: (rowData) => <Checkbox onChange={(e) => onChangeCheck(1, rowData.IsBillTo, e.checked)} style={{ marginBottom: 5 }} checked={rowData.IsBillTo} />,
            },
            {
                field: 'NombreTipoPago',
                header: 'TipoPago',
                className: 'colum-width-small',

            },
            {
                field: 'CreditLimit',
                header: 'CreditLimit',
                className: 'colum-width-large',

            },
            {
                field: 'Contact',
                header: 'Contact',
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
                field: 'Contact2',
                header: 'Contact',
                className: 'colum-width-medium',
            },
            {
                field: 'Tel2',
                header: 'Tel',
                className: 'colum-width-medium',
            },
            {
                field: 'Email2',
                header: 'Email',
                className: 'colum-width-medium',
            },

            {
                field: 'Address',
                header: 'Direccion',
                className: 'colum-width-large',

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
                field: 'UnitName',
                header: 'Unidad Orden',
                className: 'colum-width-medium',
            },
           
            {
                field: 'TermName',
                header: 'Terminos',
                className: 'colum-width-medium',
            },

            {
                field: 'TermFreightName',
                header: 'Terminos Flete',
                className: 'colum-width-medium',
            },

            {
                field: 'Comments',
                header: 'Comentario',
                className: 'colum-width-medium',
            },
            // {
            //     field: 'IdUserEditWeb',
            //     header: 'IdUser',
            //     className: 'colum-width-medium',
            // },
            {
                header: 'Acciones',
                className: 'colum-width-small',
                body: (rowData) => botones(rowData),
                Format: "Template"
            }

        ],
        key: 'IdCustomer ',
        // scrollHeight: '100%',
    }


    const getListadoClientes = async () => {
        setLoading(true)
        const result = await getCustomers();
        console.log(result)
        setData(result)
        setLoading(false)
        setChecked(result.ActivoWeb)
    }

    useEffect(() => {
        getListadoClientes();
        window.document.title = 'PPF • Finanzas Plan Cuentas';
    }, [])


    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<div className="d-flex">
                    <h3 className="mx-3">Clientes</h3>
                    <ModalClientes
                        toast={toast}
                        icono={aspectoBoton[0].Icono}
                        nombre={aspectoBoton[0].Nombre}
                        className={aspectoBoton[0].className}
                        getListadoClientes={getListadoClientes}
                    />
                  
                    <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line"  loading={loading} onClick={getListadoClientes} />
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

export default ClientesScreen
