import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import WarehouseList from "./WarehouseList";
import WarehouseForm from "./WarehouseForm";

const WarehouseRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <WarehouseList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <WarehouseForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <WarehouseForm/>
            </Route>
        </Switch>
    );
};

export default WarehouseRoute;
