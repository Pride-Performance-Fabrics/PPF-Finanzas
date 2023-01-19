import React,{useState, useEffect, useRef } from "react";


// Librerias de componentes
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import {Tag} from "primereact/tag";


import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';


// Componentes para CRUD de usuarios
import ModalAgregarUsuario from "./ModalScreenUsuario/ModalAgregarUsuario";
import ModalEditarUsuario from "./ModalScreenUsuario/ModalEditarUsuario";
// import ModalTiempoActividadUsuario from "./ModalScreenUsuario/ModalTiempoActividadUsuario";



// Importacion de las variables del ENV

import instancias from "../../../Api/backend";

// Servicios generales de la apliaccion
import { validarRespuesta } from "../../../services/crypto";


export const UsuariosScreen = () =>{

    // console.log(instancias.API_URL, instancias.API_PORT)
    

    const toast = useRef(null);

    const dt = useRef(null);
    
    // Variables de edicion 
    const [ usuarios, setUsuarios] = useState("");
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true)



    // Funcion para obtener los usuarios desde la API
    const  getUsuarios  = async () =>{
        // TODO PETICION -> FUNCION
        const promesa = await fetch(`${instancias.API_URL}/users?${Date.now()}`, { 
            headers: { 'x-access-token': localStorage.getItem('ppfToken') } });

        await promesa.json()
                
        .then(function(res) {
            validarRespuesta(res);
           console.log(res)
            setTimeout(() => {
                setUsuarios(res.data)
                setLoading(false)
            }, 400);
            
          })
        .catch((error) => {
           console.error(error)
        })  
    }

    // HOOKS de efecto que retorna la funcion getUsuarios
    useEffect(() =>
    {
        window.document.title = 'PPF • IT Usuarios'
        getUsuarios();
        // <ModalMessage usuarios= {usuarios}/>
    }, []);


    // *********    BUSQUEDA  *********
    const header = (
        <div className="table-header">
            <div>
                <ModalAgregarUsuario usuarios = {getUsuarios}/>
            </div>
            <div className="flex align-items-center flex-column pt-6 px-3">
                        <h3 className="usuarios__titulo">Usuarios</h3>
            </div>
            <span className="p-input-icon-left search">
                <i className="pi pi-search" />
                <InputText id = "globalFilter" className="search" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    // const statusBodyTemplate = (rowData) => {
    //     if(rowData.StatusName === "Active"){
    //         return <Tag style ={{width: 60}} severity = "success" className={`product-badge status-${rowData.StatusName.toLowerCase()}`}>{rowData.StatusName}</Tag>;
    //     }
    //     else{
    //         return <Tag style ={{width: 60}} severity = "danger" className={`product-badge status-${rowData.StatusName.toLowerCase()}`}>{rowData.StatusName}</Tag>;
    //     }
       
    // }

    const editUser = (rowData) => {
        return <ModalEditarUsuario datos = {rowData} usuarios = {getUsuarios} />
    }

    // const actividadUsuario = (rowData) => {
    //     return <ModalTiempoActividadUsuario datos = {rowData}  />
    // }




    return(
        <div className="usuarios__contenedor px-4">
           <Toast position="bottom-right" ref={toast}></Toast>
                <DataTable ref={dt} value={usuarios} editMode="row" dataKey="idUsuarios" size="small"  filterDisplay="row" scrollable scrollHeight="85vh" globalFilter={globalFilter} header={header} responsiveLayout="scroll"  autoLayout loading={loading} rowHover 
                stripedRows resizableColumns columnResizeMode="fit" className=" dataTable-headerLight usuario_datatable p-datatable-responsive-demo" emptyMessage = "No se han encontrado coincidencias." >
                    <Column field="idUser" header="id"  sortable style={{maxWidth:'5%'}} filter></Column>
                    <Column field="Usuario" header="Usuario" sortable style={{maxWidth:'15%'}} filter></Column>
                    <Column field="UserName" filter header="Nombre"   sortable style={{maxWidth:'20%'}} ></Column>
                    <Column field="Mail" header="Correo"  sortable style={{maxWidth:'25%'}} filter></Column>
                    <Column field="Rol" header="Rol"  sortable style={{maxWidth:'15%'}} filter></Column>
                    {/* <Column field="StatusName" header="Status" body={statusBodyTemplate} sortable style={{maxWidth:'13%'}} filter></Column> */}
                    {/* <Column body={actividadUsuario} exportable={false} style={{maxWidth:'7%'}} ></Column> */}
                    <Column body={editUser} exportable={false} style={{maxWidth:'7%'}} ></Column>
                </DataTable>
        </div>
    )
}


export default UsuariosScreen;