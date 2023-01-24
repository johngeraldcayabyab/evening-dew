import React from "react";
import manifest from "./__manifest__.json";
import SalesOrderTable from './SalesOrderTable';
import SalesOrderForm from './SalesOrderForm';
import Switcher from "../../Components/Switcher"

const SalesOrderRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: SalesOrderForm},
                {path: `/${displayName}/:id`, component: SalesOrderForm},
                {path: `/${displayName}`, component: SalesOrderTable},
            ]}
        />
    );
};

export default SalesOrderRoute;
