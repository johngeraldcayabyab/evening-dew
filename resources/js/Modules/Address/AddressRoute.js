import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import AddressList from './AddressList';
import AddressForm from './AddressForm';

const AddressRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}-list`} path={`/${moduleName}`}
                   render={props => <AddressList key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-create`} path={`/${moduleName}/create`}
                   render={props => <AddressForm key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-update`} path={`/${moduleName}/:id`}
                   render={props => <AddressForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default AddressRoute;
