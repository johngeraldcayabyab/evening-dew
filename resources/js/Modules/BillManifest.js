import {DATE_RANGE, GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import Text from "antd/es/typography/Text";
import {Tag} from "antd";
import {disableIfStatus} from "../Helpers/object";
import {isLineFieldExecute} from "../Helpers/form";

const manifest = {
    moduleName: "bills",
    displayName: "bills",
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
                title: 'Bill Date',
                dataIndex: 'bill_date',
                key: 'bill_date',
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
    // formLinks: [
    //     {
    //         module: 'transfers', param: 'source_document', value: 'number', label: 'Receipts',
    //     },
    // ],
    form: {
        initialValue: true,
        onValuesChange: (changedValues, allValues, formContext) => {
            // isLineFieldExecute(changedValues, allValues, 'invoice_lines', 'product_id', (line, allValues) => {
            //     formContext.useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
            //         const invoiceLines = allValues.invoice_lines;
            //         invoiceLines[line.key] = {
            //             ...invoiceLines[line.key],
            //             description: response.sales_description,
            //             quantity: 1,
            //             unit_price: response.sales_price,
            //         };
            //         formContext.form.setFieldsValue({
            //             invoice_lines: invoiceLines
            //         });
            //     });
            // });
            // isLineFieldExecute(changedValues, allValues, 'invoice_lines', 'quantity', (changedInvoiceLine, allValues) => {
            //     const invoiceLines = allValues.invoice_lines;
            //     let invoiceLine = invoiceLines[changedInvoiceLine.key];
            //     if (changedInvoiceLine.hasOwnProperty('unit_price')) {
            //         invoiceLine.subtotal = invoiceLine.quantity * changedInvoiceLine.unit_price;
            //     } else if (changedInvoiceLine.hasOwnProperty('quantity')) {
            //         invoiceLine.subtotal = changedInvoiceLine.quantity * invoiceLine.unit_price;
            //     }
            //     invoiceLines[changedInvoiceLine.key] = invoiceLine;
            //     formContext.form.setFieldsValue({
            //         invoice_lines: invoiceLines
            //     });
            //     const total = invoiceLines.map((invoiceLine) => (invoiceLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
            //     formContext.setState((prevState) => ({
            //         ...prevState,
            //         breakdown: {
            //             untaxedAmount: total,
            //             tax: 0,
            //             total: total,
            //         }
            //     }));
            // });
            // isLineFieldExecute(changedValues, allValues, 'invoice_lines', 'unit_price', (changedInvoiceLine, allValues) => {
            //     const invoiceLines = allValues.invoice_lines;
            //     let invoiceLine = invoiceLines[changedInvoiceLine.key];
            //     if (changedInvoiceLine.hasOwnProperty('unit_price')) {
            //         invoiceLine.subtotal = invoiceLine.quantity * changedInvoiceLine.unit_price;
            //     } else if (changedInvoiceLine.hasOwnProperty('quantity')) {
            //         invoiceLine.subtotal = changedInvoiceLine.quantity * invoiceLine.unit_price;
            //     }
            //     invoiceLines[changedInvoiceLine.key] = invoiceLine;
            //     formContext.form.setFieldsValue({
            //         invoice_lines: invoiceLines
            //     });
            //     const total = invoiceLines.map((invoiceLine) => (invoiceLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
            //     formContext.setState((prevState) => ({
            //         ...prevState,
            //         breakdown: {
            //             untaxedAmount: total,
            //             tax: 0,
            //             total: total,
            //         }
            //     }));
            // });
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
                    name: 'bill_reference',
                    label: 'Bill Reference',
                },
                {
                    type: 'text',
                    name: 'payment_reference',
                    label: 'Payment Reference',
                },
                {
                    type: 'select',
                    name: 'bank_id',
                    label: 'Recipient Bank',
                    query: {url: '/api/banks', field: 'name'},
                },
                {
                    type: 'text',
                    name: 'auto_complete_sequence',
                    label: 'Auto-Complete',
                },
            ],
            col_2: [
                {
                    type: 'date',
                    name: 'bill_date',
                    label: 'Bill Date',
                },
                {
                    type: 'date',
                    name: 'accounting_date',
                    label: 'Accounting Date',
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
                // form_line_1: {
                //     columns: ['Product', 'Description', 'Quantity', 'Unit Price', 'Subtotal'],
                //     listName: 'invoice_lines',
                //     fields: [
                //         {
                //             type: 'select',
                //             name: 'product_id',
                //             placeholder: 'Product',
                //             query: {url: '/api/products', field: 'name'},
                //             required: true,
                //             overrideDisabled: (formContext) => {
                //                 return disableIfStatus(formContext.formState, 'done')
                //             }
                //         },
                //         {
                //             type: 'text',
                //             name: 'description',
                //             placeholder: 'Description',
                //         },
                //         {
                //             type: 'number',
                //             name: 'quantity',
                //             placeholder: 'Quantity',
                //             required: true,
                //             overrideDisabled: (formContext) => {
                //                 return disableIfStatus(formContext.formState, 'done')
                //             }
                //         },
                //         {
                //             type: 'number',
                //             name: 'unit_price',
                //             placeholder: 'Unit Price',
                //             required: true,
                //         },
                //         {
                //             type: 'number',
                //             name: 'subtotal',
                //             placeholder: 'Subtotal',
                //             overrideDisabled: true,
                //         },
                //     ]
                // },
            },
            tab_pane_2: {
                name: "Other Information",
                row_1: {
                    col_1: [
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
                    ]
                },
            },
        },
    }
};

export default manifest;
