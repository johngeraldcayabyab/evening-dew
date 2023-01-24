import React from "react";
import manifest from "./__manifest__.json";
import AppMenuTable from './AppMenuTable';
import AppMenuForm from './AppMenuForm';
import Switcher from "../../Components/Switcher"

const AppMenuRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: AppMenuForm},
                {path: `/${displayName}/:id`, component: AppMenuForm},
                {path: `/${displayName}`, component: AppMenuTable},
            ]}
        />
    );
};

export default AppMenuRoute;
