import UserTable from "./UserTable"
import {VISIBILITY_CREATING} from "../../consts"
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "users";

const manifest = {
    "moduleName": "users",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: UserTable},
    ],
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
                    query: {url: '/api/app_menus', field: 'app_menu.label'},
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
                            query: {url: '/api/users', field: 'users.name'},
                            required: true,
                            listName: 'user_group_lines',
                        },
                        {
                            type: 'select',
                            name: 'group_id',
                            placeholder: 'Group',
                            query: {url: '/api/groups', field: 'groups.name'},
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
