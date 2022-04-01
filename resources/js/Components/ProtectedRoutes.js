import {Route} from "react-router-dom";
import React from "react";

const ProtectedRoutes = (props) => {
    const name = props.name;
    const type = props.type;
    const key = `${name}-${type}`;
    const Component = props.component;
    let path;
    if (type === 'list') {
        path = `/${name}`;
    } else if (type === 'create') {
        path = `/${name}/create`;
    } else if (type === 'updated') {
        path = `/${name}/:id`;
    }


    return (
        <Route
            exact
            key={key}
            path={path}
            component={Component}
        />
    );
};

export default ProtectedRoutes;
