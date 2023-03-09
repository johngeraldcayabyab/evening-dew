import {DATE_RANGE, SEARCH} from "../consts";

const manifest = {
    "moduleName": "contacts",
    "displayName": "contacts",
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
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
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
        ],
        kanban: {
            selected_fields: ['name', 'avatar', 'phone', 'email'],
            title: 'name',
            avatar: 'avatar',
            description: [
                {
                    key: 'phone',
                    render: (record) => {
                        return record.phone;
                    }
                },
                {
                    key: 'email',
                    render: (record) => {
                        return record.email;
                    }
                },
            ]
        },
    },
    form: {
        initialValue: true,
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
        row_2: {
            col_1: [
                {
                    type: 'text',
                    name: 'address',
                    label: 'Address',
                },
                {
                    type: 'text',
                    name: 'zip',
                    label: 'Zip',
                },
                {
                    type: 'select',
                    name: 'country_id',
                    label: 'Country',
                    query: {url: '/api/countries', field: 'country_name'},
                },
                {
                    type: 'select',
                    name: 'city_id',
                    label: 'City',
                    query: {url: '/api/cities', field: 'name'},
                },
                {
                    type: 'text',
                    name: 'tax_id',
                    label: 'Tax ID',
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'tax_id',
                    label: 'Tax ID',
                },
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
                    name: 'website',
                    label: 'Website',
                },
            ]
        }
    }
};

export default manifest;
