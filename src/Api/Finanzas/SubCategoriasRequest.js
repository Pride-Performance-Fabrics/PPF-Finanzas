import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";


export const getSubCategorias = async () => {
    
    const result = await PrivateInterceptor(`finanzas/subCategorias`, 'GET');
    return result;

}

export const postSubCategorias = async (body) =>{
    const result = await PrivateInterceptor(`finanzas/subCategorias`, 'POST', body);
    return result;
}
