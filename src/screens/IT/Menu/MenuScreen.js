import React, {useState, useEffect} from 'react';

//************** Funciones de Conexion **************/
import { getMenuNuevo } from '../../../Api/Menu/MenuRequest';

//************** Componentes generales **************/
import Card from '../../../components/Card/Card';
import Icon from '../../../components/icon/Icon';
import Loader from '../../../components/Loader/Loader';
import IconApp from '../../../components/icon/IconApp';
import AgGrid from '../../../components/Tables/AgGrid';

//************** Importacion de Modal **************/
import ModalAgregarMenu from './ModalMenuScreeen.js/ModalAgregarMenu';
import AgregarRolModal from '../Roles/ModalRoles/AgregarRolModal';


const MenuScreen = () => {

  const [loading, setLoading] = useState(false);

  const [table, setTable] = useState({
    Data: [],
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
          className: 'colum-width-',
          body: (rowData) => <Icon icon={rowData.Icon? rowData.Icon : 'a'} />,
          align: 'center',
          Format: 'Icon'
        },
        {
          // IconApp
          field: 'IconApp',
          header: 'IconApp',
          className: 'colum-width-',
          body: (rowData) => <IconApp icon={rowData.IconApp ? rowData.IconApp : 'a'} /> ,
          align: 'center',
          Format: 'IconApp'
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
          field: 'ActivoApp',
          header: 'Activo App',
          className: 'colum-width-',
          body: (rowData) => rowData.ActivoApp,
          Format: 'Checkbox',
      },
      {
          // MenuWeb
          field: 'MenuWeb',
          header: 'Activo Web',
          className: 'colum-width-',
          body: (rowData) => rowData.MenuWeb,
          Format: 'Checkbox',
      },
    ],
    key: 'IdMenu',
    // scrollHeight: '100%',
  })


  const getMenu = async () => {
    setLoading(true);
    const result = await getMenuNuevo();
    setTable({
      ...table,
      Data: result,
      key: 'IdMenu'
    })
    setLoading(false);
  }
  useEffect(() => {
    getMenu();
    window.document.title = 'PPF • IT Menu';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Loader loading={loading} />
      <Card
        titulo={<h3>Menu</h3>}
        contenido={
          <div className='p-3' style={{ height: '90vh' }}>
            <ModalAgregarMenu/>
            <br></br>
            <AgGrid table={table} />
            </div>
        }
      />
    </div>
  )
}

export default MenuScreen;