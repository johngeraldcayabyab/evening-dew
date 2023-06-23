import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH, VISIBILITY_CREATING} from "../consts";

const manifest = {
    moduleName: "companies",
    displayName: "companies",
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
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Tax Registry',
                dataIndex: 'tax_registry',
                key: 'tax_registry',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Default',
                dataIndex: 'is_default',
                key: 'is_default',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
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
                    size: 'large'
                },
                {
                    type: 'text',
                    name: 'email',
                    label: 'Email',
                    required: true,
                    size: 'medium'
                },
            ],
            col_2: [
                {
                    type: 'upload',
                    name: 'avatar',
                },
            ]
        },
        divider_1: true,
        row_2: {
            col_1: [
                {
                    type: 'text',
                    name: 'tax_registry',
                    label: 'Tax Registry',
                },
            ],
            col_2: [
                {
                    type: 'checkbox',
                    name: 'is_default',
                    label: 'Is Default',
                },
            ]
        }
    }
};
export default manifest;
