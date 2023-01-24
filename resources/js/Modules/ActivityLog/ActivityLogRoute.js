import React from "react";
import manifest from "./__manifest__.json";
import ActivityLogTable from './ActivityLogTable';
import Switcher from "../../Components/Switcher"

const ActivityLogRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}`, component: ActivityLogTable},
            ]}
        />
    );
};

export default ActivityLogRoute;
