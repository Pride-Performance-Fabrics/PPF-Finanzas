import { PrivateInterceptor } from "../../interceptors/PrivateInterceptor";


export const getCategorias = async () => {
    
    const result = await PrivateInterceptor(`finanzas/categorias`, 'GET');
    return result;

}

export const postCategorias = async (body) =>{
    const result = await PrivateInterceptor(`finanzas/categorias`, 'POST', body);
    return result;
}





