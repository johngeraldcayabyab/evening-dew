import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import LocationList from "./LocationList";
import LocationForm from "./LocationForm";

const LocationRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <LocationList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <LocationForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <LocationForm/>
            </Route>
        </Switch>
    );
};

export default LocationRoute;
