import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

const AppMenuList = React.lazy(() => import('./AppMenuList'));
const AppMenuForm = React.lazy(() => import('./AppMenuForm'));

const AppMenuRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <AppMenuList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <AppMenuForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <AppMenuForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default AppMenuRoute;
