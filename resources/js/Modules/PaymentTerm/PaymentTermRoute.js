import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import PaymentTermList from './PaymentTermList';
import PaymentTermForm from './PaymentTermForm';

const PaymentTermRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${displayName}`}
                   render={props => <PaymentTermList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/create`}
                   render={props => <PaymentTermForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/:id`}
                   render={props => <PaymentTermForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default PaymentTermRoute;
