import {DATE_RANGE, SEARCH} from "../consts"

const displayName = "stock_location_quantity";

const manifest = {
    "moduleName": "stock_location_quantity",
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
    table: {
        columnSelection: true,
        columns: [
            {
                title: 'Product Name',
                dataIndex: 'product_name',
                key: 'product_name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Location Name',
                dataIndex: 'location_name',
                key: 'location_name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
        ]
    },
};

export default manifest;
