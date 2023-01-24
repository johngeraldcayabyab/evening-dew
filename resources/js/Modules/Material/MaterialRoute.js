import React from "react";
import manifest from "./__manifest__.json";
import MaterialTable from './MaterialTable';
import MaterialForm from './MaterialForm';
import Switcher from "../../Components/Switcher"

const MaterialRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: MaterialForm},
                {path: `/${displayName}/:id`, component: MaterialForm},
                {path: `/${displayName}`, component: MaterialTable},
            ]}
        />
    );
};

export default MaterialRoute;
