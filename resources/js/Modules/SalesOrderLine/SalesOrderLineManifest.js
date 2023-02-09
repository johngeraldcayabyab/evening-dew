import TableGenerator from "../../Components/TableGenerator"
import {DATE_RANGE, SEARCH} from "../../consts"

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
        {path: `/${displayName}`, component: () => (<TableGenerator {...manifest} />)},
    ],
    table: {
        columnSelection: true,
        columns: [
            {
                title: 'Shipping date',
                dataIndex: 'shipping_date',
                key: 'shipping_date',
                sorter: true,
                filter: DATE_RANGE,
            },
            {
                title: 'Product',
                dataIndex: 'product',
                key: 'product',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.product) {
                        return record.product.name;
                    }
                    return '';
                },
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
