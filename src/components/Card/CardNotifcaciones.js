import React from 'react';
import { Card } from 'primereact/card';


export const CardNotificaciones = ({ titulo, contenido, className = '', style = {}, styleTitle = {} }) => {
    return (
        <div className={'card mx-1 ' + className} style={{ ...{ background: 'rgba(2, 15, 55, 0.5)', padding: 0, justifyContent: "center", width: 50, marginTop: 18, ...style } }}>
            <div className='card-header text-truncate px-2' style={{ marginLeft: 15, padding: 0, position: "absolute", top: -16, border: "none", maxWidth: "80%", ...styleTitle }}>
                <span>{titulo}</span>
            </div>
            <div className={'pt-2 px-2 pb-1 cardContenidoNoficacion '} style={style}>
                {contenido}

            </div>
        </div>



    );
}

export default CardNotificaciones;