import React from "react";
import manifest from "./__manifest__.json";
import MenuTable from './MenuTable';
import MenuForm from './MenuForm';
import Switcher from "../../Components/Switcher"

const MenuRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: MenuForm},
                {path: `/${displayName}/:id`, component: MenuForm},
                {path: `/${displayName}`, component: MenuTable},
            ]}
        />
    );
};

export default MenuRoute;
