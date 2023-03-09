import {SEARCH} from "../consts";

const manifest = {
    moduleName: "journals",
    displayName: "journals",
    queryDefaults: {},
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
                {
                    type: 'text',
                    name: 'short_code',
                    label: 'Short Code',
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
                    type: 'checkbox',
                    name: 'dedicated_credit_note_sequence',
                    label: 'Dedicated Credit Note Sequence',
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
                {
                    type: 'checkbox',
                    name: 'outgoing_payment_method_manual',
                    label: 'Outgoing Payment Method Manual',
                },
            ]
        }
    }
};

export default manifest;
