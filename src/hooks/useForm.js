import { useState } from "react"

export const useForm = (initalState) => {
    const resetValues = initalState;
    const [values, setValues] = useState(initalState);

    const handleInputChange = (e, name = undefined) => {
        // console.log(e)
        let target = null;
        let value = null;
        if(!e.target){
            target = e.originalEvent.target;
            value = e.checked !== undefined ? e.checked : e.value;
        }else{
            target = e.target
            value = e.checked !== undefined ? e.checked : e.target.value
        }
        // console.log(name ? name : target.name, value);
        setValues({
            ...values,
            [name ? name : target.name]: value
        })
        // console.table(values)
    }
    const setNumber = (e, name = undefined) => {
        let target = null;
        let value = null;
        if(!e.target){
            target = e.originalEvent.target;
            value = e.value;
        }else{
            target = e.target
            value = e.target.value
        }
        // console.log(name ? name : target.name, parseFloat(value));
        setValues({
            ...values,
            [name ? name : target.name]: isNaN(parseFloat(value)) ? 0.00 : parseFloat(value) 
        })
    }

    const resetForm = () => {
       setValues(resetValues);
    }
    return [values, handleInputChange, setValues, resetForm, setNumber];
}
