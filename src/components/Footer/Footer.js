import React, {useEffect, useLayoutEffect, useState } from "react";

// import "./FooterStyle.scss"


const Footer = ({ user }) => {


    const [ip, setIP] = useState('');
    const [mostrar, setMostrar] = useState(false);
    const [ingreso, setIngreso] = useState(0);

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
                {/* <span className={`p-menuitem-icon pi pi-fw pi-user  footer_column-icon`} style={{ marginLeft: 5 }}></span> */}
                <small className="footer_column-info">    {`${user.UserName}`}</small>
            </div>
        </div>
    )
}


export default Footer;