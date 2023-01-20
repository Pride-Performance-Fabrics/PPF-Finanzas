import React, { useState, useContext , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import instancias from "../../Api/backend";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

import { useFormik } from 'formik';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';

import { ProgressSpinner } from 'primereact/progressspinner';

import logoH from '../../assets/SVG/Primario_H.svg';




export const LoginScreen = () => {

    // Variables que obtendran el valor de los input del Login
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [ip, setIP] = useState('');
    const { dispatch } = useContext(AuthContext);


    // Funcion para obtener la IP de la maquina desde la API `https://geolocation-db.com/`
    const getData = async () => {
        // TODO PETICION -> FUNCION
        const promesa = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
        // const promesa = await fetch('https://checkip.amazonaws.com/')

        await promesa.json()

            .then((res) => {
                // console.log(res);
                setIP(res.IPv4)
            })
            .catch((error) => {
                console.error(error);
            })

    }

    // UseEffect para obtener los datos de la IP
    useEffect(() => {
        // subscriptionSW();
        window.document.title = 'PPF • Login';
        getData();
    }, [])


    const ingresoLogin = async () => {
        // TODO PETICION -> FUNCION
        const promesa = await fetch(`${instancias.API_URL}/users/login?${Date.now()}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                withCredentials: true,
            },
            body: JSON.stringify({
                Usuario: formik.values.user,
                Password: formik.values.password,
                IP: ip,
                subscription: null,
                divece: 'web'
            })
        })
        await promesa.json()
            .then(async (res) => {
                if (res.auth === true) {
                // console.log("dddd")

                    localStorage.setItem('ppfToken', res.token)
                    await dispatch({
                        type: types.login,
                        payload: {
                            token: res.token,
                            user: res.user,
                            logged: true,
                        }
                    });
                    // console.log(res)
                    localStorage.setItem('ppfUser', JSON.stringify(res.user))
                    navigate("/home", { replace: true })
                } else {
                    formik.setValues({
                        ...formik.values,
                        login: true
                    })
                    setShowMessage(true);
                    dispatch({
                        type: types.login,
                        payload: {
                            logged: false
                        }
                    });
                }
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    // VALIDACION DE DATOS
    const formik = useFormik({
        initialValues: {
            user: '',
            password: '',
            login: false,
        },
        validate: (data) => {
            let errors = {};


            if (!data.user) {
                errors.user = 'User is required.';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            if (data.login) {
                errors.login = 'Credenciales incorrectas.';
            }
            // if(!correoCorrecto){
            //     errors.correoCorrecto ='Credenciales incorrectas.';
            // }
            return errors;
        },
        // onSubmit: async (data) => {
        //     setFormData(data);
        //     await ingresoLogin();
        //     setShowMessage(true);

        // }
    });

    const login = async() => {
        // console.log('asdfad')
       formik.setValues({
        user: formik.values.user,
        password: formik.values.password
       })
       if(formik.values.user !== '' && formik.values.password !== ''){
        await ingresoLogin();
       }
    //    await ingresoLogin();
    }


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };


    // Funcion para mostrar el logo y nombre de la empresa en la leyenda del Fieldset
    const LogoEmpresa = (
        <React.Fragment>
            <div className="fila">
                <div className="">
                    {/* <img src="https://were.ppf.com.hn/web/Logo_PPF.png" alt="Imagen" className="login__empresa-logo" /> */}
                    <img src={logoH} alt="" className="login__empresa-logo" />
                </div>
            </div>
            <div className="fila">
                <div className="columna">
                    {/* <span style={{ marginLeft: 4 }} className="login_titulo">PPF</span> */}
                </div>
            </div>

        </React.Fragment>
    );

    return (
        <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/imagenes/PPFLogin.jpg'})`, backgroundPosition: 'center' }} className="login__contenedor-imagen">
            <div className="login__contenedor-formulario" >
                <div className={classNames("progressSpinner-container spinner-login", { 'isVisible': false })}>
                    <ProgressSpinner />
                </div>

                <Fieldset legend={LogoEmpresa}>
                    <form onSubmit={formik.handleSubmit} className="p-fluid login_formulario">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText
                                id="user"
                                name="user"
                                placeholder="Usuario"
                                value={formik.values.user}
                                onChange={formik.handleChange}
                                autoComplete="new-password"
                            />
                        </div>
                        {getFormErrorMessage('user')}

                        <div className="p-inputgroup login_input-password ">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <Password
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onKeyDown={e => e.key === 'Enter' && login()}
                                toggleMask={true}
                                feedback={false}
                                autoComplete="new-password"
                                className={classNames({ 'p-invalid': isFormFieldValid('password') })}
                            />
                        </div>
                        {getFormErrorMessage('password')}
                        {showMessage && <div className="p-error">Credenciales incorrectas.</div>}
                        <div className="p-inputgroup">
                            <div className="p-inputgroup" style={{ backgroundColor: 10 }}>
                                <Button type="button" className="p-button-Primary" width='100% ' label="Ingresar" style={{ marginTop: 10, width: "100%" }}  onClick={login} />
                            </div>
                            <br />
                        </div>
                        {getFormErrorMessage('login')}
                        {getFormErrorMessage('correoCorrecto')}
                    </form>
                </Fieldset>
            </div>
        </div>
    )
}



export default LoginScreen
