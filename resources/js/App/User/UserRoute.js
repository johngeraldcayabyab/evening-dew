import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import UserList from "./UserList";
import UserForm from "./UserForm";

const UserRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <UserList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <UserForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <UserForm/>
            </Route>
        </Switch>
    );
};

export default UserRoute;
