import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const displayName = "products";

export default {
    "moduleName": "products",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: ProductForm},
        {path: `/${displayName}/:id`, component: ProductForm},
        {path: `/${displayName}`, component: ProductTable},
    ],
    formLinks: [
        {
            value: 'name',
            label: (initialValues) => {
                return `Quantity: ${initialValues.quantity} ${initialValues.measurement ? initialValues.measurement.name : null}`
            }
        },
    ],
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    message: 'Please input name',
                    required: true,
                    size: 'large',
                },
            ],
            col_2: [
                {
                    type: 'upload',
                    name: 'avatar',
                },
            ],
        },
        row_2: {
            col_1: [
                {
                    type: 'checkbox',
                    name: 'can_be_sold',
                    label: 'Can be sold',
                },
                {
                    type: 'checkbox',
                    name: 'can_be_purchased',
                    label: 'Can be purchased',
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: 'General Information',
                row_1: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'product_type',
                            label: 'Product',
                            options: [
                                {value: 'storable', label: 'Storable'},
                                {value: 'consumable', label: 'Consumable'},
                                {value: 'service', label: 'Service'},
                            ]
                        },
                        {
                            type: 'select',
                            name: 'invoicing_policy',
                            label: 'Invoicing Policy',
                            options: [
                                {value: 'ordered_quantities', label: 'Ordered Quantities'},
                                {value: 'delivered_quantities', label: 'Delivered Quantities'},
                            ],
                            message: 'Please select an invoicing policy',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            label: 'Measurement',
                            query: {url: '/api/measurements', field: 'measurement.name', name: 'measurementOptions'},
                            message: 'Please select a measurement',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'purchase_measurement_id',
                            label: 'Purchase Measurement',
                            query: {
                                url: '/api/measurements',
                                field: 'purchase_measurement.name',
                                name: 'purchaseMeasurementOptions'
                            },
                            message: 'Please select a measurement',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'sales_measurement_id',
                            label: 'Sales Measurement',
                            query: {
                                url: '/api/measurements',
                                field: 'sales_measurement.name',
                                name: 'salesMeasurementOptions'
                            },
                            message: 'Please select a measurement',
                            required: true,
                        },
                    ],
                    col_2: [
                        {
                            type: 'number',
                            name: 'sales_price',
                            label: 'Sales Price',
                            message: 'Please input sales price',
                            required: true,
                        },
                        {
                            type: 'number',
                            name: 'cost',
                            label: 'Cost',
                            message: 'Please input cost',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'product_category_id',
                            label: 'Product Category',
                            query: {
                                url: '/api/product_categories',
                                field: 'product_category.category',
                                name: 'productCategoryOptions'
                            },
                            message: 'Please select a product category',
                            required: true,
                        },
                        {
                            type: 'text',
                            name: 'internal_reference',
                            label: 'Internal Reference',
                        },
                    ],
                },
            },
            tab_pane_2: {
                name: 'Other Information',
                row_1: {
                    col_1: [
                        {
                            type: 'textarea',
                            name: 'sales_description',
                            label: 'Sales Description',
                        },
                        {
                            type: 'textarea',
                            name: 'purchase_description',
                            label: 'Purchase Description',
                        },
                    ]
                },
            }
        }
    }
};
