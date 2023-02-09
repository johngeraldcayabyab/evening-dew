import AppMenuTable from "./AppMenuTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "app_menus";

const manifest = {
    "moduleName": "app_menus",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
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
