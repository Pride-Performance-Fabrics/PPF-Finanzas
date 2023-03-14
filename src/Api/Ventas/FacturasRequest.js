import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";

//*************************** Invoices******************************/
export const getInvoices = async () => {
    
    const result = await PrivateInterceptor(`ventas/facturas`, 'GET');
    return result;

}


export const getInvoicesCustomer = async (IdCustomer) =>{
    
    const result = await PrivateInterceptor(`ventas/facturas/InvoicesCustomer/${IdCustomer}`, 'GET');
    return result;
}


export const getInvoicesDates = async (dates) =>{
    console.log(dates)

    const result = await PrivateInterceptor(`ventas/facturas/facturasFechas`, 'POST', {FechaInicio :dates[0], FechaFinal: dates[1]});
    return result;
}



export const getInvoicesCustomerDates = async (dates, IdCustomer) =>{
    console.log(dates, IdCustomer)

    const result = await PrivateInterceptor(`ventas/facturas/facturasFechasCliente`, 'POST', {FechaInicio :dates[0], FechaFinal: dates[1], IdCustomer: IdCustomer});
    return result;
}
//*************************** Invoices Details******************************/
export const getInvoicesDetails = async (idFactura) => {
    
    const result = await PrivateInterceptor(`ventas/facturas/InvoicesDetails/${idFactura}`, 'GET');
    return result;

}





