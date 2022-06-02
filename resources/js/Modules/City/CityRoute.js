import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import CityTable from './CityTable';
import CityForm from './CityForm';

const CityRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switch>
            <Route exact key={`${displayName}-list`} path={`/${displayName}`}
                   render={props => <CityTable key={props.location.key}/>}/>
            <Route exact key={`${displayName}-create`} path={`/${displayName}/create`}
                   render={props => <CityForm key={props.location.key}/>}/>
            <Route exact key={`${displayName}-update`} path={`/${displayName}/:id`}
                   render={props => <CityForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default CityRoute;
