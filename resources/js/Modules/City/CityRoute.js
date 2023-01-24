import React from "react";
import manifest from "./__manifest__.json";
import CityTable from './CityTable';
import CityForm from './CityForm';
import Switcher from "../../Components/Switcher"

const CityRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: CityForm},
                {path: `/${displayName}/:id`, component: CityForm},
                {path: `/${displayName}`, component: CityTable},
            ]}
        />
    );
};

export default CityRoute;
