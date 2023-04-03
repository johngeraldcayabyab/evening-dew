import {Route, Switch} from "react-router-dom";
import {uuidv4} from "../../Helpers/string";
import React from "react";

import Login from './Login';

const LoginRoute = () => {
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/login`}>
                <Login/>
            </Route>
        </Switch>
    )
};

export default LoginRoute;
