import React from "react";
import manifest from "./__manifest__.json";
import MeasurementCategoryTable from './MeasurementCategoryTable';
import MeasurementCategoryForm from './MeasurementCategoryForm';
import Switcher from "../../Components/Switcher"

const MeasurementCategoryRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: MeasurementCategoryForm},
                {path: `/${displayName}/:id`, component: MeasurementCategoryForm},
                {path: `/${displayName}`, component: MeasurementCategoryTable},
            ]}
        />
    );
};

export default MeasurementCategoryRoute;
