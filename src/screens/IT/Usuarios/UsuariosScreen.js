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



    const statusBodyTemplate = (e) => {

        if (e.StatusName === "Active") {
            return <Tag style={{ width: 50, height: 20, marginBottom: 20 }} severity="success" className={`product-badge status-${e.StatusName}`}>{e.StatusName}</Tag>;
        }
        else {
            return <Tag style={{ width: 60, height: 20 }} severity="danger" className={`product-badge status-${e.StatusName}`}>{e.StatusName}</Tag>;
        }

    }

    const showUser = (e) => {

        return (
            <div style={{ width: 50, height: 30, marginTop: -5 }}>
                <ModalEditarUsuario datos={e} usuarios={getListadoUsuarios} />
            </div>
        )
    }

    const editUser = (e) => {
        // return (<ModalEditarUsuario datos={e} usuarios={getListadoUsuarios} />)
        return (
            <div style={{ marginTop: -5 }}>
                <Button
                    className='p-button-rounded p-button-text mx-1'
                    icon={'pi pi-user-edit'}
                    tooltip={'Editar Usuario'}
                    onClick={b => showUser(e)}
                />
            </div>

        )
    }

    const [table, setTable] = useState({
        Data: [],
        Columns: [
            {

                field: 'idUser',
                header: 'IdUser',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.idUser,

            },
            // {

            //     field: 'idPersonal',
            //     header: 'IdPersonal',
            //     className: 'colum-width-Xsmall',
            //     body: (rowData) => rowData.idPersonal,
            // },
            {
                field: 'Usuario',
                header: 'Usuario',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.Usuario,
            },
            {
                field: 'UserName',
                header: 'UserName',
                className: 'colum-width-large',
                body: (rowData) => rowData.UserName,
            },
            {
                field: 'Rol',
                header: 'Rol',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.Rol,
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
            // {
            //     field: 'PermisosWeb',
            //     header: 'Permisos',
            //     className: 'colum-width-Xsmall',
            //     body: (rowData) => rowData.PermisosWeb,

            // },
            {
                header: '',
                className: 'colum-width-Xsmall',
                Format: 'Template',
                body: e => showUser(e)
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
                        <ModalAgregarUsuario usuarios={getUsuarios} />
                        <br></br>
                        <AgGrid table={table} />
                    </div>
                }
            />
        </div>
    )

}

export default UsuariosScreen;;