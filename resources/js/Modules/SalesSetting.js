import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "sales_settings",
    displayName: "sales_settings",
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
                title: 'Company',
                dataIndex: 'company',
                key: 'company',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.company) {
                        return record.company.name;
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
        initialValue: false,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
                {
                    type: 'checkbox',
                    name: 'validate_transfer_on_validate',
                    label: 'Validate transfer on validate',
                },
                {
                    type: 'select',
                    name: 'company_id',
                    label: 'Company',
                    query: {url: '/api/companies', field: 'name'},
                },
            ],
        },
    }
};

export default manifest;
