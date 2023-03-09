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


//*************************** Invoices Details******************************/
export const getInvoicesDetails = async (idFactura) => {
    
    const result = await PrivateInterceptor(`ventas/facturas/InvoicesDetails/${idFactura}`, 'GET');
    return result;

}



