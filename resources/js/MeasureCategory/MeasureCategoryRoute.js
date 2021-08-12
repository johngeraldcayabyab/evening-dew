import {Route, Switch} from "react-router-dom";
import {MeasureCategory} from "./MeasureCategory";
import MeasureCategoryForm from "./MeasureCategoryForm";
import React from "react";
import MeasureCategoryManifest from "./Manifest";

const MeasureCategoryRoute = () => {
    const moduleName = MeasureCategoryManifest.moduleName;

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
