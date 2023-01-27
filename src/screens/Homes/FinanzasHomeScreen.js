import React, { useState, Fragment, useEffect } from "react";
import TodoList from "../TodoList/TodoList";
import { TabView, TabPanel } from 'primereact/tabview';
import Extensiones from "../Tools/Extensiones";



const FinanzasHomeScreen = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        window.document.title = 'PPF • Home';
    }, [])
    return (
        <Fragment>
            <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/imagenes/PPFLogin2.jpg'})`, bottom: 0, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hiddden' }}
                className="contenedor-imagen animate__animated animate__fadeIn animate__faster ">

            </div>
        </Fragment>

    )
}

export default FinanzasHomeScreen;