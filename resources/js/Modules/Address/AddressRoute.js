import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import AddressTable from './AddressTable';
import AddressForm from './AddressForm';

const AddressRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={`${displayName}-list`} path={`/${displayName}`}
                   render={props => <AddressTable key={props.location.key}/>}/>
            <Route exact key={`${displayName}-create`} path={`/${displayName}/create`}
                   render={props => <AddressForm key={props.location.key}/>}/>
            <Route exact key={`${displayName}-update`} path={`/${displayName}/:id`}
                   render={props => <AddressForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default AddressRoute;
