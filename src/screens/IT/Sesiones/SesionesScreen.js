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

//************** Componentes generales **************/

import Card from '../../../components/Card/Card';
import Icon from '../../../components/icon/Icon';
import Loader from '../../../components/Loader/Loader';
import IconApp from '../../../components/icon/IconApp';
import AgGrid from '../../../components/Tables/AgGrid';

import { VencimientoToken } from "../../../utils/Sesiones/Sesiones";

import {setNotificacionesWeb} from "../../../Api/Global/NotificacionesRequest";



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
    console.log("entro aqui")
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

  // useEffect(() => {
  //   window.document.title = 'PPF • IT Sesiones'
  //   getUsuariosActivos();
  // }, [])


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
      return <Tag style={{ width: 60 }} severity="success" className={`product-badge status-active`} value = {"Activo"}/>;
    }
    else {
      return <Tag style={{ width: 60 }} severity="danger" className={`product-badge status-inactive`} value = {"Inactivo"}/>;
    }
  }

  const typeLabel = (rowData) => {
    if (rowData.Type === 'APP') {
      return <Tag style={{ width: 60 }} severity="warning" className={`product-badge status-active`} value = {"APP"}/>;
    }
    else {
      return <Tag style={{ width: 60 }} severity="insfo" className={`product-badge status-inactive`} value = {"WEB"}/>;
    }
  }

  const DeviceLabel = (rowData) => {
    if (rowData.Device === 'android') {
      return <i style={{ color: '#3DDA84', margin: 'auto' }} className='pi pi-android' />
    }
    if (rowData.Device === 'ios') {
      return <i style={{ margin: 'auto' }} className='pi pi-apple' />
    }
    if (rowData.Device === null) {
      return <i style={{ margin: 'auto' }} className='pi pi-desktop' />
    }
  }

  // const Creada = (e) => {
  //   console.log(e.Creada)
  //   if (rowData.Creada.getTime() !== 0) {
  //     return <span>{rowData.Creada.toLocaleString()}</span>
  //   }
  // }
  const Vencimiento = rowData => {
    if (rowData.Type !== 'APP') {
      return <span>{rowData.Vencimiento.toLocaleString()}</span>;
    }
    return '';
  }

  const cerrarSesion = async(rowData) =>{
    console.log(rowData)
    let datos = {
      usuarios: [rowData.idUser],
      title: 'Cierre de Session',
      body:'La sesión sera cerrada',
      data: {cierreSesion : "true"},
      UserSend: null,
      priority: 'high',
      Tipo:2
    }

   const respuesta = await  setNotificacionesWeb(datos)
   console.log(respuesta)
   await VencimientoToken(rowData.idUser)
   




  }

  const Acciones = (rowData) =>{
   return(
    <Button 
        className='p-button-rounded p-button-text mx-1'
        label="Cerrar Sesión" 
        style={{marginTop:-5}}
        onClick ={()=> cerrarSesion(rowData)}
    />
   )
  }


  const Columns = [
    {

      field: 'IdSession',
      header: 'IdSession',
      className: 'colum-width-small',
      body: (rowData) => rowData.IdSession,
    },
    {
      field: 'idUser',
      header: 'idUser',
      className: 'colum-width-small',
      body: (rowData) => rowData.idUser,
    },
    {
      field: 'UserName',
      header: 'UserName',
      className: 'colum-width-small',
      body: (rowData) => rowData.UserName,
    },

    {
     
      field: 'Creada',
      header: 'Creada',
      Format: 'DateTime',
      className: 'small'
    },
    {
      field: 'Vencimiento',
      header: 'Vencimiento',
      
      Format: 'DateTime',
      className: 'small'
    },
    {
      field: 'IP',
      header: 'IP',
      className: 'colum-width-medium',
      body: (rowData) => rowData.IP,
    },
    {
      field: 'Estado',
      header: 'Estado',
      className: 'colum-width-small',
      Format: 'Template',
      body: rowData => labelStatus(rowData),
    },
    {
      field: 'Type',
      header: 'Type',
      className: 'colum-width-small',
      Format: 'Template',
      body: (rowData) => typeLabel(rowData),
    },
    {
      field: 'Device',
      header: 'Device',
      className: 'colum-width-Xsmall',
      body: (rowData) => DeviceLabel(rowData),

    },
    {
      field: 'Acciones',
      header: 'Acciones',
      className: 'colum-width-medium',
      Format: 'Template',
      body: (rowData) => Acciones(rowData),

    }



  ]

  const table = {
    Columns: Columns,
    Data: usuariosActivos
  }

  // const getListadoSesiones = async () => {
  //   console.log("s")
  //   setLoading(true);
  //   const result = await getUsuariosActivos();
  //   setTable({
  //     ...table,
  //     Data: result,
  //     key: 'IdSession'
  //   })
  //   setLoading(false);
  // }

  useEffect(() => {
    getUsuariosActivos();
    window.document.title = 'PPF • IT Sesiones';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  return (
    <div>
      <Loader loading={loading} />
      <Card

        titulo={<div className="d-flex"
                ><h3>Usuarios Activos</h3>
                 <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line"  loading={loading} onClick={getUsuariosActivos} />
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

export default SesionesScreen;