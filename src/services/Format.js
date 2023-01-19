export const formatCodigoProveedor = (IdCustomer) => {
    if(IdCustomer){
   return 'VC' + setCeros( 8 - (IdCustomer + '').length ) + IdCustomer
    }else{
        return ''
    }
}

export const setCeros = (ceros) => {
    let a = '';
    for (let i = 0; i < ceros; i++) {
        a += '0';
    }
    return a;
};