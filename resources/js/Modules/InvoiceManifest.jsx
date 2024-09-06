import {DATE_RANGE, GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import {disableIfStatus} from "../Helpers/object";
import {updateFormLines} from "../Helpers/form"

const manifest = {
    moduleName: "invoices",
    displayName: "invoices",
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
                title: 'Customer',
                dataIndex: 'customer',
                key: 'customer',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.customer.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Salesperson',
                dataIndex: 'salesperson',
                key: 'salesperson',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.salesperson.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Invoice Date',
                dataIndex: 'invoice_date',
                key: 'invoice_date',
                sorter: true,
                filter: DATE_RANGE,
            },
            {
                title: 'Due Date',
                dataIndex: 'due_date',
                key: 'due_date',
                sorter: true,
                filter: DATE_RANGE,
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
            taxes: {url: '/api/taxes', options: [], params: {type: 'sales'}},
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
    // formLinks: [
    //     {
    //         module: 'transfers', param: 'source_document', value: 'number', label: 'Receipts',
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
                    name: 'customer_id',
                    label: 'Customer',
                    query: {url: '/api/contacts', field: 'name'},
                    required: true,
                },
                {
                    type: 'text',
                    name: 'payment_reference',
                    label: 'Payment Reference',
                },
            ],
            col_2: [
                {
                    type: 'date',
                    name: 'invoice_date',
                    label: 'Invoice Deadline',
                },
                {
                    type: 'date',
                    name: 'due_date',
                    label: 'Due Date',
                },
                {
                    type: 'select',
                    name: 'payment_term_id',
                    label: 'Or Payment Term',
                    query: {url: '/api/payment_terms', field: 'name'},
                },
                {
                    type: 'select',
                    name: 'journal_id',
                    label: 'Journal',
                    query: {url: '/api/journals', field: 'name'},
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_2',
            tab_pane_1: {
                name: "Order Lines",
                form_line_1: {
                    columns: ['Product', 'Description', 'Quantity', 'Unit Price', 'Account', 'Tax', 'Subtotal'],
                    listName: 'invoice_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true,
                            onValueChange: (changedValues, values, formContext, changedLine, allValues) => {
                                formContext.useFetch(`/api/products/${changedLine.product_id}`, GET).then((response) => {
                                    updateFormLines(formContext, changedLine, allValues, 'invoice_lines', {
                                        description: response.sales_description,
                                        quantity: 1,
                                        unit_price: response.sales_price,
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
                                const invoiceLines = allValues.invoice_lines;
                                let invoiceLine = invoiceLines[changedLine.key];
                                if (changedLine.hasOwnProperty('unit_price')) {
                                    invoiceLine.subtotal = invoiceLine.quantity * changedLine.unit_price;
                                } else if (changedLine.hasOwnProperty('quantity')) {
                                    invoiceLine.subtotal = changedLine.quantity * invoiceLine.unit_price;
                                }
                                invoiceLines[changedLine.key] = invoiceLine;
                                formContext.form.setFieldsValue({
                                    invoice_lines: invoiceLines
                                });
                                const total = invoiceLines.map((invoiceLine) => (invoiceLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
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
                            type: 'number',
                            name: 'unit_price',
                            placeholder: 'Unit Price',
                            required: true,
                            onValueChange: (changedValues, values, formContext, changedLine, allValues) => {
                                const invoiceLines = allValues.invoice_lines;
                                let invoiceLine = invoiceLines[changedLine.key];
                                if (changedLine.hasOwnProperty('unit_price')) {
                                    invoiceLine.subtotal = invoiceLine.quantity * changedLine.unit_price;
                                } else if (changedLine.hasOwnProperty('quantity')) {
                                    invoiceLine.subtotal = changedLine.quantity * invoiceLine.unit_price;
                                }
                                invoiceLines[changedLine.key] = invoiceLine;
                                formContext.form.setFieldsValue({
                                    invoice_lines: invoiceLines
                                });
                                const total = invoiceLines.map((invoiceLine) => (invoiceLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
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
                            type: 'select',
                            name: 'chart_of_account_id',
                            placeholder: 'Chart Of Account',
                            query: {url: '/api/chart_of_accounts', field: 'name'},
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
                            type: 'text',
                            name: 'customer_reference',
                            label: 'Customer Reference',
                        },
                        {
                            type: 'select',
                            name: 'salesperson_id',
                            label: 'Salesperson',
                            query: {url: '/api/users', field: 'name'},
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'bank_id',
                            label: 'Recipient Bank',
                            query: {url: '/api/banks', field: 'name'},
                        },
                    ],
                    col_2: [
                        {
                            type: 'checkbox',
                            name: 'post_automatically',
                            label: 'Post Automatically',
                        },
                        {
                            type: 'checkbox',
                            name: 'to_check',
                            label: 'To Check',
                        },
                        {
                            type: 'text',
                            name: 'source_document',
                            label: 'Source Document',
                        },
                    ]
                },
            },
        },
    }
};

export default manifest;
