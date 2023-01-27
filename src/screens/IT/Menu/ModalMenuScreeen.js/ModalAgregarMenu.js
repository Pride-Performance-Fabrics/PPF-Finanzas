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






export const ModalAgregarMenu = () => {

    const [InputValues, setInputValues] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const [menuDialog, setMenuDialog] = useState(false);
    const toast = useRef(null);

    const [menus, setMenus] = useState("")


    const getValoresIniciales = async () => {
        const menusTempo = await getMenu();
        
        setMenus(menusTempo);
        console.log(menus);
    }

    //************** Funcionones para el modal de agregar **************/
    const openNew = () => {
        // getValoresIniciales();
        getValoresIniciales()
        setMenuDialog(true);

    }

    const hideDialog = () => {
        setMenuDialog(false);
    }


    const [formValues, handleInputChange, setValues, resetForm, setNumber] = useForm({

    });


    // const formik = useFormik({
    //     initialValues: {
    //         Menu: null,
    //         Icon: null,
    //         IconApp: null,
    //         URL: null,
    //         IdContenedor: 0,
    //         Orden: 0,
    //         MenuWeb: 0,
    //         ActivoAPP: 0
    //     },
    //     validate: (data) => {
    //         let errors = {};

    //         if (!data.Menu) {
    //             errors.Menu = 'Se requiere el nombre del menu.';
    //         }

    //         if (!data.Icon) {
    //             errors.Icon = 'Se requiere el Icono del menu.';
    //         }


    //         if (!data.IdContenedor) {
    //             errors.IdContenedor = 'Se requiere el menu que lo contiene.';
    //         }
    //         if (!data.Orden) {
    //             errors.Orden = 'Se requiere el orden del menu.';
    //         }



    //         return errors;
    //     },

    //     onSubmit: async (data) => {
    //         if (isFormFieldValid) {
    //             setFormData(data);
    //             await agregarUsuario(data.Menu,
    //                 data.Icon, data.IconApp,
    //                 data.URL, data.IdContenedor,
    //                 data.Orden, data.MenuWeb, data.ActivoAPP);
    //             // setShowMessage(true);
    //         } else {
    //             toastShow(toast, 'error', 'Error', 'Error al ingresar los datos del menu');
    //         }

    //     }
    // });


    return (
        <Fragment>
            <Button label="Agregar Nuevo Menu" icon="pi pi-plus" className="p-button-Primary mr-2 " onClick={openNew} />
            <div className="form-demo">
                <Toast position="bottom-right" ref={toast} />
                <div className="flex justify-content-center" >
                    <Dialog visible={menuDialog} header="Agregar un nuevo menu" modal className="modal__contenedor modal__usuarios"
                        onHide={hideDialog}>
                        <form className="p-fluid" style={{ margin: "Auto", marginBottom: 0 }}>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-align-justify" />
                                        <InputText id="Menu" name="Menu" value={InputValues.Menu} onChange={handleInputChange} autoFocus
                                            autoComplete="off" />
                                        <label htmlFor="Menu" >Nombre Menu</label>
                                    </span>

                                </div>
                                <div className="field col-6 me-2" >
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-align-justify" />
                                        <InputText id="Icon" name="Icon" value={InputValues.Icon} onChange={handleInputChange} autoFocus
                                            autoComplete="off" />
                                        <label htmlFor="Icon" >Icon</label>
                                    </span>

                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-align-justify" />
                                        <InputText id="IconApp" name="IconApp" value={InputValues.IconApp} onChange={handleInputChange} autoFocus
                                            autoComplete="off" />
                                        <label htmlFor="IconApp" >IconApp</label>
                                    </span>
                                </div>
                                <div className="field col-6 me-2">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-arrow-up-right" />
                                        <InputText id="URL" name="URL" value={InputValues.URL} onChange={handleInputChange} autoComplete="off"
                                        />
                                        <label htmlFor="URL" >URL</label>
                                    </span>
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                                <div className="field col-6 me-2">
                                    <span className="p-float-label">
                                        <Dropdown id="IdContenedor" name="IdContenedor" value={InputValues.IdContenedor} onChange={handleInputChange}  optionLabel="Menu" placeholder="Menu" />
                                    </span>

                                </div>
                                <div className="field col-6 me-2">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-align-justify" />
                                        <InputText id="Orden" name="Orden" value={InputValues.Orden} onChange={handleInputChange} autoComplete="off"
                                        />
                                        <label htmlFor="Orden">Orden</label>
                                    </span>
                                </div>
                            </div>
                            <div className="modal__input-contenedor">
                             
                                <></>
                                <div className="field-checkbox" style={{ margin: 0 }}>
                                    <Checkbox inputId='ActivoAPP' name="ActivoAPP" value={formValues.ActivoAPP} onChange={e => handleInputChange({ target: { value: !formValues.ActivoAPP } }, 'ActivoAPP')} checked={formValues.ActivoAPP} />
                                    <label htmlFor='Pro'>  Activo APP</label>
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

export default ModalAgregarMenu;