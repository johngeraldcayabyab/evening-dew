import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";

import SourceTable from './SourceTable';
import SourceForm from './SourceForm';

const SourceRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}-list`} path={`/${moduleName}`}
                   render={props => <SourceTable key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-create`} path={`/${moduleName}/create`}
                   render={props => <SourceForm key={props.location.key}/>}/>
            <Route exact key={`${moduleName}-update`} path={`/${moduleName}/:id`}
                   render={props => <SourceForm key={props.location.key}/>}/>
        </Switch>
    );
};

export default SourceRoute;
