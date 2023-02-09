import SalesOrderLineTable from "./SalesOrderLineTable"

const displayName = "sales_order_lines";

const manifest = {
    "moduleName": "sales_order_lines",
    "displayName": displayName,
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
        {path: `/${displayName}`, component: SalesOrderLineTable},
    ]
};

export default manifest;
