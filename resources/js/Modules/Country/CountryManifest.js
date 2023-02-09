import FormGenerator from "../../Components/Form/FormGenerator"
import TableGenerator from "../../Components/TableGenerator"
import {DATE_RANGE, SEARCH} from "../../consts"

const displayName = "countries";

const manifest = {
    "moduleName": "countries",
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
                title: 'Country Name',
                dataIndex: 'country_name',
                key: 'country_name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Country Code',
                dataIndex: 'country_code',
                key: 'country_code',
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
                    name: 'country_name',
                    label: 'Country Name',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'currency_id',
                    label: 'Currency',
                    query: {url: '/api/currencies', field: 'currency.currency'},
                },
                {
                    type: 'text',
                    name: 'country_code',
                    label: 'Country Code',
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'country_calling_code',
                    label: 'Country Calling Code',
                },
            ]
        }
    }
};

export default manifest;
