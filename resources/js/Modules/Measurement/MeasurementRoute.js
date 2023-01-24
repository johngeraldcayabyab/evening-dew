import React from "react";
import manifest from "./__manifest__.json";
import MeasurementTable from './MeasurementTable';
import MeasurementForm from './MeasurementForm';
import Switcher from "../../Components/Switcher"

const MeasurementRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: MeasurementForm},
                {path: `/${displayName}/:id`, component: MeasurementForm},
                {path: `/${displayName}`, component: MeasurementTable},
            ]}
        />
    );
};

export default MeasurementRoute;
