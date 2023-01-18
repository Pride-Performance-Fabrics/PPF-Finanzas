import React, { useState, useEffect, useRef } from 'react'
import { Virtuoso } from 'react-virtuoso'


import Icon from './../../components/icon/Icon';

import { useForm } from '../../hooks/useForm';
import { decodeToken } from 'react-jwt';
import { Toast } from 'primereact/toast';
import { toastShow } from '../../services/ToastService';
import { Tooltip } from 'primereact/tooltip';

import { getTodoList, guardarTask } from './../../utils/ToDo/toDo'

import { classNames } from 'primereact/utils';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Badge } from 'primereact/badge';

import { getFechaFormatoSmall } from '../../services/FechasService'
import ToDoEdit from './ToDoEdit';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const TodoList = () => {

    const dialog = useRef(false);
    const panel = useRef(false);
    const toast = useRef();

    const decoded = decodeToken(localStorage.getItem('ppfToken'));
    const [showMessages, setShowMessages] = useState(true);
    const [showDialogEdit, setShowDialogEdit] = useState(false);
    // console.log( decoded)

    const [formValuesNew, handleInputChangeNew, setValuesNew, resetFormNew] = useForm({
        IdToDo: -100,
        Title: '',
        Description: null,
        Vencimiento: null,
        Recordatorio: null,
        IdRol: null,
        IdUser: null,
        Repeat: null,
        Ciclo: '',
        Priority: null,
        State: 3576,
        NewSteep: null,
        Steps: [],
        IdUserCreate: decoded.idUser,
        FechaCompletado: null,
        visibilidad: 1,
        AssignedTo: null
    });

    const [formValuesEdit, handleInputChangeEdit, setValuesEdit, resetFormEdit] = useForm({
        IdToDo: -100,
        Title: '',
        Description: null,
        Vencimiento: null,
        Recordatorio: null,
        IdRol: null,
        IdUser: null,
        Repeat: null,
        Ciclo: '',
        Priority: null,
        State: 3576,
        NewSteep: null,
        Steps: [],
        IdUserCreate: null,
        FechaCompletado: null,
        AssignedTo: null
    });

    const [toDoListAssing, setToDoListAssing] = useState([]);
    const [toDoListGrupal, setToDoListGrupal] = useState([]);
    const [toDoListPersonal, setToDoListPersonal] = useState([]);
    const [toDoListAll, setToDoListAll] = useState([]);



    const [loading, setLoading] = useState(false);
    const [showPanelEdit, setPanelShowEdit] = useState(false);
    // const [ItemEdit, setItemEdit] = useState(null);
    const [showOpciones, setShowOpciones] = useState(false);


    // const options = [
    //     { value: 1, icon: 'pi pi-user' },
    //     { value: 2, icon: 'pi pi-users' },
    // ];

    const toDoTemplate = (toDo) => {

        const Severity = getSeverity(toDo);

        return (
            <div key={toDo.IdToDo} className={classNames('ToDo_List_item', { recordatorio: Severity === 2, vencido: Severity === 1, finish: Severity === 4 })} >
                <div className='d-flex flex-wrap justify-content-between pe-3 divAux' onDoubleClick={e => setEdit(toDo)}>
                    <div className='d-flex align-items-center' >
                        <div className={classNames('mx-2 ToDo_List_item_circle ', { check: toDo.State === 1 })} onClick={e => changeEstatus(toDo)}>
                            <Icon icon={' ' + (toDo.State === 3578 ? ' pi-check-circle' : ' pi-circle')} />
                        </div>
                        <span>
                            {toDo.Title}
                            <br />
                            <small className='text-overFlow ' >{toDo.Description}</small>
                        </span>
                    </div>
                    <div className='ToDo_List_item_icon d-flex px-2'>
                        <div className='d-flex align-items-end' style={{ fontSize: '0.9rem' }}>
                            <div className={classNames('ToDo_Info_Vencimiento icon')} >
                                <i className="ri-settings-3-line"></i>
                                <samp>
                                    {/* {item.Vencimiento !== null ? (new Date(item.Vencimiento)).toLocaleDateString() : ''} */}
                                    {(toDo?.UsuarioCreate)}
                                </samp>
                            </div>
                            <div className={classNames('ToDo_Info_Vencimiento icon', { hidden: toDo.UsuarioAssigned === null })} >
                                <i className="ri-user-received-line"> </i>
                                <samp>
                                    {/* {item.Vencimiento !== null ? (new Date(item.Vencimiento)).toLocaleDateString() : ''} */}
                                    {(toDo?.UsuarioAssigned)}
                                </samp>
                            </div>
                            {optionsTemplate(toDo)}
                        </div>
                    </div>

                    {/* <div className='mx2'>
                        <Icon icon={'pi ' + (toDo.IdUser !== null ? 'pi-user' : 'pi-users')} />
                    </div> */}

                </div>
                <div className='btnAux'>
                    <div className='mx-2 icon' onClick={e => setEdit(toDo)}>
                        <i className="ri-pencil-line"></i>
                    </div>
                    <div className='mx-2 close' onClick={e => remove({ IdToDo: toDo.IdToDo })}>
                        <Icon icon={'pi pi-times'} />
                    </div>
                </div>
            </div>
        )
    }


    const getSeverity = (toDo) => {
        const vencimiento = toDo.Vencimiento !== null ? (new Date(new Date(toDo.Vencimiento)).getTime() + 24 * 60 * 60 * 1000) : null
        const recordatorio = toDo.Recordatorio !== null ? (new Date(toDo.Recordatorio)) : null
        const hoy = new Date();
        let Severity = 3; // 1-> VENCIDO, 2 -> RECORDATORIO ACTICO 
        // console.log( vencimiento < hoy,  vencimiento , hoy)
        if (toDo.State !== 3578) {
            switch (true) {
                case vencimiento < hoy && vencimiento !== null:
                    Severity = 1; // YA CENCIO
                    break;
                case recordatorio < hoy && recordatorio !== null:
                    Severity = 2; // RECORDATORIO
                    break;
                default:
                    break;
            }
        } else {
            Severity = 4;
        }
        return Severity
    }

    const optionsTemplate = (item) => {
        let ciclo = ''
        switch (item.Repeat) {
            case 1:
                ciclo = 'Diario';
                break;
            case 2:
                ciclo = 'Semanal';
                break;
            case 3:
                ciclo = 'Mensual';
                break;
            case 4:
                ciclo = 'Anual';
                break;

            default:
                ciclo = '';
                break;
        }
        // console.log(item)
        return (
            <div className='ToDo_Info d-flex'>


                <div className={classNames('ToDo_Info_Vencimiento', { hidden: item.Vencimiento === null, 'd-fex': item.Vencimiento !== null })} >
                    <Icon icon={'pi-calendar'} />
                    <samp>
                        {/* {item.Vencimiento !== null ? (new Date(item.Vencimiento)).toLocaleDateString() : ''} */}
                        {getFechaFormatoSmall(item.Vencimiento)}
                    </samp>
                </div>
                <div className={classNames('ToDo_Info_Recordatorio', { hidden: item.Recordatorio === null, 'd-fex': item.Recordatorio !== null })}>
                    <Icon icon={'pi-bell'} />
                    <samp>
                        {/* Recordarme {item.Recordatorio !== null ? (new Date(item.Recordatorio)).toLocaleDateString() : ''} */}
                        {getFechaFormatoSmall(item.Recordatorio)}
                    </samp>
                </div>
                <div className={classNames('ToDo_Info_Repeat', { hidden: item.Repeat === null, 'd-fex': item.Repeat !== null })}>
                    <Icon icon={'pi-sync'} />
                    <samp>
                        {item.Repeat !== null ? ciclo : ''}
                    </samp>
                </div>

            </div>
        )
    }

    const footerTemplate = (resetForm) => {
        return (<div className='ToDo_editor_Opciones_botones'>
            <Button className='guardar p-button-outlined p-button-secondary' icon='pi pi-times' label='Cerrar' onClick={e => { setShowDialogEdit(false); setLoading(false); }} />
            <Button className='guardar' label='Guardar' icon='pi pi-check' loading={loading} onClick={e => guardar(formValuesEdit)} />
        </div>)
    }

    const headerAcordionTemplete = (title, icon, list) => {
        // console.log({title, list})
        const activas = list.filter(item => item.State === 3576)
        // console.log(activas);
        return (
            <div>
                <i className={`pi p-overlay-badge ${icon}`} ></i>
                <span>
                    {' ' + title} {activas.length === 0 ? '' : <Badge value={activas.length} size={null} severity="success" />}
                </span>
            </div>
        )
    }

    const changeEstatus = (item, eliminar) => {
        // console.log(item);
        let index = toDoListAll.findIndex(i => i.IdToDo === item.IdToDo)
        // console.log(index);
        if (index >= 0) {
            const tempo = toDoListAll;
            if (!eliminar) {
                tempo[index].State = tempo[index].State === 3578 ? 3576 : 3578;
                if (tempo[index].State === 3578) {
                    tempo[index].FechaCompletado = new Date();
                    // console.log(tempo[index].FechaCompletado.toLocaleString('EN-US', { hour12: false }).replace(',', ''));
                } else {
                    tempo[index].FechaCompletado = null;
                }
            } else {
                tempo[index].State = 3579;
            }
            // console.log(tempo[index]);
            guardar(tempo[index]);
        }
    }

    const obtenerToDoList = async () => {
        const decoded = decodeToken(localStorage.getItem('ppfToken'));
        let lista = await getTodoList(decoded);
        lista = lista.map(e => { return { ...e, Severity: getSeverity(e) } })
        lista = ordenarPorFecha(lista);
        const asignaciones = lista.filter(e => e.AssignedTo === decoded.idUser || (e.IdUserCreate === decoded.idUser && e.AssignedTo !== null));
        const grupales = lista.filter(e => e.IdRol === decoded.IdRol);
        const personales = lista.filter(e => e.IdUserCreate === decoded.idUser && (e.IdRol !== decoded.IdRol) && (e.AssignedTo === null));
        setToDoListAll(lista);
        setToDoListAssing(asignaciones);
        setToDoListGrupal(grupales);
        setToDoListPersonal(personales);
        setLoading(false);
        // console.log({ asignaciones, grupales, personales })

    }

    // funcion que ordena por fecha de vencimiento
    const ordenarPorFecha = (lista) => {
        // console.log(lista.map(e => e.Severity))
        let n, i, k, aux;
        n = lista.length;
        // Algoritmo de burbuja
        for (k = 1; k < n; k++) {
            // console.log({n,i,k,aux}, n-k)
            for (i = 0; i < (n - k); i++) {
                // console.log({ n, i, k, aux })
                // console.log(lista[i], lista[i + 1])
                if (lista[i].Severity > lista[i + 1].Severity) {
                    aux = lista[i];
                    lista[i] = lista[i + 1];
                    lista[i + 1] = aux;
                }
            }
        }
        return lista;
    }






    const guardar = async (values) => {
        // console.log({ values });
        if (values.Title.length > 0) {
            setLoading(true);
            // console.log(formValues)
            await guardarTask(values);
            resetFormNew();
            obtenerToDoList();
            setShowDialogEdit(false);
        } else {
            toastShow(toast, 'warn', 'Ingrese un titulo.')
        }
    }

    const setEdit = (Item) => {

        setValuesEdit(Item);
        // setItemEdit(Item);
        setShowDialogEdit(true);
        // console.log(window.innerWidth);
        // if (window.innerWidth < 1550) {
        //     setShowDialogEdit(true);
        //     dialog = true;
        // } else {
        //     setPanelShowEdit(true);
        //     panel = true;
        // }
        // console.log(Item);
    }

    const remove = async (Item) => {
        const tempo = toDoListAssing.filter(i => i.IdToDo !== Item.IdToDo)
        setToDoListAssing(tempo);
        changeEstatus(Item, true);
    }



    useEffect(() => {
        if (showDialogEdit) {
            setPanelShowEdit(false);
            panel.current = false;
            dialog.current = true;
        }
    }, [showDialogEdit]);

    useEffect(() => {
        if (showPanelEdit) {
            setShowDialogEdit(false);
            dialog.current = false;

        }
    }, [showPanelEdit]);




    const showWarns = (list) => {
        list.forEach((item) => {
            if (item.Severity === 1 || item.Severity === 2) {
                let severity = ''
                switch (item.Severity) {
                    case 1:
                        severity = 'error'
                        break;
                    case 2:
                        severity = 'warn'
                        break;
                    default:
                        break;
                }
                setTimeout(() => {
                    toastShow(toast, severity, item.Title, '', 5000)
                }, 500);
            }
        })
    }


    useEffect(() => {
        obtenerToDoList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!showPanelEdit) {
            // setItemEdit(null);
        }
    }, [showPanelEdit])

    useEffect(() => {
        if (showMessages) {
            showWarns(toDoListAll);
            setShowMessages(false)
        }

         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toDoListAll])

    return (
        <div className='ToDo'>
            <Toast position="bottom-right" ref={toast} />
            <Tooltip target=".tooltipTarget" position='bottom' />
            <div className='d-flex col-12' style={{ height: '100%' }}>
                <div className={classNames('ToDo_ListContainer', { 'col-12': !showPanelEdit, 'col-9': showPanelEdit })}>
                    <div className='ToDo_newEditor'>
                        <ToDoEdit
                            formValues={formValuesNew}
                            handleInputChange={handleInputChangeNew}
                            loading={loading}
                            guardar={e => { setShowOpciones(false); guardar(e) }}
                            optionsTemplate={optionsTemplate}
                            setValues={setValuesNew}
                            resetForm={e => { setShowOpciones(false); resetFormNew() }}
                            showOpciones={showOpciones}
                            setShowOpciones={setShowOpciones}
                            botones={true}
                            changeEstatus={changeEstatus}
                        />
                    </div>
                    <div className='ToDo_List'>
                        <Accordion
                        // multiple
                        >
                            <AccordionTab header={(headerAcordionTemplete('Asignaciones', 'pi-star', toDoListAssing))} className='AcordionTabToDoList' >
                                <Virtuoso
                                    style={{ height: '100%' }}
                                    totalCount={toDoListAssing.length}
                                    itemContent={(index) => {
                                        return toDoTemplate(toDoListAssing[index])
                                    }}
                                />
                            </AccordionTab>
                            <AccordionTab header={(headerAcordionTemplete('Grupales', 'pi-users', toDoListGrupal))} className='AcordionTabToDoList'>
                                <Virtuoso
                                    style={{ height: '100%' }}
                                    totalCount={toDoListGrupal.length}
                                    itemContent={(index) => {
                                        return toDoTemplate(toDoListGrupal[index])
                                    }}
                                />
                            </AccordionTab>
                            <AccordionTab header={(headerAcordionTemplete('Personales', 'pi-user', toDoListPersonal))} className='AcordionTabToDoList'>
                                {/* <Messages onRemove={remove} ref={msgs2} /> */}
                                <Virtuoso
                                    style={{ height: '100%' }}
                                    totalCount={toDoListPersonal.length}
                                    itemContent={(index) => {
                                        return toDoTemplate(toDoListPersonal[index])
                                    }}
                                />
                            </AccordionTab>
                        </Accordion>
                    </div>

                </div>
                <div className={classNames('ToDo_Edit', { 'col-0': !showPanelEdit, 'col-3': showPanelEdit })}>
                    <i className={classNames('ToDo_Edit_Close ri-close-line ', { 'hidden': !showPanelEdit })} onClick={e => setPanelShowEdit(false)}></i>
                    <ToDoEdit
                        formValues={formValuesEdit}
                        handleInputChange={handleInputChangeEdit}
                        loading={loading}
                        guardar={guardar}
                        optionsTemplate={optionsTemplate}
                        setValues={setValuesEdit}
                        resetForm={resetFormEdit}
                        showOpciones={true}
                        setShowOpciones={e => { }}
                        botones={true}
                        changeEstatus={changeEstatus}
                    />
                </div>
            </div>

            <Dialog footer={e => footerTemplate(resetFormEdit)} visible={showDialogEdit} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '60vw' }} modal onHide={e => setShowDialogEdit(false)} closable={false}>

                <div className={classNames('ToDo_newEditor')}>
                    <div className='dialog'>
                        <ToDoEdit
                            formValues={formValuesEdit}
                            handleInputChange={handleInputChangeEdit}
                            loading={loading}
                            guardar={guardar}
                            optionsTemplate={optionsTemplate}
                            setValues={setValuesEdit}
                            resetForm={resetFormEdit}
                            showOpciones={true}
                            setShowOpciones={e => { }}
                            botones={false}
                            changeEstatus={changeEstatus}
                        />
                    </div>
                </div>
            </Dialog>

        </div>
    )
}

export default TodoList