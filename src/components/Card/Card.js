import React from 'react';

export const Card = ({titulo,contenido, className = '',  style = {}, styleTitle= {}}) => {
   
  return (
   <div className={'card mx-1 ' + className} style={{...{ padding:0, justifyContent:"center", marginTop:18, ...style }}}>
       <div className='card-header text-truncate px-2' id="cardTitulo" style={{marginLeft:15, padding:0, position:"absolute", top:-16, backgroundColor:"white", border:"none", maxWidth: "80%", ...styleTitle}}>
          <span>{titulo}</span>
       </div>
       <div className={'pt-2 px-2 pb-1 cardContenido '} style={style}>
          {contenido}
         
       </div>
   </div>
  );
}

export default Card;