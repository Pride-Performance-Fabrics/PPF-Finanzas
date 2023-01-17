import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginScreen from "../screens/Login/LoginScreen";

import { DashboardRoutes } from "./DashboardRoutes";
import { isExpired } from "react-jwt";

export const AppRouter = () => {
    const ppfToken = localStorage.getItem('ppfToken');
    const expired = isExpired(ppfToken);

    return (
        <BrowserRouter>
            <Routes >
                {/* LOGIN */}
                <Route path={`${process.env.REACT_APP_ENV}/login`} element={<LoginScreen />} />
            </Routes>
        </BrowserRouter>
    )
}