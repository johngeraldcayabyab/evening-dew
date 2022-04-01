import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

const MaterialList = React.lazy(() => import('./MaterialList'));
const MaterialForm = React.lazy(() => import('./MaterialForm'));

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
