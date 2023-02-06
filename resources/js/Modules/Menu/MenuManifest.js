import MenuForm from "./MenuForm";
import MenuTable from "./MenuTable";

const displayName = "menus";

export default {
    "moduleName": "menus",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: MenuForm},
        {path: `/${displayName}/:id`, component: MenuForm},
        {path: `/${displayName}`, component: MenuTable},
    ],
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
