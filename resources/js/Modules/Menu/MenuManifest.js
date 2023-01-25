import MenuForm from "./MenuForm";
import MenuTable from "./MenuTable";

const displayName = "menus";

export default {
    "moduleName": "menus",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: MenuForm},
        {path: `/${displayName}/:id`, component: MenuForm},
        {path: `/${displayName}`, component: MenuTable},
    ]
};
