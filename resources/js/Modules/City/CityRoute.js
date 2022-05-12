import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import CityList from './CityList';
import CityForm from './CityForm';

const CityRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}-list`} path={`/${moduleName}`}
                   render={props => <CityList key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-create`} path={`/${moduleName}/create`}
                   render={props => <CityForm key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-update`} path={`/${moduleName}/:id`}
                   render={props => <CityForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default CityRoute;
