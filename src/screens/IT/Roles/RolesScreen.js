import React, { useState, useEffect, useRef } from "react";

import instancias from "../../../Api/backend";

// Librerias de componentes
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import {Button} from "primereact/button";
import { FilterMatchMode } from 'primereact/api';

import ModificarRolModal from "./ModalRoles/ModificarRolModal";
import AgregarRolModal from "./ModalRoles/AgregarRolModal";
import { validarRespuesta } from "../../../services/crypto";

import { getRoles } from "../../../Api/IT/Roles/RolesRequest";
// import './RolesStyle.css';


//************** Componentes generales **************/

import Card from '../../../components/Card/Card';
import Icon from '../../../components/icon/Icon';
import Loader from '../../../components/Loader/Loader';
import IconApp from '../../../components/icon/IconApp';
import AgGrid from '../../../components/Tables/AgGrid';

export const RolesScreen = () => {

    const toast = useRef(null);
    const [roles, setRoles] = useState("");
    const [filters, setFilters2] = useState({
        'IdRol': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'Rol': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [loading, setLoading] = useState(true)


    // const getListadoRoles = async () => {
    //     const promesa = await fetch(`${instancias.API_URL}/Roles?${Date.now()}`, {
    //         headers: { 'x-access-token': localStorage.getItem('ppfToken') }
    //     });

    //     await promesa.json()

    //         .then(function (res) {
    //             validarRespuesta(res);
    //             setTimeout(() => {
    //                 setRoles(res.data);
    //                 setLoading(false)
    //             }, 400);
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })

    // }

   


    useEffect(() => {
        window.document.title = 'PPF • IT Roles';
        getRoles();

    }, []);

    const showRol = (rowData) => {
        return (
            // <div style ={{alignContent:"right"}}>
                <ModificarRolModal datos = {rowData} updateRoles = {getListadoRoles}/>
            // </div>
        );
    }

    
    const [table, setTable] = useState({
        Data: [],
        Columns: [
            {
                
                field: 'IdRol',
                header: 'IdRol',
                className: 'colum-width-small',
                body: (rowData) => rowData.IdRol,
                
                
            },
            {
                field: 'Rol',
                header: 'Rol',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.Rol,
            },
            {
                field: 'Description',
                header: 'Description',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.Description,
            },
        
            {
                header: '',
                className: 'colum-width-small',
                Format: 'Template',
                body: e => showRol(e)
            },
            
            
            
        ],
        key: 'IdRol',
        // scrollHeight: '100%',
    })
    
    const getListadoRoles = async () => {
        console.log("s")
        setLoading(true);
        const result = await getRoles();
        setTable({
            ...table,
            Data: result,
            key: 'IdRol'
        })
        setLoading(false);
    }

    useEffect(() => {
        getListadoRoles();
        window.document.title = 'PPF • IT Roles';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div>
            <Loader loading={loading} />
            <Card

                titulo={
                <div className="d-flex" >
                    <h3 className="mx-3">Roles</h3>
                    <AgregarRolModal roles = {getListadoRoles}/>
                    <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line"  loading={loading} onClick={getListadoRoles} />
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


export default RolesScreen;