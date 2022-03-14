import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import MeasurementCategoryList from "./MeasurementCategoryList";
import MeasurementCategoryForm from "./MeasurementCategoryForm";

const MeasurementCategoryRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <MeasurementCategoryList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <MeasurementCategoryForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <MeasurementCategoryForm/>
            </Route>
        </Switch>
    );
};

export default MeasurementCategoryRoute;
