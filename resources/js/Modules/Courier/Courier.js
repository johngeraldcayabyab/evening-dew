import courier_manifest from "./courier_manifest.json"
import CourierForm from "./CourierForm"
import CourierTable from "./CourierTable"

export default {
    "moduleName": "couriers",
    "displayName": "couriers",
    "queryDefaults": {},
    "routes": [
        {path: `/${courier_manifest.displayName}/create`, component: CourierForm},
        {path: `/${courier_manifest.displayName}/:id`, component: CourierForm},
        {path: `/${courier_manifest.displayName}`, component: CourierTable},
    ]
};
