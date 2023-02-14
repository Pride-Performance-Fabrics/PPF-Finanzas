import React, { useState, useEffect, useRef } from "react";


import Paper from "@mui/material/Paper";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";


import {
  Scheduler,
  DayView,
  WeekView,
  TodayButton,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  Resources,
  EditRecurrenceMenu,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";

import { decodeToken } from "react-jwt";

import { getDateTimeSQL4 } from "../../services/FechasService";

import { Toast } from "primereact/toast";
import Loader from "../Loader/Loader";

import { getScheduler,insertScheduler, updateScheduler, deleteScheduler } from "../../Api/Sheduler/ShedulerRequest";

const SchedulerComponent = ({ CurrentView = 'Day', state, setState, editor }) => {

  const toast = useRef(null);
  const EditingStateRef = useRef(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // const commitChanges = async ({ added, changed, deleted }) => {
  //   let { data } = state;
  //   const decoded = decodeToken(localStorage.getItem("ppfToken"));
  //   // SE CREA UN EVENTO
  //   if (added) {
  //     setLoading(true);
  //     const tastk = {
  //       IdUser: decoded.idUser,
  //       IdRol: decoded.IdRol,
  //       startDate: getDateTimeSQL4(new Date(added.startDate)),
  //       endDate: getDateTimeSQL4(new Date(added.endDate)),
  //       title: added.title,
  //       allDay: added.allDay,
  //       rRule: added.rRule !== undefined ? added.rRule : "",
  //       exDate: added.exDate,
  //       members: added.members !== undefined ? added.members.toString() : null,
  //       notes: added.notes !== undefined ? added.notes : "",
  //     };
    
  //     console.log(tastk)
  //      const result = await insertScheduler(tastk);
  //      getDatosScheduler();
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Guardado",
  //         detail: "Evento guardado correctamente."
  //       })
  //       setLoading(false);
      
  //     const startingAddedId =
  //       data.length > 0 ? data[data.length - 1].id + 1 : 0;
  //     data = [...data, { id: startingAddedId, ...added }];
  //   }
  //   // SE MODIFICA UN EVENTO
  //   if (changed) {
  //     setLoading(true);
  //     let tastk = {};
  //     // console.log(changed.exDate)
  //     // alert(changed.exDate)
  //     data = data.map(async (appointment) => {
  //       if (changed[appointment.id]) {
  //         let tempo = { ...appointment, ...changed[appointment.id] };
  //         tastk = {
  //           IdCalendar: tempo.id,
  //           IdUser: decoded.idUser,
  //           IdRol: decoded.IdRol,
  //           startDate: getDateTimeSQL4(new Date(tempo.startDate)),
  //           endDate: getDateTimeSQL4(new Date(tempo.endDate)),
  //           title: tempo.title,
  //           allDay: tempo.allDay,
  //           rRule: tempo.rRule !== undefined ? tempo.rRule : "",
  //           exDate: tempo.exDate,
  //           members: tempo.members !== undefined ? tempo.members.toString() : null,
  //           notes: tempo.notes !== undefined ? tempo.notes : "",
  //         };
  //       }
  //       // console.log(appointment, changed[appointment.id]);
  //       const change = changed[appointment.id]
  //         ? { ...appointment, ...changed[appointment.id] }
  //         : appointment;
  //       return change;
  //     });
     
  
  //      const resultado = await updateScheduler(tastk);
  //      getDatosScheduler();
  //         toast.current.show({
  //           severity: "success",
  //           summary: "Guardado",
  //           detail: "Eventp guardado correctamente."
  //         });
  //         setLoading(false);
        
  //     }
    
  //   // SE ELIMINA UN EVENTO
  //   if (deleted !== undefined) {
  //     // console.log(deleted)
  //     await deleteScheduler(deleted);
  //     toast.current.show({
  //       severity: "success",
  //       summary: "Eliminado",
  //       detail: "Tarea eliminada correctamente."
  //     });
  //     getDatosScheduler();
  //   }
  // };

  const getDatosScheduler = async () => {
    console.log("entro aqui")
    const respuesta = await getScheduler()
    const tempo = respuesta.map((item) => {
      return {
        allDay: item.allDay,
        id: item.IdCalendar,
        IdRol: item.IdRol,
        IdUser: item.IdUser,
        notes: item.notes === null ? "" : item.notes,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
        title: item.title,
        exDate: item.exDate === null ? undefined : item.exDate,
        rRule: item.rRule === null ? undefined : item.rRule,

      }
    })

    setState({ data: respuesta });
    console.log(respuesta)
  }


  useEffect(() => {
    getDatosScheduler();
    // ObtenerScheduler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //    console.log(state.data)
  // },[state.data])

  return (
    <div id='schedulerContainer'>
      <Loader loading={loading} querySelector='#schedulerContainer' />
      <Toast position="bottom-right" ref={toast} />
      <Paper>

        <Scheduler data={state.data}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
            defaultCurrentViewName={CurrentView}
          />
          <EditingState 
            ref={EditingStateRef} 
            // onCommitChanges={commitChanges} 
            />
         
            <IntegratedEditing />
           <EditRecurrenceMenu/>

          <DayView startDayHour={7} endDayHour={19} />

          <WeekView startDayHour={7} endDayHour={19} />
          <MonthView />

          <Toolbar />

          <DateNavigator />
          
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
            showDeleteButton
          
          />
          <AppointmentForm/>
        
          <DragDropProvider />
        </Scheduler>
      </Paper>
    </div>
  );

}

export default SchedulerComponent