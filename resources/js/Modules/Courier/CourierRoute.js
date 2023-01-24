import React from "react";
import manifest from "./__manifest__.json";
import CourierTable from './CourierTable';
import CourierForm from './CourierForm';
import Switcher from "../../Components/Switcher"

const CourierRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: CourierForm},
                {path: `/${displayName}/:id`, component: CourierForm},
                {path: `/${displayName}`, component: CourierTable},
            ]}
        />
    );
};

export default CourierRoute;
