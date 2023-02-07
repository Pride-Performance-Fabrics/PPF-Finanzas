import React from "react";
import { useState, useEffect } from "react";

import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

//************** Componentes generales **************/
import Card from "../../../../components/Card/Card";
import Icon from "../../../../components/icon/Icon";
import Loader from "../../../../components/Loader/Loader";
import IconApp from "../../../../components/icon/IconApp";
import AgGrid from "../../../../components/Tables/AgGrid";

import { getSubTypes, getCuentaSubType, getVistaSubType } from "../../../../Api/Finanzas/SubTypesRequest";

import ModalSubTipos from "./ModalSubTipos/ModalSubTipos";
import ModalEditarSubTipos from "./ModalSubTipos/ModalEditarSubTipos";

const SubTiposScreen = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const botones = (rowData) => {
        // console.log(rowData)
        return (
            <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop: -6 }}>

                <ModalEditarSubTipos datos={rowData} subTipos={getListadoSubType} />
            </div>

        )
    }

    const [table, setTable] = useState({
        Data: [],
        Columns: [
            {
                field: 'Id',
                header: 'Id',
                className: 'colum-width-small',
                body: (rowData) => rowData.Id,
            },
            {
                field: 'IdSubType',
                header: 'NumberSubType',
                className: 'colum-width-medium',
                body: (rowData) => rowData.IdSubType,
            },
            {
                // IdMenu: 1,
                field: 'SubType',
                header: 'SubType',
                className: 'colum-width-Xlarge',
                body: (rowData) => rowData.SubType,
            },
            {
                // Menu: 'Menu',
                field: 'Description',
                header: 'Description',
                className: 'colum-width-XXXXlarge',
                body: (rowData) => rowData.Description,
            },
            {
                field: 'IdType',
                header: 'NumberType',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.IdType,
            },
            {
                field: 'Type',
                header: 'Type',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.IdType,
            },

            {
                header: 'Acciones',
                className: 'colum-width-small',
                // frozen: true,
                // alignFrozen: 'right',
                body: (rowData) => botones(rowData),
                Format: "Template"
            }



        ],
        key: 'IdSubType',
        // scrollHeight: '100%',
    })

    const getListadoSubType = async () => {
        setLoading(true);
        const result = await getVistaSubType();
        setTable({
            ...table,
            Data: result,
            key: 'IdSubType'
        })
        setLoading(false);
        // console.log(result)
        // setChecked(result.ActiveStatus)
    }
    useEffect(() => {
        getListadoSubType();

        window.document.title = 'PPF • Finanzas SubCuentas';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const abrirModal = () => {
        setOpen(true)
        return <ModalSubTipos subTipos={getListadoSubType} />
    }




    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<div className="d-flex">
                    <h3 className="mx-3">Subtipos de Cuentas</h3>
                    <ModalSubTipos subTipos={getListadoSubType} />
                </div>}
                contenido={
                    <div className='p-3' style={{ height: '90vh' }}>
                        {/* <Button label="Nuevo" icon="pi pi-plus" className="p-button-Primary mr-2" onClick={abrirModal} /> */}
                        
                        {/* <br></br><br></br> */}
                        <AgGrid table={table} />
                    </div>
                }
            />
        </div>
    )

}

export default SubTiposScreen;