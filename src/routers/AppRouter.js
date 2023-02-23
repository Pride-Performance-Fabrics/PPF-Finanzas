import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginScreen from "../screens/Login/LoginScreen";

import { DashboardRoutes } from "./DashboardRoutes";
import { isExpired } from "react-jwt";

export const AppRouter = () => {
    const ppfToken = localStorage.getItem('ppfToken');
    const expired = isExpired(ppfToken);

    if(expired){
        return (
            <BrowserRouter>
                <Routes >
                    {/* LOGIN */}
                    <Route path={`${process.env.REACT_APP_ENV}/login`} element={<LoginScreen  />} />
                    <Route path="*" element={<Navigate from="*" to={`${process.env.REACT_APP_ENV}/login`} />} />
                </Routes>
            </BrowserRouter>
        )
    }
    else {
        return (
            <BrowserRouter>
                <Routes >
                     {/* ALL */}
                    <Route path={"*"} element={<DashboardRoutes />}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
    
}