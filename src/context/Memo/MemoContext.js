import React, { createContext, useReducer } from 'react';
import { MemoReducer } from './MemoReducer';

export const MemoInitialState = {
    Transporte: [
        {
            IdDetalle: (new Date()).getTime() * -1,
            Dia: new Date(),
            Turno: null,
            Rutas: []
        }
    ],
    Alimentacion: [{IdMemoDetalle: (new Date()).getTime()/100000000 * -1, Dia: new Date()}]
};


export const MemoContex = createContext({});

export const MemoProvider = ({ children }) => {
    const [Memo, dispatch] = useReducer(MemoReducer, MemoInitialState);


    const addRowTransporte = (e) => {
        dispatch({ type: 'addRowTransporte', payload: e });
    }

    const addRowAlimentacion = () => {
        dispatch({ type: 'addRowAlimentacion' });
    }
    const setAlimentacion = (e) => {
        dispatch({ type: 'setAlimentacion' , payload: e});
    }

    const resetData = () => {
       dispatch({type: 'resetData', payload: MemoInitialState})
    }

    return (
        <MemoContex.Provider value={{
            addRowAlimentacion,
            addRowTransporte,
            setAlimentacion,
            resetData,
            Memo
        }}>
            {children}
        </MemoContex.Provider>
    )
}