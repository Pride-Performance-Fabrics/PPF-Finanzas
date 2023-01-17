
export const MemoReducer = (state, action) => {
    switch (action.type) {
        case 'addRowTransporte':
            const index = state.Transporte.findIndex(i => action.payload.IdDetalle === i.IdDetalle);
            if (index >= 0) {
                const t = state.Transporte;
                t[index] = { ...t[index], Rutas: [...t[index].Rutas, {}] }
                return {...state, t};
            }
            return state;
            break;

        case 'addRowAlimentacion':
            // console.log(state.Alimentacion[state.Alimentacion?.length -1], new Date(state.Alimentacion[state.Alimentacion?.length -1]))
            // return {...state, Alimentacion: [...state.Alimentacion, {IdMemoDetalle: (new Date()).getTime()/100000000 * -1,Dia: state.Alimentacion[state.Alimentacion?.length -1].Dia ? new Date(new Date(state.Alimentacion[state.Alimentacion?.length -1]).Dia.getTime() + 1000 * 60 * 60 * 24) : new Date()  }]}
            return {...state, Alimentacion: [...state.Alimentacion, {}]}
            break;

        case 'setAlimentacion': 
        return {...state, Alimentacion: action.payload}


        case 'resetData':
            return action.payload
            break

        default:
            return state;
            break;
    }
}