import {Route} from "react-router-dom";
import React from "react";
import Login from './Login';

const LoginRoute = () => {
    return <Route key={'login-route'} path={`/login`} element={<Login/>}/>;
};

export default LoginRoute;
