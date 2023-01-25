import StockMovementForm from "./StockMovementForm";
import StockMovementTable from "./StockMovementTable";

const displayName = "stock_movements";

export default {
    "moduleName": "stock_movements",
    "displayName": displayName,
    "queryDefaults": {},
    routes: [
        {path: `/${displayName}/create`, component: StockMovementForm},
        {path: `/${displayName}/:id`, component: StockMovementForm},
        {path: `/${displayName}`, component: StockMovementTable},
    ]
};
