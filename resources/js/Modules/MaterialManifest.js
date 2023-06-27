import {getPersistedKey} from "../Helpers/form";
import {DATE_RANGE, GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "materials",
    displayName: "materials",
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
                title: 'Product',
                dataIndex: 'product',
                key: 'product',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.product.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Reference',
                dataIndex: 'reference',
                key: 'reference',
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
                    type: 'select',
                    name: 'product_id',
                    label: 'Product',
                    required: true,
                    query: {url: '/api/products', field: 'name'},
                },
                {
                    type: 'select',
                    name: 'measurement_id',
                    label: 'Measurement',
                    required: true,
                    query: {url: '/api/measurements', field: 'name'},
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'reference',
                    label: 'Reference',
                },
                {
                    type: 'select',
                    name: 'material_type',
                    label: 'Material Type',
                    required: true,
                    options: [
                        {value: 'manufacture_this_product', label: 'Manufacture this product'},
                        {value: 'kit', label: 'Kit'},
                    ]
                },
            ]
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: "Components",
                form_line_1: {
                    columns: ['Product', 'Quantity', 'Measurement'],
                    listName: 'material_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true,
                            onValueChange: (changedValues, values, formContext, changedLine, allValues) => {
                                formContext.useFetch(`/api/products/${changedLine.product_id}`, GET).then((response) => {
                                    const materialLines = allValues.material_lines;
                                    materialLines[changedLine.key] = {
                                        ...materialLines[changedLine.key],
                                        measurement_id: response.measurement_id,
                                    };
                                    formContext.form.setFieldsValue({
                                        material_lines: materialLines
                                    });
                                    const persistedKey = getPersistedKey(changedLine, formContext.options['measurement_id-lineOptions'].options)
                                    formContext.options['measurement_id-lineOptions'].getOptions(response.measurement.name, persistedKey);
                                });
                            },
                        },
                        {
                            type: 'number',
                            name: 'quantity',
                            placeholder: 'Quantity',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            query: {url: '/api/measurements', field: 'name'},
                            required: true,
                        },
                    ]
                },
            },
            tab_pane_2: {
                name: "Miscellaneous",
                row_1: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'flexible_consumption',
                            label: 'Flexible Consumption',
                            required: true,
                            options: [
                                {value: 'allowed', label: 'Allowed'},
                                {value: 'allowed_with_warning', label: 'Allowed with warning'},
                                {value: 'blocked', label: 'Blocked'},
                            ]
                        },
                    ]
                }
            }
        }
    },
};

export default manifest;
