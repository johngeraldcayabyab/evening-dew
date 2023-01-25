import AppMenuForm from "./AppMenuForm";
import AppMenuTable from "./AppMenuTable";

const displayName = "app_menus";

export default {
    "moduleName": "app_menus",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: AppMenuForm},
        {path: `/${displayName}/:id`, component: AppMenuForm},
        {path: `/${displayName}`, component: AppMenuTable},
    ]
};
