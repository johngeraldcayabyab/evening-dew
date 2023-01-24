import React from "react";
import manifest from "./__manifest__.json";
import UserTable from './UserTable';
import UserForm from './UserForm';
import Switcher from "../../Components/Switcher"

const UserRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: UserForm},
                {path: `/${displayName}/:id`, component: UserForm},
                {path: `/${displayName}`, component: UserTable},
            ]}
        />
    );
};

export default UserRoute;
