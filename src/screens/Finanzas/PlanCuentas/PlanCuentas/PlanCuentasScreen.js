import React from "react";
import { useState, useEffect } from "react";

//************** Componentes generales **************/
import Card from "../../../../components/Card/Card";
import Icon from "../../../../components/icon/Icon";
import Loader from "../../../../components/Loader/Loader";
import IconApp from "../../../../components/icon/IconApp";
import AgGrid from "../../../../components/Tables/AgGrid";

//************** Funciones  **************/
import { getCuentas } from "../../../../Api/Finanzas/PlanCuentasRequest";
import ModalAgregarCuenta from "../ModalPlanCuentas/ModalAgregarCuenta";

const PlanCuentasScreen = () => {
    const [loading, setLoading] = useState(false);


    const statusAccount = (rowData) => {
        console.log(rowData)

        if (rowData.ActiveStatus === true) {
            return <i className="pi pi-check" style={{'fontSize': '1em'}}></i>
        }
        else {
            return <i className="pi pi-times" style={{'fontSize': '1em'}}></i>
        }

    }

    const [table, setTable] = useState({
        Data: [],
        Columns: [
            {
                field: 'ActiveStatus',
                header: 'Active',
                className: 'colum-width-Xsmall',
                Format: 'Template',
                body: (rowData) =>statusAccount(rowData),
            },
            {
                // IdMenu: 1,
                field: 'IdAccount',
                header: 'IdAccount',
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
                field: 'SSubType',
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

            {
                field: 'TaxLine',
                header: 'Tax Line',
                className: 'colum-width-small',
                body: (rowData) => rowData.TaxLine,
            },
            {
                field: 'Saldo',
                header: 'Saldo',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Saldo,
            },
            {
                field: 'Fecha',
                header: 'Fecha',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Fecha,
            },
            {
                field: 'Usuario',
                header: 'Usuario',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Usuario,
            },
            
            
        ],
        key: 'IdAccount ',
        // scrollHeight: '100%',
    })


    const getPlanCuentas = async () => {
        setLoading(true);
        const result = await getCuentas();
        setTable({
            ...table,
            Data: result,
            key: 'IdAccount'
        })
        setLoading(false);
    }
    useEffect(() => {
        getPlanCuentas();
        window.document.title = 'PPF • IT Plan Cuentas';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Loader loading={loading} />
            <Card
                titulo={<h3>Plan de Cuentas</h3>}
                contenido={
                    <div className='p-3' style={{ height: '90vh' }}>
                        <ModalAgregarCuenta/>
                        <br></br><br></br>
                        <AgGrid table={table} />
                    </div>
                }
            />
        </div>
    )
}


export default PlanCuentasScreen;