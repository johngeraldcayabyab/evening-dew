import React from "react";
import manifest from "./__manifest__.json";
import OperationTypeTable from './OperationTypeTable';
import OperationTypeForm from './OperationTypeForm';
import Switcher from "../../Components/Switcher"

const OperationTypeRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: OperationTypeForm},
                {path: `/${displayName}/:id`, component: OperationTypeForm},
                {path: `/${displayName}`, component: OperationTypeTable},
            ]}
        />
    );
};

export default OperationTypeRoute;
