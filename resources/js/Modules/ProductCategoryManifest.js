import {DATE_RANGE, SEARCH} from "../consts"

const displayName = "product_categories";

const manifest = {
    "moduleName": "product_categories",
    "displayName": displayName,
    "queryDefaults": {},
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
            ]
        },
    }
};

export default manifest;
