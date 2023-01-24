import menu_manifest from "./menu_manifest.json"
import MenuForm from "./MenuForm"
import MenuTable from "./MenuTable"

export default {
    "moduleName": "menus",
    "displayName": "menus",
    "queryDefaults": {},
    "routes": [
        {path: `/${menu_manifest.displayName}/create`, component: MenuForm},
        {path: `/${menu_manifest.displayName}/:id`, component: MenuForm},
        {path: `/${menu_manifest.displayName}`, component: MenuTable},
    ]
};
