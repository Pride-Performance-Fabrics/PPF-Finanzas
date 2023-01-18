/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";

import instancias from "../../api/backend";


import { useNavigate } from "react-router-dom";
import { PanelMenu } from 'primereact/panelmenu';
import Icon from '../icon/Icon'



import { validarRespuesta, handleLogout } from '../../services/crypto';


export const Panel = () => {

  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // Pantalla de Inicio HomeScreen
  const handleHome = () => {
    navigate("/web/Home", { replace: true })
  }

  const userIsAuth = async () => {
    const promesa = await fetch(`${instancias.API_URL}/users/userIsAuth?${Date.now()}`, {
      headers: { 'x-access-token': localStorage.getItem('ppfToken') }
    });
    // TODO PETICION -> FUNCION
    await promesa.json()
      .then((res) => {
        getMenu(res.IdRol, res.idUser);

      })
      .catch((error) => {
        console.error('Error', JSON.stringify(error))
      })
  }


  const getMenu = async (rolUser, idUser) => {
    const promesa = await fetch(`${instancias.API_URL}/menu/${rolUser}/${idUser}?${Date.now()}`, {
      headers: { 'x-access-token': localStorage.getItem('ppfToken') }
    });
    // TODO PETICION -> FUNCION
    await promesa.json()
      .then((res) => {
        validarRespuesta(res);
        const objeto = res.data;
        let menu = [{
          label: 'Inicio',
          icon: 'pi pi-fw pi-home',
          command: (e) => {
            navigate(`/web/home`, { replace: false })
          },
        }];
        let idNivel = 0;
        for (let i = 0; i < objeto.length; i++) {
          if (objeto[i].AccesoNivel) {
            if (idNivel !== objeto[i].IdNivelWeb) {
              idNivel = objeto[i].IdNivelWeb;

              let subNivel = [];
              let IdSubNivel = 0;
              for (let m = 0; m < objeto.length; m++) {
                if (objeto[m].AccesoSubNivel) {
                  if (IdSubNivel !== objeto[m].IdSubNivel) {
                    if (idNivel === objeto[m].IdNivelWeb) {
                      IdSubNivel = objeto[m].IdSubNivel
                      subNivel.push({
                        label: objeto[m].SubNivel,
                        icon: objeto[m].iconSubNivel,
                        template: () => {
                          return (
                            /* custom element */
                            <div className="p-component p-panelmenu-header" onClick={event => navigate(objeto[m].URLSubMenu, { replace: true })}>
                              <a id="pr_id_1_header" className="p-panelmenu-header-link  p-panelSubMenu" >
                                <div>
                                  <Icon icon={objeto[m].iconSubNivel} />
                                  <span className={'p-menuitem-tex'}>{objeto[m].SubNivel}</span>
                                </div>
                                <a className={'p-panelmenu-header-link p-panelitem-Redireccion p-menuitem-icon pi pi-external-link'}
                                  onClick={event => window.open('/' + objeto[m].URLSubMenu)}></a>
                              </a>
                            </div>
                          );
                        }
                      })
                    }
                  }
                }
              }

              menu.push({
                label: objeto[i].Nivel,
                icon: objeto[i].iconNivel,
                command: (e) => {
                  navigate(`${objeto[i].URLNivel}`, { replace: true })
                },
                items: subNivel
              })
            }

          }
        }
        setItems(menu);
      })
  }

  const item = [
    {
      label: 'Cerrar Sesión ',
      icon: 'pi pi-fw pi-power-off',
      command: (event) => {
        handleLogout()
      }

    }
  ]
  useEffect(() => {
    userIsAuth();
  }, [])

  const LogoEmpresa = (
    <React.Fragment>
      <div className="fila panel_logo_empresa">
        <div className="columna">
          <a onClick={handleHome} className="panel_button-home">
            <img src="https://were.ppf.com.hn/web/Logo_PPF_Primario_H.png" alt="Imagen" className="panel_imagen" />
          </a>
        </div>
      </div>

    </React.Fragment>
  )


  // RENDERIZACION DEL MENU LATERAL
  return (
    <div className="panel_contenedor" style={{ position: "relative", height: "100%" }}>
      <div>{LogoEmpresa}</div>
      <div className="panel_contenedor-menu">
        <PanelMenu model={items} className="panel_menu" />
      </div>
      <div className='BotonCierre'>
        <PanelMenu model={item} className="panel_menu" />
      </div>
    </div>
  )

}




export default Panel;