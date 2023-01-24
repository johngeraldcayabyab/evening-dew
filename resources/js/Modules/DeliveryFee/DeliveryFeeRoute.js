import React from "react";
import manifest from "./__manifest__.json";
import DeliveryFeeTable from './DeliveryFeeTable';
import DeliveryFeeForm from './DeliveryFeeForm';
import Switcher from "../../Components/Switcher"

const DeliveryFeeRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: DeliveryFeeForm},
                {path: `/${displayName}/:id`, component: DeliveryFeeForm},
                {path: `/${displayName}`, component: DeliveryFeeTable},
            ]}
        />
    );
};

export default DeliveryFeeRoute;
