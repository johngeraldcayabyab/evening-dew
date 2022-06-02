import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import DeliveryFeeTable from './DeliveryFeeTable';
import DeliveryFeeForm from './DeliveryFeeForm';

const DeliveryFeeRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${displayName}`}
                   render={props => <DeliveryFeeTable key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/create`}
                   render={props => <DeliveryFeeForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/:id`}
                   render={props => <DeliveryFeeForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default DeliveryFeeRoute;
