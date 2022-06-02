import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import OperationTypeTable from './OperationTypeTable';
import OperationTypeForm from './OperationTypeForm';

const OperationTypeRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <OperationTypeTable key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <OperationTypeForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <OperationTypeForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default OperationTypeRoute;
