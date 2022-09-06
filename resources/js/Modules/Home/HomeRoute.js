import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";
import Home from "./Home";


const HomeRoute = () => {
    const displayName = manifest.displayName;
    return (<Switch>
            <Route exact key={uuidv4()} path={`/`}>
                <Redirect to={`/${displayName}`}/>
            </Route>
            <Route exact key={uuidv4()} path={`/${displayName}`}
                   render={props => <Home key={props.location.key}/>}
            />
        </Switch>);
};

export default HomeRoute;
