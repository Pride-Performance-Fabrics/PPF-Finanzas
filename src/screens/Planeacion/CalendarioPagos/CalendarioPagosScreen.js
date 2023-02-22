import React, { useState, useEffect, useRef } from 'react';

//************** Componentes generales **************/
import Card from '../../../components/Card/Card';
import Icon from '../../../components/icon/Icon';
import Loader from '../../../components/Loader/Loader';
import IconApp from '../../../components/icon/IconApp';
import AgGrid from '../../../components/Tables/AgGrid';

import { Tag } from 'primereact/tag';

import { getTodasActividades } from '../../../Api/Sheduler/ShedulerRequest';

import { getDateTimeSQL4} from '../../../services/FechasService';

import { fechaLocalStringTemplate,fechaTemplate } from '../../../services/TemplatesServices';

const CalendarioPagosScreen = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const statusAccount = (e) => {
    return  <Tag style={{ width: 80, backgroundColor: e.ColorStatus }}  value={e.StatusName}/>

  }

  const table = {
    Data: data,
    Columns: [
      {
        // Menu: 'Menu',
        field: 'IdCalendar',
        header: 'IdCalendar',
        className: 'colum-width-small',
        align: 'center',
        body: (rowData) => rowData.IdCalendar
      },
      {
        // IdMenu: 1,
        field: 'title',
        header: 'Titulo',
        className: 'colum-width-XXlarge',
        body: (rowData) => rowData.title,
      },
      {
        // URL
        field: 'startDate',
        header: 'Inicio',
        className: 'colum-width-',
        Format: 'Template',
        body: (rowData) => fechaTemplate(rowData.startDate)
      },
      {
        // Contenedor
        field: 'endDate',
        header: 'Vencimiento',
        className: 'colum-width-',
        Format: 'Template',
        body: (rowData) => fechaTemplate(rowData.endDate)

      },
      {
        // IdMenu: 1,
        field: 'notes',
        header: 'Nota',
        className: 'colum-width-XXlarge',
        body: (rowData) => rowData.notes,
      },

      {
        // MenuWeb
        field: 'Priority',
        header: 'Prioridad',
        className: 'colum-width-small'
      },
      {
        // ActivoApp
        field: 'StatusName',
        header: 'Estado',
        className: 'colum-width-medium',
        align: 'center',
        Format: 'Template',
        body: (rowData) =>  <Tag style={{ width: 80, backgroundColor: rowData.ColorStatus }}  value={rowData.StatusName}/>,
       

      },

      {
        // MenuWeb
        field: 'UserName',
        header: 'Usuario Creo',
        className: 'colum-width-medium'

      },
      {
        // MenuWeb
        field: 'createDate',
        header: 'Fecha Creada',
        className: 'colum-width-medium',
        Format: 'Template',
        body: (rowData) => fechaTemplate(rowData.createDate)
      },
      {
        // MenuWeb
        field: 'UsuarioProcess',
        header: 'Usuario Proceso',
        className: 'colum-width-medium'

      },
      {
        // MenuWeb
        field: 'processStatusDate',
        header: 'Fecha Proceso',
        className: 'colum-width-medium',
        Format: 'Template',
        body: (rowData) => fechaTemplate(rowData.processStatusDate)
      },
      {
        // MenuWeb
        field: 'UsuarioComplete',
        header: 'Usuario Completo',
        className: 'colum-width-medium'

      },
      {
        // MenuWeb
        field: 'completetStatusDate',
        header: 'Fecha Completo',
        className: 'colum-width-medium',
        Format: 'Template',
        body: (rowData) => fechaTemplate(rowData.completetStatusDate)
      },
      {
        // MenuWeb
        field: 'UsuarioCancel',
        header: 'Usuario Cancelo',
        className: 'colum-width-medium'

      },
      {
        // MenuWeb
        field: 'cancelStatusDate',
        header: 'Fecha Cancelo',
        className: 'colum-width-medium',
        Format: 'Template',
        body: (rowData) => fechaTemplate(rowData.cancelStatusDate)
      },

      {
        // MenuWeb
        field: 'reminder',
        header: 'Recordatorio dias',
        className: 'colum-width-medium',
        align: 'center'

      }


    ],
    key: 'IdCalendar',
    // scrollHeight: '100%',

  }

  const getListadoActividades = async () => {
    setLoading(true);
    const result = await getTodasActividades();
    setData(result)
    setLoading(false);
  }

  useEffect(() => {
    getListadoActividades();
    window.document.title = 'PPF • Planeacion Calendario';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div>
      <Loader loading={loading} />
      <Card
        titulo={
          <div className="d-flex">
            <h3 className="mx-3">Calendario Pagos</h3>
          </div>}
        contenido={
          <div className='pt-4' style={{ height: '85vh' }}>

            <AgGrid table={table} />
          </div>
        }
      />
    </div>
  )
}

export default CalendarioPagosScreen
