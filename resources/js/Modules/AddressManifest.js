import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts"

const manifest = {
    moduleName: "addresses",
    displayName: "addresses",
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
                title: 'Address Name',
                dataIndex: 'address_name',
                key: 'address_name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
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
                title: 'Country',
                dataIndex: 'country',
                key: 'country',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.country) {
                        return record.country.country_name;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.city) {
                        return record.city.name;
                    }
                    return null;
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
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'address_name',
                    label: 'Address Name',
                    required: true,
                    size: 'large'
                },
            ],
        },
        row_2: {
            col_1: [
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
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'contact_id',
                    label: 'Contact',
                    query: {url: '/api/contacts', field: 'name'},
                    required: true,
                },
                {
                    type: 'select',
                    name: 'type',
                    label: 'Type',
                    options: [
                        {value: 'default', label: 'Default'},
                        {value: 'invoice', label: 'Invoice'},
                        {value: 'delivery', label: 'Delivery'},
                        {value: 'others', label: 'Others'},
                        {value: 'private', label: 'Private'},
                    ],
                    required: true,
                },
            ],
        }
    }
};

export default manifest;
