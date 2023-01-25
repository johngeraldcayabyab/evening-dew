import WarehouseForm from "./WarehouseForm";
import WarehouseTable from "./WarehouseTable";

const displayName = "warehouses";

export default {
    "moduleName": "warehouses",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: WarehouseForm},
        {path: `/${displayName}/:id`, component: WarehouseForm},
        {path: `/${displayName}`, component: WarehouseTable},
    ]
}
