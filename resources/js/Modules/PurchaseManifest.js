import {SEARCH} from "../consts"
import Text from "antd/es/typography/Text"
import {Tag} from "antd"

const displayName = "purchases";

const manifest = {
    "moduleName": "purchases",
    "displayName": "purchases",
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, manifest: () => manifest},
        {path: `/${displayName}/:id`, manifest: () => manifest},
        {path: `/${displayName}`, manifest: () => manifest},
    ],
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
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return <Text strong><span style={{fontSize: '12px'}}>{record.number}</span></Text>
                },
                isGlobalSearch: true,
            },
            {
                title: 'Vendor',
                dataIndex: 'vendor',
                key: 'vendor',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.vendor.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Vendor Reference',
                dataIndex: 'vendor_reference',
                key: 'vendor_reference',
                sorter: true,
                hidden: true,
            },
            {
                title: 'Notes',
                dataIndex: 'notes',
                key: 'notes',
                sorter: true,
                hidden: true,
            },
            {
                title: 'Order Deadline',
                dataIndex: 'order_deadline',
                key: 'order_deadline',
                sorter: true,
            },
            {
                title: 'Receipt Date',
                dataIndex: 'receipt_date',
                key: 'receipt_date',
                sorter: true,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (!record.status) {
                        return null;
                    }
                    const color = {draft: 'processing', done: 'success', cancelled: 'default'};
                    return <Tag color={color[record.status]}>{record.status.toUpperCase()}</Tag>
                },
                isGlobalSearch: true,
            },
        ]
    },
    // initialState: {
    //     breakdown: {
    //         untaxedAmount: 0, tax: 0, total: 0,
    //     }
    // },
    statuses: [
        {
            value: 'draft',
            title: 'Draft',
            status: {draft: 'process', done: 'finish', cancelled: 'wait'}
        },
        {
            value: 'done',
            title: 'Done',
            type: 'primary',
            label: 'Validate',
            status: {draft: 'wait', done: 'finish', cancelled: 'wait'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
        {
            value: 'cancelled',
            title: 'Cancelled',
            type: 'ghost',
            label: 'Cancel',
            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
    ],
    // formLinks: [
    //     {
    //         module: 'transfers', param: 'source_document', value: 'number', label: 'Deliveries',
    //     },
    // ],
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'status',
                    name: 'status',
                },
                {
                    type: 'text',
                    name: 'number',
                    label: 'Number',
                    required: true,
                    size: 'large',
                },
            ],
        },
        row_2: {
            col_1: [
                {
                    type: 'select',
                    name: 'vendor_id',
                    label: 'Vendor',
                    query: {url: '/api/contacts', field: 'name'},
                    required: true,
                },
                {
                    type: 'text',
                    name: 'vendor_reference',
                    label: 'Vendor Reference',
                },
                {
                    type: 'textarea',
                    name: 'notes',
                    label: 'Notes',
                },
                {
                    type: 'select',
                    name: 'currency_id',
                    label: 'Currencies',
                    query: {url: '/api/currencies', field: 'name'},
                    required: true,
                },
            ],
            col_2: [
                {
                    type: 'date',
                    name: 'order_deadline',
                    label: 'Order Deadline',
                },
                {
                    type: 'date',
                    name: 'receipt_date',
                    label: 'Receipt Date',
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_2',
            // tab_pane_1: {
            //     name: "Order Lines",
            //     form_line_1: {
            //         columns: ['Product', 'Description', 'Quantity', 'Measurement', 'Unit Price', 'Shipping Date', 'Subtotal'],
            //         listName: 'purchase_lines',
            //         fields: [
            //             // {
            //             //     type: 'select',
            //             //     name: 'product_id',
            //             //     placeholder: 'Product',
            //             //     query: {url: '/api/products', field: 'product.name'},
            //             //     required: true,
            //             //     listName: 'sales_order_lines',
            //             //     overrideDisabled: (formContext) => {
            //             //         return disableIfStatus(formContext.formState, 'done')
            //             //     }
            //             // },
            //             // {
            //             //     type: 'text',
            //             //     name: 'description',
            //             //     placeholder: 'Description',
            //             //     listName: 'sales_order_lines',
            //             // },
            //             // {
            //             //     type: 'number',
            //             //     name: 'quantity',
            //             //     placeholder: 'Quantity',
            //             //     required: true,
            //             //     listName: 'sales_order_lines',
            //             //     overrideDisabled: (formContext) => {
            //             //         return disableIfStatus(formContext.formState, 'done')
            //             //     }
            //             // },
            //             // {
            //             //     type: 'select',
            //             //     name: 'measurement_id',
            //             //     placeholder: 'Measurement',
            //             //     query: {url: '/api/measurements', field: 'measurement.name'},
            //             //     required: true,
            //             //     listName: 'sales_order_lines',
            //             //     overrideDisabled: (formContext) => {
            //             //         return disableIfStatus(formContext.formState, 'done')
            //             //     }
            //             // },
            //             // {
            //             //     type: 'number',
            //             //     name: 'unit_price',
            //             //     placeholder: 'Unit Price',
            //             //     required: true,
            //             //     listName: 'sales_order_lines',
            //             // },
            //             // {
            //             //     type: 'date',
            //             //     name: 'shipping_date',
            //             //     placeholder: 'Shipping date',
            //             //     listName: 'sales_order_lines',
            //             //     overrideDisabled: (formContext) => {
            //             //         return disableIfStatus(formContext.formState, 'done')
            //             //     }
            //             // },
            //             // {
            //             //     type: 'number',
            //             //     name: 'subtotal',
            //             //     placeholder: 'Subtotal',
            //             //     listName: 'sales_order_lines',
            //             //     overrideDisabled: true,
            //             // },
            //         ]
            //     },
            // },
            tab_pane_2: {
                name: "Other Information",
                row_1: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'purchase_representative_id',
                            label: 'Purchase Representative',
                            query: {url: '/api/users', field: 'purchase_representative.name'},
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'drop_ship_address_id',
                            label: 'Drop Ship Address',
                            query: {url: '/api/addresses', field: 'address_name'},
                        },
                    ],
                    col_2: [
                        {
                            type: 'select',
                            name: 'payment_term_id',
                            label: 'Payment Term',
                            query: {url: '/api/payment_terms', field: 'name'},
                        },
                    ]
                },
            },
        },
    }
};

export default manifest;
