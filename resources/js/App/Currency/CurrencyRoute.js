import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import CurrencyList from "./CurrencyList";
import CurrencyForm from "./CurrencyForm";

const CurrencyRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <CurrencyList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <CurrencyForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <CurrencyForm/>
            </Route>
        </Switch>
    );
};

export default CurrencyRoute;
