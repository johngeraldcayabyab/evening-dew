import React from "react";
import manifest from "./__manifest__.json";
import SalesOrderLineTable from './SalesOrderLineTable';
import Switcher from "../../Components/Switcher"

const SalesOrderLineRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}`, component: SalesOrderLineTable},
            ]}
        />
    );
};

export default SalesOrderLineRoute;
