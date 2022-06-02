import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import MaterialTable from './MaterialTable';
import MaterialForm from './MaterialForm';

const MaterialRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${displayName}`}
                   render={props => <MaterialTable key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/create`}
                   render={props => <MaterialForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/:id`}
                   render={props => <MaterialForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default MaterialRoute;
