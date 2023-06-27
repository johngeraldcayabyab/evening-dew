import {getPersistedKey, isLineFieldExecute} from "../Helpers/form";
import {DATE_RANGE, GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import {parseFloatComma} from "../Helpers/string"

const manifest = {
    moduleName: "adjustments",
    displayName: "adjustments",
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
            type: 'primary',
            label: 'Cancel',
            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
    ],
    form: {
        initialValue: true,
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
                            onValueChange: (changedValues, values, formContext) => {
                                isLineFieldExecute(changedValues, values, 'adjustment_lines', 'product_id', (changedLine, allValues) => {
                                    formContext.useFetch(`/api/products/${changedLine.product_id}`, GET).then((response) => {
                                        const adjustmentLines = allValues.adjustment_lines;
                                        adjustmentLines[changedLine.key] = {
                                            ...adjustmentLines[changedLine.key],
                                            measurement_id: response.measurement_id,
                                            quantity_on_hand: parseFloatComma(response.quantity),
                                        };
                                        formContext.form.setFieldsValue({
                                            material_lines: adjustmentLines
                                        });
                                        const persistedKey = getPersistedKey(changedLine, formContext.options['measurement_id-lineOptions'].options)
                                        formContext.options['measurement_id-lineOptions'].getOptions(response.measurement.name, persistedKey);
                                    });
                                });
                            },
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            query: {url: '/api/measurements', field: 'name'},
                            required: true,
                        },
                        {
                            type: 'number',
                            name: 'quantity_on_hand',
                            placeholder: 'Quantity on hand',
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'number',
                            name: 'quantity_counted',
                            placeholder: 'Quantity counted',
                            required: true,
                        },
                    ]
                },
            },
        }
    },
};

export default manifest;
