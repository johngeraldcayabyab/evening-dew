import {SEARCH} from "../consts"

const displayName = "stock_location_quantity";

const manifest = {
    "moduleName": "stock_location_quantity",
    "displayName": displayName,
    "queryDefaults": {},
    table: {
        columnSelection: true,
        columns: [
            {
                title: 'Product Name',
                dataIndex: 'product_name',
                key: 'product_name',
                sorter: true,
                // filter: SEARCH,
                // isGlobalSearch: true,
            },
            {
                title: 'Location Name',
                dataIndex: 'location_name',
                key: 'location_name',
                sorter: true,
                // filter: SEARCH,
                // isGlobalSearch: true,
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                sorter: true,
                // filter: SEARCH,
                // isGlobalSearch: true,
            },
        ]
    },
};

export default manifest;
