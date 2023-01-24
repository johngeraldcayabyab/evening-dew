import React from "react";
import manifest from "./__manifest__.json";
import StockMovementTable from './StockMovementTable';
import StockMovementForm from './StockMovementForm';
import Switcher from "../../Components/Switcher"

const StockMovementRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: StockMovementForm},
                {path: `/${displayName}/:id`, component: StockMovementForm},
                {path: `/${displayName}`, component: StockMovementTable},
            ]}
        />
    );
};

export default StockMovementRoute;
