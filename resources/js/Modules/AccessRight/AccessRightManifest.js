import FormGenerator from "../../Components/Form/FormGenerator";
import {SEARCH} from "../../consts"
import {Tag} from "antd"
import TableGenerator from "../../Components/TableGenerator"

const displayName = "access_rights";

const manifest = {
    "moduleName": "access_rights",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: () => (<TableGenerator {...manifest} />)},
    ],
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
                render: (text, record) => {
                    if (record.read_access) {
                        return <Tag color="green">Yes</Tag>
                    }
                    return <Tag color="red">No</Tag>
                }
            },
            {
                title: 'Write Access',
                dataIndex: 'write_access',
                key: 'write_access',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.write_access) {
                        return <Tag color="green">Yes</Tag>
                    }
                    return <Tag color="red">No</Tag>
                }
            },
            {
                title: 'Create Access',
                dataIndex: 'create_access',
                key: 'create_access',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.create_access) {
                        return <Tag color="green">Yes</Tag>
                    }
                    return <Tag color="red">No</Tag>
                }
            },
            {
                title: 'Delete Access',
                dataIndex: 'delete_access',
                key: 'delete_access',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.delete_access) {
                        return <Tag color="green">Yes</Tag>
                    }
                    return <Tag color="red">No</Tag>
                }
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
