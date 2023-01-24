import React from "react";
import manifest from "./__manifest__.json";
import AccessRightTable from './AccessRightTable';
import AccessRightForm from './AccessRightForm';
import Switcher from "../../Components/Switcher"

const AccessRightRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: AccessRightForm},
                {path: `/${displayName}/:id`, component: AccessRightForm},
                {path: `/${displayName}`, component: AccessRightTable},
            ]}
        />
    );
};

export default AccessRightRoute;
