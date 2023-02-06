import React, { useState, useEffect, useRef } from 'react';

//************** Funciones de Conexion **************/
import { getMenuNuevo } from '../../../Api/Menu/MenuRequest';

//************** Componentes generales **************/
import Card from '../../../components/Card/Card';
import Icon from '../../../components/icon/Icon';
import Loader from '../../../components/Loader/Loader';
import IconApp from '../../../components/icon/IconApp';
import AgGrid from '../../../components/Tables/AgGrid';

//************** Importacion de Modal **************/
import ModalMenu from './ModalMenuScreeen.js/ModalMenu';
import AgregarRolModal from '../Roles/ModalRoles/AgregarRolModal';

//************** Importacion de Componentes de PrimeReacts **************/
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';



const MenuScreen = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const toast = useRef(null);
  const [checked, setChecked] = useState(false)

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
    // console.log(rowData)
    return (
      <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop: -6 }}>
        <ModalMenu
          datos={rowData}
          toast={toast}
          icono={aspectoBoton[1].Icono}
          nombre={aspectoBoton[1].Nombre}
          className={aspectoBoton[1].className}
          getListadoMenu={getListadoMenu}
        />
      </div>

    )
  }

  const check = (rowData) => {
    return <Checkbox onChange={(e) => setChecked(e.value)} checked={rowData.ActivoAPP} style={{ marginTop: -1 }} ></Checkbox>
  }
  

  const table = {
    Data: data,
    Columns: [
      {
        // IdMenu: 1,
        field: 'IdMenu',
        header: 'IdMenu',
        className: 'colum-width-Xsmall',
        body: (rowData) => rowData.IdMenu,
      },
      {
        // Menu: 'Menu',
        field: 'Menu',
        header: 'Menu',
        className: 'colum-width-',
        body: (rowData) => rowData.Menu,
      },
      {
        // Icon
        field: 'Icon',
        header: 'Icon Webs',
        className: 'colum-width-small',
        body: (rowData) => <Icon icon={rowData.Icon ? rowData.Icon : 'a'} />,
        align: 'center',
        Format: 'Icon'
      },
      {
        // IconApp
        field: 'IconApp',
        header: 'IconApp',
        className: 'colum-width-small',
        body: (rowData) => <Icon icon={rowData.IconApp ? rowData.IconApp : 'a'} />,
        align: 'center',
        Format: 'Icon'
      },
      {
        // URL
        field: 'URL',
        header: 'URL',
        className: 'colum-width-XXlarge',
        body: (rowData) => rowData.URL,
      },
      {
        // Contenedor
        field: 'Contenedor',
        header: 'Contenedor',
        className: 'colum-width-',
        body: (rowData) => rowData.Contenedor,

      },
      {
        // ActivoApp
        field: 'ActivoAPP',
        header: 'Activo App',
        className: 'colum-width-medium',
        align: 'center',
        body: (rowData) => rowData.ActivoAPP,
        Format: 'Checkbox',
      },
      {
        // MenuWeb
        field: 'MenuWeb',
        header: 'Activo Web',
        className: 'colum-width-medium',
        body: (rowData) => rowData.MenuWeb,
        Format: 'Checkbox',
      },
      {
        header: 'Acciones',
        className: 'colum-width-small',
        body: (rowData) => botones(rowData),
        Format: "Template"
      }
    ],
    key: 'IdMenu',
    // scrollHeight: '100%',

  }



  const getListadoMenu = async () => {
    setLoading(true);
    const result = await getMenuNuevo();
    setData(result)
    setLoading(false);
  }

  useEffect(() => {
    getListadoMenu();
    window.document.title = 'PPF • IT Menu';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Loader loading={loading} />
      <Card
        titulo={<h3>Menu</h3>}
        contenido={
          <div className='p-3' style={{ height: '85vh' }}>
            <Toast position="bottom-right" ref={toast} />
            <ModalMenu
              toast={toast}
              icono={aspectoBoton[0].Icono}
              nombre={aspectoBoton[0].Nombre}
              className={aspectoBoton[0].className}
              getListadoMenu={getListadoMenu}
            />
          
            <AgGrid table={table} />
          </div>
        }
      />
    </div>
  )
}

export default MenuScreen;