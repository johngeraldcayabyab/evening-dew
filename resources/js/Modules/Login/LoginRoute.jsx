import {Route, Routes} from "react-router-dom";
import React from "react";
import Login from './Login';

const LoginRoute = () => {
    return (
        <Routes>
            <Route key={'login-route'} path={`/login`} element={<Login/>}/>
        </Routes>
    )
};

export default LoginRoute;
