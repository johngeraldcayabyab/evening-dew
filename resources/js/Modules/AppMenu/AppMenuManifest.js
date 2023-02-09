import {DATE_RANGE, SEARCH} from "../../consts"

const displayName = "app_menus";

const manifest = {
    "moduleName": "app_menus",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, manifest: () => manifest},
        {path: `/${displayName}/:id`, manifest: () => manifest},
        {path: `/${displayName}`, manifest: () => manifest},
    ],
    table: {
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
                dataIndex: 'parents',
                key: 'label',
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
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'label',
                    label: 'Label',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'menu_id',
                    label: 'Menu',
                    query: {url: '/api/menus', field: 'menu.label'},
                },
                {
                    type: 'select',
                    name: 'parent_app_menu_id',
                    label: 'Parent App Menu',
                    query: {url: '/api/app_menus', field: 'parent_app_menu.label'},
                },
            ]
        }
    }
};

export default manifest;
