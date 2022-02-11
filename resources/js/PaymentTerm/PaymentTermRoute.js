import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import PaymentTermList from "./PaymentTermList";
import PaymentTermForm from "./PaymentTermForm";

const PaymentTermRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <PaymentTermList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <PaymentTermForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <PaymentTermForm/>
            </Route>
        </Switch>
    );
};

export default PaymentTermRoute;
