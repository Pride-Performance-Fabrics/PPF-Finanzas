import React, { useEffect, useState } from "react";

import { FilterMatchMode } from 'primereact/api';

import instancias from "../../../Api/backend";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from "primereact/tag";

import { validarRespuesta } from "../../../services/crypto";
import { getDate } from "../../../services/FechasService";


const SesionesScreen = () => {

  const [usuariosActivos, setUsuariosActivos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [filters] = useState({
    'IdRol': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Usuario': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'UserName': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Vencimiento': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'TiempoActivo': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'IP': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Estado': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getUsuariosActivos = async () => {
    setLoading(true);
    const promesa = await fetch(`${instancias.API_URL}/sesiones?${Date.now()}`, {
      headers: { 'x-access-token': localStorage.getItem('ppfToken') }
    })
    // TODO PETICION -> FUNCION
    await promesa.json()
      .then((result) => {
        validarRespuesta(result);
        result.data.map((user) => {
          user.Creada = getDate(new Date(user.Creada));
          user.Vencimiento = getDate(new Date(user.Vencimiento));
          return user;
        })
        setTimeout(() => {
          setLoading(false);
          setUsuariosActivos(result.data);
        }, 400);

      }).catch((err) => {
        console.error(JSON.stringify(err))
      });
  }

  useEffect(() => {
    window.document.title = 'PPF • IT Sesiones'
    getUsuariosActivos();
  }, [])


  // *********    BUSQUEDA  *********
  const header = (
    <div className="table-header">
      <div>
        <Button className="p-button-text p-button-rounded " icon="pi pi-download" loading={loading} onClick={getUsuariosActivos} />
      </div>
      <div>
        <h3 className="mx-0 my-1">Usuarios Activos</h3>
      </div>
      <span className="p-input-icon-left search">
        <i className="pi pi-search" />
        <InputText className="search" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );

  const labelStatus = (rowData) => {
    const Vencimiento = new Date(rowData.Vencimiento)
    const now = new Date()
    if (Vencimiento > now) {
      return <Tag style={{ width: 60 }} severity="success" className={`product-badge status-active`}>Activo</Tag>;
    }
    else {
      return <Tag style={{ width: 60 }} severity="danger" className={`product-badge status-inactive`}>Inactivo</Tag>;
    }
  }

  const typeLabel = (rowData) => {
    if (rowData.Type === 'APP') {
      return <Tag style={{ width: 60 }} severity="warning" className={`product-badge status-active`}>APP</Tag>;
    }
    else {
      return <Tag style={{ width: 60 }} severity="insfo" className={`product-badge status-inactive`}>WEB</Tag>;
    }
  }

  const DeviceLabel = (rowData) => {
    if (rowData.Device === 'android') {
      return <i style={{ color: '#3DDA84', margin: 'auto' }} className='pi pi-android'/>
    }
    if (rowData.Device === 'ios') {
      return <i style={{ margin: 'auto' }} className='pi pi-apple'/>
    }
    if (rowData.Device === null) {
      return <i style={{ margin: 'auto' }} className='pi pi-desktop'/>
    }
  }

  const Creada = rowData => {
    if(rowData.Creada.getTime() !== 0){
      return <span>{rowData.Creada.toLocaleString()}</span>
    }
   }
  const Vencimiento = rowData => { 
    if(rowData.Type !== 'APP'){
      return <span>{rowData.Vencimiento.toLocaleString()}</span>;
    }
      return '';
  }



  return (
    <div className="px-4">
      <DataTable value={usuariosActivos} size={'small'} resizableColumns columnResizeMode="fit" dataKey="idUser" emptyMessage="No se han encontrado coincidencias."
        paginator rows={50} rowsPerPageOptions={[50, 100, 200]} globalFilter={globalFilter} sortOrder={-1} removableSort sortMode="multiple"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        scrollable scrollHeight="75vh" autoLayout loading={loading} rowHover stripedRows={true} responsiveLayout="scroll" header={header}
        filters={filters} filterDisplay='row' >

        <Column field="idUser" header='idUser' style={{ maxWidth: '10%', paddingLeft: 20 }} filter showFilterMenu={false} sortable></Column>
        <Column field="Usuario" header='idUser' style={{ maxWidth: '10%', paddingLeft: 20 }} filter showFilterMenu={false} sortable></Column>
        <Column field="UserName" header='idUser' style={{ width: '10%', paddingLeft: 20 }} filter showFilterMenu={false} sortable></Column>
        <Column field="Creada" body={Creada} header='Ingreso' style={{ width: '10%', paddingLeft: 20 }} filter showFilterMenu={false} sortable></Column>
        <Column field="Vencimiento" body={Vencimiento} header='Vencimiento' style={{ width: '10%', paddingLeft: 20 }} filter showFilterMenu={false} sortable></Column>
        {/* <Column field="TiempoActivo" header="Tiempo Activo" body={tiempoActivo} sortable style={{ maxWidth: '15%' }}></Column> */}
        <Column field="IP" header="IP" style={{ width: '10%', paddingLeft: 20 }} filter showFilterMenu={false} sortable></Column>
        <Column field="Estado" header="Status" body={labelStatus} sortable style={{ maxWidth: '15%' }} ></Column>
        <Column field="Type" header="Type" body={typeLabel} sortable style={{ maxWidth: '15%' }} ></Column>
        <Column field="Device" header="Device" body={DeviceLabel} sortable  ></Column>
      </DataTable>
    </div>
  )
}

export default SesionesScreen;