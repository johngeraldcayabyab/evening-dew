import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "countries",
    displayName: "countries",
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
                    query: {url: '/api/currencies', field: 'currency'},
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
