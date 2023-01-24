import React from "react";
import manifest from "./__manifest__.json";
import CountryTable from './CountryTable';
import CountryForm from './CountryForm';
import Switcher from "../../Components/Switcher"

const CountryRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: CountryForm},
                {path: `/${displayName}/:id`, component: CountryForm},
                {path: `/${displayName}`, component: CountryTable},
            ]}
        />
    );
};

export default CountryRoute;
