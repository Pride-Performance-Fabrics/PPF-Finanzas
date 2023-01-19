import React, { useState, useEffect, useRef } from "react";

//************** Librerias de componentes **************/

import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Tag } from "primereact/tag";
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";

//************** Importacion de las variables del ENV **************/
import instancias from "../../../Api/backend";

//************** Servicios generales de la pagina **************/
import { validarRespuesta } from "../../../services/crypto";
import { getUsuarios } from "../../../utils/Users/users";
import { checkBoxTemplate, estadoTemplate, textCenterTemplate, statusBodyTemplate, ItemTemplate } from '../../../services/TemplatesServices';

//************** Componentes Especificos **************/
import ModalEditarUsuario from "./ModalScreenUsuario/ModalEditarUsuario";
import ModalAgregarUsuario from "./ModalScreenUsuario/ModalAgregarUsuario";
//************** Componentes generales **************/

import Card from '../../../components/Card/Card';
import Icon from '../../../components/icon/Icon';
import Loader from '../../../components/Loader/Loader';
import IconApp from '../../../components/icon/IconApp';
import AgGrid from '../../../components/Tables/AgGrid';


export const UsuariosScreen = () => {

    const [loading, setLoading] = useState(false);

    const [usuarios, setUsuarios] = useState("");

    // *********    BUSQUEDA  *********
    const header = (
        <div className="table-header">
            <div>
                <ModalAgregarUsuario usuarios={getUsuarios} />
            </div>
            <div className="flex align-items-center flex-column pt-6 px-3">
                <h3 className="usuarios__titulo">Usuarios</h3>
            </div>
            <span className="p-input-icon-left search">
                <i className="pi pi-search" />
                {/* <InputText id="globalFilter" className="search" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." /> */}
            </span>
        </div>
    );

    const statusBodyTemplate = (e) => {
        
        if (e.StatusName === "Active") {
            return <Tag style={{ width: 60 }} severity="success" className={`product-badge status-${e.StatusName}`}>{e.StatusName}</Tag>;
        }
        else {
            return <Tag style={{ width: 60 }} severity="danger" className={`product-badge status-${e.StatusName}`}>{e.StatusName}</Tag>;
        }

    }



    // const editUser = (e) => {
    //     return <ModalEditarUsuario datos={e} usuarios={getUsuarios} />
    // }

    const [table, setTable] = useState({
        Data: [],
        Columns: [
            {

                field: 'idUser',
                header: 'IdUser',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.idUser,

            },
            {

                field: 'idPersonal',
                header: 'IdPersonal',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.idPersonal,
            },
            {
                field: 'Usuario',
                header: 'Usuario',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.Usuario,
            },
            {
                field: 'UserName',
                header: 'UserName',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.UserName,
            },
            {
                field: 'Mail',
                header: 'Mail',
                className: 'colum-width-large',
                body: (rowData) => rowData.Mail,
            },
            {
                field: 'StatusName',
                header: 'Status',
                className: 'colum-width-Xsmall',
                Format: 'Template',
                body: e => statusBodyTemplate(e)

                
            },
            {
                field: 'PermisosWeb',
                header: 'Permisos',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.Permisos,

            },
            {
                header: 'Permisos',
                className: 'colum-width-Xsmall',
                // Format: 'Template',
                // body: e => editUser(e)
                
               
            }


        ],
        key: 'idUser',
        // scrollHeight: '100%',
    })


    // Funcion para obtener los usuarios desde la API
    const getListadoUsuarios = async () => {
        setLoading(true);
        const result = await getUsuarios();
        setTable({
            ...table,
            Data: result,
            key: 'idUser'
        })
        setLoading(false);
    }



    useEffect(() => {
        getListadoUsuarios();
        window.document.title = 'PPF • IT Usuarios';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<h3>Usuarios</h3>}
                contenido={
                    <div className='p-3' style={{ height: '90vh' }}>
                        <AgGrid table={table} />
                    </div>
                }
            />
        </div>
    )

}

export default UsuariosScreen;;