import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "stock_movements",
    displayName: "stock_movements",
    queryDefaults: {},
    routes: [HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE],
    table: {
        columnSelection: true,
        columns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: true,
                hidden: true,
            },
            {
                title: 'Reference',
                dataIndex: 'reference',
                key: 'reference',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Source',
                dataIndex: 'source',
                key: 'source',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
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
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'From',
                dataIndex: 'source_location',
                key: 'source_location',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.source_location) {
                        return record.source_location.parents;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'To',
                dataIndex: 'destination_location',
                key: 'destination_location',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.destination_location) {
                        return record.destination_location.parents;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Quantity Done',
                dataIndex: 'quantity_done',
                key: 'quantity_done',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            },
        ]
    },
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'reference',
                    label: 'Reference',
                    required: true,
                },
                {
                    type: 'text',
                    name: 'source',
                    label: 'Source',
                },
                {
                    type: 'select',
                    name: 'product_id',
                    label: 'Product',
                    query: {url: '/api/products', field: 'name'},
                    required: true
                },
                {
                    type: 'select',
                    name: 'source_location_id',
                    label: 'Please select source location',
                    query: {url: '/api/locations', field: 'name'},
                    required: true
                },
                {
                    type: 'select',
                    name: 'destination_location_id',
                    label: 'Please select destination location',
                    query: {url: '/api/locations', field: 'name'},
                    required: true
                },
                {
                    type: 'number',
                    name: 'quantity_done',
                    label: 'Quantity',
                    required: true
                },
            ]
        }
    }
};

export default manifest;
