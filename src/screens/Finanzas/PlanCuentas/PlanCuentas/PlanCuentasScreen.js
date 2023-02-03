import React from "react";
import { useState, useEffect, useRef } from "react";

import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

//************** Componentes generales **************/
import Card from "../../../../components/Card/Card";
import Icon from "../../../../components/icon/Icon";
import Loader from "../../../../components/Loader/Loader";
import IconApp from "../../../../components/icon/IconApp";
import AgGrid from "../../../../components/Tables/AgGrid";

//************** Funciones  **************/
import { getCuentas } from "../../../../Api/Finanzas/PlanCuentasRequest";
import ModalAgregarCuenta from "../ModalPlanCuentas/ModalAgregarCuenta";
import ModalEditarCuenta from "../ModalPlanCuentas/ModalEditarCuenta";
import { setNestedObjectValues } from "formik";
import { toastShow } from '../../../../services/ToastService';

import { Toast } from 'primereact/toast';
import { putEstadosCuenta } from "../../../../Api/Global/StatusRequest";

const PlanCuentasScreen = () => {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const toast = useRef(null);
    const [data, setData] = useState([]);

    // const abrirModal = (rowData) => {

    //     return <ModalAgregarCuenta datos={rowData} />
    // }

    const onChangeCheck = async (id, estado) => {
        // console.log(id, estado)
        let activo = 3
        let inactivo = 4
        if (estado === true) {
            const result = await putEstadosCuenta({
                "id": id,
                "ActiveStatus": activo
            })

            const temporal = data.map((item) => {
                if (item.id === id) {
                    item.ActiveStatus = activo
                    toastShow(toast, 'success', 'Se actualizó el estado de la cuenta');
                }

                return item
            })

            setData(temporal)
            //    console.log(result)
        } else {
            const result = await putEstadosCuenta({
                "id": id,
                "ActiveStatus": inactivo
            })

            const temporal = data.map((item) => {
                if (item.id === id) {
                    item.ActiveStatus = inactivo
                    toastShow(toast, 'success', 'Se actualizó el estado de la cuenta');
                }

                return item
            })

            setData(temporal)
        }






    }

    const botones = (rowData) => {
        // console.log(rowData)
        return (
            <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop: -6 }}>
                <ModalEditarCuenta datos={rowData} cuentas={getPlanCuentas} toast={toast} />
                {/* <Checkbox onChange={onChangeCheck} checked={checked} style={{ marginTop: 10 }}
                    tooltip={rowData.ActiveStatus === true ? "Inhabilitar" : "Habilitar"} tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }}
                /> */}
                <Checkbox onChange={(e) => onChangeCheck(rowData.id, e.checked)} checked={rowData.ActiveStatus === 3 ? !checked : checked} style={{ marginTop: 10 }} ></Checkbox>
                <Button icon="pi pi-file-export" className="p-button-rounded p-button-info p-button-text" aria-label="User"/>
            </div>

        )
    }




    const statusAccount = (rowData) => {
        // console.log(rowData)

        if (rowData.ActiveStatus === 3) {
            return <i className="pi pi-check" style={{ 'fontSize': '1em' }}></i>
        }
        else {
            return <i className="pi pi-times" style={{ 'fontSize': '1em' }}></i>
        }

    }

    const table = {
        Data: data,
        Columns: [

            {
                field: 'ActiveStatus',
                header: 'Active',
                className: 'colum-width-Xsmall',
                Format: 'Template',
                body: (rowData) => statusAccount(rowData),
            },
            {
                field: 'id',
                header: 'Id',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.Id,
            },
            {
                // IdMenu: 1,
                field: 'IdAccount',
                header: 'NumberAccount',
                className: 'colum-width-medium',

                body: (rowData) => rowData.IdAccount,
            },
            {
                // Menu: 'Menu',
                field: 'Account',
                header: 'Account',
                className: 'colum-width-large',
                body: (rowData) => rowData.Account,
            },
            {
                field: 'Type',
                header: 'Type',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Type,
            },
            {
                field: 'SubType',
                header: 'SubType',
                className: 'colum-width-medium',
                body: (rowData) => rowData.SubType,
            },
            {
                field: 'CUCurrency',
                header: 'Currency',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Currency,
            },
            {
                field: 'Description',
                header: 'Description',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Description,
            },

            // {
            //     field: 'TaxLine',
            //     header: 'Tax Line',
            //     className: 'colum-width-small',
            //     body: (rowData) => rowData.TaxLine,
            // },
            {
                field: 'Saldo',
                header: 'Saldo',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Saldo,
            },
            {
                field: 'Fecha',
                header: 'Fecha',
                Format: 'DateTime'
                // body: (rowData) => rowData.Fecha,
            },
            {
                field: 'Usuario',
                header: 'Usuario',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Usuario,
            },
            {
                header: 'Acciones',
                className: 'colum-width-small',
                frozen: true,
                alignFrozen: 'right',
                body: (rowData) => botones(rowData),
                Format: "Template"
            }
        ],
        key: 'IdAccount ',
        // scrollHeight: '100%',
    }


    const getPlanCuentas = async () => {
        setLoading(true);
        const result = await getCuentas();
        setData(result)
        setLoading(false);
        // console.log(result)
        setChecked(result.ActiveStatus)
    }
    useEffect(() => {
        getPlanCuentas();
        window.document.title = 'PPF • Finanzas Plan Cuentas';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<h3>Plan de Cuentas</h3>}
                contenido={
                    <div className='p-3' style={{ height: '85vh' }}>
                        <Toast position="bottom-right" ref={toast} />
                        <ModalAgregarCuenta cuentas={getPlanCuentas} />
                        <AgGrid table={table} />
                    </div>
                }
            />
        </div>
    )
}


export default PlanCuentasScreen;