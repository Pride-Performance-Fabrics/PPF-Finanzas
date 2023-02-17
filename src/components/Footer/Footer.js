import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "primereact/button";

import { TabView, TabPanel } from 'primereact/tabview';

import { Sidebar } from 'primereact/sidebar';

import SchedulerHomeScreen from "../../screens/Homes/SchedulerHomeScreen";

import { Badge } from 'primereact/badge';

import { decodeToken } from "react-jwt";

import { getAccesosUsuario } from "../../Api/IT/Accesos/AccesosRequest";

// import "./FooterStyle.scss"

import { getNotificaciones } from "../../Api/Sheduler/ShedulerRequest";


const Footer = ({ user }) => {


    const [ip, setIP] = useState('');
    const [mostrar, setMostrar] = useState(false);
    const [ingreso, setIngreso] = useState(0);

    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [notificaciones, setNotificaiones] = useState([]);
    const[ cantidad, setCantidad] = useState(0);
    const [accesos, setAccesos] = useState([]);
    const [habilitar, setHabilitar] = useState(true);

    const getAccesosByUsuario = async () => {
        const userInformation = decodeToken(localStorage.getItem(`ppfToken`));
        let user = userInformation.idUser

        const result = await getAccesosUsuario(user)
        const ordenado = result.accesos.split(',').sort();
        setAccesos(ordenado)
        const accesoHabilitar = ordenado.some((item) => item === "4")
        setHabilitar(!accesoHabilitar)
       
    }

    const ObtenerNotificaciones = async () => {
        const respuesta = await getNotificaciones()

        setNotificaiones(respuesta)
        console.log(respuesta)
        let c = respuesta.length
        console.log(c)
        setCantidad(c)
        
    }


    // Funcion para obtener la IP de la maquina desde la API `https://geolocation-db.com/`
    const getData = async () => {
        // TODO PETICION -> FUNCION
        const promesa = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
        // const promesa = await fetch('https://ip4.seeip.org/json')

        await promesa.json()

            .then((res) => {
                setIP(res.IPv4)
                setIngreso(1)
            })
            .catch((error) => {
                console.error(error);
                setMostrar(true)
            })
    }


    // UseEffect para obtener los datos de la IP
    useLayoutEffect(() => {
        getData();
        getAccesosByUsuario();
        ObtenerNotificaciones()
    }, []);

    useEffect(() => {
        if (ingreso === 0) {
            setMostrar(true);

            // setMessageDialog(true)
        } else {
            setMostrar(false);

        }

    }, [ingreso])


    return (
        <div className="footer__Box">
            <div className="footer__Container">

                <div className="d-flex align-items-center">
                    <span className={`p-menuitem-icon pi pi-fw pi-user footer_column-icon mx-2`}></span>
                    <small className="footer_column-info">  Usuario: {`${user.Usuario}`}  </small><br />
                </div>

                <div className="d-flex align-items-center">
                    <span className={`p-menuitem-icon pi pi-fw pi-cog footer_column-icon mx-2`} ></span>
                    <small className="footer_column-info">Rol: {`${user.Rol}`}</small><br />
                </div>

                <div className="d-flex align-items-center">
                    <span className={`p-menuitem-icon pi pi-fw pi-wifi footer_column-icon mx-2`} hidden={mostrar} ></span>
                    <small className="footer_column-info" style={{ marginLeft: 10 }} hidden={mostrar}>IP:{ip}</small>
                </div>

                <div className="d-flex align-items-center">
                    <span className={`p-menuitem-icon pi pi-fw pi-database footer_column-icon mx-2`} ></span>
                    <small className="footer_column-info">DB: Finanzas</small>
                </div>
                <div className="d-flex align-items-center">
                    <span className={`p-menuitem-icon pi pi-fw pi-desktop footer_column-icon mx-2`} ></span>
                    <small className="footer_column-info">API: {(process.env.REACT_APP_API_URL).replace('https://apoc.ppf.com.hn/', '')}</small>
                    {/* <small className="footer_column-info">API: API-FIN</small> */}
                </div>



            </div>
            <div className="footer_column-UserName">
                <div className="d-flex align-items-center">
                    <Button icon="pi pi-calendar" onClick={(e) => setVisible(true)} style={{color: '#a3c5e3', fontSize: 35}} 
                    className="p-button-info p-button-text footer_column-icon "/>
                     <i className="pi pi-bell  p-button-text footer_column-icon mx-2 p-overlay-badge" style={{ fontSize: 20, marginLeft: -10, color: '#a3c5e3'}} hidden={habilitar}>
                        <Badge value={cantidad} style={{ fontSize: 10, marginRight: 10 }} size="small" ></Badge>
                    </i>
                    <small className="footer_column-info">    {`${user.UserName}`}</small>
                </div>
                <div>
                    <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} style={{ width: "50%" }}>
                        <SchedulerHomeScreen />
                    </Sidebar>

                </div>
                {/* <span className={`p-menuitem-icon pi pi-fw pi-user  footer_column-icon`} style={{ marginLeft: 5 }}></span> */}

            </div>
        </div>
    )
}


export default Footer;