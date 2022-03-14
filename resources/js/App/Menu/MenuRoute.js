import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import MenuList from "./MenuList";
import MenuForm from "./MenuForm";

const MenuRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <MenuList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <MenuForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <MenuForm/>
            </Route>
        </Switch>
    );
};

export default MenuRoute;
