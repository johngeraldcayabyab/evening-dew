import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import MeasurementForm from "./MeasurementForm";
import Measurement from "./Measurement";


const MeasurementRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <Measurement/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <MeasurementForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <MeasurementForm/>
            </Route>
        </Switch>
    );
};

export default MeasurementRoute;
