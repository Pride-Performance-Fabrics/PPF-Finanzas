import React, { useState, useEffect, useRef, Fragment } from "react";

import instancias from "../../../../Api/backend";

// Librerias de componentes
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { validarRespuesta } from "../../../../services/crypto"


export const ModalAgregarUsuario = ({ usuarios }) => {

    // Variables necesarias 
    const [roles, setRoles] = useState([{}]);
    const [estados, setEstados] = useState([{}]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const toast = useRef(null);

    // Consultas a la API (Roles y Estado de Usuarios)
    const getRoles = async () => {
        // TODO PETICION -> FUNCION
        const promesa = await fetch(`${instancias.API_URL}/Roles/`, { 
            headers: { 'x-access-token': localStorage.getItem('ppfToken') } });
        await promesa.json()
            .then(function (res) {
                // console.log(res);
                validarRespuesta(res);
                setRoles(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const getEstado = async () => {
        // TODO PETICION -> FUNCION
        const promesa = await fetch(`${instancias.API_URL}/status/`, { 
            headers: { 'x-access-token': localStorage.getItem('ppfToken') } });
        await promesa.json()
            .then(function (res) {
                validarRespuesta(res);
                setEstados(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    // -- Funcionones para el modal de agregar
    const openNew = () => {
        setUsuarioDialog(true);
        getRoles();
        getEstado();
    }

    const hideDialog = () => {
        setUsuarioDialog(false);
    }

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Usuario Creado Existosamente', detail: 'Se creo un nuevo usuario', life: 3000 });
    }

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se han ingresado los campos correctamente', life: 3000 });
    }

    // Funcion de para agregar un nuevo usuario
    const agregarUsuario = async (Usuario, UserName, Mail, Password, Status, IdRol) => {
        Usuario = formik.values.Usuario;
        UserName = formik.values.UserName;
        Password = formik.values.Password;
        Mail = formik.values.Mail;
        Status = formik.values.Status.codigo;
        IdRol = formik.values.IdRol.IdRol

        if (Usuario === "" || UserName === "" || Password === "" || Mail === "") {
            showError()
        }
        else {
            // TODO PETICION -> FUNCION
            const promesa = await fetch(`${instancias.API_URL}/users/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'x-access-token': localStorage.getItem('ppfToken')
                },
                body: JSON.stringify({
                    Usuario: Usuario,
                    UserName: formik.values.UserName,
                    Password: formik.values.Password,
                    Mail: formik.values.Mail,
                    Status: formik.values.Status.IdStatus,
                    IdRol: formik.values.IdRol.IdRol
                })
            })

            await promesa.json()

                .then(function (res) {
                    validarRespuesta(res);
                    showSuccess()
                    setFormData({})
                    formik.resetForm(formData)
                    usuarios()
                    hideDialog()
                })
                .catch((error) => {
                    console.error(error)
                })

        }
    }


    // Validaciones del Formik 
    const formik = useFormik({
        initialValues: {
            Usuario: '',
            UserName: '',
            Mail: '',
            Password: '',
            Status: '',
            IdRol: ''
        },
        validate: (data) => {
            let errors = {};
            if (!data.Usuario) {
                errors.Usuario = 'Se requiere el Usuario.';
            }
            if (!data.UserName) {
                errors.UserName = 'Se requiere el Nombre.';
            }

            if (!data.Mail) {
                errors.Mail = 'Se requiere el Correo.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.Mail = 'Correo Electronico Ivalido. E.g. example@email.com';
            }

            if (!data.Password) {
                errors.Password = 'Se requiere el Password.';
            }
            if (!data.Status) {
                errors.Status = 'Se requiere el estado del usuario.';
            }
            if (!data.IdRol) {
                errors.IdRol = 'Se requiere el Rol del usuario.';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarUsuario(data.Usuario, data.UserName,
                data.Mail,
                data.Password,
                data.Status,
                data.IdRol);
            setShowMessage(true);
        }
    });


    // Funciones de evaluacion de formik
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };

    // Footer del Modal Editar 
    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={agregarUsuario} />
        </React.Fragment>
    );

    // Funciones para Mostrar Mensajes
    const dialogFooter = <div className="flex justify-content-center">
        <Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Elige Tu Contraseña</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Necesita 2 numeros</li>
                <li>Minimo 7 characters</li>
            </ul>
        </React.Fragment>
    );

    // UseEffect que obtiene las datos de las funciones para getRoles y getEstados para mostrar
    // la informacion en los Dropdown (Select de opciones)
    useEffect(() => {

    }, [])

    return (
        <Fragment>
            <Button label="Agregar Nuevo Usuario" icon="pi pi-plus" className="p-button-Primary mr-2 " onClick={openNew} />
            <div className="form-demo">
                <Toast position="bottom-right" ref={toast} />
                <Dialog visible={showMessage} breakpoints={{ '960px': '75vw', '640px': '100vw' }} onHide={() => setShowMessage(false)} position="top"
                    footer={dialogFooter} showHeader={false} style={{ width: '30vw' }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h5>Registro Creado Existosamente</h5>
                    </div>
                </Dialog>
                <div className="flex justify-content-center" >
                    <Dialog visible={usuarioDialog} header="Registrar Nuevo Usuario" modal className="modal__contenedor modal__usuarios"
                        footer={userDialogFooter} onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label">
                                        <InputText id="Usuario" name="Usuario" value={formik.values.Usuario} onChange={formik.handleChange} autoFocus
                                            className={classNames({ 'p-invalid': isFormFieldValid('Usuario') })} autoComplete="off" />
                                        <label htmlFor="Usuario" className={classNames({ 'p-error': isFormFieldValid('Usuario') })}>Usuario</label>
                                    </span>
                                    {getFormErrorMessage('Usuario')}
                                </div>
                                <div className="field col-6 me-2">
                                    <span className="p-float-label">
                                        <InputText id="UserName" name="UserName" value={formik.values.UserName} onChange={formik.handleChange} autoFocus
                                            className={classNames({ 'p-invalid': isFormFieldValid('UserName') })} autoComplete="off" />
                                        <label htmlFor="UserName" className={classNames({ 'p-error': isFormFieldValid('UserName') })}>Nombre</label>
                                    </span>
                                    {getFormErrorMessage('UserName')}
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="Mail" name="Mail" value={formik.values.Mail} onChange={formik.handleChange} autoComplete="off"
                                            className={classNames({ 'p-invalid': isFormFieldValid('Mail') })} />
                                        <label htmlFor="Mail" className={classNames({ 'p-error': isFormFieldValid('Mail') })}>Correo</label>
                                    </span>
                                    {getFormErrorMessage('Mail')}
                                </div>
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label">
                                        <Password id="Password" name="Password" value={formik.values.Password} onChange={formik.handleChange} toggleMask autoComplete="off"
                                            className={classNames({ 'p-invalid': isFormFieldValid('Password') })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="Password" className={classNames({ 'p-error': isFormFieldValid('Password') })}>Password</label>
                                    </span>
                                    {getFormErrorMessage('Password')}
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2">
                                    <span className="p-float-label">
                                        <Dropdown id="Status" name="Status" value={formik.values.Status} onChange={formik.handleChange} options={estados} optionLabel="StatusName" placeholder="Estado" />
                                    </span>

                                </div>
                                <></>
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label">
                                        <Dropdown id="IdRol" name="IdRol" value={formik.values.IdRol} onChange={formik.handleChange} options={roles} optionLabel="Rol" placeholder="Roles" />
                                    </span>
                                </div>
                            </div>
                            {/* <div className ="divContenedor" style={{width: "50%"}}>
                                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={agregarUsuario} />
                        </div> */}
                            {/* <div style={{width: "80%", marginLeft: "10%", marginTop:"1%"}} className="card-container blue-container" >
                            <Button type="submit" label="Agregar" className="mt-2" onClick={agregarUsuario}/>
                        </div> */}
                        </form>
                    </Dialog>
                </div>
            </div>
        </Fragment>

    )
}

export default ModalAgregarUsuario;