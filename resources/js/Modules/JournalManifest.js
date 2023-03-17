import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "journals",
    displayName: "journals",
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
        ]
    },
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'type',
                    label: 'Type',
                    required: true,
                    options: [
                        {value: 'sales', label: 'Sales'},
                        {value: 'purchase', label: 'Purchase'},
                        {value: 'cash', label: 'Cash'},
                        {value: 'bank', label: 'Bank'},
                        {value: 'miscellaneous', label: 'Miscellaneous'},
                    ]
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'short_code',
                    label: 'Short Code',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'currency_id',
                    label: 'Currencies',
                    query: {url: '/api/currencies', field: 'name'},
                    required: true,
                },
                {
                    type: 'checkbox',
                    name: 'dedicated_credit_note_sequence',
                    label: 'Dedicated Credit Note Sequence',
                },
            ]
        },
        tab_1: {
            tab_pane_1: {
                name: "Journal Entries",
                divider_1: {
                    type: 'divider',
                    name: 'divider_1',
                    orientation: 'left',
                    label: 'Accounting Information'
                },
                row_1: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'income_chart_of_account_id',
                            label: 'Income Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                        {
                            type: 'select',
                            name: 'expense_chart_of_account_id',
                            label: 'Expense Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                        {
                            type: 'select',
                            name: 'bank_chart_of_account_id',
                            label: 'Bank Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                        {
                            type: 'select',
                            name: 'suspense_chart_of_account_id',
                            label: 'Suspense Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                    ],
                    col_2: [
                        {
                            type: 'select',
                            name: 'cash_chart_of_account_id',
                            label: 'Cash Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                        {
                            type: 'select',
                            name: 'profit_chart_of_account_id',
                            label: 'Profit Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                        {
                            type: 'select',
                            name: 'loss_chart_of_account_id',
                            label: 'Loss Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                    ]
                }
            },
            tab_pane_2: {
                name: "Payment Configurations",
                row_1: {
                    col_1: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Incoming Payments'
                        },
                        {
                            type: 'select',
                            name: 'outstanding_receipt_account_id',
                            label: 'Outstanding Receipt Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                        {
                            type: 'checkbox',
                            name: 'incoming_payment_method_manual',
                            label: 'Incoming Payment Method Manual',
                        },
                        {
                            type: 'checkbox',
                            name: 'incoming_payment_method_electronic',
                            label: 'Incoming Payment Method Electronic',
                        },
                    ],
                    col_2: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Outgoing Payments'
                        },
                        {
                            type: 'select',
                            name: 'outstanding_payment_account_id',
                            label: 'Outstanding Payment Account',
                            query: {url: '/api/chart_of_accounts', field: 'code'},
                        },
                        {
                            type: 'checkbox',
                            name: 'outgoing_payment_method_manual',
                            label: 'Outgoing Payment Method Manual',
                        },
                    ]
                }
            }
        },
    }
};

export default manifest;
