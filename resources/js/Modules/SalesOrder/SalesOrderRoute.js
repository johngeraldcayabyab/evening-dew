import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import SalesOrderTable from './SalesOrderTable';
import SalesOrderForm from './SalesOrderForm';

const SalesOrderRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${displayName}`}
                   render={props => <SalesOrderTable key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/create`}
                   render={props => <SalesOrderForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/:id`}
                   render={props => <SalesOrderForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default SalesOrderRoute;
