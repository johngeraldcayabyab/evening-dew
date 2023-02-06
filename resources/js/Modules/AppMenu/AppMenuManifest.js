import AppMenuForm from "./AppMenuForm";
import AppMenuTable from "./AppMenuTable";

const displayName = "app_menus";

export default {
    "moduleName": "app_menus",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: AppMenuForm},
        {path: `/${displayName}/:id`, component: AppMenuForm},
        {path: `/${displayName}`, component: AppMenuTable},
    ],
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'label',
                    label: 'Label',
                    message: 'Please input label',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'menu_id',
                    label: 'Menu',
                    query: {url: '/api/menus', field: 'menu.label', name: 'menuOptions'},
                },
                {
                    type: 'select',
                    name: 'parent_app_menu_id',
                    label: 'Parent App Menu',
                    query: {url: '/api/app_menus', field: 'parent_app_menu.label', name: 'appMenuOptions'},
                },
            ]
        }
    }
};
