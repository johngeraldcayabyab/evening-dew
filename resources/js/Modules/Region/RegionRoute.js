import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import RegionList from './RegionList';
import RegionForm from './RegionForm';

const RegionRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}-list`} path={`/${moduleName}`}
                   render={props => <RegionList key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-create`} path={`/${moduleName}/create`}
                   render={props => <RegionForm key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-update`} path={`/${moduleName}/:id`}
                   render={props => <RegionForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default RegionRoute;
