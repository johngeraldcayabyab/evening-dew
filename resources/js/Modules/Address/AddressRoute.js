import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import AddressList from './AddressList';
import AddressForm from './AddressForm';

const AddressRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={`${displayName}-list`} path={`/${displayName}`}
                   render={props => <AddressList key={props.location.key}/>}/>
            <Route exact key={`${displayName}-create`} path={`/${displayName}/create`}
                   render={props => <AddressForm key={props.location.key}/>}/>
            <Route exact key={`${displayName}-update`} path={`/${displayName}/:id`}
                   render={props => <AddressForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default AddressRoute;
