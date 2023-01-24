import app_menu_manifest from "./app_menu_manifest.json"
import AppMenuForm from "./AppMenuForm"
import AppMenuTable from "./AppMenuTable"

export default {
    "moduleName": "app_menus",
    "displayName": "app_menus",
    "queryDefaults": {},
    "routes": [
        {path: `/${app_menu_manifest.displayName}/create`, component: AppMenuForm},
        {path: `/${app_menu_manifest.displayName}/:id`, component: AppMenuForm},
        {path: `/${app_menu_manifest.displayName}`, component: AppMenuTable},
    ]
};
