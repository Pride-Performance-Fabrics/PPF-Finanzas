import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';



const AutoCompleteDropdown = ({ 
    habilitar = false, 
    value, 
    handleInputChange = () => {},
    onValueChange = () => {}, 
    Items, 
    field, 
    name, 
    tabIndex, 
    label, 
    itemTemplate, 
    hidden = false, 
    placeholder = null,
    className = null,
    labelStyle = {}
 }) => {

    const [filteredItems, setFilteredItems] = useState(null);

    const completeMethod = (event, items, val) => {
        let query = event.query;
        let _filteredItems = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item[val].toLowerCase().indexOf(query.toLowerCase()) === 0) {
                _filteredItems.push(item);
            }
        }

        setFilteredItems(_filteredItems);
    }

    const onBlur = (e) => {

        if(typeof value === 'string'){
            handleInputChange({ target: { name: name, value: null } });
            onValueChange({ value: null });
        }

    }

    const selectItem = (item, e) => {

        handleInputChange({ target: { name: name, value: item.value } });
        onValueChange({ value: item.value });
    }

    return (
        <div className={classNames('AutoCompleteContainer animate__animated animate__fadeIn' + name, {hidden: hidden})} >
            <span className='encabezado__contenido p-float-label AutoCompleteDropdown'>
                <AutoComplete id={name} disabled={habilitar}  name={name}
                    value={value} tabIndex={tabIndex}
                    suggestions={filteredItems} completeMethod={e => completeMethod(e, Items, field)}
                    field={field} dropdown itemTemplate={itemTemplate ?? (e => e[field])}
                    selectedItemTemplate={e => e[field]}
                    tooltip={value?.field ?? null} tooltipOptions={{ position: 'top' }}
                    onChange={(e) => {handleInputChange(e); onValueChange(e)}} aria-label={field} 
                    className={classNames('autocompleteInput', className)} 
                    onSelect={selectItem} autoHighlight onBlur={e => onBlur()}
                    placeholder={placeholder} 
                    
                    />
                <label style={labelStyle}>{label ?? name}</label>
            </span>
        </div >
    )
}

export default AutoCompleteDropdown