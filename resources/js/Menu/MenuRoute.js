import {Route, Switch} from "react-router-dom";
import {Menu} from "./Menu";
import MenuForm from "./MenuForm";
import React from "react";
import manifest from "./__manifest__.json";

const MenuRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <Menu/>
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
