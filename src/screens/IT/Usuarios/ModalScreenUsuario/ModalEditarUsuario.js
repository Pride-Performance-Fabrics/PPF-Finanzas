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
import { Checkbox } from 'primereact/checkbox';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ProgressSpinner } from 'primereact/progressspinner';


import { toastShow } from '../../../../services/ToastService'
import { Toast } from 'primereact/toast';
import { validarRespuesta } from "../../../../services/crypto";
import { getRoles } from "../../../../Api/IT/Roles/RolesRequest";
import { getEstadosSecurity } from "../../../../Api/Global/StatusRequest";
import { updatePassword, updateUser } from "../../../../utils/Users/users";
import { changePermisos, getPermisos } from "../../../../Api/Menu/PermisosRequest";
import { getMenuNuevo } from "../../../../Api/Menu/MenuRequest";
import { mdiConsoleLine } from "@mdi/js";

import CryptoJS from "crypto-js";



import { getAccesosModulos, getAccesos, cambiarAccesos, getAccesosUsuario } from "../../../../Api/IT/Accesos/AccesosRequest";
import { a } from "react-spring";


// import "./ModalStyle.scss"


export const ModalEditarUsuario = ({ datos, usuarios }) => {
    // console.log(datos)

    // Variables necesarias 
    const [roles, setRoles] = useState([{}]);
    const [estados, setEstados] = useState([{}]);
    const [showMessage, setShowMessage] = useState(false);

    // const [formData, setFormData] = useState();

    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const toast = useRef(null);


    // const [subNiveles, setSubNiveles] = useState([]);
    const [menu, setMenu] = useState([]);
    // const [menuInfo, setMenuInfo] = useState([]);
    // const [_niveles, _setNiveles] = useState([])
    const [permisos, setPermisos] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [loading1, setLoading1] = useState(false);

    const [modulos, setModulos] = useState([]);
    const [accesos, setAccesos] = useState([])

    const getValoresIniciales = async () => {
        const rolesTempo = await getRoles();
        const estadosTempo = await getEstadosSecurity();
        // console.log(estadosTempo, rolesTempo)
        setRoles(rolesTempo);
        setEstados(estadosTempo);
    }

    // Funcion para enviar un correo electronico a la persona cuando se cambio la contraseña
    const postCorreoContraseña = async () => {

        let subject = "Cambio de contraseña"
        let texto = "<p> Se realizo un cambio en su contraseña<p>"
        // console.log(formik.values.Mail, subject, texto)
        // TODO PETICION -> FUNCION
        const promesa = await fetch(`${instancias.API_URL}/email?${Date.now()}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('ppfToken')
            },
            body: JSON.stringify({
                to: formik.values.Mail,
                subject: subject,
                html: texto
            })
        });

        await promesa.json()

            .then((res) => {
                // console.log(res)
                validarRespuesta(res);
                if (res.code === "EREQUEST") {
                    toastShow(toast, 'error', 'Error', 'Error al enviar el correo');
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    // -- Funcionones para el modal de agregar
    const openNew = () => {
        // setFormData(datos);
        getValoresIniciales();
        setUsuarioDialog(true);
        getPermisosUsuario(datos.idUser);
        formik.setValues(datos)
        getMenu();
        // getModulo();
        getAccesosByUsuario(datos.idUser)

    }

    const hideDialog = () => {
        setUsuarioDialog(false);
    }


    // Funcion de para agregar un nuevo usuario
    const editarUsuario = async () => {
        setLoading1(true);
        if (typeof formik.values.Password === 'undefined') {
            const user = {
                idPersonal: formik.values.idPersonal,
                Usuario: (formik.values.Usuario).toLowerCase(),
                UserName: formik.values.UserName,
                Mail: formik.values.Mail,
                // Password: formik.values.Password === "" ? 
                IdRol: typeof formik.values.IdRol === 'object' ? formik.values.IdRol.IdRol : formik.values.IdRol,
                Status: typeof formik.values.IdStatus === 'object' ? formik.values.IdStatus.IdStatus : formik.values.IdStatus,
                idUser: formik.values.idUser
            }
            const res = await updateUser(user);
            if (res?.code === "EREQUEST") {
                toastShow(toast, 'error', 'Error', 'Error al modificar el usuario');
                setLoading1(false);
            } else {
                usuarios()
                toastShow(toast, 'success', 'Modificdo', 'Usuario Modificado Correctamente.');
                hideDialog()
                setLoading1(false);
            }
        }
        else {
            var PasswordEncrypted = CryptoJS.AES.encrypt(formik.values.ConfirmarPassword, "finazas2023").toString();
            const user = {
                Password: PasswordEncrypted,
                idUser: formik.values.idUser
            }
            const res = await updatePassword(user);
            if (res?.code === "EREQUEST") {
                toastShow(toast, 'error', 'Error', 'Error al modificar el usuario');
                setLoading1(false);
            } else {
                usuarios()
                toastShow(toast, 'success', 'Modificdo', 'Usuario Modificado Correctamente.');
                hideDialog()
                setLoading1(false);
                // postCorreoContraseña()
            }
        }
    }

    // Validaciones del Formik
    const formik = useFormik({
        initialValues: datos,

        validate: (data) => {

            let errors = {};
            if (!data.idPersonal) {
                errors.idPersonal = 'Se requiere el Usuario.';
            }
            else if (!/^[0-9]{2,10}$/i.test(data.idPersonal)) {
                errors.idPersonal = 'El codigo no debe contener letras';
            }

            if (!data.Usuario) {
                errors.Usuario = 'Se requiere el Usuario.';
            }
            // else if (!/[^A-Z0-9.%+-]{2,10}$/i.test(data.Usuario)) {
            //     errors.Usuario = 'No se aceptan letras en mayuscula.';
            // }

            if (!data.UserName) {
                errors.UserName = 'Se requiere el Nombre.';
            }
            // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            //     errors.Mail = 'Correo Electronico Ivalido. E.g. example@email.com';
            // }
            if (data.Password !== data.ConfirmarPassword) {
                errors.Password = 'Las contraseñas no coinciden, ingreselas correctamente.';
            }

            if (!data.IdStatus) {
                errors.Status = 'Se requiere el estado del usuario.';
            }
            if (!data.IdRol) {
                errors.IdRol = 'Se requiere el Rol del usuario.';
            }

            return errors;
        },

        onSubmit: async (data) => {
            if (isFormFieldValid) {
                await editarUsuario();
            }
            else {
                setShowMessage(true);

            }


        }
    });


    // Funciones de evalidaciones de formik
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {

        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };


    // *******************   PERMISOS POR USUARIOS    ************************
    const getPermisosUsuario = async (idUser) => {

        setIsLoading(true);

        const resp = await getPermisos(idUser);

        if (resp?.code === "EREQUEST") {
            toastShow(toast, 'error', 'Error', 'Error al obtener los permisos');
            setIsLoading(false);
        } else {
            setIsLoading(false);
            // console.log(resp.permisos.split(','))
            const ordenado = resp.permisos.split(',').sort();
            // console.log(ordenado);
            setPermisos(ordenado);
            // setMenuInfo(resp.menu);
            // console.log(permisos);
        }
    }

    const getMenu = async () => {
        const menuTempo = await getMenuNuevo();
        // console.log(menuTempo)
        // setMenuInfo(menuTempo);
        let contenido = [];
        let html = '';
        for (let nivel = 0; nivel <= menu.length; nivel++) {
            const tempo = menuTempo.filter((element) => element.IdContenedor === nivel);
            contenido[nivel] = tempo;
        }
        // console.log(panel);

        const base = menuTempo.filter((element) => element.IdContenedor === 0);
        html = base.map((item, i) => {
            const subNivel = menuTempo.filter((element) => element.IdContenedor === item.IdMenu)
            // console.log({ subNivel });
            let subNiveles = [];
            subNivel.forEach((subItem, i) => {
                subNiveles.push(checkbox(subItem));
            })

            return (
                getNivelEncabezado(item, subNiveles)
            )
        })
        // console.log(html);
        setMenu(html)
    }

    const getNivelEncabezado = (item, subNiveles) => {
        // console.log(item);
        // console.log(permisos);
        return (
            <AccordionTab
                key={item.IdMenu}
                header={
                    <React.Fragment>
                        <div className="modal__permisosCheck">
                            <span >
                                <i className={item.Icon}></i>
                                {item.Menu}
                            </span>
                            <span >
                                <Checkbox value={item.IdMenu} onChange={onPermisosSubNivelChange}
                                    // checked={true} />
                                    checked={permisos.some((IdMenu) => IdMenu === (item.IdMenu + ''))} />
                            </span>
                        </div>
                    </React.Fragment>
                }
            >
                <div className='gridCheckbox'>
                    {subNiveles}
                    {/* {NivelesContainer.length > 0 ? <Accordion className={classNames("accordion-custom modal_accordion", { 'isNotVisible': isLoading })} multiple >{NivelesContainer}</Accordion>  : ''} */}
                </div>
            </AccordionTab >
        )
    }

    const getAccesosByUsuario = async (idUser) => {

        const modulosTempo = await getAccesosModulos()
        setModulos(modulosTempo)

        setIsLoading(true)
        const result = await getAccesosUsuario(idUser);
        console.log(result)
        if (result?.code === "EREQUEST") {
            toastShow(toast, 'error', 'Error', 'Error al obtener los accesos');
            setIsLoading(false);
        } else {
            setIsLoading(false);
            const ordenado = result.accesos.split(',').sort();
            setAccesos(ordenado)
            console.log(ordenado)
        }

    }

   



    const getModulos = () => {
     
        // console.log(`modulos`, modulosTempo);
        return <Accordion className={classNames("accordion-custom modal_accordion", { 'isNotVisible': isLoading })} multiple >
            {modulos.map(menu => <AccordionTab
                header={
                    <React.Fragment>
                        <i className={menu.Icon}> </i>
                        <span style={{ marginLeft: 3 }}> {menu.Menu}</span>
                       
                    </React.Fragment>}
            >
                <div className='gridCheckbox'>

                    {menu.Accesos.map(acceso => checkboxAccesos(acceso))}
                </div>
            </AccordionTab>)}
        </Accordion>

       
    }

    

    const checkboxAccesos = (acceso) => {
        console.log(accesos.some((item) => item === (acceso.IdAcceso)))
        return (

            <div key={acceso.IdAcceso} className="field-checkbox">
                <Checkbox inputId={acceso.IdAcceso} name="category" value={acceso.IdAcceso} onChange={onAccesossChange}

                    checked={accesos.some((item) => item === (acceso.IdAcceso + ''))} />

                <label htmlFor={acceso.IdAcceso}>{acceso.Acceso}</label>
            </div>

        )
    }


    const onAccesossChange = async (e) => {
       
        const someAccess = accesos.some((item) => item === (e.value + ''))
        console.log(someAccess)

        let newAccesos = 0;

        if (someAccess) {
            console.log("entro aqui")
            newAccesos = accesos.filter((item) => item !== (e.value + ''))
        } else {
            console.log("entro aqui 2")
            if (accesos[0] === '') {
                console.log("entro aqui 3")
                newAccesos = [(e.value + '')]
            } else {
                console.log("entro aqui 4")
                newAccesos = [...accesos, (e.value + '')]
            }
        }
        const result = await cambiarAccesos({ accesos: newAccesos.sort().toString(), idUser: datos.idUser });
        console.log(result)
        setAccesos(result[0].Accesos.split(','));
    }


    const checkbox = (subNivel) => {
        return (
            // <div>
            //     <h1>{subNivel.Nivel}</h1>
            <div key={subNivel.IdMenu} className="field-checkbox">
                <Checkbox inputId={subNivel.IdMenu} name="category" value={subNivel.IdMenu} onChange={onPermisosSubNivelChange}

                    checked={permisos.some((item) => item === (subNivel.IdMenu + ''))} />
                <label htmlFor={subNivel.IdMenu}>{subNivel.Menu}</label>
            </div>
            // </div>

        )
    }




    const onPermisosSubNivelChange = async (e) => {
        console.log(e)
        const aquiEstoy = permisos.some((item) => item === (e.value + ''))

        let newPermisos = undefined;
        if (aquiEstoy) {
            newPermisos = permisos.filter((item) => item !== (e.value + ''))
        } else {
            if (permisos[0] === '') {
                newPermisos = [(e.value + '')]
            } else {
                newPermisos = [...permisos, (e.value + '')]
            }
        }
        const result = await changePermisos({ permisos: newPermisos.sort().toString(), idUser: datos.idUser });
        console.log(result)
        setPermisos(result[0].PermisosWeb.split(','));
    }


    // UseEffect que obtiene las datos de las funciones para getRoles y getEstados para mostrar
    // la informacion en los Dropdown (Select de opciones)

    useEffect(() => {
        getMenu()
        // console.log(datos)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permisos])




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
                <li>Minimo 6 characters</li>
            </ul>
        </React.Fragment>
    );



    return (
        <Fragment>
            <Button icon="pi pi-pencil" className="p-button-rounded  p-button-infop p-button-text" onClick={openNew} />
            <div className="form-demo">
                <Toast position="bottom-right" ref={toast} />
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} closable={true}
                    showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h5 className="colorh5">Registro Creado Existosamente</h5>
                    </div>
                </Dialog>
                <div className="flex justify-content-center" style={{ marginTop: 5 }}>
                    <Dialog id="editModal1" visible={usuarioDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} header="Editar Usuario" modal className="modal__contenedor modal__usuarios"
                        onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginTop: 5 }}>
                            <div style={{ display: "none" }}>
                                <div className="field col-6 me-2">
                                    <span className="p-float-label">
                                        <InputText id="Usuario" name="Usuario" value={formik.values.idUser} onChange={formik.handleChange} autoFocus
                                            className={classNames({ 'p-invalid': isFormFieldValid('Usuario') })} />
                                    </span>
                                    {getFormErrorMessage('Usuario')}
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label">
                                        <InputText id="idPersonal" name="idPersonal" value={formik.values.idPersonal} onChange={formik.handleChange} autoFocus
                                            className={classNames({ 'p-invalid': isFormFieldValid('idPersonal') })} autoComplete="off" />
                                        <label htmlFor="idPersonal" className={classNames({ 'p-error': isFormFieldValid('idPersonal') })}>Codigo Personal</label>
                                    </span>
                                    {getFormErrorMessage('idPersonal')}
                                </div>
                            </div>
                            <div className="modal__input-contenedor" >
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label">
                                        <InputText id="Usuario" name="Usuario" value={formik.values.Usuario} onChange={formik.handleChange} autoFocus
                                            className={classNames({ 'p-invalid': isFormFieldValid('Usuario') })} />
                                        <label htmlFor="Usuario" className={classNames({ 'p-error': isFormFieldValid('Usuario') })}>Usuario</label>
                                    </span>
                                    {getFormErrorMessage('Usuario')}
                                </div>
                                <div className="field col-6 me-2">
                                    <span className="p-float-label">
                                        <InputText id="UserName" name="UserName" value={formik.values.UserName} onChange={formik.handleChange} autoFocus
                                            className={classNames({ 'p-invalid': isFormFieldValid('UserName') })} />
                                        <label htmlFor="UserName" className={classNames({ 'p-error': isFormFieldValid('UserName') })}>Nombre</label>
                                    </span>
                                    {getFormErrorMessage('UserName')}
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="Mail" name="Mail" value={formik.values.Mail} onChange={formik.handleChange}
                                            className={classNames({ 'p-invalid': isFormFieldValid('Mail') })} />
                                        <label htmlFor="Mail" className={classNames({ 'p-error': isFormFieldValid('Mail') })}>Correo</label>
                                    </span>
                                    {getFormErrorMessage('Mail')}
                                </div>
                                <div className="field col-6 me-2 accordion-demo" >
                                    <Accordion activeIndex={1} headerClassName="accordion-header" collapseIcon="pi pi-lock">
                                        <AccordionTab header="Cambiar Contraseña" >
                                            <span className="p-float-label mt-3">
                                                <Password id="Password" name="Password" value={formik.values.Password} onChange={formik.handleChange} toggleMask
                                                    className={classNames({ 'p-invalid': isFormFieldValid('Password') })} header={passwordHeader} footer={passwordFooter} />
                                                <label htmlFor="Password" className={classNames({ 'p-error': isFormFieldValid('Password') })}> Nuevo Password</label>
                                            </span>
                                            {getFormErrorMessage('Password')}

                                            <span className="p-float-label mt-5">
                                                <Password id="ConfirmarPassword" name="ConfirmarPassword" value={formik.values.ConfirmarPassword} onChange={formik.handleChange} toggleMask
                                                    className={classNames({ 'p-invalid': isFormFieldValid('Password') })} header={passwordHeader} footer={passwordFooter} />
                                                <label htmlFor="Password" className={classNames({ 'p-error': isFormFieldValid('Password') })}>Confirmar Password</label>
                                            </span>
                                            {getFormErrorMessage('Password')}
                                        </AccordionTab>
                                    </Accordion>

                                    {/* <Button label="Cambiar Contraseña" icon="pi pi-lock" className="p-button-text red" onClick={editPassword} /> */}
                                    {/* <span className="p-float-label">
                                        <Password id="Password" name="Password" value={formik.values.Password} onChange={formik.handleChange} toggleMask
                                            className={classNames({ 'p-invalid': isFormFieldValid('Password') })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="Password" className={classNames({ 'p-error': isFormFieldValid('Password') })}>Password</label>
                                    </span>
                                    {getFormErrorMessage('Password')} */}
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2">
                                    {/* <span className="p-float-label"> */}
                                    <Dropdown id="IdStatus" name="IdStatus" value={formik.values.IdStatus} onChange={formik.handleChange}
                                        options={estados} optionLabel="StatusName" placeholder={formik.values.StatusName} label={formik.values.StatusName} />
                                    {/* </span> */}
                                </div>
                                <></>
                                <div className="field col-6 me-2">
                                    {/* <span className="p-float-label"> */}
                                    <Dropdown id="IdRol" name="IdRol" value={formik.values.IdRol} onChange={formik.handleChange} options={roles} optionLabel="Rol"
                                        placeholder={formik.values.Rol} />
                                    {/* </span> */}
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <h3 className="modal_texto-titulo-permisos">Permisos </h3>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className={classNames("progressSpinner-container", { 'isVisible': isLoading })}>
                                    <ProgressSpinner ></ProgressSpinner>
                                </div>
                                <Accordion className={classNames("accordion-custom modal_accordion", { 'isNotVisible': isLoading })} multiple >
                                    {
                                        menu
                                    }
                                </Accordion>
                            </div>
                            {/* Seccion para agreagar los permisos de accesos  a los usuarios */}
                            <div className="modal__input-contenedor">
                                <h3 className="modal_texto-titulo-permisos">Accesos</h3>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className={classNames("progressSpinner-container", { 'isVisible': isLoading })}>
                                    <ProgressSpinner ></ProgressSpinner>
                                </div>
                                {/* <Accordion className={classNames("accordion-custom modal_accordion", { 'isNotVisible': isLoading })} multiple > */}

                                
                                  {  getModulos()}

                                

                                {/* </Accordion> */}
                            </div>
                            <div className="p-dialog-footer">
                                <Button label="Cancelar" type="button" icon="pi pi-times" className="p-button-text red" onClick={hideDialog} />
                                <Button type="submit " loading={loading1} label="Guardar" icon="pi pi-check" className="p-button-text" />
                            </div>
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

// Exportacion de la pantalla

export default ModalEditarUsuario;