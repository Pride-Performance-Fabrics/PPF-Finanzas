/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { createPopper } from '@popperjs/core';
import { decodeToken } from 'react-jwt';
import Icon from '../icon/Icon';
import { classNames } from 'primereact/utils';
import { handleLogout } from '../../services/crypto';
import { getPermisos } from '../../utils/Menu/Permisos';

import logoH from '../../assets/SVG/Primario_H.svg';



const PanelSlider = ({ splitterPanel, splitterContent }) => {

    const ANIMATION_DURATION = 300;
    const btnClose = useRef();

    const [menu, setMenu] = useState();

    const defaultOpenMenus = document.querySelectorAll(".menu-item.sub-menu.open");


    const navigate = useNavigate();
    // const pooper = new Pooper()

    class PopperObject {
        instance = null;
        reference = null;
        popperTarget = null;
        sidebar = null;

        constructor(reference, popperTarget, sidebar) {
            this.init(reference, popperTarget, sidebar);
        }

        init(reference, popperTarget, sidebar) {
            this.sidebar = sidebar;
            this.reference = reference;
            this.popperTarget = popperTarget;
            this.instance = createPopper(this.reference, this.popperTarget, {
                placement: "right",
                strategy: "fixed",
                resize: true,
                modifiers: [
                    {
                        name: "computeStyles",
                        options: {
                            adaptive: false
                        }
                    },
                    {
                        name: "flip",
                        options: {
                            fallbackPlacements: ["left", "right"]
                        }
                    }
                ]
            });

            document.addEventListener(
                "click",
                (e) => clicker(e, this.popperTarget, this.reference),
                false
            );

            const clicker = (event, popperTarget, reference) => {
                // console.log(this.sidebar)
                if (
                    this.sidebar.classList.contains("collapsed") &&
                    !popperTarget.contains(event.target) &&
                    !reference.contains(event.target)
                ) {
                    this.hide(popperTarget);
                }
            }

            const ro = new ResizeObserver(() => {
                this.instance.update();
            });

            ro.observe(this.popperTarget);
            ro.observe(this.reference);
        }



        hide(popperTarget) {
            // console.log(popperTarget)
            this.instance.state.elements.popper.style.visibility = "hidden";
        }
    }

    class Poppers {
        subMenuPoppers = [];

        constructor(subMenuELS, sidebar) {
            this.init(subMenuELS, sidebar);
        }

        init(subMenuELS, sidebar) {
            subMenuELS.forEach((element) => {
                this.subMenuPoppers.push(
                    new PopperObject(element, element.lastElementChild, sidebar)
                );
                // console.log(this.subMenuPoppers)
                this.closePoppers();
            });
        }

        togglePopper(target) {
            if (window.getComputedStyle(target).visibility === "hidden")
                target.style.visibility = "visible";
            else target.style.visibility = "hidden";
        }

        updatePoppers() {
            this.subMenuPoppers.forEach((element) => {
                element.instance.state.elements.popper.style.display = "none";
                element.instance.update();
            });
        }

        closePoppers() {
            this.subMenuPoppers.forEach((element) => {
                element.hide();
            });
        }
    }


    const slideUp = (target, duration = ANIMATION_DURATION) => {
        const { parentElement } = target;
        parentElement.classList.remove("open");
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = `${duration}ms`;
        target.style.boxSizing = "border-box";
        target.style.height = `${target.offsetHeight}px`;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = "none";
            target.style.removeProperty("height");
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
        }, duration);
    };

    const slideDown = (target, duration = ANIMATION_DURATION) => {
        // console.log('SlideDown')
        const { parentElement } = target;
        parentElement.classList.add("open");
        target.style.removeProperty("display");
        let { display } = window.getComputedStyle(target);
        if (display === "none") display = "block";
        target.style.display = display;
        const height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.style.boxSizing = "border-box";
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = `${duration}ms`;
        target.style.height = `${height}px`;
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("box-shadow");

        window.setTimeout(() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
        }, duration);
    };


    const slideToggle = (target, duration = ANIMATION_DURATION) => {
        if (window.getComputedStyle(target).display === "none")
            return slideDown(target, duration);
        return slideUp(target, duration);
    };

    defaultOpenMenus.forEach((element) => {
        element.lastElementChild.style.display = "block";
    });





    // Pantalla de Inicio HomeScreen
    const handleHome = () => {
        navigate("/fin/Home", { replace: true })
    }

    const setItemsMenu = (contenido, i) => {
        let items = [];
        if (contenido[i].length > 0) {
            contenido[i].forEach((item) => {
                let subNivel = undefined;
                // console.log(item.IdMenu, contenido[item.IdMenu]?.length, i)
                if (contenido[item.IdMenu]?.length > 0) {
                    // console.log(item)
                    subNivel = setItemsMenu(contenido, item.IdMenu);
                }
                items.push(
                    {
                        label: item.Menu,
                        icon: item.Icon,
                        URL: item.URL !== null ? `${process.env.REACT_APP_ENV}/${item.URL}` : undefined,
                        items: subNivel
                    }
                );
            });
        }
        return items;
    }

    const obtenerMenuNew = async () => {
        const decoded = decodeToken(localStorage.getItem('ppfToken'));
        const response = await getPermisos(decoded.idUser);
        // console.log(response,decoded.idUser);
        let contenido = [];
        const menu = response.menu.filter((item) => item.MenuWeb);
        // console.log(menu)
        let panel = [];
        for (let nivel = 0; nivel <= 50; nivel++) {
            const tempo = menu.filter((element) => element.IdContenedor === nivel);
            contenido[nivel] = tempo;
        }
        // console.log(`contenido`,{contenido});
        panel.push(setItemsMenu(contenido, 0));

        // console.log(`panel c`,{panel});
        const aux = setItemMenu(panel[0]);

        const nav = (
            <nav className="menu open-current-submenu" >
                {aux}
            </nav >
        )
        setMenu(nav)
    }


    const setItemMenu = (menu) => {
        return <ul id='menu'>
            {/* {console.log(menu)} */}
            {menu.map((item) => {
                return (
                    // TODO TOOLTIP EN EL LI CUANDO ESTE COLAPSADO
                    <li key={item.label} className={classNames('menu-item', { 'sub-menu': item.items !== undefined })} >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a className='navegadorMenu'>
                            <span className='col-11' onClick={event => item.URL ? navigate(item.URL, { replace: true }) : null}>
                                <span className="menu-icon">
                                    <Icon icon={item.icon ?? ''} />
                                </span>
                                <span className="menu-title">{item.label}</span>
                            </span>
                            {item.items === undefined ?
                                <span className={'p-panelmenu-header-link p-panelitem-Redireccion me-2'}
                                    onClick={event => item.URL ? window.open(item.URL) : null}>
                                    {/* // onClick={event => navigate(item.URL, { replace: true })}> */}
                                    <i className="ri-share-circle-line"></i>
                                </span>
                                : ''}
                        </a>
                        {item.items !== undefined ? <div className='sub-menu-list'>{setItemMenu(item.items)}</div> : ''}
                    </li>
                )
            })}
        </ul>
    }



    useLayoutEffect(() => {
        obtenerMenuNew();
    }, [])


    useEffect(() => {
        if (menu) {
            const sidebar = document.getElementById("sidebar");
            const subMenuELS = document.querySelectorAll(
                ".menu > ul > .menu-item.sub-menu"
            );

            const firstSubMenuBTN = document.querySelectorAll(
                ".menu > ul > .menu-item.sub-menu > a"
            );

            const innerSubMenu = document.querySelectorAll(
                ".menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a"
            );


            const poppersInstance = new Poppers(subMenuELS, sidebar);
            // console.log(poppersInstance)
            /**
             * sidebar collapse handler
             */
            document.getElementById("btn-collapse").addEventListener("click", () => {
                const splitterPanel = document.getElementById('splitterPanel')
                const splitterContent = document.getElementById('splitterContent')
                splitterPanel.style.flexBasis = 'calc(15% - 4px)'
                splitterContent.style.flexBasis = 'calc(85% - 4px)'
                // splitterPanel.current.style.flexBasis = 33;
                btnClose.current.classList.toggle('active')
                sidebar.classList.toggle("collapsed");
                poppersInstance.closePoppers();
                if (sidebar.classList.contains("collapsed"))
                    splitterPanel.style.flexBasis = '80px'
                splitterContent.style.flexBasis = 'calc(100% - 84px)'
                firstSubMenuBTN.forEach((element) => {
                    element.parentElement.classList.remove("open");
                });
                updatePoppersTimeout();
            });

            /**
             * sidebar toggle handler (on break point )
             */
            document.getElementById("btn-collapse").addEventListener("click", () => {
                sidebar.classList.toggle("toggled");
                updatePoppersTimeout();
            });

            /**
             * toggle sidebar on overlay click
             */
            document.getElementById("overlay").addEventListener("click", () => {
                sidebar.classList.toggle("toggled");
            });

            /**
     * handle top level submenu click
     */
            firstSubMenuBTN.forEach((element) => {
                element.addEventListener("click", () => {
                    if (sidebar.classList.contains("collapsed"))
                        poppersInstance.togglePopper(element.nextElementSibling);
                    else {
                        const parentMenu = element.closest(".menu.open-current-submenu");
                        if (parentMenu)
                            parentMenu
                                .querySelectorAll(":scope > ul > .menu-item.sub-menu > a")
                                .forEach(
                                    (el) =>
                                        window.getComputedStyle(el.nextElementSibling).display !==
                                        "none" && slideUp(el.nextElementSibling)
                                );
                        slideToggle(element.nextElementSibling);
                    }
                });
            });

            /**
             * handle inner submenu click
             */
            innerSubMenu.forEach((element) => {
                element.addEventListener("click", () => {
                    slideToggle(element.nextElementSibling);
                });
            });

            /**
             * wait for the current animation to finish and update poppers position
             */
            const updatePoppersTimeout = () => {
                setTimeout(() => {
                    poppersInstance.updatePoppers();
                }, ANIMATION_DURATION);
            };
        }
    }, [menu])


    return (
        <div className=''>
            <div className='d-flex justify-content-center'>
                <span id='btn-collapse' aria-describedby="tooltip" style={{ zIndex: 1000 }}>
                    <svg id='svgBtnCollapse' ref={btnClose} className="ham hamRotate ham4 active" viewBox="0 0 100 100" width="50" >
                        <path
                            className="line top"
                            d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                        <path
                            className="line middle"
                            d="m 70,50 h -40" />
                        <path
                            className="line bottom"
                            d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                    </svg>
                </span>
            </div>
            <div className="sidebar-header">
                <div className="fila panel_logo_empresa">
                    <div className="columna">
                        <div onClick={handleHome} className="panel_button-home">
                            <img src={logoH} alt="Imagen" className="panel_imagen" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-content">

                    {menu}

            </div>
            <div className="sidebar-footer">
                <Button onClick={e => handleLogout()} icon='pi pi-power-off' label='Cerrar Sesión' />
            </div>
        </div>
    )
}

export default PanelSlider