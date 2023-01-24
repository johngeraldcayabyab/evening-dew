import React from "react";
import manifest from "./__manifest__.json";
import WarehouseTable from './WarehouseTable';
import WarehouseForm from './WarehouseForm';
import Switcher from "../../Components/Switcher"

const WarehouseRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: WarehouseForm},
                {path: `/${displayName}/:id`, component: WarehouseForm},
                {path: `/${displayName}`, component: WarehouseTable},
            ]}
        />
    );
};

export default WarehouseRoute;
