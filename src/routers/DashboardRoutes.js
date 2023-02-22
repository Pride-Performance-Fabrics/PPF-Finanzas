//************** Componentes React ************** /
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//************** Librerias **************/
import { Permissible } from '@brainhubeu/react-permissible';

import { decodeToken } from "react-jwt";

//************** Componentes Primereact **************/
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ProgressSpinner } from 'primereact/progressspinner';

//************** Componentes Creados **************/
import Footer from "../components/Footer/Footer";
import PanelSlider from "../components/Panel/PanelSlider";
import ModalDieSession from "../components/Panel/ModalDieSession";


import { getPermisos } from "../utils/Menu/Permisos";

//************** Screens **************/
import HomeScreen from "../screens/Homes/HomeScreen";

// --------------- IT ------------------
import ITHomeScreen from "../screens/Homes/ITHomeScreen";
import RolesScreen from "../screens/IT/Roles/RolesScreen";
import UsuariosScreen from "../screens/IT/Usuarios/UsuariosScreen";
import Sesiones from "../screens/IT/Sesiones/SesionesScreen";
import SesionesScreen from "../screens/IT/Sesiones/SesionesScreen";
import MenuScreen from "../screens/IT/Menu/MenuScreen";
import AccesosScreen from "../screens/IT/Accesos/AccesosScreen";

// --------------- Finanzas ------------------
import FinanzasHomeScreen from "../screens/Homes/FinanzasHomeScreen";
import PlanCuentasScreen from "../screens/Finanzas/PlanCuentas/PlanCuentas/PlanCuentasScreen";
import SubTiposScreen from "../screens/Finanzas/PlanCuentas/SubTipos/SubTiposScreen";
import TiposScreen from "../screens/Finanzas/PlanCuentas/Tipos/TiposScreen";
import CategoriaScreen from "../screens/Finanzas/PlanCuentas/Categoria/CategoriaScreen";
import SubCategoriasScreen from "../screens/Finanzas/PlanCuentas/SubCategorias/SubCategoriasScreen";

//--------------------------------- Planeacion -----------------------------
import CalendarioPagosScreen from "../screens/Planeacion/CalendarioPagos/CalendarioPagosScreen";


export const DashboardRoutes = () => {

    const splitterPanel = useRef();
    const splitterContent = useRef();


    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ idUser: 'm' });
    const [userPermisions, setuserPermisions] = useState([]);


    const obtenerPermisos = async (IdUser) => {
        const resp = await getPermisos(IdUser);
        const tempo = resp.permisos.split(',').map((item) => parseInt(item))
        setuserPermisions(tempo);
        // console.log(userPermisions)
    }

    const setCollapsed = () => {
        if (window.outerWidth <= 992) {
            document.getElementById('sidebar').classList.add('collapsed');
        }
    }

    const HomeScreenPermision = Permissible(
        HomeScreen,
        userPermisions, // userPermissions
        [1], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );

    const ITScreenPermision = Permissible(
        HomeScreen,
        userPermisions, // userPermissions
        [2], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );

    const RolesScreenPermision = Permissible(
        RolesScreen,
        userPermisions, // userPermissions
        [3], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );

    const UsuariosScreenPermision = Permissible(
        UsuariosScreen,
        userPermisions, // userPermissions
        [4], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );

    const SesionesScreenPermision = Permissible(
        SesionesScreen,
        userPermisions, // userPermissions
        [5], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );
    const MenuScreenPermision = Permissible(
        MenuScreen,
        userPermisions, // userPermissions
        [6], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );

    const FinanzasHomeScreenPermision = Permissible(
        FinanzasHomeScreen,
        userPermisions, // userPermissions
        [7], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );


    const PlanCuentasScreenPermision = Permissible(
        PlanCuentasScreen,
        userPermisions, // userPermissions
        [8], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );

    const TiposScreenPermision = Permissible(
        TiposScreen,
        userPermisions, // userPermissions
        [9], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );
    const CategoriaScreenPermision = Permissible(
        CategoriaScreen,
        userPermisions,
        [10],
        () =>{
            navigate("fin/home", { replace: true })
        }

    )



    const AccesoScreenPermision = Permissible(
        AccesosScreen,
        userPermisions,
        [11],
        () =>{
            navigate("fin/home", { replace: true })
        }

    )

 
    const SubCategoriasScreenPermision = Permissible(
        SubCategoriasScreen,
        userPermisions, // userPermissions
        [12], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );

    const CalendarioPagosScreenPermision = Permissible(
        CalendarioPagosScreen,
        userPermisions, // userPermissions
        [14], // requiredPermissions
        () => {
            navigate("fin/home", { replace: true })
        }
    );


    useEffect(() => {
        const token = localStorage.getItem('ppfToken') || undefined;
        // alert(typeof token)
        if (token === 'undefined') {
            localStorage.removeItem('ppfToken');
            // handleLogout();
        }
        const decodedToken = decodeToken(token);
        setUserInfo(decodedToken);
        // console.log(userInfo)
        const decoded = decodeToken(localStorage.getItem('ppfToken'));
        obtenerPermisos(decoded.idUser);
        setCollapsed();

        window.addEventListener('resize', () => {
            setCollapsed();
        })
    }, [])

    const setRouter = () => {
        if (userPermisions) {
            return (
                <Routes>
                    {/* <Route path="/PDF" element={<PDFTemplate document={<PurchasePDF/>} name='dsd'/>} /> */}


                    <Route path={`${process.env.REACT_APP_ENV}/Home`} element={<HomeScreen />} />
                    <Route path="*" element={<Navigate from="*" to={`${process.env.REACT_APP_ENV}/Home`} />} />

                    {/* -------------------------------------- IT ------------------------------------------ */}
                    <Route path={`${process.env.REACT_APP_ENV}/IT`} element={<ITScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/IT/Roles`} element={<RolesScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/IT/Usuarios`} element={<UsuariosScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/IT/Sesiones`} element={<SesionesScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/IT/Menu`} element={<MenuScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/IT/Accesos`} element={<AccesoScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/IT`} element={<ITScreenPermision />} />

                    {/* --------------------------------- Finanzas ----------------------------------- */}
                    <Route path={`${process.env.REACT_APP_ENV}/Finanzas`} element={<FinanzasHomeScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/PlanCuentas`} element={<PlanCuentasScreenPermision />} />
                    {/* <Route path={`${process.env.REACT_APP_ENV}/SubTipos`} element={<SubTiposScreenPermision />} /> */}
                    <Route path={`${process.env.REACT_APP_ENV}/TipoCuentas`} element={<TiposScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/RegistroContable/Categoria`} element={<CategoriaScreenPermision />} />
                    <Route path={`${process.env.REACT_APP_ENV}/RegistroContable/SubCategoria`} element={<SubCategoriasScreenPermision />} />

                    {/*--------------------------------------------Planeacion---------------------------------------------*/}
                    <Route path={`${process.env.REACT_APP_ENV}/Planeacion/CalendarioPagos`} element={<CalendarioPagosScreenPermision />} />


                </Routes>

            )
        }
        else {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <ProgressSpinner />
                </div>
            )
        }

    }

    const sidebar = useRef();

    const resizable = ({ sizes }) => {
        const sidebar = document.getElementById('sidebar');
        const svg = document.getElementById('svgBtnCollapse');
        if (window.outerWidth <= 1024) {
            if (sizes[0] <= 15.5) {
                sidebar.classList.add('collapsed')
                svg.classList.remove('active');
            } else {
                sidebar.classList.remove('collapsed')
                svg.classList.add('active')
            }
        } else {
            if (sizes[0] <= 11) {
                sidebar.classList.add('collapsed')
                svg.classList.remove('active');
            } else {
                sidebar.classList.remove('collapsed')
                svg.classList.add('active')
            }
        }
    }



    return (
        <div style={{ height: '100vh' }}>
            <div className="layout has-sidebar fixed-sidebar fixed-header">
                {/* <Splitter style={{ width: '100%', height: '100%' }} > */}
                <Splitter style={{ width: '100%', height: '100%' }} onResizeEnd={resizable} >
                    <SplitterPanel ref={splitterPanel} id='splitterPanel' size={15} minSize={4} className="panel">
                        <aside id="sidebar" ref={sidebar} className="dashbordard__contenedor dashbordard__contenedor-panel sidebar">
                            <div className="sidebar-layout ">
                                <PanelSlider splitterPanel={splitterPanel} splitterContent={splitterContent} />
                            </div>
                        </aside>
                        <div id="overlay" className="overlay"></div>
                    </SplitterPanel>
                    <SplitterPanel ref={splitterContent} id='splitterContent' size={85} minSize={75}>
                        <div className="">
                            <main className="content dashbordard__contenedor-content">
                                {setRouter()}
                            </main>
                        </div>
                    </SplitterPanel>
                </Splitter>
            </div>
            <Footer user={userInfo} />
            <ModalDieSession />
        </div>

    );
}