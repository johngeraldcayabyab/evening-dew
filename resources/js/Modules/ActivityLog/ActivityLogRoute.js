import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import ActivityLogTable from './ActivityLogTable';

const ActivityLogRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={`${displayName}-list`} path={`/${displayName}`}
                   render={props => <ActivityLogTable key={props.location.key}/>}/>
        </Switch>
    );
};

export default ActivityLogRoute;
