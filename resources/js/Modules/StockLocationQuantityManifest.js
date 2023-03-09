import {HAS_TABLE} from "../consts"

const manifest = {
    moduleName: "stock_location_quantity",
    displayName: "stock_location_quantity",
    queryDefaults: {},
    routes: [HAS_TABLE],
    table: {
        columnSelection: true,
        columns: [
            {
                title: 'Product Name',
                dataIndex: 'product_name',
                key: 'product_name',
                sorter: true,
            },
            {
                title: 'Location Name',
                dataIndex: 'location_name',
                key: 'location_name',
                sorter: true,
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                sorter: true,
            },
        ]
    },
};

export default manifest;
