import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import AccessRightTable from './AccessRightTable';
import AccessRightForm from './AccessRightForm';

const AccessRightRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={`${displayName}-list`} path={`/${displayName}`}
                   render={props => <AccessRightTable key={props.location.key}/>}/>
            <Route exact key={`${displayName}-create`} path={`/${displayName}/create`}
                   render={props => <AccessRightForm key={props.location.key}/>}/>
            <Route exact key={`${displayName}-update`} path={`/${displayName}/:id`}
                   render={props => <AccessRightForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default AccessRightRoute;
