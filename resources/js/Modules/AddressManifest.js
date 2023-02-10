import {DATE_RANGE, SEARCH} from "../consts"

const displayName = "addresses";

const manifest = {
    "moduleName": "addresses",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, manifest: () => manifest},
        {path: `/${displayName}/:id`, manifest: () => manifest},
        {path: `/${displayName}`, manifest: () => manifest},
    ],
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
                    name: 'name',
                    label: 'Name',
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
                    query: {url: '/api/countries', field: 'country.country_name'},
                },
                {
                    type: 'select',
                    name: 'city_id',
                    label: 'City',
                    query: {url: '/api/cities', field: 'city.name'},
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'contact_id',
                    label: 'Contact',
                    query: {url: '/api/contacts', field: 'contact.name'},
                    required: true,
                },
            ],
        }
    }
};

export default manifest;
