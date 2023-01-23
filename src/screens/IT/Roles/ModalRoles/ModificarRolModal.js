import React, { useEffect, useState, useRef, Fragment } from 'react';

import instancias from "../../../../Api/backend";

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';

import { toastShow } from '../../../../services/ToastService'
import { validarRespuesta } from '../../../../services/crypto'
import { Dialog } from 'primereact/dialog';
// import { modificarRol } from '../../../../Api/IT/Roles/RolesRequest';



export const ModificarRolModal = ({ datos, updateRoles }) => {

    
    const toast = useRef(null);

    const [rolDialog, setRolDialog] = useState(false);
    const [niveles, setNiveles] = useState([]);

    // const permisos = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
    const [selectedPermisos, setSelectedPermisos] = useState([]);

    const [loading1, setLoading1] = useState(false);

    

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Rol Modificado Existosamente', detail: 'Se Modifico un rol', life: 3000 });
    }

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se han ingresado los campos correctamente', life: 3000 });
    }


    const modificarRol = async (newData) => {
        // TODO PETICION -> FUNCION
        setLoading1(true);
        const promesa = await fetch(`${instancias.API_URL}/roles/id/${newData.IdRol}?${Date.now()}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('ppfToken')
            },
            body: JSON.stringify({
                IdRol: newData.IdRol,
                Rol: newData.Rol,
                Description: newData.Description
            })
        });

        await promesa.json()

            .then((res) => {
                validarRespuesta(res);
                if (res.code === "EREQUEST") {
                    toastShow(toast, 'error', 'Error', 'Error al modificar el rol');
                    console.log("error")
                    setLoading1(false);
                } else {
                    updateRoles()
                    console.log(updateRoles())
                    setTimeout(() => {
                        updateRoles()
                        toastShow(toast, 'success', 'Modificdo', 'Rol modificado.');
                        hideDialog();
                        setLoading1(false);
                    }, 400);

                }
            })
            .catch((error) => {
                console.error(error);
                setLoading1(false);
            })


    }


    const getPermisos = async (IdRol) => {
        console.log(IdRol)
        const promesa = await fetch(`${instancias.API_URL}/permisosNivel/${IdRol}?${Date.now()}`, {
            headers: { 'x-access-token': localStorage.getItem('ppfToken') }
        });
        await promesa.json()
            .then((res) => {
                validarRespuesta(res);
                setSelectedPermisos(res.data);
            })
            .catch((error) => {
                console.error('Error: ', error)
            })
    }

    const getNiveles = async () => {
        const promesa = await fetch(`${instancias.API_URL}/permisosNivel?${Date.now()}`, {
            headers: { 'x-access-token': localStorage.getItem('ppfToken') }
        });
        await promesa.json()

            .then((res) => {
                validarRespuesta(res);
                setNiveles(res.data);
            })
            .catch((error) => {
                console.error('Error: ', error)
            })
    }

    const postPermisos = async (IdRol, IdNivelMenuWeb, Acceso) => {
        const promesa = await fetch(`${instancias.API_URL}/permisosNivel/modificarPermisoRol?${Date.now()}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('ppfToken')
            },
            body: JSON.stringify({
                IdRol: datos.IdRol,
                IdNivelMenuWeb: IdNivelMenuWeb,
                Acceso: Acceso ? 1 : 0
            })
        });


        await promesa.json()
            .then((res) => {
                validarRespuesta(res);
                getPermisos(datos.IdRol);
                if (res.code === "EREQUEST") {
                    toastShow(toast, 'error', 'Error', 'Error al modificar el rol');
                }
            })
            .catch((error) => {
                console.error(error);
            })


    }


    const openNew = () => {
        getPermisos(datos.IdRol);
        formik.setValues(datos)

        setRolDialog(true);
        getNiveles()
    }

    const hideDialog = () => {
        setRolDialog(false);
    }

    const formik = useFormik({
        initialValues: datos,
        validate: (data) => {
            let errors = {};

            if (!data.Rol) {
                errors.Rol = 'El rol es requerido.';
            }

            return errors;
        },
        onSubmit: async (data) => {
            await modificarRol(data);
        }
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    // *********    PERMISOS DEL ROL    ********

    const onPermisosNivelChange = (e) => {
        let _selectedPermisos = [...selectedPermisos];

        const permisoExiste = selectedPermisos.some((item) => item.IdNivelMenuWeb === e.value)


        if (permisoExiste) {
            for (let i = 0; i < _selectedPermisos.length; i++) {
                if (_selectedPermisos[i].IdNivelMenuWeb === e.value) {
                    _selectedPermisos[i].Acceso = e.checked;
                    postPermisos(datos.IdRol, e.value, e.checked)
                    break;

                }
            }
        } else {
            postPermisos(datos.IdRol, e.value, e.checked)
            _selectedPermisos.push({
                IdRol: datos.IdRol,
                IdNivelMenuWeb: e.value,
                Acceso: e.checked
            })
        }


        setSelectedPermisos(_selectedPermisos);
    }

    // HOOKS de efecto que retorna la funcion getListadoRoles
    useEffect(() => {
        console.log(datos)
        // updateRoles()
        // getPermisos(datos.IdRol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading1]);




    return (
        <Fragment>
            <Button style={{ padding: '0.2rem', height: 'auto' }} icon="pi pi-pencil" className="p-button-rounded p-button-infop p-button-text" onClick={openNew} />
            <Toast position="bottom-right" ref={toast}></Toast>
            <Dialog visible={rolDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '40vw' }} onHide={hideDialog}>
                <div style={{ width: '100%', margin: 'auto' }}>
                    <h2>Modificar Rol</h2>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field" style={{ marginTop: 30 }}>
                            <span className="p-float-label">
                                <InputText id="Rol" name="Rol" value={formik.values.Rol} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('Rol') })} />
                                <label htmlFor="Rol" className={classNames({ 'p-error': isFormFieldValid('Rol') })}>Rol</label>
                            </span>
                            {getFormErrorMessage('Rol')}
                        </div>
                        <div className="field" style={{ marginTop: 30 }}>
                            <span className="p-float-label">
                                <InputText id="Description" name="Description" value={formik.values.Description} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('Description') })} />
                                <label htmlFor="Description" className={classNames({ 'p-error': isFormFieldValid('Descripcion') })}>Description</label>
                            </span>
                            {getFormErrorMessage('Description')}
                        </div>
                        <div className="mt-3" >
                            <h3>Permisos por rol</h3>
                            <div className='gridCheckbox'>
                                {
                                    niveles.map((nivel) => {
                                        return (
                                            <div key={nivel.IdNivelWeb} className="field-checkbox">
                                                <Checkbox inputId={nivel.IdNivelWeb} name="category" value={nivel.IdNivelWeb} onChange={onPermisosNivelChange}
                                                    checked={selectedPermisos.some((item) => item.IdNivelMenuWeb === nivel.IdNivelWeb && item.Acceso)} />
                                                <label htmlFor={nivel.IdNivelWeb}>{nivel.Nivel}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="p-dialog-footer">
                            <Button label="Cancelar" type='button' icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                            <Button type='submit' label="Guardar" loading={loading1} icon="pi pi-check" className="p-button-text" />
                        </div>
                    </form>
                </div>

            </Dialog>
        </Fragment>
    )
}

export default ModificarRolModal;