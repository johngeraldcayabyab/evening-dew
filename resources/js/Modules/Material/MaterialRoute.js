import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import MaterialList from "./MaterialList";
import MaterialForm from "./MaterialForm";
import {uuidv4} from "../../Helpers/string";

const MaterialRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <MaterialList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <MaterialForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <MaterialForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default MaterialRoute;
