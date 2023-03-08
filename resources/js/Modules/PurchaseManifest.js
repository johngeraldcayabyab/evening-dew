import {GET, SEARCH} from "../consts"
import Text from "antd/es/typography/Text"
import {Tag} from "antd"
import {disableIfStatus} from "../Helpers/object"
import {getPersistedKey, isLineFieldExecute} from "../Helpers/form"

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
    initialState: {
        breakdown: {
            untaxedAmount: 0, tax: 0, total: 0,
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
            type: 'ghost',
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
        onValuesChange: (changedValues, allValues, formContext) => {
            isLineFieldExecute(changedValues, allValues, 'purchase_lines', 'product_id', (line, allValues) => {
                formContext.useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
                    const purchaseLines = allValues.purchase_lines;
                    purchaseLines[line.key] = {
                        ...purchaseLines[line.key],
                        description: response.purchase_description,
                        quantity: 1,
                        measurement_id: response.purchase_measurement_id,
                        unit_price: response.cost,
                    };
                    formContext.form.setFieldsValue({
                        purchase_lines: purchaseLines
                    });
                    const persistedKey = getPersistedKey(line, formContext.options['measurement_id-lineOptions'].options);
                    formContext.options['measurement_id-lineOptions'].getOptions(response.purchase_measurement.name, persistedKey);
                }).catch((responseErr) => {
                    formContext.fetchCatcher.get(responseErr);
                });
            });
            isLineFieldExecute(changedValues, allValues, 'purchase_lines', 'quantity', (changedPurchaseLine, allValues) => {
                const purchaseLines = allValues.purchase_lines;
                let purchaseLine = purchaseLines[changedPurchaseLine.key];
                if (changedPurchaseLine.hasOwnProperty('unit_price')) {
                    purchaseLine.subtotal = purchaseLine.quantity * changedPurchaseLine.unit_price;
                } else if (changedPurchaseLine.hasOwnProperty('quantity')) {
                    purchaseLine.subtotal = changedPurchaseLine.quantity * purchaseLine.unit_price;
                }
                purchaseLines[changedPurchaseLine.key] = purchaseLine;
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
            });
            isLineFieldExecute(changedValues, allValues, 'purchase_lines', 'unit_price', (changedPurchaseLine, allValues) => {
                const purchaseLines = allValues.purchase_lines;
                let purchaseLine = purchaseLines[changedPurchaseLine.key];
                if (changedPurchaseLine.hasOwnProperty('unit_price')) {
                    purchaseLine.subtotal = purchaseLine.quantity * changedPurchaseLine.unit_price;
                } else if (changedPurchaseLine.hasOwnProperty('quantity')) {
                    purchaseLine.subtotal = changedPurchaseLine.quantity * purchaseLine.unit_price;
                }
                purchaseLines[changedPurchaseLine.key] = purchaseLine;
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
            });
        },
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
                    columns: ['Product', 'Description', 'Quantity', 'Measurement', 'Unit Price', 'Shipping Date', 'Subtotal'],
                    listName: 'purchase_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true,
                            listName: 'purchase_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'text',
                            name: 'description',
                            placeholder: 'Description',
                            listName: 'purchase_lines',
                        },
                        {
                            type: 'number',
                            name: 'quantity',
                            placeholder: 'Quantity',
                            required: true,
                            listName: 'purchase_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            query: {url: '/api/measurements', field: 'name'},
                            required: true,
                            listName: 'purchase_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'number',
                            name: 'unit_price',
                            placeholder: 'Unit Price',
                            required: true,
                            listName: 'purchase_lines',
                        },
                        {
                            type: 'date',
                            name: 'receiving_date',
                            placeholder: 'Receiving date',
                            listName: 'purchase_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'number',
                            name: 'subtotal',
                            placeholder: 'Subtotal',
                            listName: 'purchase_lines',
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
    }
};

export default manifest;
