import FormGenerator from "../../Components/Form/FormGenerator"
import TableGenerator from "../../Components/TableGenerator"
import {DATE_RANGE, SEARCH} from "../../consts"

const displayName = "regions";

const manifest = {
    "moduleName": "regions",
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
                title: 'Region',
                dataIndex: 'region',
                key: 'region',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Region Center',
                dataIndex: 'region_center',
                key: 'region_center',
                sorter: true,
                filter: SEARCH,
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
                    name: 'region',
                    label: 'Region',
                    required: true,
                    size: 'large'
                },
                {
                    type: 'text',
                    name: 'region_center',
                    label: 'Region Center',
                    required: true,
                    size: 'large'
                },
            ]
        }
    }
};

export default manifest;
