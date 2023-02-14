import React from "react";
import { useState, useEffect, useRef } from "react";

import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';

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

import { decodeToken } from "react-jwt";
import { putEstadosCuenta } from "../../../../Api/Global/StatusRequest";

import { getAccesosUsuario } from "../../../../Api/IT/Accesos/AccesosRequest";


import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';

const PlanCuentasScreen = () => {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const toast = useRef(null);
    const [data, setData] = useState([]);
    const [accesos, setAccesos] = useState([]);
    const [habilitarEditar, setHabilitarEditar] = useState(true);
    const [habilitar, setHabilitar] = useState(true);
    const [nodes, setNodes] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0);

    let aspectoBoton = [
        {
            Id: 1,
            Nombre: "Nuevo",
            Icono: "pi pi-plus",
            className: "p-button-Primary mr-2"
        },

        {
            Id: 2,
            Nombre: "",
            Icono: "pi pi-pencil",
            className: "p-button-rounded p-button-info p-button-text"
        }
    ]


    const getAccesosByUsuario = async () => {
        const userInformation = decodeToken(localStorage.getItem(`ppfToken`));
        let user = userInformation.idUser

        const result = await getAccesosUsuario(user)
        const ordenado = result.accesos.split(',').sort();
        setAccesos(ordenado)

        const accesoEditar = ordenado.some((item) => item === "1")
        setHabilitarEditar(!accesoEditar)

        const accesoHabilitar = ordenado.some((item) => item === "2")
        setHabilitar(!accesoHabilitar)
    }


    const onChangeCheck = async (IdAccount, estado) => {
        let activo = 3
        let inactivo = 4
        if (estado === true) {
            const result = await putEstadosCuenta({
                "IdAccount": IdAccount,
                "ActiveStatus": activo
            })

            const temporal = data.map((item) => {
                if (item.IdAccount === IdAccount) {
                    item.ActiveStatus = activo
                    toastShow(toast, 'success', 'Se actualizó el estado de la cuenta');
                }

                return item
            })

            setData(temporal)
        } else {
            const result = await putEstadosCuenta({
                "IdAccount": IdAccount,
                "ActiveStatus": inactivo
            })

            const temporal = data.map((item) => {
                if (item.IdAccount === IdAccount) {
                    item.ActiveStatus = inactivo
                    toastShow(toast, 'success', 'Se actualizó el estado de la cuenta');
                }

                return item
            })

            setData(temporal)
        }
    }

    const botones = (rowData) => {



        return (
            <div className='col-12 d-flex' style={{ textAlign: 'center', height: 28, marginTop: -6 }}>
                {/* <ModalEditarCuenta datos={rowData} cuentas={getPlanCuentas} toast={toast} habilitarEditar = {habilitarEditar}/> */}
                <ModalAgregarCuenta
                    datos={{
                        ...rowData,
                        IdTipoCuenta: rowData.CodigoType + "" +
                            (rowData.CodigoType !== 6 ? "" : rowData.CodigoCategoria) + "" + rowData.CodigoSubCategoria
                    }}
                    cuentas={getPlanCuentas}
                    toast={toast}
                    icono={aspectoBoton[1].Icono}
                    nombre={aspectoBoton[1].Nombre}
                    className={aspectoBoton[1].className}
                    habilitarEditar={habilitarEditar} />
                {/* <Checkbox onChange={onChangeCheck} checked={checked} style={{ marginTop: 10 }}
                    tooltip={rowData.ActiveStatus === true ? "Inhabilitar" : "Habilitar"} tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }}
                /> */}
                <Checkbox onChange={(e) => onChangeCheck(rowData.IdAccount, e.checked)} checked={rowData.ActiveStatus === 3 ? !checked : checked} style={{ marginTop: 10 }} disabled={habilitar} ></Checkbox>
                <Button icon="pi pi-file-export" className="p-button-rounded p-button-info p-button-text" aria-label="User" />
            </div>

        )
    }




    const statusAccount = (rowData) => {

        if (rowData.ActiveStatus === 3) {
            return <i className="pi pi-check"  style={{ 'fontSize': '1em', color: "green" }}></i>
        }
        else {
            return <i className="pi pi-times" style={{ 'fontSize': '1em', color: "red" }}></i>
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
            // {
            //     field: 'Clase',
            //     header: 'Clase',
            //     className: 'colum-width-small',

            // },
            {
                field: 'IdAccount',
                header: 'IdAccount',
                className: 'colum-width-Xsmall',
                body: (rowData) => rowData.Id,
            },
            {
                // IdMenu: 1,
                field: 'NumberAccount',
                header: 'NumberAccount',
                className: 'colum-width-medium',

                body: (rowData) => rowData.NumberAccount,
            },
            // {
            //     // IdMenu: 1,
            //     field: 'CodigoAccount',
            //     header: 'CodigoAccount',
            //     className: 'colum-width-medium',

            //     body: (rowData) => rowData.CodigoAccount,
            // },
            {
                // Menu: 'Menu',
                field: 'Account',
                header: 'Account',
                className: 'colum-width-XXlarge',
                body: (rowData) => rowData.Account,
            },
            // {
            //     field: 'Type',
            //     header: 'Type',
            //     className: 'colum-width-medium',
            //     body: (rowData) => rowData.Type,
            // },
            // {
            //     field: 'Categoria',
            //     header: 'Categoria',
            //     className: 'colum-width-medium',
            //     body: (rowData) => rowData.Categoria,
            // },
            // {
            //     field: 'SubCategoria',
            //     header: 'SubCategoria',
            //     className: 'colum-width-medium',
            //     body: (rowData) => rowData.SubCategoria,
            // },
            {
                field: 'Currency',
                header: 'Currency',
                className: 'colum-width-medium',
                body: (rowData) => rowData.Currency,
            },
            {
                field: 'DescriptionCharAccount',
                header: 'Description',
                className: 'colum-width-medium',
                body: (rowData) => rowData.DescriptionCharAccount,
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
            // {
            //     field: 'Usuario',
            //     header: 'Usuario',
            //     className: 'colum-width-medium',
            //     body: (rowData) => rowData.Usuario,
            // },
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
        cuentasAgrupadas(result)

        setChecked(result.ActiveStatus)
    }
    useEffect(() => {
        getPlanCuentas();
        getAccesosByUsuario();
        window.document.title = 'PPF • Finanzas Plan Cuentas';



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setCeros = (ceros) => {
        let a = '';
        for (let i = 0; i < ceros; i++) {
            a += '0';
        }
        return a;
    };
    const cuentasAgrupadas = (result) => {
        let types
        if (result.length > 0) {
            let cuentas = []
            for (let i = 1; i <= 6; i++) {
                let types = result.filter((e) => e.IdType === i)
                // .map(i =>{
                //     return{
                //         key: i.IdType,
                //         data: {
                //             IdType: i.IdType,
                //             Account: i.Type,
                //             Description: i.Description
                //         }



                //     }
                // })
                cuentas.push(types)


            }

            let tipos = []

            cuentas.forEach(e => {
                if (e.length > 0) {

                    let children = [];
                    if (e[0].IdType === 6) {
                        let categorias = []
                        e.forEach(n => {
                            const subCategorias = getSubCategorias(n.IdCategoria, result);

                            if (categorias.findIndex(m => "ca" + n.IdCategoria === m.key) < 0) {
                                categorias.push({
                                    key: "ca" + n.IdCategoria,
                                    data: {
                                        IdType: n.IdCategoria,
                                        NumberAccount: n.CodigoType + "" + "" + n.CodigoCategoria + setCeros(5),
                                        Account: n.Categoria,
                                        Description: n.DescriptionCategoria,

                                    },
                                    children: subCategorias

                                })
                            }
                        })
                        let tipo = {
                            key: 't' + e[0].IdType,
                            data: {
                                IdType: e[0].IdType,
                                Account: e[0].Type,
                                NumberAccount: e[0].CodigoType + setCeros(6),
                                Description: e[0].DescriptionType,

                            },
                            children: categorias,
                            style: {
                                backgroudColor: "#ccc"
                            }

                        }
                        tipos.push(tipo)
                    } else {
                        const subCategorias = getSubCategorias(e[0].IdType, result);
                        let tipo = {
                            key: 't' + e[0].IdType,
                            data: {
                                IdType: e[0].IdType,
                                Account: e[0].Type,
                                NumberAccount: e[0].CodigoType + setCeros(6),
                                Description: e[0].DescriptionType,

                            },
                            children: subCategorias

                        }
                        tipos.push(tipo)
                    }

                }
            })
            setNodes(tipos)



            // setNodes(cuentas)

            result.forEach(cuenta => {



                if (cuentas.filter(i => i.IdContenerdorAccount === 0) > 0) {
                    cuentas.push({
                        Clase: cuenta.Clase,
                        IdAccount: cuenta.IdAccount,
                        NumberAccount: cuenta.NumberAccount,
                        CodigoAccount: cuenta.CodigoAccount,
                        Account: cuenta.Account,
                        SubCategoria: cuenta.SubCategoria,
                        Cuentas: result.filter(i => i.IdAccount === cuenta.IdContenedorAccount).map(i => {
                            return i
                        })



                    })
                }
            });
        }
    }




    const getSubCategorias = (IdCategoria, result) => {
        let sub = []
        if (IdCategoria >= 6) {
            let subCate = result.filter((e) => IdCategoria === e.IdCategoria)

            subCate.forEach(i => {
                if (sub.findIndex(m => m.IdSubCategoria === i.IdSubCategoria) < 0) {
                    sub.push(i)
                }
            })
            let resultado = sub.map(e => {
                const cuentas = cuentasHijos(e.IdSubCategoria, result)
                return {
                    key: 'sc' + e.IdSubCategoria,
                    data: {
                        IdType: e.IdSubCategoria,
                        Account: e.SubCategoria,
                        NumberAccount: e.CodigoType + "" + e.CodigoCategoria + "" + e.CodigoSubCategoria + setCeros(3),
                        Description: e.DescriptionSubCategoria
                    },
                    children: cuentas
                }

            })

            return resultado

        }
        else {
            let subCate = result.filter((e) => IdCategoria === e.IdType)
            subCate.forEach(i => {
                if (sub.findIndex(m => m.IdSubCategoria === i.IdSubCategoria) < 0) {
                    sub.push(i)
                }
            })
            let resultado = sub.map(e => {
                const cuentas = cuentasHijos(e.IdSubCategoria, result)
                return {
                    key: 'sc' + e.IdSubCategoria,
                    data: {
                        IdType: e.IdSubCategoria,
                        Account: e.SubCategoria,
                        NumberAccount: e.CodigoType + "" + e.CodigoSubCategoria + setCeros(3),
                        Description: e.DescriptionSubCategoria
                    },
                    children: cuentas
                }

            })
            return resultado
        }

        // return sub
    }


    const cuentasHijos = (IdSubCategoria, result) => {

        let sub = []
        // let hijos = []
        let subCate = result.filter((e) => IdSubCategoria === e.IdSubCategoria)
        subCate.forEach(i => {
            if (i.IdContenedorAccount === 0) {
                sub.push(i)
            }
            // if (sub.findIndex(m => ((m.IdContenedorAccount === 0) && (i.IdAccount === m.IdAccount)))< 0) {
            // }

        })
        let resultado = sub.map(e => {
            let cuentaH = cuHijos(e.IdAccount, result)
            return {
                key: 'cc' + e.IdAccount,
                data: {
                    IdType: e.IdAccount,
                    Account: e.Account,
                    NumberAccount: e.CodigoType + "" + (e.IdType === 6 ? e.CodigoCategoria : '') + "" + e.CodigoSubCategoria + "" + e.CodigoAccount,
                    Description: e.DescriptionCharAccount
                },
                children: cuentaH
            }

        })
        return resultado
        // hijos = cuentasHijos(IdSubCategoria, subCate)
    }

    const cuHijos = (IdAccount, subCate) => {
        let hijos = []
        subCate.forEach(i => {
            if (i.IdContenedorAccount === IdAccount) {
                hijos.push({
                    key: 'ah' + i.IdAccount,
                    data: {
                        IdType: i.IdAccount,
                        Account: i.Account,
                        NumberAccount: i.CodigoType + "" + (i.IdType === 6 ? i.CodigoCategoria : '') + "" + i.CodigoSubCategoria + "" + i.CodigoAccount,
                        Description: i.DescriptionCharAccount
                    },
                    children: cuHijos(i.IdAccount, subCate)
                })
            }
        })
        return hijos
    }

    const rowClassName = (node) => {
        // console.log(node)
        switch (true) {
            case node.key.toString().includes('t'):
                return { 'p-highTipos': (true) };
                break;
            case node.key.toString().includes('ca'):
                return { 'p-highCategoria': (true) };
                break;
            case node.key.toString().includes('sc'):
                return { 'p-highSubCategoria': (true) };
                break;
            case node.key.toString().includes('cc'):
                return { 'p-highCuentas': (true) };
                break;
            case node.key.toString().includes('ah'):
                return { 'p-highCuentasHijos': (true) };
                break;
            default:
                return { 'p-highFill': (true) }
                break;
        }
        // return { 'p-highlight': (node.key.includes('t')) };
    }


    return (
        <div>
            <Loader loading={loading} />

            <TabView className="col-12 homeTabView" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>

                <TabPanel header="Listado de Cuentas">
                    <Card
                        titulo={""}
                        contenido={
                            <div className='pt-4' style={{ height: '85vh' }}>
                                <Toast position="bottom-right" ref={toast} />

                                <TreeTable value={nodes} rowClassName={rowClassName}>
                                    <Column field="NumberAccount" header="NumberAccount" expander ></Column>
                                    <Column field="Account" header="Account"   ></Column>
                                    <Column field="Description" header="Description" ></Column>
                                    {/* <Column field="type" header="Type"></Column> */}
                                </TreeTable>
                                {/* <AgGrid table={table} /> */}

                            </div>
                        }
                    />
                </TabPanel>
                <TabPanel header="Plan de cuentas">
                    <Card
                        titulo={<div className="d-flex">

                            <ModalAgregarCuenta
                                cuentas={getPlanCuentas}
                                toast={toast}
                                icono={aspectoBoton[0].Icono}
                                nombre={aspectoBoton[0].Nombre}
                                className={aspectoBoton[0].className}
                                habilitarEditar={habilitarEditar} />
                            {/* <ModalEditarCuenta datos={data} cuentas={getPlanCuentas} toast={toast} habilitarEditar={habilitarEditar} /> */}
                            {/* <Button className="p-button-text p-button-rounded mx-2" icon="ri-restart-line"  loading={loading} onClick={getPlanCuentas} /> */}
                        </div>}

                        contenido={
                            <div className='pt-4' style={{ height: '85vh' }}>
                                <Toast position="bottom-right" ref={toast} />
                                <AgGrid table={table} />

                            </div>
                        }
                    />
                </TabPanel>
            </TabView>
            {/* <Card
                titulo={<div className="d-flex"
                >
                    <h3 className="mx-3">Plan de Cuentas</h3>
                    <ModalAgregarCuenta
                        cuentas={getPlanCuentas}
                        toast={toast}
                        icono={aspectoBoton[0].Icono}
                        nombre={aspectoBoton[0].Nombre}
                        className={aspectoBoton[0].className}
                        habilitarEditar={habilitarEditar} />
                    
                </div>}

                contenido={
                    <div className='pt-4' style={{ height: '90vh' }}>
                        <Toast position="bottom-right" ref={toast} />

                        <TreeTable value={nodes} rowClassName={rowClassName}>
                            <Column field="NumberAccount" header="NumberAccount" expander></Column>
                            <Column field="Account" header="Account" ></Column>
                            <Column field="Description" header="Description"></Column>
                           
                        </TreeTable>
                        <AgGrid table={table} />

                    </div>
                }
            /> */}
        </div>
    )
}


export default PlanCuentasScreen;