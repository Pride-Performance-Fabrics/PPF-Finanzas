import React, { useState, useEffect, useRef } from "react";


import Paper from "@mui/material/Paper";

import {
    viewState,
    EdithingState,
    IntegratedEditing
} from "@devexpress/dx-react-scheduler";

import {
    Scheduler,
    DayView,
    WeekView,
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

const ShedulerComponent = ({ }) =>{
    
}