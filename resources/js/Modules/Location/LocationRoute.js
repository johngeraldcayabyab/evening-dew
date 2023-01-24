import React from "react";
import manifest from "./__manifest__.json";
import LocationTable from './LocationTable';
import LocationForm from './LocationForm';
import Switcher from "../../Components/Switcher"

const LocationRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: LocationForm},
                {path: `/${displayName}/:id`, component: LocationForm},
                {path: `/${displayName}`, component: LocationTable},
            ]}
        />
    );
};

export default LocationRoute;
