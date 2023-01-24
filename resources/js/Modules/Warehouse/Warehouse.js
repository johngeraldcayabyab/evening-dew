import warehouse_manifest from "./warehouse_manifest.json"
import WarehouseForm from "./WarehouseForm"
import WarehouseTable from "./WarehouseTable"

export default {
    "moduleName": "warehouses",
    "displayName": "warehouses",
    "queryDefaults": {},
    "routes": [
        {path: `/${warehouse_manifest.displayName}/create`, component: WarehouseForm},
        {path: `/${warehouse_manifest.displayName}/:id`, component: WarehouseForm},
        {path: `/${warehouse_manifest.displayName}`, component: WarehouseTable},
    ]
}
