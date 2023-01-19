import React, { useState, Fragment, useEffect } from "react";
import TodoList from "../TodoList/TodoList";
import { TabView, TabPanel } from 'primereact/tabview';
import Extensiones from "../Tools/Extensiones";



const RolesScreen = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        window.document.title = 'PPF • Home';
    }, [])
    return (
        <Fragment>
            <div style={{ backgroundImage: `url("https://were.ppf.com.hn/web/Fondo.jpg")`, bottom: 0, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hiddden' }}
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

            </div>
        </Fragment>

    )
}

export default RolesScreen;