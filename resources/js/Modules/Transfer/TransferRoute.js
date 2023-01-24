import React from "react";
import manifest from "./__manifest__.json";
import TransferTable from './TransferTable';
import TransferForm from './TransferForm';
import Switcher from "../../Components/Switcher"

const TransferRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: TransferForm},
                {path: `/${displayName}/:id`, component: TransferForm},
                {path: `/${displayName}`, component: TransferTable},
            ]}
        />
    );
};

export default TransferRoute;
