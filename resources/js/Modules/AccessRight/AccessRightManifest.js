import AccessRightForm from "./AccessRightForm";
import AccessRightTable from "./AccessRightTable";

const displayName = "access_rights";

export default {
    "moduleName": "access_rights",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: AccessRightForm},
        {path: `/${displayName}/:id`, component: AccessRightForm},
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
                    message: 'Please input name',
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
