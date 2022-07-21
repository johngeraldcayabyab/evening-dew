import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import CourierTable from './CourierTable';
import CourierForm from './CourierForm';

const CourierRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}-list`} path={`/${moduleName}`}
                   render={props => <CourierTable key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-create`} path={`/${moduleName}/create`}
                   render={props => <CourierForm key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-update`} path={`/${moduleName}/:id`}
                   render={props => <CourierForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default CourierRoute;
