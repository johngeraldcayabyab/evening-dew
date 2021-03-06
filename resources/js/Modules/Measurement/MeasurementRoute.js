import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import MeasurementTable from './MeasurementTable';
import MeasurementForm from './MeasurementForm';

const MeasurementRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <MeasurementTable key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <MeasurementForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <MeasurementForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default MeasurementRoute;
