import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import StockMovementList from "./StockMovementList";
import StockMovementForm from "./StockMovementForm";
import {uuidv4} from "../../Helpers/string";

const StockMovementRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}>
                <StockMovementList/>
            </Route>
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
