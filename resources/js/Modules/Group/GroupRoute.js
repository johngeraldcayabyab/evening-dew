import React from "react";
import manifest from "./__manifest__.json";
import GroupTable from './GroupTable';
import GroupForm from './GroupForm';
import Switcher from "../../Components/Switcher"

const GroupRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: GroupForm},
                {path: `/${displayName}/:id`, component: GroupForm},
                {path: `/${displayName}`, component: GroupTable},
            ]}
        />
    );
};

export default GroupRoute;
