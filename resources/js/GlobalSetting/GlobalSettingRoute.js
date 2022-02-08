import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import GlobalSettingForm from "./GlobalSettingForm";

const GlobalSettingRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_standalone`} path={`/${moduleName}`}>
                <GlobalSettingForm/>
            </Route>
        </Switch>
    );
};

export default GlobalSettingRoute;
