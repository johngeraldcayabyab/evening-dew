import AccessRightTable from "./AccessRightTable";
import FormGenerator from "../../Components/Form/FormGenerator";

const displayName = "access_rights";

const manifest = {
    "moduleName": "access_rights",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: AccessRightTable},
    ],
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'group_id',
                    label: 'Group',
                    query: {url: '/api/groups', field: 'group.name'},
                },
                {
                    type: 'checkbox',
                    name: 'read_access',
                    label: 'Read Access',
                },
                {
                    type: 'checkbox',
                    name: 'write_access',
                    label: 'Write Access',
                },
                {
                    type: 'checkbox',
                    name: 'create_access',
                    label: 'Create Access',
                },
                {
                    type: 'checkbox',
                    name: 'delete_access',
                    label: 'Delete Access',
                },
            ]
        }
    }
};

export default manifest;
