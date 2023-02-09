import MenuTable from "./MenuTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "menus";

const manifest = {
    "moduleName": "menus",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
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

export default manifest;
