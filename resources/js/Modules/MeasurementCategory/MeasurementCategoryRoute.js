import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import MeasurementCategoryList from './MeasurementCategoryList';
import MeasurementCategoryForm from './MeasurementCategoryForm';

const MeasurementCategoryRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <MeasurementCategoryList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <MeasurementCategoryForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <MeasurementCategoryForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default MeasurementCategoryRoute;
