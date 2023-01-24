import React from "react";
import manifest from "./__manifest__.json";
import CurrencyTable from './CurrencyTable';
import CurrencyForm from './CurrencyForm';
import Switcher from "../../Components/Switcher"

const CurrencyRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: CurrencyForm},
                {path: `/${displayName}/:id`, component: CurrencyForm},
                {path: `/${displayName}`, component: CurrencyTable},
            ]}
        />
    );
};

export default CurrencyRoute;
