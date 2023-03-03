const days = [
    {
       "day": 0,
       "codeEn": "sun",
       "en": "Sunday.",
       "es": "Domingo",
       "codeEs": "Dom"
    },
    {
       "day": 1,
       "codeEn": "mon",
       "en": "Monday.",
       "es": "Lunes",
       "codeEs": "Lun"
    },
    {
       "day": 2,
       "codeEn": "tue",
       "en": "Tuesday.",
       "es": "Martes",
       "codeEs": "Mar"
    },
    {
       "day": 3,
       "codeEn": "wed",
       "en": "Wednesday.",
       "es": "Miercoles",
       "codeEs": "Mie"
    },
    {
       "day": 4,
       "codeEn": "thu",
       "en": "Thursday.",
       "es": "Jueves",
       "codeEs": "Jue"
    },
    {
       "day": 5,
       "codeEn": "fri",
       "en": "Friday.",
       "es": "Viernes",
       "codeEs": "Vie"
 
    },
    {
       "day": 6,
       "codeEn": "sat",
       "en": "Saturday.",
       "es": "Sabado",
       "codeEs": "Sab"
    }
 ]
 
 
 const mounths = [
    {
        month: 0,
        en:  'January',
        codeEn: 'Jan',
        es: 'Enero',
        codeEs: 'Ene'
    },
    {
        month: 1,
        en: 'February' ,
        codeEn: 'Jan' ,
        es: 'Febrero',
        codeEs: 'Feb'
    },
    {
        month: 2,
        en:  'March'  ,
        codeEn: 'Mar' ,
        es: 'Marzo',
        codeEs: 'Mar'
    },
    {
        month: 3,
        en:  'April' ,
        codeEn:  'Apr' ,
        es: 'Abril',
        codeEs: 'Abr'
    },
    {
        month: 4,
        en:  'May' ,
        codeEn: 'May' ,
        es: 'Mayo',
        codeEs: 'May'
    },
    {
        month: 5,
        en:  'June' ,
        codeEn:  'June' ,
        es: 'Junio',
        codeEs: 'Jun'
    },
    {
        month: 6,
        en: 'July' ,
        codeEn: 'July',
        es: 'Julio',
        codeEs: 'Jul'
    },
    {
        month: 7,
        en:  'August' ,
        codeEn:  'Aug',
        es: 'Agosto',
        codeEs: 'Ago'
    },
    {
        month: 8,
        en: 'September' ,
        codeEn: 'Sept' ,
        es: 'Septiembre',
        codeEs: 'Sep'
    },
    {
        month: 9,
        en: 'October' ,
        codeEn: 'Oct',
        es: 'Octubre',
        codeEs: 'Oct'
    },
    {
        month: 10,
        en:  'November',
        codeEn: 'Nov',
        es: 'Noviembre',
        codeEs: 'Nov'
    },
    {
        month: 11,
        en:  'December',
        codeEn: 'Dec',
        es: 'Diciembre',
        codeEs: 'Dic'
    },
 ]
 
 export const getFechaFormatoSmall = (date) => {
    const d = new Date(date);
    return days.filter(e => e.day === d.getDay())[0].codeEs + ', ' + d.getDate() + ' ' + mounths.filter(m => m.month === d.getMonth())[0].codeEs
 }
 export const getFechaFormatoLarge = (date) => {
    const d = new Date(date);
    return days.filter(e => e.day === d.getDay())[0].es + ', ' + d.getDate() + ' ' + mounths.filter(m => m.month === d.getMonth())[0].es + ' de ' + d.getFullYear()
 }
 
 export const getDateTimeString = (date) => {
    const d = new Date(date.getTime() + 6 * 60 * 60 * 1000);
    return d.toLocaleString('ES-HN');
 }
 export const getDateTimeStringUS = (date) => {
    const d = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    return d.toLocaleString('ES-US', { hour12: false }).replace(',', '');
 }
 export const getLocalDateTimeString = (date) => {
    const d = new Date(date);
    return d.toLocaleString('ES-US', { hour12: false }).toUpperCase();
 }
 export const getLocalDateString1  = (date) => {
    const d = new Date(date.getTime());
    return d.toLocaleDateString('ES-HN');
 }
 export const getDateTimeSQL = (date) => {
    const d = new Date(date.getTime() - 6 * 60 * 60 * 1000);
    return d.toLocaleString('EN-US', { hour12: false }).replace(',', '');
 }
 export const getDateTimeSQL2 = (date) => {
    const d = new Date(date.getTime() - 6 * 60 * 60 * 1000);
    return d.toLocaleString('ES-HN').replace(',', '');
 }
 export const getDateTimeSQL3 = (date) => {
    const d = new Date(date.getTime());
    return d.toLocaleString('EN-US', { hour12: false }).replace(',', '');
 }
 export const getDateTimeSQL4 = (date) => {
    const d = new Date(date.getTime());
    return d.toLocaleString('EN-US', { hour12: true }).replace(',', '');
 }
 export const setDateTimeSQL = (date) => {
    const d = new Date(date);
    return d.toLocaleString('EN-US').replace(',', '');
 }

 export const setDateTimeSQL1 = (date) => {
   const d = new Date(date);
   return d.toLocaleString('EN-US', { hour12: false }).replace(',', '');
}
 
 export const getDate = (date) => {
    const d = new Date(date.getTime() + 6 * 60 * 60 * 1000);
    return d;
 }
 
 export const getTime = (date) => {
    const d = new Date(date.getTime() + 6 * 60 * 60 * 1000);
    return d.toTimeString('EN-US');
 }
 
 export const getHora = (date) => {
    const d = new Date(date.getTime());
    return d.toTimeString('EN-US');
 }
 
 
 export const getLocalDateString = (date) => {
    const d = new Date(date.getTime() + 6 * 60 * 60 * 1000);
    return d.toLocaleDateString('ES-HN');
 }
 export const getDateProduccionSQL = (date) => {
    const d1 = new Date(date[0].getTime() - (6 * 60 * 60 * 1000) + (24 * 60 * 60 * 1000));
    const d2 = new Date(date[1].getTime() - (6 * 60 * 60 * 1000) + (48 * 60 * 60 * 1000));
    return [
       d1.toLocaleDateString('EN-US') + ' 7:00:00 AM',
       d2.toLocaleDateString('EN-US') + ' 6:59:59 AM'
    ]
 }
 
 export const getDateProduction = (date) => {
    const d1 = new Date(date[0]);
    const d2 = new Date(date[1].getTime() + (24 * 60 * 60 * 1000));
    return [
       d1.toLocaleDateString('EN-US') + ' 7:00:00 AM',
       d2.toLocaleDateString('EN-US') + ' 6:59:59 AM'
    ]
 }
 
 export const getTiempoActivo = (Creada, Vencimiento) => {
 
    // asignar el valor de las unidades en milisegundos
    let msecPerMinute = 1000 * 60;
    let msecPerHour = msecPerMinute * 60;
 
 
    // Obtener la diferencia en milisegundos
    let interval = Vencimiento.getTime() - Creada.getTime();
 
 
    // Calcular las horas , minutos y segundos
    let hours = Math.floor(interval / msecPerHour);
    interval = interval - (hours * msecPerHour);
 
    let minutes = Math.floor(interval / msecPerMinute);
    interval = interval - (minutes * msecPerMinute);
 
    let seconds = Math.floor(interval / 1000);
 
    let dias = 0;
    if(hours >= 24) {
       dias = Math.floor(hours / 24);
       hours = hours - (dias * 24);
       return dias + ' dia, ' +  agregarCeroSiEsNecesario(hours) + ":" + agregarCeroSiEsNecesario(minutes) + ":" + agregarCeroSiEsNecesario(seconds)
    }else{
       return agregarCeroSiEsNecesario(hours) + ":" + agregarCeroSiEsNecesario(minutes) + ":" + agregarCeroSiEsNecesario(seconds)
    }
 
 }
 
 const agregarCeroSiEsNecesario = valor => {
    if (valor < 10) {
       return "0" + valor;
    } else {
       return "" + valor;
    }
 }
 
export const agregarDias = ( date, days) =>{
   let d = new Date(date)
  
   return new Date(d.getTime() + 1000* 60 * 60 * 24 * days)  
}

 
export const restarDias = ( date, days) =>{
   let d = new Date(date)
  
   return new Date(d.getTime() - 1000* 60 * 60 * 24 * days)  
}

// export const fechaSinHora = (date) =>{
//    let f = new Date(date)
  
//    return (f.getFullYear() + '/' + f.getMonth() + '/' + f.getDay())

// }


 