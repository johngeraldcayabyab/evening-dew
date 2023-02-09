import ProductTable from "./ProductTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "products";

const manifest = {
    "moduleName": "products",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
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
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            label: 'Measurement',
                            query: {url: '/api/measurements', field: 'measurement.name'},
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'purchase_measurement_id',
                            label: 'Purchase Measurement',
                            query: {url: '/api/measurements', field: 'purchase_measurement.name'},
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'sales_measurement_id',
                            label: 'Sales Measurement',
                            query: {url: '/api/measurements', field: 'sales_measurement.name'},
                            required: true,
                        },
                    ],
                    col_2: [
                        {
                            type: 'number',
                            name: 'sales_price',
                            label: 'Sales Price',
                            required: true,
                        },
                        {
                            type: 'number',
                            name: 'cost',
                            label: 'Cost',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'product_category_id',
                            label: 'Product Category',
                            query: {url: '/api/product_categories', field: 'product_category.category'},
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

export default manifest;
