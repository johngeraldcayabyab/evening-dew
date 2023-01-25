import SalesOrderForm from "./SalesOrderForm";
import SalesOrderTable from "./SalesOrderTable";

const displayName = "sales_orders";

export default {
    "moduleName": "sales_orders",
    "displayName": "sales_orders",
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: SalesOrderForm},
        {path: `/${displayName}/:id`, component: SalesOrderForm},
        {path: `/${displayName}`, component: SalesOrderTable},
    ]
};
