import FormGenerator from "../../Components/Form/FormGenerator"
import TableGenerator from "../../Components/TableGenerator"
import {DATE_RANGE, SEARCH} from "../../consts"
import {Tag} from "antd"

const displayName = "couriers";

const manifest = {
    "moduleName": "couriers",
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
                title: 'Color',
                dataIndex: 'color',
                key: 'color',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.color) {
                        return <Tag color={record.color}>{record.color}</Tag>;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            },
        ]
    },
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
                {
                    type: 'text',
                    name: 'color',
                    label: 'Color',
                },
            ]
        }
    }
};

export default manifest;
