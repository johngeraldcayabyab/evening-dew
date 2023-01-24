import React from "react";
import manifest from "./__manifest__.json";
import AddressTable from './AddressTable';
import AddressForm from './AddressForm';
import Switcher from "../../Components/Switcher"

const AddressRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: AddressForm},
                {path: `/${displayName}/:id`, component: AddressForm},
                {path: `/${displayName}`, component: AddressTable},
            ]}
        />
    );
};

export default AddressRoute;
