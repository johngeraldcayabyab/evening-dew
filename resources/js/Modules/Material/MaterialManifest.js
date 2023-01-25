import MaterialForm from "./MaterialForm";
import MaterialTable from "./MaterialTable";

const displayName = "materials";

export default {
    "moduleName": "materials",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: MaterialForm},
        {path: `/${displayName}/:id`, component: MaterialForm},
        {path: `/${displayName}`, component: MaterialTable},
    ]
};
