import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import TransferList from "./TransferList";
import TransferForm from "./TransferForm";

const TransferRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <TransferList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <TransferForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <TransferForm/>
            </Route>
        </Switch>
    );
};

export default TransferRoute;
