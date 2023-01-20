import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { handleLogout, verifyToken } from '../../services/crypto';


// Componentes PrimeReact
import instancias from "../../Api/backend";

const ModalDieSession = () => {

    const tiempoActivo = 20; // minutos
    const tiempoRenovacion = 15; //Minutos

    const [modalDieSession, setModalDieSession] = useState(false)



    const openNew = () => {
        setModalDieSession(true);
    }

    const hideDialog = () => {
        setModalDieSession(false);
    }

    const continuar = async (reset) => {
        const promesa = await fetch(`${instancias.API_URL}/users/getNewToken`, { headers: { 'x-access-token': localStorage.getItem('ppfToken') } });
        await promesa.json()
            .then((result) => {
                verifyToken(result.token);
                if (reset) {
                    document.getElementById('root').click()
                    localStorage.setItem('tiempoDieSesion', new Date((new Date()).getTime() + tiempoActivo * 60 * 1000));
                    ResetTimer()
                } else {
                }
                hideDialog();
            }).catch((err) => {
                console.error('Error:', err)
            });
    }


    const ResetTimer = () => {
        localStorage.setItem('tiempoDieSesion', new Date((new Date()).getTime() + tiempoActivo * 60 * 1000));
    }


    useEffect(() => {
        localStorage.setItem('tiempoDieSesion', new Date((new Date()).getTime() + tiempoActivo * 60 * 1000));

        document.querySelector('body').addEventListener('click', ResetTimer);
        document.querySelector('body').addEventListener('mousemove', ResetTimer);
        setInterval(() => {
            const tiempoActual = new Date();
            const tiempoDieSesion = new Date(localStorage.getItem('tiempoDieSesion'));
            const tiempoToken = new Date(localStorage.getItem('tiempoToken'));

            // console.log( tiempoDieSesion - tiempoActual >= 1 * 60 * 1000 );
            // console.log('tiempo de inactividad',(tiempoDieSesion - tiempoActual) / 1000, 1 * 60 * 1000)
            // console.log('Tiempo en que vencera el token',(tiempoActual - tiempoToken) / 1000,  (tiempoActivo - tiempoRenovacion) * 60 * 1000)
            if (tiempoDieSesion - tiempoActual <= 1 * 60 * 1000) {
                if (tiempoDieSesion - tiempoActual <= 0) {
                    handleLogout()
                } else {
                    openNew();
                }
            } else {
                hideDialog();
                if (tiempoActual - tiempoToken >= (tiempoActivo - tiempoRenovacion) * 60 * 1000 && tiempoDieSesion - tiempoActual > tiempoRenovacion * 60 * 1000) {
                    continuar(false);
                    // console.log('token por vencer')
                }
            }
        }, 5000);

    }, [])



    const footer = (
        <div>
            <Button className='p-button-outlined' label="No" icon="pi pi-times" onClick={handleLogout} />
            <Button className='' label="Si" icon="pi pi-check" onClick={e => continuar(true)} />
        </div>
    );

    return (
        <Dialog className='modal__contenedor' header="Aviso de sesión" footer={footer} visible={modalDieSession} position="top" modal style={{ width: '50vw' }} onHide={() => hideDialog('displayPosition')}
            draggable={false} resizable={false} closable={false}>
            <strong className="m-0">No ha habido actividad reciente.</strong>
            <p className="m-0">Su sesión esta a punto de caducar. ¿Quiere extender su sesion actual?</p>
        </Dialog>
    )
}

export default ModalDieSession