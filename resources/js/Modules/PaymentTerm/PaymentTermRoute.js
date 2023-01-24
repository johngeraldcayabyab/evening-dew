import React from "react";
import manifest from "./__manifest__.json";
import PaymentTermTable from './PaymentTermTable';
import PaymentTermForm from './PaymentTermForm';
import Switcher from "../../Components/Switcher"

const PaymentTermRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: PaymentTermForm},
                {path: `/${displayName}/:id`, component: PaymentTermForm},
                {path: `/${displayName}`, component: PaymentTermTable},
            ]}
        />
    );
};

export default PaymentTermRoute;
