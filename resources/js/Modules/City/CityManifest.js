import {DATE_RANGE, SEARCH} from "../../consts";

const displayName = "cities";

const manifest = {
    "moduleName": "cities",
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
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Province',
                dataIndex: 'province',
                key: 'province',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Region',
                dataIndex: 'region',
                key: 'region',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.region) {
                        return record.region.region;
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
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true
                },
                {
                    type: 'text',
                    name: 'province',
                    label: 'Province',
                },
                {
                    type: 'select',
                    name: 'region_id',
                    label: 'Region',
                    query: {url: '/api/regions', field: 'region.region'},
                },
            ]
        }
    }
};

export default manifest;
