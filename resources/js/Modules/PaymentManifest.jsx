import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import Text from "antd/es/typography/Text"

const manifest = {
    moduleName: "payments",
    displayName: "payments",
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
                title: 'Payment Type',
                dataIndex: 'payment_type',
                key: 'payment_type',
                sorter: true,
                filter: SEARCH,
                hidden: true,
                isGlobalSearch: true,
            },
            {
                title: 'Partner Type',
                dataIndex: 'partner_type',
                key: 'partner_type',
                sorter: true,
                filter: SEARCH,
                hidden: true,
                isGlobalSearch: true,
            },
            {
                title: 'Contact',
                dataIndex: 'contact',
                key: 'contact',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.contact.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Destination Account',
                dataIndex: 'destination_account',
                key: 'destination_account',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.destination_account.code;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Memo',
                dataIndex: 'memo',
                key: 'memo',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Journal',
                dataIndex: 'journal',
                key: 'journal',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.journal.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Payment Date',
                dataIndex: 'payment_date',
                key: 'payment_date',
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
                    type: 'number',
                    name: 'number',
                    label: 'Number',
                    overrideDisabled: true,
                },
                {
                    type: 'select',
                    name: 'payment_type',
                    label: 'Type',
                    required: true,
                    options: [
                        {value: 'send_money', label: 'Send Money'},
                        {value: 'receive_money', label: 'Receive Money'},
                    ]
                },
                {
                    type: 'text',
                    name: 'short_code',
                    label: 'Short Code',
                },
                {
                    type: 'select',
                    name: 'contact_id',
                    label: 'Contact',
                    query: {url: '/api/contacts', field: 'name'},
                },
                {
                    type: 'select',
                    name: 'destination_account_id',
                    label: 'Destination Account',
                    query: {url: '/api/chart_of_accounts', field: 'code'},
                    required: true,
                },
                {
                    type: 'checkbox',
                    name: 'is_internal_transfer',
                    label: 'Is Internal Transfer',
                },
                {
                    type: 'number',
                    name: 'amount',
                    label: 'Amount',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'currency_id',
                    label: 'Currency',
                    query: {url: '/api/currencies', field: 'name'},
                    required: true,
                },
                {
                    type: 'date',
                    name: 'payment_date',
                    label: 'Payment Date',
                    required: true,
                },
                {
                    type: 'text',
                    name: 'memo',
                    label: 'Memo',
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'journal_id',
                    label: 'Journal',
                    query: {url: '/api/journals', field: 'name'},
                    required: true,
                },
                {
                    type: 'select',
                    name: 'bank_account_id',
                    label: 'Recipient Bank Account',
                    query: {url: '/api/bank_accounts', field: 'account_number'},
                },
                {
                    type: 'textarea',
                    name: 'notes',
                    label: 'Notes',
                },
            ]
        },
    }
};

export default manifest;
