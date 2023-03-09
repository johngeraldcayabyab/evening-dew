import {DATE_RANGE, SEARCH} from "../consts";

const manifest = {
    "moduleName": "menus",
    "displayName": "menus",
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
                title: 'Label',
                dataIndex: 'label',
                key: 'label',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Url',
                dataIndex: 'url',
                key: 'url',
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
    },
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'label',
                    label: 'Label',
                    required: true,
                },
                {
                    type: 'text',
                    name: 'url',
                    label: 'Url',
                    required: true
                },
            ]
        }
    }
};

export default manifest;
