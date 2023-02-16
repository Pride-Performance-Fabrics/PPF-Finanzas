import React, { useEffect, useState, useRef } from 'react'
import SchedulerComponent from '../../components/Scheduler/Scheduler'
import { Card } from '../../components/Card/Card';

import { getScheduler } from "../../Api/Sheduler/ShedulerRequest";

import { getEstadosActividad } from "../../Api/Global/StatusRequest";
import { getPrioridades } from '../../Api/Global/PriorityRequest';
import { getUsersActivos, getUsuarios } from "../../Api/IT/Usuarios/UsuarioRequest";


const SchedulerHomeScreen = () => {

    const editor = useRef(null);

    const [state, setState] = useState({ data: [], });
    const [resources, setResources] = useState([]);
    const [colores, setColores] = useState([]);
    const [estados, setEstados] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [recordatorios, setRecordatorios] = useState([])


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

    const diasRecordatorios = [
        {
            id: 1,
            nombre: "Un dia antes",
           
        },
        {
            id: 2,
            nombre: "Dos dias antes",
           
        },
        {
            id: 3,
            nombre: "Tres dias antes",
           
        },
        {
            id: 5,
            nombre: "Cinco dias antes",
          
        },
        {
            id: 7,
            nombre: "Una semana antes",
            
        },
        {
            id: 15,
            nombre: "Dos semanas antes",
          
        },

    ]



    const obtenerResources = async () => {

        const prioridades = await getPrioridades();
        const estados = await getEstadosActividad();
        const usuarios = await getUsersActivos()

        const instanciaColores = colorsActividades.map((item) => {
            return {
                text: item.nombre,
                id: parseInt(item.id),
                color: item.color
            }
        })
        const instanciaPrioridades = prioridades.map((item) => {
            return {
                text: item.Priority,
                id: parseInt(item.IdPriority)
            }
        })

        const instanciaEstados = estados.map((item) => {
            return {
                text: item.StatusName,
                id: parseInt(item.IdStatus)
            }
        })

        const instanciaUsuarios = usuarios.map((item) =>{
            return{
                text: item.UserName,
                id: parseInt(item.idUser)
            }
        })

        const instanciaRecordatorios = diasRecordatorios.map((item) =>{
            return {
                text: item.nombre,
                id: parseInt(item.id)
            }
        })




        setColores(instanciaColores)
        setPrioridades(instanciaPrioridades)
        setEstados(instanciaEstados)
        setUsuarios(instanciaUsuarios)
        setRecordatorios(instanciaRecordatorios)

        const resources = [
            {
                fieldName: "colorId",
                title: "Colores",
                instances: [...instanciaColores, { text: "color no requerido", id: 0 }],
            },
            {
                fieldName: "Priority",
                title: "Prioridad",
                instances: instanciaPrioridades,
            },
            {
                fieldName: "status",
                title: "Estado",
                instances: instanciaEstados,
            },
            {
                fieldName: "members",
                title: "Members",
                instances: instanciaUsuarios,
                allowMultiple: true,
            },
            {
                fieldName: "reminder",
                title: "Recordar",
                instances: instanciaRecordatorios
            }

        ];

        setResources(resources)
    }

    useEffect(() => {
        setShedulersContainerHeight(document.querySelector('.schedulersContainer')?.clientHeight - 40);
        obtenerResources()
    }, [state])


    return (
        <div className=''>

            <Card className='schedulerCard month'
                titulo={<h5>CALENDARIO MENSUAL</h5>}
                contenido={
                    <div className='' style={{ width: schedulerContainerWidth }}>
                        <div className='schedulerCard' style={{ marginTop: 10 }} >
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