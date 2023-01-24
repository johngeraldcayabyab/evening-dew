import React from "react";
import manifest from "./__manifest__.json";
import SequenceTable from './SequenceTable';
import SequenceForm from './SequenceForm';
import Switcher from "../../Components/Switcher"

const SequenceRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: SequenceForm},
                {path: `/${displayName}/:id`, component: SequenceForm},
                {path: `/${displayName}`, component: SequenceTable},
            ]}
        />
    );
};

export default SequenceRoute;
