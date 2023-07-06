import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "products",
    displayName: "products",
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
                title: 'Internal Reference',
                dataIndex: 'internal_reference',
                key: 'internal_reference',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Sales Price',
                dataIndex: 'sales_price',
                key: 'sales_price',
                sorter: true,
                filter: SEARCH,
            },
            {
                title: 'Cost',
                dataIndex: 'cost',
                key: 'cost',
                sorter: true,
                filter: SEARCH,
            },
            {
                title: 'Measurement',
                dataIndex: 'measurement',
                key: 'measurement',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.measurement.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Product Category',
                dataIndex: 'product_category',
                key: 'product_category',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.product_category) {
                        return record.product_category.category;
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
            {
                title: 'Type',
                dataIndex: 'product_type',
                key: 'product_type',
                sorter: true,
                filter: SEARCH,
                hidden: true,
                isGlobalSearch: true,
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            },
        ],
        kanban: {
            selected_fields: ['name', 'avatar', 'internal_reference', 'sales_price', 'quantity', 'measurement'],
            title: 'name',
            avatar: 'avatar',
            description: [
                {
                    key: 'internal_reference',
                    render: (record) => {
                        return record.internal_reference ? `[${record.internal_reference}]` : null;
                    }
                },
                {
                    key: 'sales_price',
                    render: (record) => {
                        return `Price: ₱${record.sales_price}`;
                    }
                },
                {
                    key: 'quantity',
                    render: (record) => {
                        return `On hand: ${record.quantity} ${record.measurement.name}`;
                    }
                }
            ]
        }
    },
    formLinks: [
        {
            value: 'id',
            module: 'stock_location_quantity',
            param: 'product_id',
            label: (initialValues) => {
                return `Quantity: ${initialValues.quantity} ${initialValues.measurement ? initialValues.measurement.name : null}`
            }
        },
    ],
    initialState: {
        queries: {
            measurements: {url: '/api/measurements', options: []}
        }
    },
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                    size: 'large',
                },
            ],
            col_2: [
                {
                    type: 'upload',
                    name: 'avatar',
                },
            ],
        },
        row_2: {
            col_1: [
                {
                    type: 'checkbox',
                    name: 'can_be_sold',
                    label: 'Can be sold',
                },
                {
                    type: 'checkbox',
                    name: 'can_be_purchased',
                    label: 'Can be purchased',
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: 'General Information',
                row_1: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'product_type',
                            label: 'Product',
                            options: [
                                {value: 'storable', label: 'Storable'},
                                {value: 'consumable', label: 'Consumable'},
                                {value: 'service', label: 'Service'},
                            ]
                        },
                        {
                            type: 'select',
                            name: 'invoicing_policy',
                            label: 'Invoicing Policy',
                            options: [
                                {value: 'ordered_quantities', label: 'Ordered Quantities'},
                                {value: 'delivered_quantities', label: 'Delivered Quantities'},
                            ],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            label: 'Measurement',
                            optionsState: 'queries.measurements',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'purchase_measurement_id',
                            label: 'Purchase Measurement',
                            optionsState: 'queries.measurements',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'sales_measurement_id',
                            label: 'Sales Measurement',
                            optionsState: 'queries.measurements',
                            required: true,
                        },
                    ],
                    col_2: [
                        {
                            type: 'number',
                            name: 'sales_price',
                            label: 'Sales Price',
                            required: true,
                        },
                        {
                            type: 'number',
                            name: 'cost',
                            label: 'Cost',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'product_category_id',
                            label: 'Product Category',
                            query: {url: '/api/product_categories', field: 'category'},
                            required: true,
                        },
                        {
                            type: 'text',
                            name: 'internal_reference',
                            label: 'Internal Reference',
                        },
                    ],
                },
            },
            tab_pane_2: {
                name: 'Other Information',
                row_1: {
                    col_1: [
                        {
                            type: 'textarea',
                            name: 'sales_description',
                            label: 'Sales Description',
                            autoSize: {
                                minRows: 5
                            }
                        },
                        {
                            type: 'textarea',
                            name: 'purchase_description',
                            label: 'Purchase Description',
                            autoSize: {
                                minRows: 5
                            }
                        },
                    ]
                },
            }
        }
    }
};

export default manifest;
