import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import SameDayTable from './SameDayTable';
import SameDayForm from './SameDayForm';

const SameDayRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${displayName}`}
                   render={props => <SameDayTable key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/create`}
                   render={props => <SameDayForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${displayName}/:id`}
                   render={props => <SameDayForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default SameDayRoute;
