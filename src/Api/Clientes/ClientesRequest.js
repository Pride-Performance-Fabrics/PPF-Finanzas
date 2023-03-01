import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";


export const getCustomers = async () => {
    
    const result = await PrivateInterceptor(`clientes/`, 'GET');
    return result;

}
