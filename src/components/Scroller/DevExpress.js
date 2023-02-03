/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import * as PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown';
import {
    Grid,
    VirtualTable,
    TableHeaderRow,
    TableFilterRow,
    TableFixedColumns,
    TableSummaryRow,
    TableBandHeader
} from '@devexpress/dx-react-grid-material-ui';
import {
    FilteringState,
    IntegratedFiltering,
    IntegratedSorting,
    IntegratedSummary,
    SortingState,
    SummaryState,
    DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
    textTemplate, textCenterTemplate, decimalTemplate,
    estadoTemplate, fechaTemplate, fechaLocalStringTemplate, checkBoxTemplate, horaLocalTemplate
} from "../../services/TemplatesServices";
import { Checkbox } from 'primereact/checkbox';
import { ProgressSpinner } from 'primereact/progressspinner';
import { classNames } from 'primereact/utils';



const columWidthXXXsmall = 20;
const columWidthXXsmall = 30;
const columWidthXsmall = 80;
const columWidthSmall = 100;
const columWidthMedium = 150;
const columWidthLarge = 200;
const columWidthXlarge = 250;
const columWidthXXlarge = 300;
const columWidthXXXlarge = 350;
const columWidthXXXXlarge = 450;
const DevExpress = ({ table }) => {


    const getRowId = row => row[table.key] + Math.random();
    const Root = props => <Grid.Root {...props} style={{ height: table?.scrollHeight }} />;

    const [sorting, setSorting] = useState([]);


    const [columns, setColumns] = useState([]);


    const [defaultColumnExtension, setDefaultColumnExtension] = useState([]);
    const [currencyFormatColumns, setCurrencyFormatColumns] = useState([]);
    const [dateFormatColumns, setDateFormatColumns] = useState([]);
    const [HoraFormatColumns, setHoraFormatColumns] = useState([]);

    const [diasFormatColumns, setdiasFormatColumns] = useState([]);
    const [dateTimeFormatColumns, setDateTimeFormatColumns] = useState([]);
    const [estadoFormatColumns, setEstadoFormatColumns] = useState([]);
    const [checkboxFormatColumns, setCheckboxFormatColumns] = useState([]);
    const [templateFormatColumns, setTemplateFormatColumns] = useState([]);
    const [modalFormatColumns, setModalFormatColumns] = useState([]);
    const [longTextFormatColumns, setLongTextFormatColumns] = useState([]);

    const [shortingColumns, setShortingColumns] = useState([]);


    const [totalSummaryItems, setTotalSummaryItems] = useState([]);

    const messages = {
        sum: '',
        count: 'No'
    };

    const [leftColumns, setLeftColumns] = useState([]);
    const [rightColumns, setRightColumns] = useState([]);


    // ******************* PROVIDER FORMATTING ************************
    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={({ value }) => decimalTemplate(value)}
            {...props}
        />
    );
    const LongTextProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value }) => textTemplate(value)}
            {...props}
        />
    }
    const DateProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value }) => fechaLocalStringTemplate(value)}
            {...props}
        />
    }
    const DateTimeProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value }) => fechaTemplate(value)}
            {...props}
        />
    }
    const HoraProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value }) => horaLocalTemplate(new Date(value))}
            {...props}
        />
    }
    const DiasTimeProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value }) => <span className={classNames('text-success text-success text-center col-12 ms-4', { 'text-danger': value > 90 })}>{value}</span>}
            {...props}
        />
    }
    const EstadoProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value, row, column }) => estadoTemplate(value.ID, value.Estado)}
            {...props}
        />
    }
    const ModalProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value, row, column }) => textCenterTemplate(value, e => table?.showModal(value, row))}
            {...props}
        />
    }
    const CheckBoxProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value, row, column }) => checkBoxTemplate(value)}
            {...props}
        />
    }

    const TemplateProvider = props => {
        return <DataTypeProvider
            formatterComponent={({ value, row, column }) => value}
            {...props}
        />
    }

    // ******************* CUSTOM FILTERS  ************************
    const toLowerCase = value => String(value).toLowerCase();

    const [integratedFilteringColumnExtensions] = useState([
        { columnName: 'Estado', predicate: (value, filter) => toLowerCase(value.Estado).startsWith(toLowerCase(filter.value)) },
        { columnName: 'Priority', predicate: (value, filter) => toLowerCase(value.Estado).startsWith(toLowerCase(filter.value)) },
        // { columnName: 'CurrencySymbol', predicate: (value, filter) => toLowerCase(value.Estado).startsWith(toLowerCase(filter.value)) },
    ]);


    const DropDownFilterCell = ({ filter, onFilter, options, className, style }) => (
        <th className={className + ' inputContainer'} style={{ ...style, fontWeight: 'normal' }}>
            <Dropdown
                value={filter ? filter.value : null}
                options={options}
                onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
                showClear
                editable
            />
            {/* <input
            type="number"
            className="form-control text-right"
            value={filter ? filter.value : ''}
            min={1}
            max={4}
            onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
          /> */}
        </th>
    );


    const SelectFilterCell = ({ filter, onFilter, className, style }) => (
        <th className={className + ' TextFilterCell '} style={{ ...style, fontWeight: 'normal' }} >
            <div key={'SelectAll'} onClick={e => table?.selected.length > 0 ? table?.setSelected([]) : table?.setSelected(table?.Data)} className='w-100'>
                <Checkbox className='alingth-center ' checked={table?.selected.length === table?.Data.length && table?.selected.length > 0} ></Checkbox>
            </div>
        </th>
    )

    const FilterIcon = ({ type }) => {
        if (type === 'month') {
            return (
                <span
                    className="d-block oi oi-calendar"
                />
            );
        }
        return <TableFilterRow.Icon type={type} />;
    };

    const FilterCell = (props) => {
        const { column } = props;
        if (column.name === 'Estado') {
            return <DropDownFilterCell {...props} options={table?.Estados}
            />;
        }
        if (column.name === 'Priority') {
            return <DropDownFilterCell {...props} options={table?.Prioridades}
            />;
        }
        if (column.name === 'EstadoPR') {
            return <DropDownFilterCell {...props} options={table?.EstadosGeneral}
            />;
        }
        if (column.name === 'Select') {
            return <SelectFilterCell {...props} options={table?.EstadosGeneral}
            />;
        }
        if (column.name === 'CurrencySymbol') {
            return <DropDownFilterCell {...props} options={['$', 'L', '€']} />
        }
        // return <TextFilterCell {...props} />;
        return <TableFilterRow.Cell {...props} />;
    };
    FilterCell.propTypes = {
        column: PropTypes.shape({ name: PropTypes.string }).isRequired,
    };

    // ******************* CHANGE SELECTION ************************
    const changeSelection = (selected, setSelected, value) => {
        if (selected.includes(value)) {
            setSelected(selected.filter(s => s !== value))
        } else {
            setSelected([...selected, value])
        }
    }



    // ******************* USE EFFECT DATA ************************
    useEffect(() => {
        if (table?.Columns.length > 0) {
            let columnsTempo = [];
            let columnsExtension = [];
            let columnsSumary = [];
            let columnsFormatCurrency = [];
            let columnsFormatDias = [];
            let columnsFormatDate = [];
            let columnsFormatHora = [];
            let columnsFormatDateTime = [];
            let columnsFormatLongText = [];
            let columnsFormatEstado = [];
            let columnsFormatModal = [];
            let columnsFormatCheckbox = [];
            let columnsShorting = [];
            let columnsTemplate = [];
            if (table?.selected && table?.setSelected) {
                const columnName = 'Select';
                columnsTempo.push({
                    name: columnName,
                    title: '',
                    getCellValue: (rowData, columnName) => (<div key={rowData[table?.key]} onClick={e => changeSelection(table?.selected, table?.setSelected, rowData)} className='w-100'>
                        {/* {(rowData[table?.key])} */}
                        <Checkbox className='alingth-center' checked={table?.selected.includes(rowData)} ></Checkbox>
                    </div>)
                });
                columnsExtension.push({ columnName: columnName, width: columWidthXsmall, align: 'center' });
                columnsShorting.push({ columnName: columnName, sortingEnabled: true });
                setLeftColumns([...leftColumns, columnName])
                // columnsSumary.push({ columnName: columnName, type: 'count' })
            }


            table?.Columns.forEach((column) => {
                if (column?.hidden === undefined ? true : column.hidden) {
                    let width = undefined;
                    if (column?.className) {
                        switch (true) {
                            case column.className.includes('colum-width-XXXsmall'):
                                width = columWidthXXXsmall;
                                break;
                            case column.className.includes('colum-width-XXsmall'):
                                width = columWidthXXsmall;
                                break;
                            case column.className.includes('colum-width-Xsmall'):
                                width = columWidthXsmall;
                                break;
                            case column.className.includes('colum-width-small'):
                                width = columWidthSmall;
                                break;
                            case column.className.includes('colum-width-medium'):
                                width = columWidthMedium;
                                break;
                            case column.className.includes('colum-width-large'):
                                width = columWidthLarge;
                                break;
                            case column.className.includes('colum-width-Xlarge'):
                                width = columWidthXlarge;
                                break;
                            case column.className.includes('colum-width-XXlarge'):
                                width = columWidthXXlarge;
                                break;
                            case column.className.includes('colum-width-XXXlarge'):
                                width = columWidthXXXlarge;
                                break;
                            case column.className.includes('colum-width-XXXXlarge'):
                                width = columWidthXXXXlarge;
                                break;
                            default:
                                width = undefined;
                                break;
                        }
                    }

                    if (column.Sumary) {
                        columnsSumary.push({ columnName: column.field, type: column.Sumary })
                    }

                    switch (column?.Format) {
                        case 'Currency':
                            columnsFormatCurrency.push(column.field);
                            break;
                        case 'Decimal':
                            columnsFormatCurrency.push(column.field);
                            break;
                        case 'Estado':
                            columnsFormatEstado.push(column.field);
                            break;
                        case 'Dias':
                            columnsFormatDias.push(column.field);
                            break;
                        case 'Date':
                            columnsFormatDate.push(column.field);
                            break;
                        case 'Hora':
                            columnsFormatHora.push(column.field);
                            break;
                        case 'DateTime':
                            columnsFormatDateTime.push(column.field);
                            break;
                        case 'Modal':
                            columnsFormatModal.push(column.field);
                            break;
                        case 'Checkbox':
                            columnsFormatCheckbox.push(column.field);
                            break;
                        case 'Template':
                            columnsTemplate.push(column.field);
                            break;

                        default:
                            columnsFormatLongText.push(column.field);
                            break;
                    }
                    columnsTempo.push({
                        name: column.field,
                        title: column.header,
                        getCellValue: (row, columnName) => column?.body(row)
                    });
                    columnsExtension.push({ columnName: column.field, width: width, align: column?.align ? column.align : (column?.Format === 'Currency' || column?.Format === 'Decimal' ? 'right' : 'left') });
                    columnsShorting.push({ columnName: column.field, sortingEnabled: true })
                }
            });
            setCurrencyFormatColumns(columnsFormatCurrency);
            setEstadoFormatColumns(columnsFormatEstado);
            setDateFormatColumns(columnsFormatDate);
            setHoraFormatColumns(columnsFormatHora);
            setdiasFormatColumns(columnsFormatDias);
            setDateTimeFormatColumns(columnsFormatDateTime);
            setLongTextFormatColumns(columnsFormatLongText);
            setModalFormatColumns(columnsFormatModal);
            setCheckboxFormatColumns(columnsFormatCheckbox);
            setTemplateFormatColumns(columnsTemplate);
            setColumns(columnsTempo);
            setDefaultColumnExtension(columnsExtension);
            setTotalSummaryItems(columnsSumary);
            setShortingColumns(columnsShorting);
            // console.log(getTotalSummaryValues())
        }
    }, [table?.Columns]);


    // *******************USE EFFECT INIT TABLE ************************
    useEffect(() => {
        // console.log(table);
        // console.log(table?.Data);
        if (table?.Columns.length > 0) {
            const leftColumnsTempo = table?.Columns.filter(column => column.frozen === "frozen" && column.alignFrozen === 'left');
            const rightColumnsTempo = table?.Columns.filter(column => column.frozen === "frozen" && column?.alignFrozen !== 'left');
            setLeftColumns([...(leftColumnsTempo.map(column => column.field)), 'Select']);
            setRightColumns(rightColumnsTempo.map(column => column.field));
        }
        // console.log(leftColumns, rightColumns);
    }, [table])





    if (table !== undefined) {
        return (
            <div className={"tableDevExpressContainer "  + table?.className} style={{ height: table?.scrollHeight, maxHeight: table?.scrollHeight, overflow: 'hiden' }}>
                <div className={classNames('progressSpinner-container ', { showSpinner: table?.loading })} style={{ height: table?.scrollHeight, width: document.querySelector('.tableDevExpressContainer')?.offsetWidth }}>
                    <ProgressSpinner />
                </div>
                <div id='divSelect'></div>
                <Paper>
                    <Grid
                        rows={table.Data}
                        columns={columns}
                        // rows={rows}
                        // columns={columns1} 
                        getRowId={getRowId}
                        rootComponent={Root}
                    >
                        <FilteringState
                        // filters={filters}
                        // onFiltersChange={setFilters}
                        />

                        <SortingState
                            sorting={sorting}
                            columnSortingEnabled={true}
                            onSortingChange={setSorting}
                            defaultSorting={[]}
                            columnExtensions={shortingColumns}
                        />
                        <IntegratedFiltering
                            columnExtensions={integratedFilteringColumnExtensions}
                        />
                        <IntegratedSorting />
                        {/* <IntegratedSelection /> */}

                        <CurrencyTypeProvider
                            for={currencyFormatColumns}
                            availableFilterOperations={['equal', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual']}
                        />
                        <LongTextProvider
                            for={longTextFormatColumns}
                        />
                        <DiasTimeProvider
                            for={diasFormatColumns}
                            availableFilterOperations={['equal', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual']}
                        />
                        <DateProvider
                            for={dateFormatColumns}
                        />
                        <HoraProvider
                            for={HoraFormatColumns}
                        />
                        <DateTimeProvider
                            for={dateTimeFormatColumns}
                        />
                        <EstadoProvider
                            for={estadoFormatColumns}
                        />
                        <ModalProvider
                            for={modalFormatColumns}
                        />
                        <CheckBoxProvider
                            for={checkboxFormatColumns}
                        />
                        <TemplateProvider
                            for={templateFormatColumns}
                        />
                        <SummaryState totalItems={totalSummaryItems} />
                        <IntegratedSummary />

                        
                        <VirtualTable
                            height={table?.scrollHeight ? table?.scrollHeight : '65vh'}
                            columnExtensions={defaultColumnExtension}
                        />
                        {/* <TableColumnResizing /> */}

                        <TableHeaderRow showSortingControls />
                        {/* <Toolbar />
                        <ExportPanel startExport={startExport} /> */}

                        <TableBandHeader
                            columnBands={table.columnBands ? table.columnBands : []}
                        />


                        {table?.filter !== false && <TableFilterRow
                            iconComponent={FilterIcon}
                            showFilterSelector
                            cellComponent={FilterCell}
                        />}

                        <TableSummaryRow
                            messages={messages}
                        />

                        <TableFixedColumns
                            leftColumns={leftColumns}
                            rightColumns={rightColumns}
                        />
                    </Grid>
                    {/* <GridExporter
                        ref={exporterRef}
                        rows={table.Data}
                        columns={columns}
                        onSave={onSave}
                    /> */}
                </Paper>
                {/* <ChipsFilterTable setFilter={e => setFilters([])} filter={filters} /> */}
            </div>
        );
    } else {
        return null;
    }
};

export default DevExpress;