import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import CountryList from "./CountryList";
import CountryForm from "./CountryForm";

const CountryRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <CountryList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <CountryForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <CountryForm/>
            </Route>
        </Switch>
    );
};

export default CountryRoute;
