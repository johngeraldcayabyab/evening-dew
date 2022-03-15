import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import UserList from "./UserList";
import UserForm from "./UserForm";
import {uuidv4} from "../../Helpers/string";

const UserRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}>
                <UserList/>
            </Route>
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <UserForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <UserForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default UserRoute;
