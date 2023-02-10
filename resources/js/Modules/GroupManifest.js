import {SEARCH} from "../consts"

const displayName = "groups";

const manifest = {
    "moduleName": "groups",
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
            ]
        }
    }
};

export default manifest;
