import React from "react";
import { useState, useEffect, useRef } from "react";

import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

//************** Componentes generales **************/
import Card from "../../../components/Card/Card";
import Icon from "../../../components/icon/Icon";
import Loader from "../../../components/Loader/Loader";
import IconApp from "../../../components/icon/IconApp";
import AgGrid from "../../../components/Tables/AgGrid";

//************** Funciones  **************/
import { getAccesos } from "../../../Api/IT/Accesos/AccesosRequest";

import { setNestedObjectValues } from "formik";
import { toastShow } from '../../../services/ToastService';

import { Toast } from 'primereact/toast';
import { Window } from "@mui/icons-material";
import ModalAccesos from "./ModalAccesos.js/ModalAccesos";

const AccesosScreen = () => {

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



    const onChangeCheck = () => {

    }

    const ActivoCheck = (rowData) => {
        return <Checkbox onChange={(e) => onChangeCheck(rowData.IdAcceso, e.checked)} style={{ marginBottom: 5 }} checked={rowData.ActivoWeb} ></Checkbox>
    }

    const botones = (rowData) => {
        // console.log(rowData)
        return (
            <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop: -6 }}>
                <ModalAccesos
                    datos={rowData}
                    toast={toast}
                    icono={aspectoBoton[1].Icono}
                    nombre={aspectoBoton[1].Nombre}
                    className={aspectoBoton[1].className}
                    getListadoAccesos={getListadoAccesos}
                />
            </div>

        )
    }

    const table = {
        Data: data,
        Columns: [
            {
                field: 'IdAcceso',
                header: 'IdAcceso',
                className: 'colum-width-Xsmall',
            },
            {
                field: 'Acceso',
                header: 'Acceso',
                className: 'colum-width-Xlarge',
            },
            {
                field: 'ActivoWeb',
                header: 'ActivoWeb',
                className: 'colum-width-small',
                Format: "Template",
                align: "center",
                body: (rowData) => ActivoCheck(rowData),
            },
            {
                // Menu: 'Menu',
                field: 'IdMenu',
                header: 'IdMenu',
                className: 'colum-width-large',
            },
            {
                field: 'Menu',
                header: 'Menu',
                className: 'colum-width-medium',
            },
            {
                field: 'Icon',
                header: 'Icon',
                className: 'colum-width-medium',
                body: (rowData) => <Icon icon={rowData.Icon ? rowData.Icon : 'a'} />,
                align: 'center',
                Format: 'Icon'
            },
            {
                field: 'URL',
                header: 'URL',
                className: 'colum-width-medium',
            },
            {
                header: 'Acciones',
                className: 'colum-width-small',
                body: (rowData) => botones(rowData),
                Format: "Template"
            }

        ],
        key: 'IdAcceso ',
        // scrollHeight: '100%',
    }

    const getListadoAccesos = async () => {
        setLoading(true)
        const result = await getAccesos();
        setData(result)
        setLoading(false)
        setChecked(result.ActivoWeb)
    }

    useEffect(() => {
        getListadoAccesos();
        window.document.title = 'PPF • Finanzas Plan Cuentas';
    }, [])

    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<div className="d-flex">
                    <h3 className="mx-3">Accesos</h3>
                    <ModalAccesos
                        toast={toast}
                        icono={aspectoBoton[0].Icono}
                        nombre={aspectoBoton[0].Nombre}
                        className={aspectoBoton[0].className}
                        getListadoAccesos={getListadoAccesos}
                    />
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

export default AccesosScreen
