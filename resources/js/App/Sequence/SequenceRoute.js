import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import SequenceList from "./SequenceList";
import SequenceForm from "./SequenceForm";
import {uuidv4} from "../../Helpers/string";

const SequenceRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}>
                <SequenceList/>
            </Route>
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <SequenceForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <SequenceForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default SequenceRoute;
