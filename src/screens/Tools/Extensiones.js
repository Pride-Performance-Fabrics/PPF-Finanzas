import React, { useState, useEffect } from 'react'

import { getExtensiones } from '../../utils/Herramientas/Extensiones';
import DevExpress from '../../components/Scroller/DevExpress';

const Extensiones = () => {

    const [Extensiones, setExtensiones] = useState([]);

    const columns = [
        {
            // Empleado
            field: 'Empleado',
            header: 'Empleado',
            className: 'colum-width-large',
            body: (rowData) => rowData.Empleado,
        },
        {
            // Extension
            field: 'Extension',
            header: 'Extension',
            className: 'colum-width-small',
            body: (rowData) => rowData.Extension,
            align: 'center',
        },
        {
            // Correo
            field: 'Correo',
            header: 'Correo',
            className: 'colum-width-large',
            body: (rowData) => rowData.Correo,
        },
        {
            // Departamento
            field: 'Departamento',
            header: 'Departamento',
            className: 'colum-width-medium',
            body: (rowData) => rowData.Departamento,
        },
        {
            // TelefonoPersonal
            field: 'TelefonoPersonal',
            header: 'Telefono personal',
            className: 'colum-width-large',
            body: (rowData) => rowData.TelefonoPersonal,
        },
    ];


    const table = {
        Columns: columns,
        Data: Extensiones,
        key: 'Id',
        scrollHeight: '100%',
    }

    const getExtencionesData = async () => {
        const tempo = await getExtensiones();
        setExtensiones(tempo);
    }

    useEffect(() => {
        getExtencionesData();
    }, []);

  return (
    <div className='ExtencionesContainer'>
        <DevExpress table={table} />
    </div>
  )
}

export default Extensiones