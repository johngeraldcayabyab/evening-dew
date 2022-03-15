import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import TransferList from "./TransferList";
import TransferForm from "./TransferForm";
import {uuidv4} from "../../Helpers/string";

const TransferRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}>
                <TransferList/>
            </Route>
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <TransferForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <TransferForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default TransferRoute;
