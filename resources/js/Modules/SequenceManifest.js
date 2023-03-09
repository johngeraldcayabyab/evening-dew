import {DATE_RANGE, SEARCH} from "../consts";

const manifest = {
    moduleName: "sequences",
    displayName: "sequences",
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
            {
                title: 'Sequence Code',
                dataIndex: 'sequence_code',
                key: 'sequence_code',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Implementation',
                dataIndex: 'implementation',
                key: 'implementation',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Prefix',
                dataIndex: 'prefix',
                key: 'prefix',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Suffix',
                dataIndex: 'suffix',
                key: 'suffix',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Sequence Size',
                dataIndex: 'sequence_size',
                key: 'sequence_size',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Step',
                dataIndex: 'step',
                key: 'step',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Next Number',
                dataIndex: 'next_number',
                key: 'next_number',
                sorter: true,
                filter: SEARCH,
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
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true
                },
                {
                    type: 'select',
                    name: 'implementation',
                    label: 'Implementation',
                    required: true,
                    options: [
                        {value: 'no_gap', label: 'No Gap'},
                        {value: 'standard', label: 'Standard'},
                    ]
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'sequence_code',
                    label: 'Sequence Code',
                    required: true
                },
            ]
        },
        divider_1: true,
        row_2: {
            col_1: [
                {
                    type: 'text',
                    name: 'prefix',
                    label: 'Prefix',
                },
                {
                    type: 'text',
                    name: 'suffix',
                    label: 'Suffix',
                },

            ],
            col_2: [
                {
                    type: 'number',
                    name: 'sequence_size',
                    label: 'Sequence Size',
                    required: true
                },
                {
                    type: 'number',
                    name: 'step',
                    label: 'Step',
                    required: true
                },
                {
                    type: 'number',
                    name: 'next_number',
                    label: 'Next number',
                    required: true
                },
            ]
        }
    }
};

export default manifest;
