import {GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import {disableIfStatus} from "../Helpers/object";
import {updateFormLines} from "../Helpers/form"

const manifest = {
    moduleName: "purchases",
    displayName: "purchases",
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
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
                sorter: true,
                filter: SEARCH,
                sequenceNumberRender: true,
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
                booleanTagRender: [
                    {color: 'processing', label: 'Draft', value: 'draft'},
                    {color: 'default', label: 'Cancelled', value: 'cancelled'},
                    {color: 'success', label: 'Done', value: 'done'}
                ],
                isGlobalSearch: true,
            },
        ]
    },
    initialState: {
        queries: {
            taxes: {url: '/api/taxes', options: [], params: {type: 'purchases'}},
            measurements: {url: '/api/measurements', options: []}
        }
    },
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
            type: 'primary',
            label: 'Cancel',
            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
    ],
    formLinks: [
        {
            module: 'transfers', param: 'source_document', value: 'number', label: 'Receipts',
        },
    ],
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
                {
                    type: 'select',
                    name: 'shipping_method',
                    label: 'Shipping Method',
                    options: [
                        {value: 'delivery', label: 'Delivery'},
                        {value: 'pickup', label: 'Pickup'},
                    ]
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_2',
            tab_pane_1: {
                name: "Order Lines",
                form_line_1: {
                    columns: ['Product', 'Description', 'Quantity', 'Measurement', 'Unit Price', 'Shipping Date', 'Tax', 'Subtotal'],
                    listName: 'purchase_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true,
                            onValueChange: (changedValues, values, formContext, changedLine, allValues) => {
                                formContext.useFetch(`/api/products/${changedLine.product_id}`, GET).then((response) => {
                                    updateFormLines(formContext, changedLine, allValues, 'purchase_lines', {
                                        description: response.purchase_description,
                                        quantity: 1,
                                        measurement_id: response.purchase_measurement_id,
                                        unit_price: response.cost,
                                    });
                                });
                            },
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'text',
                            name: 'description',
                            placeholder: 'Description',
                        },
                        {
                            type: 'number',
                            name: 'quantity',
                            placeholder: 'Quantity',
                            required: true,
                            onValueChange: (changedValues, values, formContext, changedLine, allValues) => {
                                const purchaseLines = allValues.purchase_lines;
                                let purchaseLine = purchaseLines[changedLine.key];
                                if (changedLine.hasOwnProperty('unit_price')) {
                                    purchaseLine.subtotal = purchaseLine.quantity * changedLine.unit_price;
                                } else if (changedLine.hasOwnProperty('quantity')) {
                                    purchaseLine.subtotal = changedLine.quantity * purchaseLine.unit_price;
                                }
                                purchaseLines[changedLine.key] = purchaseLine;
                                formContext.form.setFieldsValue({
                                    purchase_lines: purchaseLines
                                });
                                const total = purchaseLines.map((purchaseLine) => (purchaseLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
                                formContext.setState((prevState) => ({
                                    ...prevState,
                                    breakdown: {
                                        untaxedAmount: total,
                                        tax: 0,
                                        total: total,
                                    }
                                }));
                            },
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            optionsState: 'queries.measurements',
                            required: true,
                            overrideDisabled: (formContext) => disableIfStatus(formContext.formState, 'done')
                        },
                        {
                            type: 'number',
                            name: 'unit_price',
                            placeholder: 'Unit Price',
                            required: true,
                            onValueChange: (changedValues, values, formContext, changedLine, allValues) => {
                                const purchaseLines = allValues.purchase_lines;
                                let purchaseLine = purchaseLines[changedLine.key];
                                if (changedLine.hasOwnProperty('unit_price')) {
                                    purchaseLine.subtotal = purchaseLine.quantity * changedLine.unit_price;
                                } else if (changedLine.hasOwnProperty('quantity')) {
                                    purchaseLine.subtotal = changedLine.quantity * purchaseLine.unit_price;
                                }
                                purchaseLines[changedLine.key] = purchaseLine;
                                formContext.form.setFieldsValue({
                                    purchase_lines: purchaseLines
                                });
                                const total = purchaseLines.map((purchaseLine) => (purchaseLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
                                formContext.setState((prevState) => ({
                                    ...prevState,
                                    breakdown: {
                                        untaxedAmount: total,
                                        tax: 0,
                                        total: total,
                                    }
                                }));
                            },
                        },
                        {
                            type: 'date',
                            name: 'receiving_date',
                            placeholder: 'Receiving date',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'select',
                            name: 'tax_id',
                            placeholder: 'Tax',
                            optionsState: 'queries.taxes',
                            // onValueChange: (changedValues, values, formContext, changedLine, allValues) => {
                            //     computeSubtotal(formContext, allValues);
                            // },
                            overrideDisabled: (formContext) => disableIfStatus(formContext.formState, 'done')
                        },
                        {
                            type: 'number',
                            name: 'subtotal',
                            placeholder: 'Subtotal',
                            overrideDisabled: true,
                        },
                    ]
                },
            },
            tab_pane_2: {
                name: "Other Information",
                row_1: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'purchase_representative_id',
                            label: 'Purchase Representative',
                            query: {url: '/api/users', field: 'name'},
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
        divider_2: true,
        row_3: {
            col_1: [
                {
                    type: 'textarea',
                    name: 'terms_and_conditions',
                    placeholder: 'Terms and conditions...',
                    autoSize: {
                        minRows: 5
                    }
                },
            ]
        }
    }
};

export default manifest;
