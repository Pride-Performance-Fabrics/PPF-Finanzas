import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";
import { PrivateInterceptorIPS } from "../../interceptors/PrivateInterceptorIPS";


export const getCustomers = async () => {
    
    const result = await PrivateInterceptor(`clientes/`, 'GET');
    return result;

}


export const getUltimoIdCustomer = async() =>{
    const result = await PrivateInterceptor(`clientes/customerUltimoIdCustomer`, 'GET');
    return result;
}

export const postCustomer = async(data) =>{
    const result = await PrivateInterceptor(`clientes/IUCustomer`, 'POST', data);
    return result;

}

export const putChecksCustomer = async (body) =>{
    console.log(body)
    const result = await PrivateInterceptor(`clientes/checkCustomer`, 'PUT', body);
    return result;
}

//************************************** CUSTOMER DETAILS ************************************** */

export const getALLCustomersDetails = async () => {
    
    const result = await PrivateInterceptor(`clientes/customerDetails`, 'GET');
    return result;

}

export const getCustomerDetails = async(IdCustomer) =>{
    const result = await PrivateInterceptor(`clientes/customerDetails/${IdCustomer}`, 'GET');
    return result;
}

export const getUltimoIdCustomerDetails = async() =>{
    const result = await PrivateInterceptor(`clientes/customerDetailsUltimoId`, 'GET');
    return result;
}


export const postCustomerDetails = async (data) =>{
    const result = await PrivateInterceptor(`clientes/IUCustomerDetails`, 'POST', data);
    return result;
}


export const putChecksCustomerDetails = async (body) =>{
    console.log(body)
    const result = await PrivateInterceptor(`clientes/checkCustomerDetails`, 'PUT', body);
    return result;
}



export const putStatusCustomerDetails = async (data) =>{
    const result = await PrivateInterceptor(`clientes/cambiarEstadoCustomerDetails`, 'PUT', data);
    return result;
}


export const BlockCustomerIPS = async (data) => {
    console.log(data)
    const result = await  PrivateInterceptorIPS(`Customers/BlockCustomer`, 'POST', data);
    return result;
}