import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import AdjustmentList from "./AdjustmentList";
import AdjustmentForm from "./AdjustmentForm";
import {uuidv4} from "../../Helpers/string";

const AdjustmentRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <AdjustmentList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <AdjustmentForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <AdjustmentForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default AdjustmentRoute;
