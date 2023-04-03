import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts"

const manifest = {
    moduleName: "access_rights",
    displayName: "access_rights",
    queryDefaults: {},
    routes: [HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE],
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
                title: 'Group',
                dataIndex: 'group',
                key: 'group',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
                render: (text, record) => {
                    if (record.group) {
                        return record.group.name;
                    }
                    return null;
                }
            },
            {
                title: 'Read Access',
                dataIndex: 'read_access',
                key: 'read_access',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
            },
            {
                title: 'Write Access',
                dataIndex: 'write_access',
                key: 'write_access',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
            },
            {
                title: 'Create Access',
                dataIndex: 'create_access',
                key: 'create_access',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
            },
            {
                title: 'Delete Access',
                dataIndex: 'delete_access',
                key: 'delete_access',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
            },
        ]
    },
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
                    query: {url: '/api/groups', field: 'name'},
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
