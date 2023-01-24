import React from "react";
import manifest from "./__manifest__.json";
import RegionTable from './RegionTable';
import RegionForm from './RegionForm';
import Switcher from "../../Components/Switcher"

const RegionRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: RegionForm},
                {path: `/${displayName}/:id`, component: RegionForm},
                {path: `/${displayName}`, component: RegionTable},
            ]}
        />
    );
};

export default RegionRoute;
