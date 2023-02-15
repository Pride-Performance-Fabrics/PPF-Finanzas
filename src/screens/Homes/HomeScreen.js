import React, { useState, Fragment, useEffect } from "react";
import TodoList from "../TodoList/TodoList";
import { TabView, TabPanel } from 'primereact/tabview';
import Extensiones from "../Tools/Extensiones";
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import SchedulerHomeScreen from "./SchedulerHomeScreen";



const HomeScreen = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        window.document.title = 'PPF • Home';
    }, [])
    return (
        <Fragment>
            <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/imagenes/PPFHome1.png'})`, bottom: 0, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hiddden' }}
                className="contenedor-imagen animate__animated animate__fadeIn animate__faster ">
                {/* <TabView className="col-12 homeTabView" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                
hola
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


            </div>
        </Fragment>

    )
}

export default HomeScreen;