import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import GroupTable from './GroupTable';
import GroupForm from './GroupForm';

const GroupRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${displayName}`}
                   render={props => <GroupTable key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/create`}
                   render={props => <GroupForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/:id`}
                   render={props => <GroupForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default GroupRoute;
