import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

const SalesOrderList = React.lazy(() => import('./SalesOrderList'));
const SalesOrderForm = React.lazy(() => import('./SalesOrderForm'));

const SalesOrderRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <SalesOrderList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <SalesOrderForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <SalesOrderForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default SalesOrderRoute;
