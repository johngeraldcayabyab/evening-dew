import sales_order_line_manifest from "./sales_order_line_manifest.json"
import SalesOrderLineTable from "./SalesOrderLineTable"

export default {
    "moduleName": "sales_order_lines",
    "displayName": "sales_order_lines",
    "queryDefaults": {
        "group_by": "product_id,shipping_date",
        "aggregate_by": "quantity",
        "aggregate_type": "SUM",
        "orderByColumn": "shipping_date",
        "orderByDirection": "desc",
        "has": "product",
        "has_field": "product_type",
        "has_value": "storable"
    },
    "routes": [
        {path: `/${sales_order_line_manifest.displayName}`, component: SalesOrderLineTable},
    ]
};
