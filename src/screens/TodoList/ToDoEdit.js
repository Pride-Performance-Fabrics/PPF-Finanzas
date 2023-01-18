import React, { useState, useRef, useEffect } from 'react';

import Icon from '../../components/icon/Icon';
import { InputTextarea } from 'primereact/inputtextarea';
import AutoCompleteDropdown from '../../components/Form/AutoCompleteDropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { classNames } from 'primereact/utils';

import { Calendar } from 'primereact/calendar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { decodeToken } from 'react-jwt';
import { getUserByRol } from '../../utils/Users/users';
import { Button } from 'primereact/button';
import { getFechaFormatoSmall } from '../../services/FechasService'
import { toastShow } from '../../services/ToastService';
import { Toast } from 'primereact/toast';

const ToDoEdit = ({ formValues, handleInputChange, loading, guardar, optionsTemplate, setValues, resetForm, showOpciones, setShowOpciones, botones, changeEstatus }) => {

    // REFERENCIAS 
    const vencimientoOverlay = useRef();
    const recordatorioOverlay = useRef();
    const RepetirOverlay = useRef();
    const toast = useRef(null);


    const [userByRol, setUserByRol] = useState([]);


    const nuevo = () => {
        const decoded = decodeToken(localStorage.getItem('ppfToken'));
        if (formValues.Title.length > 0) {
            const tempo = formValues;
            switch (formValues.visibilidad) {
                case 1:
                    tempo.IdRol = null;
                    tempo.IdUser = decoded.idUser;
                    break;

                case 0:
                    tempo.IdUser = null;
                    tempo.IdRol = decoded.IdRol;
                    break;

                default:
                    break;
            }
            // console.log(tempo,'asdfasdf')
            guardar(tempo);
            setShowOpciones(false);
        } else {
            toastShow(toast, 'warn', 'Ingrese un titulo.')
        }
    }

    const footerTemplateCalendar = (ref, value) => {
        return (
            <div className='d-flex justify-content-between align-items-end col-12'>
                <span>
                    {value !== null ? <span>{getFechaFormatoSmall(new Date(value))}</span> : ''}
                </span>
                <Button onClick={e => ref.current.toggle(e)} label='Agregar' />
            </div>
        )
    }


    const obtnerUsuariosRol = async () => {
        const decoded = decodeToken(localStorage.getItem('ppfToken'));
        const result = await getUserByRol(decoded.IdRol);
        setUserByRol(result);
        const user = result.find(x => x.idUser === formValues.AssignedTo);
        const visibilidad = formValues.IdRol === null ? 1 : 0;
        // setVisibilidad(visibilidad);
        setValues({
            ...formValues,
            AssignedTo: user,
            visibilidad: visibilidad
        })
    }

    const setRepetir = (e, periodo) => {
        setValues({
            ...formValues,
            Repeat: periodo,
        })
        RepetirOverlay.current.toggle(e)
    }

    useEffect(() => {
        const decoded = decodeToken(localStorage.getItem('ppfToken'));
        if (formValues.visibilidad === 1) {
            setValues({
                ...formValues,
                IdRol: null,
                IdUser: decoded.idUser
            })
        } else if(formValues.visibilidad === 0) {
            setValues({
                ...formValues,
                IdUser: null,
                IdRol: decoded.IdRol,
                AssignedTo: null
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues.visibilidad])



    useEffect(() => {
        obtnerUsuariosRol();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={'ToDo_editor'}  >
            <Toast position="bottom-right" ref={toast} />
            <div className="ToDo_new">
                <div className='ToDo_editor_item'>
                    <div className="ToDo_editor_Input_icon tooltipTarget" onClick={e => changeEstatus(formValues)} >
                        <div className={classNames('ProgressSpinner', { hidden: !loading })}>
                            <ProgressSpinner />
                        </div>
                        <div className={classNames('ProgressSpinner', { hidden: loading })}>
                            {formValues.State === 3578 ? <Icon icon=' pi-check-circle' /> : <Icon icon='pi-plus' />}
                        </div>
                    </div>
                    <div className='ToDo_editor_item_input'>
                        <InputText
                            id='Title'
                            // onKeyPress={e => e.key === 'Enter' ? nuevo() : null}
                            name='Title'
                            onChange={handleInputChange}
                            // onFocus={e => setIcon('fa-solid fa-plus')}
                            placeholder='Nueva tarea.'
                            value={formValues.Title}
                            onFocus={e => setShowOpciones(true)}
                        />
                    </div>
                </div>
                <div className='ToDo_editor_values'>
                    {optionsTemplate(formValues)}
                </div>
                <div className='d-flex ToDo_editor_botones'>
                    <div className={classNames('tooltipTarget rotate', { active: showOpciones })} data-pr-tooltip="Opciones" onClick={e => setShowOpciones(!showOpciones)}>
                        <i className="ri-arrow-left-s-line"></i>
                    </div>
                    <div className='tooltipTarget' data-pr-tooltip="Agregar fecha vencimiento" onClick={e => vencimientoOverlay.current.toggle(e)}>
                        {/* <Icon icon={'fa-regular fa-calendar-days'} /> */}
                        <i className="ri-calendar-2-line"></i>
                    </div>
                    <div className='tooltipTarget' data-pr-tooltip="Agregar Recordatorio" onClick={e => recordatorioOverlay.current.toggle(e)}>
                        {/* <Icon icon={'fa-regular fa-clock'} /> */}
                        <i className="ri-time-line"></i>
                    </div>
                    <div className='tooltipTarget' data-pr-tooltip="Repetir" onClick={e => RepetirOverlay.current.toggle(e)}>
                        {/* <Icon icon={'fa-clock-rotate-left'} /> */}
                        <i className="ri-history-line"></i>
                    </div>
                    <div className='tooltipTarget' data-pr-tooltip={formValues.visibilidad === 1 ? 'Personal' : 'Grupal'} onClick={e => { setValues({ ...formValues, visibilidad: (formValues.visibilidad === 1 ? 0 : 1) }) }}>
                        <div>
                            <Icon icon={'pi ' + (formValues.visibilidad === 1 ? 'pi-user' : 'pi-users')} />
                        </div>
                        {/* <MultiStateCheckbox value={visibilidad} options={options} onChange={(e) => setVisibilidad(e.value)} optionValue="value" /> */}
                    </div>
                </div>
            </div>
            <div className={classNames('ToDo_Opciones', { showOpciones: showOpciones })}>
                {/* <div className="ToDo_editor_Opciones_newStep">
                    <div className="p-inputgroup">
                        <i className="ri-add-line"></i>
                        <span className="p-float-label">
                            <InputText
                                name={'NewSteep'}
                                value={formValues.NewSteep}
                                onChange={handleInputChange}
                                placeholder='Agregar paso'
                                onKeyPress={e => e.key === 'Enter' ? addStep() : null}
                            />
                            {/* <label htmlFor="inputnumber">Agregar paso</label> 
                        </span>
                    </div>
                </div> */}
                {/* <div className='ToDo_editor_Opciones_steps'>
                    {formValues.Steps.length === 0 ? <small style={{ margin: 20 }}>No hay pasos</small> : (
                        <ol>
                            {formValues.Steps.map((step) => {
                                return (
                                    <li className='step'>
                                        <i className="ri-checkbox-blank-circle-line"></i>
                                        <span>{step.step}</span>
                                    </li>
                                )
                            })}
                        </ol>
                    )}
                </div> */}
                <div className={classNames('ToDo_editor_Opciones_botones', { hidden: !botones })}>
                    <Button className='guardar' label='Guardar' icon='pi pi-check' loading={loading} onClick={nuevo} />
                    <Button className='guardar p-button-outlined p-button-secondary' icon='pi pi-trash' label='Borrar' onClick={e => { resetForm(); setShowOpciones(false) }} />
                </div>
                <div className="ToDo_editor_Opciones_assignedTo">
                    <AutoCompleteDropdown
                        value={formValues.AssignedTo}
                        handleInputChange={handleInputChange}
                        Items={userByRol}
                        field='UserName'
                        name='AssignedTo'
                        label='Asignar a'
                        hidden={formValues.visibilidad !== 1}
                    />
                </div>
                <div className={classNames('', { hidden: formValues?.UsuarioCreate === undefined })}>
                    <span>
                        Creado por:  {formValues?.UsuarioCreate}
                    </span>
                </div>
                <div className="ToDo_editor_Opciones_inputDescription">
                    <span className="p-float-label my-3">
                        <InputTextarea id='Description' name='Description' rows={3} value={formValues.Description ?? ''} onChange={handleInputChange} />
                        <label htmlFor="inputnumber">Comentario</label>
                    </span>
                </div>


            </div>

            <OverlayPanel ref={vencimientoOverlay}>
                <Calendar
                    name='Vencimiento'
                    value={formValues.Vencimiento}
                    onChange={handleInputChange}
                    inline
                    footerTemplate={e => footerTemplateCalendar(vencimientoOverlay, formValues.Vencimiento)}
                    showButtonBar
                // showTime
                // hideOnDateTimeSelect
                // stepMinute={10}
                />
            </OverlayPanel>
            <OverlayPanel ref={recordatorioOverlay}>
                <Calendar
                    showButtonBar
                    name='Recordatorio'
                    value={formValues.Recordatorio}
                    onChange={handleInputChange}
                    footerTemplate={() => footerTemplateCalendar(recordatorioOverlay, formValues.Recordatorio)}
                    inline
                />
            </OverlayPanel>
            <OverlayPanel ref={RepetirOverlay}>
                <div className='ToDo_RepeatList' >
                    <div className="ToDo_RepeatList_Item" onClick={e => setRepetir(e, 1)}>
                        <Icon icon='' />
                        <span>Diario</span>
                    </div>
                    <div className="ToDo_RepeatList_Item" onClick={e => setRepetir(e, 2)}>
                        <Icon icon='fa-solid fa-calendar-week' />
                        <span>Semanal</span>
                    </div>
                    <div className="ToDo_RepeatList_Item" onClick={e => setRepetir(e, 3)}>
                        <Icon icon='' />
                        <span>Mensual</span>
                    </div>
                    <div className="ToDo_RepeatList_Item" onClick={e => setRepetir(e, 4)}>
                        <Icon icon='' />
                        <span>Anual</span>
                    </div>
                    <div className="ToDo_RepeatList_Item" onClick={e => setRepetir(e, null)}>
                        <Icon icon='' />
                        <span>No repetir</span>
                    </div>
                </div>
            </OverlayPanel>


        </div>
    )
}

export default ToDoEdit