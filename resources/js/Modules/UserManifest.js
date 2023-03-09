import {DATE_RANGE, SEARCH, VISIBILITY_CREATING} from "../consts";

const manifest = {
    moduleName: "users",
    displayName: "users",
    queryDefaults: {},
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
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            },
        ],
        kanban: {
            selected_fields: ['name', 'avatar', 'email'],
            title: 'name',
            avatar: 'avatar',
            description: [
                {
                    key: 'email',
                    render: (record) => {
                        return record.email;
                    }
                },
            ]
        }
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
                {
                    type: 'select',
                    name: 'app_menu_id',
                    label: 'App Menu',
                    query: {url: '/api/app_menus', field: 'label'},
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
            visibility: VISIBILITY_CREATING,
            col_1: [
                {
                    type: 'text',
                    name: 'password',
                    label: 'Password',
                    required: true,
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'password_confirmation',
                    label: 'Confirm Password',
                    required: true,
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: "Config",
                form_line_1: {
                    columns: ['User', 'Group'],
                    listName: 'user_group_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'user_id',
                            placeholder: 'User',
                            query: {url: '/api/users', field: 'name'},
                            required: true,
                            listName: 'user_group_lines',
                        },
                        {
                            type: 'select',
                            name: 'group_id',
                            placeholder: 'Group',
                            query: {url: '/api/groups', field: 'name'},
                            required: true,
                            listName: 'user_group_lines',
                        },
                    ]
                },
            }
        }
    },
};

export default manifest;
