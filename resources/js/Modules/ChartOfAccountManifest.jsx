import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import {Tag} from "antd"

const manifest = {
    moduleName: "chart_of_accounts",
    displayName: "chart_of_accounts",
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
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Allow Reconciliation',
                dataIndex: 'allow_reconciliation',
                key: 'allow_reconciliation',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.allow_reconciliation) {
                        return <Tag color={'success'}>Yes</Tag>;
                    }
                    return <Tag color={'default'}>No</Tag>;
                }
            },
            {
                title: 'Deprecated',
                dataIndex: 'deprecated',
                key: 'deprecated',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.deprecated) {
                        return <Tag color={'success'}>Yes</Tag>;
                    }
                    return <Tag color={'default'}>No</Tag>;
                }
            },
            {
                title: 'Currency',
                dataIndex: 'currency',
                key: 'currency',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.currency ? record.currency.name : '';
                },
                isGlobalSearch: true,
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            },
        ]
    },
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'code',
                    label: 'Code',
                    required: true,
                    size: 'large'
                },
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                    size: 'medium'
                },
            ],
        },


        row_2: {
            col_1: [
                {
                    type: 'select',
                    name: 'type',
                    label: 'Type',
                    options: [
                        {value: 'receivable', label: 'Receivable'},
                        {value: 'bank_and_cash', label: 'Bank and cash'},
                        {value: 'current_assets', label: 'Current assets'},
                        {value: 'non_current_assets', label: 'Non current assets'},
                        {value: 'prepayments', label: 'Prepayments'},
                        {value: 'fixed_assets', label: 'Fixed assets'},
                        {value: 'payable', label: 'Payable'},
                        {value: 'credit_card', label: 'Credit card'},
                        {value: 'current_liabilities', label: 'Current liabilities'},
                        {value: 'non_current_liabilities', label: 'Non current liabilities'},
                        {value: 'equity', label: 'Equity'},
                        {value: 'current_year_earnings', label: 'Current year earnings'},
                        {value: 'income', label: 'Income'},
                        {value: 'other_income', label: 'Other income'},
                        {value: 'expenses', label: 'Expenses'},
                        {value: 'depreciation', label: 'Depreciation'},
                        {value: 'cost_of_revenue', label: 'Cost of revenue'},
                        {value: 'off_balance_sheet', label: 'Off balance sheet'},
                    ],
                    required: true,
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'currency_id',
                    label: 'Currency',
                    query: {url: '/api/currencies', field: 'name'},
                },
                {
                    type: 'checkbox',
                    name: 'deprecated',
                    label: 'Deprecated',
                },
                {
                    type: 'checkbox',
                    name: 'allow_reconciliation',
                    label: 'Allow reconciliation',
                },
            ]
        }
    }
};

export default manifest;
