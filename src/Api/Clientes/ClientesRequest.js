import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";


export const getCustomers = async () => {
    
    const result = await PrivateInterceptor(`clientes/`, 'GET');
    return result;

}


export const getALLCustomersDetails = async () => {
    
    const result = await PrivateInterceptor(`clientes/customerDetails`, 'GET');
    return result;

}

export const getCustomerDetails = async(IdCustomer) =>{
    const result = await PrivateInterceptor(`clientes/customerDetails/${IdCustomer}`, 'GET');
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


