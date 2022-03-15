import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import CurrencyList from "./CurrencyList";
import CurrencyForm from "./CurrencyForm";
import {uuidv4} from "../../Helpers/string";

const CurrencyRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}>
                <CurrencyList/>
            </Route>
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <CurrencyForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <CurrencyForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default CurrencyRoute;
