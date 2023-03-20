import MaterialForm from "./MaterialForm";
import MaterialTable from "./MaterialTable";

const displayName = "materials";

export default {
    "moduleName": "materials",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: MaterialForm},
        {path: `/${displayName}/:id`, component: MaterialForm},
        {path: `/${displayName}`, component: MaterialTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'select',
                    name: 'product_id',
                    label: 'Product',
                    query: {url: '/api/products', field: 'product.name'},
                },
                {
                    type: 'select',
                    name: 'measurement_id',
                    label: 'Measurement',
                    query: {url: '/api/measurements', field: 'measurement.name'},
                    required: true,
                    listName: 'material_lines',
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
                            listName: 'delivery_fee_lines',
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
                name: "Technical Information",
                row_1: {
                    col_1: [
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
                }
            }
        }
    },
};
