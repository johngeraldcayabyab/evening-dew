import {DATE_RANGE, SEARCH} from "../consts"

const manifest = {
    "moduleName": "app_menus",
    "displayName": "app_menus",
    "queryDefaults": {},
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
                    query: {url: '/api/menus', field: 'label'},
                },
                {
                    type: 'select',
                    name: 'parent_app_menu_id',
                    label: 'Parent App Menu',
                    query: {url: '/api/app_menus', field: 'label'},
                },
            ]
        }
    }
};

export default manifest;
