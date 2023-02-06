import React, { useState, useEffect, useRef, Fragment } from "react";

import instancias from "../../../../Api/backend";

//************** Hooks **************/

import { useForm } from "../../../../hooks/useForm";

// Librerias de componentes
import { useFormik } from 'formik';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { validarRespuesta } from "../../../../services/crypto";

import { getRoles } from "../../../../Api/IT/Roles/RolesRequest";
import { getEstadosSecurity } from "../../../../Api/Global/StatusRequest";
import { toastShow } from '../../../../services/ToastService';


import { getMenu } from "../../../../Api/Menu/MenuRequest";


import { getMenuNuevo, postMenu } from "../../../../Api/Menu/MenuRequest";




export const ModalMenu = ({ toast, datos, icono, nombre, className, getListadoMenu }) => {

    const [InputValues, setInputValues] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const [menuDialog, setMenuDialog] = useState(false);


    const [menus, setMenus] = useState("")


    const getValoresIniciales = async () => {
        const menusTempo = await getMenu();

        setMenus(menusTempo);
        console.log(menus);
    }

    const getMenu = async () => {
        const tempo = await getMenuNuevo()
        setMenus(tempo)
    }

    //************** Funcionones para el modal de agregar **************/
    const openNew = () => {
        // getValoresIniciales();
        setMenuDialog(true);
        getMenu()

    }

    const hideDialog = () => {
        setMenuDialog(false);
    }

    const activoAPP = [
        {
            Id: true,
            Estado: "Activo"
        },
        {
            Id: false,
            Estado: "Inactivo"
        },

    ]

    const agregarMenu = async (data) => {
        console.log(data)

        const resultado = await postMenu(data)
        if (resultado) {
            toastShow(toast, 'success', 'Creado', 'Informacion ingresada Correctamente.');
            setFormData({})
            formik.resetForm(formData)
            hideDialog()
            getListadoMenu()
            return true;
        }else{
            toastShow(toast, 'error', 'Error', 'Error al editar la informacion');
            return true;
        }

        console.log(data)
    }


    const inicioValores = {
        IdMenu: -1000,
        Menu: null,
        Icon: null,
        IconApp: null,
        URL: null,
        IdContenedor: 0,
        Orden: 0,
        MenuWeb: 1,
        ActivoAPP: 0
    }


    const formik = useFormik({
        initialValues: typeof datos === 'object' ? datos : inicioValores,
        validate: (data) => {
            let errors = {};

            if (!data.Menu) {
                errors.Menu = 'Se requiere el nombre del menu.';
            }

            if (!data.Icon) {
                errors.Icon = 'Se requiere el Icono del menu.';
            }


            // if (!data.IdContenedor) {
            //     errors.IdContenedor = 'Se requiere el menu que lo contiene.';
            // }
            // if (!data.Orden) {
            //     errors.Orden = 'Se requiere el orden del menu.';
            // }


            return errors;
        },

        onSubmit: async (data) => {
            setFormData(data);
            await agregarMenu(data);
           
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

    };



    return (
        <Fragment>
            <Button label={nombre} icon={icono} className={className} onClick={openNew} />
            <div className="form-demo">

                <div className="flex justify-content-center" >
                    <Dialog visible={menuDialog} header="Agregar un nuevo menu" modal className="modal__contenedor modal__usuarios"
                        onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit} className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-align-justify" />
                                        <InputText id="Menu" name="Menu" value={formik.values.Menu} onChange={formik.handleChange} autoFocus
                                            autoComplete="off" />
                                        <label htmlFor="Menu" >Nombre Menu</label>
                                    </span>

                                </div>
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-align-justify" />
                                        <InputText id="Icon" name="Icon" value={formik.values.Icon} onChange={formik.handleChange} autoFocus
                                            autoComplete="off" />
                                        <label htmlFor="Icon" >Icon</label>
                                    </span>

                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-align-justify" />
                                        <InputText id="IconApp" name="IconApp" value={formik.values.IconApp} onChange={formik.handleChange} autoFocus
                                            autoComplete="off" />
                                        <label htmlFor="IconApp" >IconApp</label>
                                    </span>
                                </div>
                                <div className="field col-6 me-2">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-arrow-up-right" />
                                        <InputText id="URL" name="URL" value={formik.values.URL} onChange={formik.handleChange} autoComplete="off"
                                        />
                                        <label htmlFor="URL" >URL</label>
                                    </span>
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2">
                                    <span className="p-float-label">
                                        <Dropdown id="IdContenedor" name="IdContenedor" value={formik.values.IdContenedor} onChange={formik.handleChange} options={menus}
                                            optionLabel="Menu" placeholder="Menu" optionValue="IdMenu" />
                                    </span>

                                </div>
                                <div className="field col-6 me-2">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-align-justify" />
                                        <InputText id="Orden" name="Orden" value={formik.values.Orden} onChange={formik.handleChange} autoComplete="off"
                                        />
                                        <label htmlFor="Orden">Orden</label>
                                    </span>
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2" style={{ marginTop: -40 }}>
                                    <label htmlFor="dropdown">Activo APP</label>
                                    <Dropdown id="ActivoAPP" name="ActivoAPP" value={formik.values.ActivoAPP} onChange={formik.handleChange} options={activoAPP}
                                        optionLabel="Estado" optionValue="Id" />
                                </div>
                                <div className="field col-6 me-2" style={{ marginTop: -40 }}>
                                    <label htmlFor="dropdown">Activo Web</label>
                                    <Dropdown id="MenuWeb" name="MenuWeb" value={formik.values.MenuWeb} onChange={formik.handleChange} options={activoAPP}
                                        optionLabel="Estado" optionValue="Id" />
                                </div>
                            </div>
                            <div className="p-dialog-footer">
                                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                                <Button type='submit' label="Save" icon="pi pi-check" className="p-button-text" />
                            </div>

                        </form>
                    </Dialog>
                </div>
            </div>

        </Fragment>
    )
}

export default ModalMenu;