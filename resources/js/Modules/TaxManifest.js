import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "taxes",
    displayName: "taxes",
    queryDefaults: {},
    routes: [HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE],
    table: {
        columnSelection: true,
        columns: [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
                title: 'Scope',
                dataIndex: 'scope',
                key: 'scope',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Computation',
                dataIndex: 'computation',
                key: 'computation',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Label',
                dataIndex: 'label_on_invoices',
                key: 'label_on_invoices',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'In Price?',
                dataIndex: 'included_in_price',
                key: 'included_in_price',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
            },
            {
                title: 'Chart Of Account',
                dataIndex: 'chart_of_account_id',
                key: 'chart_of_account_id',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if(record.chart_of_account){
                        return record.chart_of_account.code;
                    }
                    return '';
                },
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
                        {value: 'purchases', label: 'Purchase'},
                        {value: 'none', label: 'None'},
                    ]
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'scope',
                    label: 'Scope',
                    required: true,
                    options: [
                        {value: 'goods', label: 'Goods'},
                        {value: 'services', label: 'Services'},
                    ]
                },
                {
                    type: 'select',
                    name: 'computation',
                    label: 'Computation',
                    required: true,
                    options: [
                        {value: 'fixed', label: 'Fixed'},
                        {value: 'percentage_of_price', label: 'Percentage of price'},
                    ]
                },
            ]
        },
        row_2: {
            col_1: [
                {
                    type: 'text',
                    name: 'label_on_invoices',
                    label: 'Label on Invoices',
                    required: true,
                },
                {
                    type: 'checkbox',
                    name: 'included_in_price',
                    label: 'Included in price',
                },
            ],
            col_2: [
                {
                    type: 'number',
                    name: 'amount',
                    label: 'Amount',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'chart_of_account_id',
                    label: 'Chart of Account',
                    query: {url: '/api/chart_of_accounts', field: 'code'},
                    required: true,
                },
            ]
        }
    }
};

export default manifest;
