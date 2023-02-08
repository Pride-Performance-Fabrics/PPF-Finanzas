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
import { getTypes } from "../../../../Api/Finanzas/TypesRequest";

import ModalTipo from "./ModalTipo/ModalTipo";
import ModalEditarTipo
 from "./ModalTipo/ModalEditarTipo";
const TiposScreen = () =>{

    const [loading, setLoading] = useState(false);
    // const [datos, setDatos] = useState({})

    const botones = (rowData) =>{
        console.log(rowData)
        return(
            <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop:-6}}>
               <ModalEditarTipo datos = {rowData} tipos = {getListadoType}/>
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
                field: 'IdType',
                header: 'IdType',
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
                // Menu: 'Menu',
                field: 'Description',
                header: 'Description',
                className: 'colum-width-XXXXlarge',
                body: (rowData) => rowData.Description,
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

    const getListadoType = async () => {
        setLoading(true);
        const result = await getTypes();
        setTable({
            ...table,
            Data: result,
            key: 'IdSubType'
        })
        setLoading(false);
        // setDatos(result)
        console.log("RESULTADO",result)
        // setChecked(result.ActiveStatus)
    }
    useEffect(() => {
        getListadoType();

        window.document.title = 'PPF • Finanzas Cuentas';
    
    }, [])

    


    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<div className="d-flex">
                    <h3 className="mx-3">Tipos de Cuentas</h3> 
                    <ModalTipo tipos = {getListadoType} />
                    <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line" loading={loading} onClick={getListadoType} />
                </div>}
                contenido={
                    <div className='pt-4' style={{ height: '90vh' }}>
                        
                        <AgGrid table={table} />
                    </div>
                }
            />
        </div>
    )

}

export default TiposScreen;