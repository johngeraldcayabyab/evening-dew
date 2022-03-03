import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import StockMovementList from "./StockMovementList";
import StockMovementForm from "./StockMovementForm";

const StockMovementRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <StockMovementList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <StockMovementForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <StockMovementForm/>
            </Route>
        </Switch>
    );
};

export default StockMovementRoute;
