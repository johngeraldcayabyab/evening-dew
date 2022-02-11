import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

const AddressRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <AddressList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <AddressForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <AddressForm/>
            </Route>
        </Switch>
    );
};

export default AddressRoute;
