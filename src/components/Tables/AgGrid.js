import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-alpine.css";



import { checkBoxTemplate, estadoTemplate, textCenterTemplate } from '../../services/TemplatesServices';
import { getLocalDateTimeString, getLocalDateString1 } from '../../services/FechasService';
import { decimalValueTemplate } from '../../services/TemplatesServices';
import { classNames } from 'primereact/utils';
import Loader from '../Loader/Loader';
import Icon from '../icon/Icon';
import IconApp from '../icon/IconApp';
import { formatCodigoProveedor } from '../../services/Format';
import { Button } from 'primereact/button';

class DatePicker {
    // gets called once before the renderer is used

    value = ''
    init(params) {
        // create the cell
        this.eInput = document.createElement('input');
        this.eInput.value = params.value;
        this.eInput.classList.add('ag-input');
        this.eInput.style.height = '100%';
        this.eInput.type = 'date'
        this.value = params.value;


        // https://jqueryui.com/datepicker/
        //   $(this.eInput).datepicker({
        //     dateFormat: 'dd/mm/yy',
        //     onSelect: () => {
        //       this.eInput.focus();
        //     },
        //   });
    }

    // gets called once when grid ready to insert the element
    getGui() {
        return this.eInput;
    }

    // focus and select can be done after the gui is attached
    afterGuiAttached() {
        this.eInput.focus();
        this.eInput.select();
    }

    // returns the new value after editing
    getValue() {
        return this.eInput.value === '' ? this.value : (this.eInput.value + ' 00:00:01');
    }

    // any cleanup we need to be done here
    destroy() {
        // but this example is simple, no cleanup, we could
        // even leave this method out as it's optional
    }

    // if true, then this editor will appear in a popup
    isPopup() {
        // and we could leave this method out also, false is the default
        return false;
    }
}
class NumberPicker {
    // gets called once before the renderer is used

    value = ''
    init(params) {
        // create the cell
        this.eInput = document.createElement('input');
        this.eInput.value = params.value;
        this.eInput.classList.add('ag-input');
        this.eInput.style.height = '100%';
        this.eInput.type = 'number'
        this.value = params.value;


        // https://jqueryui.com/datepicker/
        //   $(this.eInput).datepicker({
        //     dateFormat: 'dd/mm/yy',
        //     onSelect: () => {
        //       this.eInput.focus();
        //     },
        //   });
    }

    // gets called once when grid ready to insert the element
    getGui() {
        return this.eInput;
    }

    // focus and select can be done after the gui is attached
    afterGuiAttached() {
        this.eInput.focus();
        this.eInput.select();
    }

    // returns the new value after editing
    getValue() {
        console.log(this.eInput.value)
        return parseFloat(this.eInput.value)
    }

    // any cleanup we need to be done here
    destroy() {
        // but this example is simple, no cleanup, we could
        // even leave this method out as it's optional
    }

    // if true, then this editor will appear in a popup
    isPopup() {
        // and we could leave this method out also, false is the default
        return false;
    }
}


function AgGrid({ table }) {


    const tableRef = useRef(null);


    const [columns, setColumns] = useState([]);
    const [pinnedBottomRowData, setPinnedBottomRowData] = useState([{ Price: 15 }]);
    const [colTotales, setColTotales] = useState([]);

    const columnTypes = useMemo(() => {
        return {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
            nonEditableColumn: { editable: false },
            dateColumn: {
                // specify we want to use the date filter
                filter: 'agDateColumnFilter',
                // add extra parameters for the date filter
                filterParams: {
                    // provide comparator function
                    comparator: (filterLocalDateAtMidnight, cellValue) => {
                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date



                        const dateParts = cellValue.slice(0, -9).split('-');
                        const day = Number(dateParts[2]);
                        const month = Number(dateParts[1]) - 1;
                        const year = Number(dateParts[0]);
                        const cellDate = new Date(year, month, day);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    },
                },
            },
            IdCustomer: {
                filter: 'agTextColumnFilter',
                cellRenderer: (data) => <div className='divFullCenter'>{formatCodigoProveedor(data.value)}</div>,
                filterParams: {
                    textMatcher: ({ filterOption, value, filterText }) => {
                        const valueLowerCase = formatCodigoProveedor(value).toLowerCase();
                        const filterTextLowerCase = filterText.toLowerCase();
                        switch (filterOption) {
                            case 'contains':
                                return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
                            case 'notContains':
                                return valueLowerCase.indexOf(filterTextLowerCase) === -1;
                            case 'equals':
                                return valueLowerCase === filterTextLowerCase;
                            case 'notEqual':
                                return valueLowerCase !== filterTextLowerCase;
                            case 'startsWith':
                                return valueLowerCase.indexOf(filterTextLowerCase) === 0;
                            case 'endsWith':
                                var index = valueLowerCase.lastIndexOf(filterTextLowerCase);
                                return index >= 0 && index === (valueLowerCase.length - filterTextLowerCase.length);
                            default:
                                // should never happen
                                console.warn('invalid filter type ' + filterOption);
                                return false;
                        }
                    }
                },
            },
        };
    }, []);


    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            resizable: true,
            floatingFilter: true,
        };
    }, []);


    const onBtStartEditing = useCallback(
        (key, char, pinned) => {
            console.log(table.Columns)
            tableRef.current.api.setFocusedCell(0, table.Columns[0].field, pinned);
            tableRef.current.api.startEditingCell({
                rowIndex: 0,
                colKey: table.Columns[0].field,
                // set to 'top', 'bottom' or undefined
                rowPinned: pinned,
                key: key,
                charPress: char,
            });
        },
        []
    );


    const setType = (col) => {
        switch (col?.Format) {
            case 'Currency':
                return 'rightAligned';

            case "Decimal":
                return 'rightAligned';

            case "DateTime":
                return ['dateColumn', 'rightAligned'];
            case "IdCustomer":
                return ['IdCustomer', 'rightAligned'];
            default:
                return;
        }
    }

    const setCheckbox = (data, col) => {
        return (<div className='divFullCenter'>
            {checkBoxTemplate(data.value)}
        </div>)
    }

    const setEstado = (item, col) => {
        const estado = col.body(item.data)
        return estadoTemplate(estado.ID, estado.Estado);
    }

    const setModal = (item, col) => {
        return (<div style={{ fontSize: '0.9rem', lineHeight: '1rem', paddingTop: 5, fontWeight: '600' }} onDoubleClick={() => table?.showModal(item.value)}>
            {textCenterTemplate(item.value)}
        </div>)
    }

    const setIcon = (item, col) => {
        return (<div className='divFullCenter'>
            <Icon icon={item.value ? item.value : ''} />
        </div>)
    }

    const setIconApp = (item, col) => {
        return (<div className='divFullCenter'>
            <IconApp icon={item.value ? item.value : ''} />
        </div>)
    }

    const valueFormatter = (col) => {
        if (col?.Format) {
            switch (col.Format) {

                case 'Modal':
                    return { cellRenderer: setModal, };

                case 'Checkbox':
                    return { cellRenderer: setCheckbox };

                case 'Estado':
                    return { cellRenderer: (data) => setEstado(data, col) };

                case 'Dias':
                    return { cellRenderer: (data) => <span className={classNames('text-success text-success text-center col-12 ms-4', { 'text-danger': data.value > 90 })}>{data.value}</span> };

                case 'DateTime':
                    return { valueFormatter: (params) => params.value ? getLocalDateTimeString(new Date(params.value)).toLocaleString('en-US') : "", type: setType(col) };

                case 'Date':
                    return { valueFormatter: (params) => params.value ? getLocalDateString1(new Date(params.value)).toLocaleString('en-US') : "", type: setType(col) };

                case 'Currency':
                    return { valueFormatter: (params) => params.value ? decimalValueTemplate(params.value) : '0.00', type: setType(col) };

                case 'Decimal':
                    return { valueFormatter: (params) => params.value ? decimalValueTemplate(params.value) : '0.00', type: setType(col) };
                case 'Center':
                    return { cellRenderer: (data) => textCenterTemplate(data.value), type: setType(col) };

                case 'Template':
                    return { cellRenderer: (data) => col.body(data.data), filter: col?.filter ? "agTextColumnFilter"  : false  };
                    
                case 'Icon':
                    return { cellRenderer: setIcon };

                case 'IconApp':
                    return { cellRenderer: setIconApp, };

                default:
                    return { type: setType(col) };

            }
        } else {

            return {};
        }
    };



    const setCellEditor = (col) => {
        if (col?.cellEditor) {
            return {
                editable: col?.editable, cellEditorSelector: (params) => {
                    return {
                        component: col.cellEditor,
                    }

                }
            }
        }
        switch (col?.Format) {
            case 'Currency':
                return { editable: col?.editable, cellEditor: NumberPicker };

            case "Decimal":
                return { editable: col?.editable, cellEditor: NumberPicker };

            case "DateTime":
                return { editable: col?.editable, cellEditor: 'datePicker', cellEditorPopup: true, };
            case "Date":
                return { editable: col?.editable, cellEditor: DatePicker };
            case "EditList":
                console.log(col?.cellEditorParams)
                return {
                    editable: col?.editable,
                    cellEditor: 'agRichSelectCellEditor',
                    cellEditorPopup: true,
                    cellEditorParams: {
                        cellHeight: 50,
                        values: ['Ireland', 'USA'],
                    },
                }
            default:
                return { editable: col?.editable };
        }
    }

    const setWidthColumn = (col) => {
        let width = null;
        const XXXsmall = 25;
        const XXsmall = 35;
        const Xsmall = 85;
        const small = 125;
        const medium = 155;
        const large = 205;
        const Xlarge = 255;
        const XXlarge = 305;
        const XXXlarge = 355;
        const XXXXlarge = 405;

        switch (true) {
            case col?.className?.includes('XXXsmall'):
                width = XXXsmall;
                break;
            case col?.className?.includes('XXsmall'):
                width = XXsmall;
                break;
            case col?.className?.includes('Xsmall'):
                width = Xsmall;
                break;
            case col?.className?.includes('small'):
                width = small;
                break;
            case col?.className?.includes('medium'):
                width = medium;
                break;
            case col?.className?.includes('XXXXlarge'):
                width = XXXXlarge;
                break;
            case col?.className?.includes('XXXlarge'):
                width = XXXlarge;
                break;
            case col?.className?.includes('XXlarge'):
                width = XXlarge;
                break;
            case col?.className?.includes('Xlarge'):
                width = Xlarge;
                break;
            case col?.className?.includes('large'):
                width = large;
                break;
            default:
                break;
        }
        if (col.Format === 'DateTime') {
            // width = 200;
        }
        return width;
    }


    const setSumary = () => {
        let sumary = ``;
        colTotales.forEach((col) => {
            if (col.Sumary === 'sum') {
                let sum = 0;
                tableRef.current.api.forEachNodeAfterFilter((w) => {
                    // console.log([col.field] ,w.data[col.field]);
                    sum += w.data[col.field] ? w.data[col.field] : 0;
                    // sum += w.data[col.field];
                })
                sumary += `"${col.field}": ${sum},`;
            }
            if (col.Sumary === 'count') {
                sumary += ` "${col.field}": ${tableRef.current.api.getDisplayedRowCount()},`;
            }
        });
        const sumaryJson = JSON.parse('{' + sumary.slice(0, -1) + '}');
        if (sumaryJson) {
            setPinnedBottomRowData([sumaryJson]);
        }
    }


    const setColumn = (col) => {

        if (col?.children) {

            // console.log(col.children)

            const children = col.children.map((child) => setColumn(child));

            return {
                headerName: col?.headerName ?? '',
                children: children,
                header: col?.Header,
            }

        } else {

            const width = setWidthColumn(col);

            const Format = valueFormatter(col);

            const cellEditor = setCellEditor(col);



            return {
                headerName: col.header,
                headerTooltip: col.header,
                field: col.field,
                headerClass: col.className,
                // type: setType(col),
                width: width,
                hide: col.hidden !== undefined ? !col.hidden : false,
                filter: 'agTextColumnFilter',
                filterParams: {
                    buttons: ['reset'],
                    // debounceMs: 200
                },
                pinned: col?.alignFrozen ? col.alignFrozen : (col?.frozen ? 'left' : ''),
                ...Format,
                ...cellEditor,
                // checkboxSelection: (data) => setCheckbox(data, col) ? true : undefined,
            }
        }
    }

    // HOOKS de efecto que retorna la funcion getUsuarios
    useEffect(() => {
        if (table?.Columns.length > 0) {
            let cols = [];
            if (table?.selected && table?.setSelected) {
                cols.push({
                    field: '',
                    checkboxSelection: true,
                    headerCheckboxSelection: true,
                    headerCheckboxSelectionFilteredOnly: true,
                    suppressSizeToFit: true,
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressFilter: true,
                    pinned: 'left',
                    cellStyle: { 'textAlign': 'center' },
                    width: 50,
                    headerName: '',
                    headerComponentParams: {
                        template:
                            `<div class="ag-cell-label-container" role="presentation">
                                <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
                                <div ref="eLabel" class="ag-header-cell-label" role="presentation">
                                    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>
                                    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>
                                    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>
                                    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>
                                    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: nowrap;"></span>
                                    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>   
                                </div>
                            </div>`,
                    },
                })
            }

            const totales = [];

            table.Columns.forEach((col) => {

                if (col?.Sumary) {
                    totales.push({ field: col.field, Sumary: col.Sumary });
                }
                cols.push(setColumn(col));

            });

            setColTotales(totales);
            setColumns(cols);
        }
    }, [table]);

    const addRow = () => {
        table?.funcionAddRow()
        //    onBtStartEditing(undefined, undefined, 'bottom')
    }


    const EdidMenu = () => {
        if (table?.showEditMenuDefauld) {
            return <div className='d-flex m-1'>
                <span style={{ fontSize: 24, margin: '6px 2px' }}>
                    <Button icon='pi pi-plus' className='p-button-info' onClick={addRow} >
                        {/* <Icon icon='ri-add-line'/> */}
                    </Button>
                </span>
                <span style={{ fontSize: 24, margin: '6px 2px' }}>
                    <Button icon='pi pi-save' className='p-button-success' >
                        {/* <Icon icon='ri-add-line'/> */}
                    </Button>
                </span>
                <span style={{ fontSize: 24, margin: '6px 2px' }}>
                    <Button icon='pi pi-pencil' className='p-button-info' >
                        {/* <Icon icon='ri-add-line'/> */}
                    </Button>
                </span>
                <span style={{ fontSize: 24, margin: '6px 2px' }}>
                    <Button icon='pi pi-times' className='p-button-danger' >
                        {/* <Icon icon='ri-add-line'/> */}
                    </Button>
                </span>

            </div>
        }
        else {
            return <div className='d-flex m-1'>
                {table.showEditMenuCustom}
                {table.showEditMenuCSV &&<span className='mx-2' style={{ fontSize: 24, margin: '8px 0px' }}>
                    <Button icon={'pi pi-file-excel'} className='p-button-success' onClick={onBtnExport} >
                        {/* <Icon icon='ri-add-line'/> */}
                    </Button>
                </span>}
            </div>
        }
    }

    const onCellEditRequest = event => {
        console.log('Cell Editing updated a cell, but the grid did nothing!', event);
        // the application should update the data somehow
    };

    const onBtnExport = useCallback(() => {
        tableRef?.current?.api.exportDataAsCsv();
    }, []);



    return (
        <div id={'AgGridReact' + table?.key} className="ag-theme-balham " style={{ height: '100%', fontSize: 10 }}>
            <Loader loading={table?.loading} querySelector={'#AgGridReact' + table?.key} />
            {table?.showEditMenu && <EdidMenu />}
            <div style={{ height: table?.showEditMenu ? 'calc(100% - 40px)' : '100%'}}>
            <AgGridReact
                ref={tableRef}
                rowData={table.Data}
                columnDefs={columns}
                defaultColDef={defaultColDef}
                rowSelection={'multiple'}
                columnTypes={columnTypes}
                suppressRowClickSelection={true}
                pinnedBottomRowData={pinnedBottomRowData}
                onSelectionChanged={(e) => { table?.setSelected(e.api.getSelectedNodes().map((node) => node.data)) }}
                // onFilterChanged={(e) => { e.api.forEachNodeAfterFilter((w) => console.log(w)) }}
                onFilterChanged={setSumary}
                onGridReady={setSumary}
                onModelUpdated={setSumary}
                isRowSelectable={() => true}
                suppressMenuHide={true}
                editType={'fullRow'}
                onRowEditingStopped={console.log}
                // readOnlyEdit={true}
                onCellEditRequest={onCellEditRequest}
            >
            </AgGridReact>
            </div>
        </div>
    )
}

export default AgGrid;