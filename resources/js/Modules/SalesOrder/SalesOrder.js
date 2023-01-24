import sales_order_manifest from "./sales_order_manifest.json"
import SalesOrderForm from "./SalesOrderForm"
import SalesOrderTable from "./SalesOrderTable"

export default {
    "moduleName": "sales_orders",
    "displayName": "sales_orders",
    "queryDefaults": {},
    "routes": [
        {path: `/${sales_order_manifest.displayName}/create`, component: SalesOrderForm},
        {path: `/${sales_order_manifest.displayName}/:id`, component: SalesOrderForm},
        {path: `/${sales_order_manifest.displayName}`, component: SalesOrderTable},
    ]
};
