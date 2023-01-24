import React from "react";
import manifest from "./__manifest__.json";
import GlobalSettingForm from './GlobalSettingForm';
import Switcher from "../../Components/Switcher"

const GlobalSettingRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}`, component: GlobalSettingForm},
            ]}
        />
    );
};

export default GlobalSettingRoute;
