import {SEARCH} from "../consts";

const manifest = {
    "moduleName": "bank_accounts",
    "displayName": "bank_accounts",
    "queryDefaults": {},
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
                title: 'Account Number',
                dataIndex: 'account_number',
                key: 'account_number',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Account Holder',
                dataIndex: 'account_holder',
                key: 'account_holder',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.account_holder.name;
                },
                isGlobalSearch: true,
                hidden: true,
            },
            {
                title: 'Bank',
                dataIndex: 'bank',
                key: 'bank',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.bank.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Currency',
                dataIndex: 'currency',
                key: 'currency',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.currency.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Account Holder Name',
                dataIndex: 'account_holder_name',
                key: 'account_holder_name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
        ],
    },
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'account_number',
                    label: 'Account Number',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'account_holder_id',
                    label: 'Account Holder',
                    query: {url: '/api/contacts', field: 'name'},
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'bank_id',
                    label: 'Bank',
                    query: {url: '/api/banks', field: 'name'},
                },
                {
                    type: 'select',
                    name: 'currency_id',
                    label: 'Currency',
                    query: {url: '/api/currencies', field: 'name'},
                },
                {
                    type: 'text',
                    name: 'account_holder_name',
                    label: 'Account Holder Name',
                },
            ]
        }
    }
};

export default manifest;
