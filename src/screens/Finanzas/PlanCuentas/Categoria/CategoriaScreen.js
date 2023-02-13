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

import { getTypes } from "../../../../Api/Finanzas/TypesRequest";
import { getCategorias } from "../../../../Api/Finanzas/CategoriasRequest";

import ModalCategoria from "./ModalCategoria/ModalCategoria";

const CategoriaScreen = () => {

    const [loading, setLoading] = useState(false);
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
                <ModalCategoria
                    toast={toast}
                    datos={rowData}
                    icono={aspectoBoton[1].Icono}
                    nombre={aspectoBoton[1].Nombre}
                    className={aspectoBoton[1].className}
                    categorias={getListadoCategoria} />
            </div>

        )
    }

    const table = {
        Data: data,
        Columns: [
            {
                field: 'IdCategoria',
                header: 'IdCategoria',
                className: 'colum-width-small',
                body: (rowData) => rowData.IdCategoria,
            },
            {
                field: 'CodigoCategoria',
                header: 'CodigoCategoria',
                className: 'colum-width-medium',
                body: (rowData) => rowData.CodigoCategoria,
            },

            {
                field: 'Categoria',
                header: 'Categoria',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.Categoria,
            },
            {
                field: 'Type',
                header: 'Type',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.Type,
            },

            {

                field: 'Description',
                header: 'Description',
                className: 'colum-width-XXXXlarge',
                body: (rowData) => rowData.Description,
            },

            {
                header: 'Acciones',
                className: 'colum-width-small',

                body: (rowData) => botones(rowData),
                Format: "Template"
            }



        ],
    }



    const getListadoCategoria = async () => {
        setLoading(true);
        const result = await getCategorias();
        setData(result)
        setLoading(false);
        // setDatos(result)
        console.log("RESULTADO", result)
        // setChecked(result.ActiveStatus)
    }
    useEffect(() => {
        getListadoCategoria();

        window.document.title = 'PPF • Registro Contable Categoria';

    }, [])




    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<div className="d-flex">
                    <h3 className="mx-3">Categorias</h3>
                    <ModalCategoria
                        toast={toast}
                        icono={aspectoBoton[0].Icono}
                        nombre={aspectoBoton[0].Nombre}
                        className={aspectoBoton[0].className}
                        categorias={getListadoCategoria} />
                    <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line" loading={loading} onClick={getListadoCategoria} />
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

export default CategoriaScreen
