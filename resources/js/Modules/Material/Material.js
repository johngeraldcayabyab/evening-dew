import material_manifest from "./material_manifest.json"
import MaterialForm from "./MaterialForm"
import MaterialTable from "./MaterialTable"

export default {
    "moduleName": "materials",
    "displayName": "materials",
    "queryDefaults": {},
    "routes": [
        {path: `/${material_manifest.displayName}/create`, component: MaterialForm},
        {path: `/${material_manifest.displayName}/:id`, component: MaterialForm},
        {path: `/${material_manifest.displayName}`, component: MaterialTable},
    ]
};
