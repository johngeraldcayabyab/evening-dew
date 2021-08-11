import {Route, Switch} from "react-router-dom";
import {MeasureCategory} from "./MeasureCategory";
import MeasureCategoryForm from "./MeasureCategoryForm";
import React from "react";

const MeasureCategoryRoute = () => {
    const moduleName = 'measures_categories';

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
