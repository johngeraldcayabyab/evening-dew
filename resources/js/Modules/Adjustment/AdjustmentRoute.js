import React from "react";
import manifest from "./__manifest__.json";
import AdjustmentTable from './AdjustmentTable';
import AdjustmentForm from './AdjustmentForm';
import Switcher from "../../Components/Switcher"

const AdjustmentRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: AdjustmentForm},
                {path: `/${displayName}/:id`, component: AdjustmentForm},
                {path: `/${displayName}`, component: AdjustmentTable},
            ]}
        />
    );
};

export default AdjustmentRoute;
