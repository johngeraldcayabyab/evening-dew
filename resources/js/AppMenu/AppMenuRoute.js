import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import AppMenuList from "./AppMenuList";
import AppMenuForm from "./AppMenuForm";

const AppMenuRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <AppMenuList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <AppMenuForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <AppMenuForm/>
            </Route>
        </Switch>
    );
};

export default AppMenuRoute;
