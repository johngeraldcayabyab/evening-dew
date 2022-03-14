import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import OperationTypeList from "./OperationTypeList";
import OperationTypeForm from "./OperationTypeForm";

const OperationTypeRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <OperationTypeList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <OperationTypeForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <OperationTypeForm/>
            </Route>
        </Switch>
    );
};

export default OperationTypeRoute;
