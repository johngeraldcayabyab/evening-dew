import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import GlobalSettingForm from "./GlobalSettingForm";
import {uuidv4} from "../../Helpers/string";

const GlobalSettingRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}>
                <GlobalSettingForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default GlobalSettingRoute;
