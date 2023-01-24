import React from "react";
import manifest from "./__manifest__.json";
import SourceTable from './SourceTable';
import SourceForm from './SourceForm';
import Switcher from "../../Components/Switcher"

const SourceRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: SourceForm},
                {path: `/${displayName}/:id`, component: SourceForm},
                {path: `/${displayName}`, component: SourceTable},
            ]}
        />
    );
};

export default SourceRoute;
