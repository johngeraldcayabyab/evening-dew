import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import SalesOrderLineTable from './SalesOrderLineTable';

const SalesOrderLineRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${displayName}`}
                   render={props => <SalesOrderLineTable key={props.location.key}/>}
            />
        </Switch>
    );
};

export default SalesOrderLineRoute;
