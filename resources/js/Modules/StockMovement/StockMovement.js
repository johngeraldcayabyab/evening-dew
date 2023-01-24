import stock_movement_manifest from "./stock_movement_manifest.json"
import StockMovementForm from "./StockMovementForm"
import StockMovementTable from "./StockMovementTable"

export default {
    "moduleName": "stock_movements",
    "displayName": "stock_movements",
    "queryDefaults": {},
    routes: [
        {path: `/${stock_movement_manifest.displayName}/create`, component: StockMovementForm},
        {path: `/${stock_movement_manifest.displayName}/:id`, component: StockMovementForm},
        {path: `/${stock_movement_manifest.displayName}`, component: StockMovementTable},
    ]
};
