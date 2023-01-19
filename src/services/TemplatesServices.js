import React from 'react';
import { getDateTimeString, getLocalDateTimeString, getLocalDateString,getTime, getHora } from './FechasService';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import {Tag} from "primereact/tag";
// import { Button } from 'primereact/button';

// TEMPLATE TEXT
export const textTemplate = (text, onDoubleClick = null) => {
    return (
        <div className='tooltipContent'>
            {/* <Tooltip className='toltipClass' target=".text-overFlow" mouseTrack mouseTrackLeft={10} tooltipOptions={{position: 'right'}} /> */}
            {/* <InputText types="text" placeholder="Right" tooltip={text} tooltipOptions={{position: 'right'}}/> */}
            <span className='text-overFlow' onDoubleClick={onDoubleClick} data-toggle="tooltip" data-placement="top" title={text} >{ text }</span>
            {/* <span className="tooltiptext">{text}</span> */}
        </div>
    )
}
// TEMPLATE TEXT CENTER
export const textCenterTemplate = (text, onDoubleClick = null) => {
    return <span className='text-overFlow text-alingth-center d-flex' style={{ height: '100%', alignItems: 'center', justifyContent: 'center'}} onDoubleClick={onDoubleClick}>{text}</span>;
}

// FECHA TEMPLATE
export const fechaTemplate = (date) => {
    if (date != null) {
        return <span >{getDateTimeString(new Date(date)).toLocaleString('en-US', { timeZone: "Antarctica/Vostok" })}</span>
    } else {
        return '';
    }
}
export const fechaRealTemplate = (date) => {
    if (date != null) {
        return <span >{getLocalDateTimeString(new Date(date))}</span>
    } else {
        return '';
    }
}
// FECHA TEMPLATE
export const fechaLocalStringTemplate = (date) => {
    if (date != null) {
        return <span >{getLocalDateString(new Date(date))}</span>
    } else {
        return '';
    }
}
// FECHA TEMPLATE
export const fechaLocalTemplate = (date) => {
    if (date != null) {
        return <span >{getLocalDateTimeString(new Date(date))}</span>
    } else {
        return '';
    }
}

// HORA TEMPLATE
export const horaTemplate = (date) => {
    if (date != null) {
        return <span >{getTime(new Date(date))}</span>
    } else {
        return '';
    }
}

// HORA Local TEMPLATE
export const horaLocalTemplate = (date) => {
    if (date != null) {
        return <span >{getHora(new Date(date))}</span>
    } else {
        return '';
    }
}


// DECIMAL
export const decimalTemplate = (decimal, currencySimbol, fixed) => {
    if (decimal !== null && typeof decimal === 'number') {
        // console.log('*************************')
        let t = decimal.toFixed(5).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        for (let i = t.length; i > 0; i--) {
            if(t[i - 1] !== '.'){
                if(t[i - 1] === '0' || t[i - 1] === ','){
                    if(t[i - 1] === ','){
                    }
                    t = t.slice(0,i-1)
                }else{
                    break;
                }
            }else{
                break;
            }
        }

        // console.log(t[t.length - 1] === '.');
        if(t[t.length - 1] === '.'){
            t = t + '00'
        }
        return <span className='text-alingth-right  w-100'>{ (currencySimbol? currencySimbol: '') + (decimal != null ? t  : '0.00')}</span>;
    }
    else {
        return <span className='text-alingth-right w-100'>{'0.00'}</span>;
    }
}
// DECIMAL
export const decimalValueTemplate = (decimal) => {
    if (decimal !== null && typeof decimal === 'number') {
        return decimal !== 0 ? decimal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00';
    }
    else {
        return '0.00';
    }
}
// DECIMAL
export const decimalValueClearTemplate = (decimal) => {
    if (decimal !== null && typeof decimal === 'number') {
        return decimal !== 0 ? decimal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ' ';
    }
    else {
        return ' ';
    }
}


// ESTADO PURCHASE REQUEST
export const estadoTemplate = (IdEstado, EstadoPD) => {
    return <span className={`purchase-badge status-${IdEstado}`}>{EstadoPD}</span>;
}


// CHECKBOX TEMPLATE
export const checkBoxTemplate = (value, disabled = true, onChane = undefined, rowData = undefined) => {
    return (
        <div onDoubleClick={e => !disabled  ? ()=>{} :   onChane(e, rowData)  } disabled={disabled} className='w-100 divFullCenter'>
            {!disabled || value === undefined + ''}
            <Checkbox className='alingth-center' checked={value} disabled={!disabled  }></Checkbox>
        </div>)
}
// Dropdown TEMPLATE
export const dropdownTemplate = (dropOptions, options, onChange, params = {}, placeholder = '') => {
    return <Dropdown value={dropOptions.value} options={options} onChange={e => onChange(e, params)} itemTemplate={ItemTemplate} placeholder={placeholder} className="p-column-filter" showClear />;
}

// ********************************************
//              EDITOR TEMPLATES
// ********************************************
// INPUT NUMBER
export const inputNumberTemplate = (value, onChange, params, placeholder = '') => {
    // console.log(value)
    return <InputNumber mode="decimal" locale="en-US" minFractionDigits={2} maxFractionDigits={2}  value={value} onChange={e => onChange(e, params)} placeholder={placeholder} className="p-column-filter" showClear />;
}

// ITEM FILTER TEMPLATE PARA LOS DROPDOWN
export const ItemTemplate = (option) => {
    console.log(`njbhvh`);
    return <span value={option}>{option}</span>;
}
// ********************************************
//              FILTERS TEMPLATES
// ********************************************



// DROPDOWN
export const dropdownFilterTemplate = (dropOptions, options, placeholder = '') => {
    return <Dropdown value={dropOptions.value} options={options} onChange={e => dropOptions.filterApplyCallback(e.value)} itemTemplate={ItemTemplate} placeholder={placeholder} className="p-column-filter" showClear />;
}
// INPUT NUMBER
export const inputNumberFilterTemplate = (dropOptions, placeholder = '') => {
    return <InputText keyfilter='pnum' value={dropOptions.value} onChange={e => dropOptions.filterApplyCallback(e.target.value)} placeholder={placeholder} className="p-column-filter" showClear />;
}

// CON PRECIO
export const checkFilterTemplate = (data, values, opt) => {
    return <Dropdown value={data.value === undefined || data.value === null ? undefined : data.value === true ? opt[0] : opt[1]} options={values} onChange={(e) => data.filterApplyCallback(e.value)} itemTemplate={options => currencyItemTemplate(options, opt)} className="p-column-filter" showClear />;
}

const currencyItemTemplate = (option, opt) => {
    return <span >{option ? opt[0] : opt[1]}</span>;
}
// DATE FILTER 
export const dateFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yy" mask="99/99/9999" />
}

export const multiSelectTemplate = (dropOptions, options) =>{
  return  <MultiSelect value={dropOptions.value} options={options} onChange={(e) => dropOptions.filterApplyCallback(e.value)} filterBy='StatusName' className="p-column-filter" maxSelectedLabels={1} showClear />
}


export const statusBodyTemplate = (rowData) => {
    console.log(`njhbhv`,rowData)
    if(rowData.StatusName === "Active"){
        return <Tag style ={{width: 60}} severity = "success" className={`product-badge status-${rowData.StatusName.toLowerCase()}`}>{rowData.StatusName}</Tag>;
    }
    else{
        return <Tag style ={{width: 60}} severity = "danger" className={`product-badge status-${rowData.StatusName.toLowerCase()}`}>{rowData.StatusName}</Tag>;
    }
   
}