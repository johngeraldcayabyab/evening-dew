import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

const StockMovementList = React.lazy(() => import('./StockMovementList'));
const StockMovementForm = React.lazy(() => import('./StockMovementForm'));

const StockMovementRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <StockMovementList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <StockMovementForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <StockMovementForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default StockMovementRoute;
