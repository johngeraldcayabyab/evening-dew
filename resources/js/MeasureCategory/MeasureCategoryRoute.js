import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import MeasureCategory from "./MeasureCategory";
import MeasureCategoryForm from "./MeasureCategoryForm";

const MeasureCategoryRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <MeasureCategory/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <MeasureCategoryForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <MeasureCategoryForm/>
            </Route>
        </Switch>
    );
};

export default MeasureCategoryRoute;
