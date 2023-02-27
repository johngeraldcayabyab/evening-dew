import {getPersistedKey, isLineFieldExecute} from "../Helpers/form";
import {DATE_RANGE, GET, SEARCH} from "../consts";

const displayName = "adjustments";

const manifest = {
    "moduleName": "adjustments",
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
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Product Category',
                dataIndex: 'product_category',
                key: 'product_category',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.product_category.category;
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
    statuses: [
        {
            value: 'draft',
            title: 'Draft',
            status: {draft: 'process', done: 'finish', cancelled: 'wait'}
        },
        {
            value: 'done',
            title: 'Done',
            type: 'primary',
            label: 'Validate',
            status: {draft: 'wait', done: 'finish', cancelled: 'wait'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
        {
            value: 'cancelled',
            title: 'Cancelled',
            type: 'ghost',
            label: 'Cancel',
            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
    ],
    form: {
        initialValue: true,
        onValuesChange: (changedValues, allValues, formContext) => {
            isLineFieldExecute(changedValues, allValues, 'adjustment_lines', 'product_id', (line, allValues) => {
                formContext.useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
                    const adjustmentLines = allValues.adjustment_lines;
                    adjustmentLines[line.key] = {
                        ...adjustmentLines[line.key],
                        measurement_id: response.measurement_id,
                        quantity_on_hand: response.quantity,
                    };
                    formContext.form.setFieldsValue({
                        material_lines: adjustmentLines
                    });
                    const persistedKey = getPersistedKey(line, formContext.options['measurement_id-lineOptions'].options)
                    formContext.options['measurement_id-lineOptions'].getOptions(response.measurement.name, persistedKey);
                }).catch((responseErr) => {
                    formContext.fetchCatcher.get(responseErr);
                });
            });
        },
        row_1: {
            col_1: [
                {
                    type: 'status',
                    name: 'status',
                },
                {
                    type: 'text',
                    name: 'number',
                    label: 'Number',
                    required: true,
                    size: 'large',
                },
                {
                    type: 'select',
                    name: 'product_category_id',
                    label: 'Product Category',
                    query: {url: '/api/product_categories', field: 'category'},
                    required: true,
                },
                {
                    type: 'select',
                    name: 'warehouse_id',
                    label: 'Warehouse',
                    query: {url: '/api/warehouses', field: 'name'},
                    required: true,
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: "Items",
                form_line_1: {
                    columns: ['Product', 'Measurement', 'Quantity On Hand', 'Quantity Counted'],
                    listName: 'adjustment_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true,
                            listName: 'adjustment_lines',
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            query: {url: '/api/measurements', field: 'name'},
                            required: true,
                            listName: 'adjustment_lines',
                        },
                        {
                            type: 'number',
                            name: 'quantity_on_hand',
                            placeholder: 'Quantity on hand',
                            required: true,
                            listName: 'adjustment_lines',
                        },
                        {
                            type: 'number',
                            name: 'quantity_counted',
                            placeholder: 'Quantity counted',
                            required: true,
                            listName: 'adjustment_lines',
                        },
                    ]
                },
            },
        }
    },
};

export default manifest;
