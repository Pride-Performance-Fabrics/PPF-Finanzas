import React, { useEffect, useState, useRef } from 'react'
import SchedulerComponent from '../../components/Scheduler/Scheduler'
import { Card } from '../../components/Card/Card';

import {getScheduler} from "../../Api/Sheduler/ShedulerRequest";

const SchedulerHomeScreen = () => {

    const editor = useRef(null);

    const [state, setState] = useState({data: [],});
    const [resources, setResources] = useState([]);


    const [shedulersContainerHeight, setShedulersContainerHeight] = useState(100);
    const [schedulerContainerWidth, setShedulersContainerWidth] = useState("100%")

    // const getDatosScheduler = async () =>{
    //     const tempo = await getScheduler()
    //     setState(tempo)
    //     console.log(tempo)
    // }
    
    // useEffect(() => {
    //     console.log(state.data)
    // },[state.data])

    useEffect(() => {
        setShedulersContainerHeight(document.querySelector('.schedulersContainer')?.clientHeight - 40);
    },[])


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
                                
                            />
                        </div>
                    </div>
                } 
            />
        </div>
    )

}

export default SchedulerHomeScreen;