import React, { useState, useEffect } from 'react';


import instancias from "../../Api/backend";

// Componentes PrimesReact
// import { Chart } from 'primereact/chart';
import { validarRespuesta } from '../../services/crypto';


export const ITHomeScreen = () => {

  // Variables state para usar dentro de la pantalla
  const [roles, setRoles] = useState([]);
  const [cantidad, setCantidad] = useState([]);
  const [cantidadUsuarios,setCantidadUsuarios] = useState([])

  const getRoles = async () => {
    let labels = []
    let cantidad = []
    // TODO PETICION -> FUNCION
    const promesa = await fetch(`${instancias.API_URL}/users/ObtenerCantidadUsersRol?${Date.now()}`, {
      headers: { 'x-access-token': localStorage.getItem('ppfToken') }
    });

    await promesa.json()

      .then(function (res) {
        validarRespuesta(res);

        res.data.map((rol) => {
          labels.push(rol.Rol);
          cantidad.push(rol.NumeroUsuarios);
          return 1;
        })
        setRoles(labels)
        setCantidad(cantidad)
        // console.log(labels)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getUsersActive = async () => {
    let cantidadUsuarios = []
    // TODO PETICION -> FUNCION
    const promesa = await fetch(`${instancias.API_URL}/users/ObtenerCantidadUserActive?${Date.now()}`, {
      headers: { 'x-access-token': localStorage.getItem('ppfToken') }
    });

    await promesa.json()

      .then(function (res) {
        validarRespuesta(res);
        res.data.map((rol) => {
          cantidadUsuarios.push(rol.NumeroUsuarios);
          // console.log(cantidadUsuarios)
          return 1;
        })
        setCantidadUsuarios(cantidadUsuarios)
        // console.log(cantidadUsuarios)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getRoles()
    getUsersActive()
  }, [])


  const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  

  const data = {
    labels: roles,
    datasets: [
      {
        label: "Usuarios",
        data: cantidad,
        borderColor: '#2596be',
        backgroundColor:(CHART_COLORS.red, 0.5),
        // fill: false,
        // borderColor: '#4bc0c0'
      },
      {
        label: "Conectados",
        data: cantidadUsuarios,
        borderColor: '#66BB6A',
        backgroundColor:(CHART_COLORS.red, 0.5),
      }]

  };



  const config = {
    type: 'line',
    // data: cantidad,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart',
          font: { size: 15 }
        },
        legend: {
          position: 'top',
        }
      }
    },
  };

  return (
    <div className='it_contenedor'>
      <h5>Cantidad de Usuarios por área</h5>
      <div className="card it_card_chart">
        {/* <Chart type="line" data={data} options={config}/> */}
      </div>
    </div>
  )

}

export default ITHomeScreen;