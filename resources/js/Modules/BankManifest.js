import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "banks",
    displayName: "banks",
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
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Mobile',
                dataIndex: 'mobile',
                key: 'mobile',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Website',
                dataIndex: 'website',
                key: 'website',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Identifier Code',
                dataIndex: 'bank_identifier_code',
                key: 'bank_identifier_code',
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
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'phone',
                    label: 'Phone',
                },
                {
                    type: 'text',
                    name: 'mobile',
                    label: 'Mobile',
                },
                {
                    type: 'text',
                    name: 'email',
                    label: 'Email',
                },
                {
                    type: 'text',
                    name: 'website',
                    label: 'Website',
                },
                {
                    type: 'text',
                    name: 'bank_identifier_code',
                    label: 'Identifier Code',
                },
            ]
        }
    }
};

export default manifest;
