import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "delivery_fees",
    displayName: "delivery_fees",
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
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Fee',
                dataIndex: 'product',
                key: 'product',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.product.sales_price;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Enabled',
                dataIndex: 'is_enabled',
                key: 'is_enabled',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
                hidden: true,
            },
        ]
    },
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true
                },
                {
                    type: 'checkbox',
                    name: 'is_enabled',
                    label: 'Enabled',
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'product_id',
                    label: 'Product',
                    query: {url: '/api/products', field: 'name'},
                },
            ]
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: "Fee Lines",
                form_line_1: {
                    columns: ['City', 'Fee'],
                    listName: 'delivery_fee_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'city_id',
                            placeholder: 'City',
                            query: {url: '/api/cities', field: 'name'},
                            required: true,
                        },
                        {
                            type: 'number',
                            name: 'fee',
                            placeholder: 'Fee',
                            required: true,
                        },
                    ]
                },
            }
        }
    },
};

export default manifest;
