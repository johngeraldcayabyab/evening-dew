import MaterialTable from "./MaterialTable";
import {getPersistedKey, isLineFieldExecute} from "../../Helpers/form"
import {GET} from "../../consts"
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "materials";

const manifest = {
    "moduleName": "materials",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: MaterialTable},
    ],
    form: {
        initialValue: true,
        onValuesChange: (changedValues, allValues, formContext) => {
            isLineFieldExecute(changedValues, allValues, 'material_lines', 'product_id', (line, allValues) => {
                formContext.useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
                    const materialLines = allValues.material_lines;
                    materialLines[line.key] = {
                        ...materialLines[line.key],
                        measurement_id: response.measurement_id,
                    };
                    formContext.form.setFieldsValue({
                        material_lines: materialLines
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
                    type: 'select',
                    name: 'product_id',
                    label: 'Product',
                    required: true,
                    query: {url: '/api/products', field: 'product.name'},
                },
                {
                    type: 'select',
                    name: 'measurement_id',
                    label: 'Measurement',
                    required: true,
                    query: {url: '/api/measurements', field: 'measurement.name'},
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
                            query: {url: '/api/products', field: 'product.name'},
                            required: true,
                            listName: 'material_lines',
                        },
                        {
                            type: 'number',
                            name: 'quantity',
                            placeholder: 'Quantity',
                            required: true,
                            listName: 'material_lines',
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            query: {url: '/api/measurements', field: 'measurement.name'},
                            required: true,
                            listName: 'material_lines',
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
