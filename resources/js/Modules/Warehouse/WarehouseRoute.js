import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import WarehouseList from "./WarehouseList";
import WarehouseForm from "./WarehouseForm";
import {uuidv4} from "../../Helpers/string";

const WarehouseRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <WarehouseList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <WarehouseForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <WarehouseForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default WarehouseRoute;
