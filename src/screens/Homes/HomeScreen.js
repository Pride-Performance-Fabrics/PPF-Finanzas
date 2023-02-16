import React, { useState, Fragment, useEffect } from "react";
import TodoList from "../TodoList/TodoList";
import { TabView, TabPanel } from 'primereact/tabview';
import Extensiones from "../Tools/Extensiones";
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import SchedulerHomeScreen from "./SchedulerHomeScreen";
import Card from "../../components/Card/Card";
import CardNotificaciones from "../../components/Card/CardNotifcaciones";

import { getNotificaciones } from "../../Api/Sheduler/ShedulerRequest";

import {getDateTimeSQL, setDateTimeSQL} from "../../services/FechasService"

const HomeScreen = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [notificaciones, setNotificaiones] = useState([])

    const ObtenerNotificaciones = async () => {
        const respuesta = await getNotificaciones()

        setNotificaiones(respuesta)
        console.log(respuesta)
        notificacion(respuesta)
    }


    const notificacion = (data) => {
        console.log(data)
        data.map((item) => {
            return (
                <span>{item.title}</span>
            )
        })
    }



    useEffect(() => {
        window.document.title = 'PPF • Home';
        ObtenerNotificaciones()
    }, [])
    return (
        <Fragment>
            <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/imagenes/PPFHome1.png'})`, bottom: 0, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hiddden' }}
                className="contenedor-imagen animate__animated animate__fadeIn animate__faster ">
                {/* <TabView className="col-12 homeTabView" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Tareas">
                        <TodoList />
                    </TabPanel> */}
                {/* <TabPanel header="Calendario">
                        <SchedulerHomeScreen />
                    </TabPanel> */}
                {/* <TabPanel header="Extensiones"> */}
                {/* <div className="homeTabView_Extenciones">
                        <Extensiones />
                        </div> */}
                {/* </TabPanel>
                 </TabView> */}

                {/* <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} style={{width: "50%"}}>
                    <SchedulerHomeScreen />
                </Sidebar>
                <div style={{width: 100, height:50,}}>
                <Button icon="ri-calendar-event-fill" onClick={(e) => setVisible(true)} />
                </div> */}
                <div class="left" style={{ width: "80%", display: "flex" }}><span></span></div>
                <div style={{ width: "20%", height: "10%", display: "flex-column", marginRight: 20 }} className="contenidoCard">
                    {notificaciones.map((item) => {
                        let fecha = setDateTimeSQL(item.endDate)
                        console.log(fecha)
                        return (
                            <CardNotificaciones
                                titulo={""}
                                className="cardNotificaciones"
                                contenido={
                                    <div className='pt-1' style={{ height: '10vh' }}>
                                       <span>{item.title}</span><br/>
                                       {/* <span>{item.notes}</span><br/> */}
                                       <span>Prioridad: {item.Priority}</span><br/>
                                       <span>Fecha Vencimiento: {fecha}</span>
                                    </div>
                                }
                            />
                        )
                    })}

                </div>


            </div>
        </Fragment>

    )
}

export default HomeScreen;