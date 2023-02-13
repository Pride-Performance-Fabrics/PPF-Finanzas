import React from "react";
import { useState, useEffect, useRef } from "react";

import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

//************** Componentes generales **************/
import Card from "../../../../components/Card/Card";
import Icon from "../../../../components/icon/Icon";
import Loader from "../../../../components/Loader/Loader";
import IconApp from "../../../../components/icon/IconApp";
import AgGrid from "../../../../components/Tables/AgGrid";
import { Toast } from 'primereact/toast';

import { getSubTypes, getCuentaSubType, getVistaSubType } from "../../../../Api/Finanzas/SubTypesRequest";

import { getSubCategorias } from "../../../../Api/Finanzas/SubCategoriasRequest";

import ModalSubCategoria from "./ModalSubCategoria/ModalSubCategoria";

const SubCategoriasScreen = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([]);
    const toast = useRef(null);

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

    const botones = (rowData) => {
        console.log(rowData)
        return (
            <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop: -6 }}>
                <ModalSubCategoria
                    toast={toast}
                    datos={rowData}
                    icono={aspectoBoton[1].Icono}
                    nombre={aspectoBoton[1].Nombre}
                    className={aspectoBoton[1].className}
                    subCategorias={getListadoSubCategorias} />
            </div>

        )
    }


    const table = {
        Data: data,
        Columns: [
            {
                field: 'IdSubCategoria',
                header: 'IdSubCategoria',
                className: 'colum-width-medium',
                body: (rowData) => rowData.IdSubCategoria,
            },
            {
                field: 'CodigoSubCategoria',
                header: 'CodigoSubCategoria',
                className: 'colum-width-medium',
                body: (rowData) => rowData.CodigoSubCategoria,
            },
            {
                // IdMenu: 1,
                field: 'SubCategoria',
                header: 'SubCategoria',
                className: 'colum-width-Xlarge',
                body: (rowData) => rowData.SubCategoria,
            },
            {
                // Menu: 'Menu',
                field: 'Description',
                header: 'Description',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Description,
            },
            {
                field: 'IdCategoria',
                header: 'IdCategoria',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.IdCategoriaType,
            },
            {
                field: 'Categoria',
                header: 'Categoria',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.Categoria,
            },

            {
                header: 'Acciones',
                className: 'colum-width-small',
                // frozen: true,
                // alignFrozen: 'right',
                body: (rowData) => botones(rowData),
                Format: "Template"
            }



        ]
    }


    const getListadoSubCategorias = async () => {
        setLoading(true);
        const result = await getSubCategorias();
        setData(result)
        setLoading(false);
        // console.log(result)
        // setChecked(result.ActiveStatus)
    }
    useEffect(() => {
        getListadoSubCategorias();

        window.document.title = 'PPF • Registro Contable SubCategorias';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<div className="d-flex">
                    <h3 className="mx-3">SubCategorias</h3>
                    <ModalSubCategoria
                        toast={toast}
                        icono={aspectoBoton[0].Icono}
                        nombre={aspectoBoton[0].Nombre}
                        className={aspectoBoton[0].className}
                        subCategorias={getListadoSubCategorias} />
                    <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line" loading={loading} onClick={getListadoSubCategorias} />
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

export default SubCategoriasScreen
