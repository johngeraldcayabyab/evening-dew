import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "product_categories",
    displayName: "product_categories",
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
                title: 'Category',
                dataIndex: 'parents',
                key: 'category',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Default',
                dataIndex: 'is_default',
                key: 'is_default',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
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
                    name: 'category',
                    label: 'Category',
                    required: true,
                    size: 'large',
                },
                {
                    type: 'select',
                    name: 'parent_product_category_id',
                    label: 'Parent Category',
                    query: {url: '/api/product_categories', field: 'category'},
                },
            ],
            col_2: [
                {
                    type: 'checkbox',
                    name: 'is_default',
                    label: 'Is Default',
                },
            ]
        },
    }
};

export default manifest;
