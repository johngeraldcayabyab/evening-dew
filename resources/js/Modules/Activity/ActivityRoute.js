import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import ActivityTable from './ActivityTable';

const ActivityRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={`${displayName}-list`} path={`/${displayName}`}
                   render={props => <ActivityTable key={props.location.key}/>}/>
        </Switch>
    );
};

export default ActivityRoute;
