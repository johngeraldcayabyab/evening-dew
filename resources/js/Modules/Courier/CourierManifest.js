import CourierForm from "./CourierForm";
import CourierTable from "./CourierTable";

const displayName = "couriers";

export default {
    "moduleName": "couriers",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: CourierForm},
        {path: `/${displayName}/:id`, component: CourierForm},
        {path: `/${displayName}`, component: CourierTable},
    ]
};
