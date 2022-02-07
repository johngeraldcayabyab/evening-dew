import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import SequenceList from "./SequenceList";
import SequenceForm from "./SequenceForm";

const SequenceRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <SequenceList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <SequenceForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <SequenceForm/>
            </Route>
        </Switch>
    );
};

export default SequenceRoute;
