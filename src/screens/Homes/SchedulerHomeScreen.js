import React, { useEffect, useState, useRef } from 'react'
import SchedulerComponent from '../../components/Scheduler/Scheduler'
import { Card } from '../../components/Card/Card';

import {getScheduler} from "../../Api/Sheduler/ShedulerRequest";

const SchedulerHomeScreen = () => {

    const editor = useRef(null);

    const [state, setState] = useState({data: [],});
    const [resources, setResources] = useState([]);
    const [ colores, setColores] = useState([])


    const [shedulersContainerHeight, setShedulersContainerHeight] = useState(100);
    const [schedulerContainerWidth, setShedulersContainerWidth] = useState("100%");

    const colorsActividades = [
        {
            id: 1,
            nombre: "Amarillo",
            color: '#E6C305'
        },
        {
            id: 2,
            nombre: "Naranja",
            color: '#F06005'
        },
        {
            id: 3,
            nombre: "Rosa",
            color: '#D9078F'
        },
        {
            id: 4,
            nombre: "Azul",
            color: '#1F05F0'
        },
        {
            id: 5,
            nombre: "Verde",
            color: '#11DDEB'
        }
        

    ]



    const obtenerResources = async () =>{
         const instanciaColores = colorsActividades.map((item) =>{
            return{
                text: item.nombre,
                id: parseInt(item.id),
                color: item.color
            }
         })

         setColores(instanciaColores)

         const resources = [
            {
                fieldName: "colorId",
                title: "Colores",
                instances: [...instanciaColores, { text: "color no requerido", id: 0 }],
            }
         ];

         setResources(resources)
    }

    useEffect(() => {
        setShedulersContainerHeight(document.querySelector('.schedulersContainer')?.clientHeight - 40);
        obtenerResources()
    },[state])


    return (
        <div className=''>
           
            <Card className='schedulerCard month' 
                titulo={<h5>CALENDARIO MENSUAL</h5>}
                contenido={
                    <div className='' style={{width: schedulerContainerWidth}}>
                        <div className='schedulerCard'  style={{marginTop: 10}} >
                            <SchedulerComponent
                                CurrentView='Month'
                                state={state}
                                setState={setState}
                                resources={resources}
                                colors={colores}
                                editor={editor}
                                
                            />
                        </div>
                    </div>
                } 
            />
        </div>
    )

}

export default SchedulerHomeScreen;