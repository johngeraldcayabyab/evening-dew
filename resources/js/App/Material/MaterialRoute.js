import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import MaterialList from "./MaterialList";
import MaterialForm from "./MaterialForm";

const MaterialRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <MaterialList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <MaterialForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <MaterialForm/>
            </Route>
        </Switch>
    );
};

export default MaterialRoute;
