import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "measurements",
    displayName: "measurements",
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
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Ratio',
                dataIndex: 'ratio',
                key: 'ratio',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Rounding Precision',
                dataIndex: 'rounding_precision',
                key: 'rounding_precision',
                sorter: true,
                filter: SEARCH,
            },
            {
                title: 'Category',
                dataIndex: 'measurement_category',
                key: 'measurement_category',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.measurement_category.name;
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
                    name: 'type',
                    label: 'Please select a type',
                    options: [
                        {value: 'reference', label: 'Reference measurement for this category'},
                        {value: 'smaller', label: 'Smaller than the reference measurement'},
                        {value: 'bigger', label: 'Bigger than the reference measurement'},
                    ],
                    required: true,
                },
                {
                    type: 'number',
                    name: 'ratio',
                    label: 'Ratio',
                    required: true,
                },
                {
                    type: 'number',
                    name: 'rounding_precision',
                    label: 'Rounding precision',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'measurement_category_id',
                    label: 'Measurement Category',
                    query: {url: '/api/measurement_categories', field: 'name'},
                    required: true,
                },
            ]
        }
    }
};

export default manifest;
