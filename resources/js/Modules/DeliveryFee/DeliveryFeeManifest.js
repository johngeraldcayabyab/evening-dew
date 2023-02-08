import DeliveryFeeForm from "./DeliveryFeeForm";
import DeliveryFeeTable from "./DeliveryFeeTable";

const displayName = "delivery_fees";

export default {
    "moduleName": "delivery_fees",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: DeliveryFeeForm},
        {path: `/${displayName}/:id`, component: DeliveryFeeForm},
        {path: `/${displayName}`, component: DeliveryFeeTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true
                },
                {
                    type: 'checkbox',
                    name: 'is_enabled',
                    label: 'Enabled',
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'product_id',
                    label: 'Product',
                    query: {url: '/api/products', field: 'product.name'},
                },
            ]
        },
        form_line_1: {
            columns: ['City', 'Fee'],
            listName: 'delivery_fee_lines',
            fields: [
                {
                    type: 'select',
                    name: 'city_id',
                    placeholder: 'City',
                    query: {url: '/api/cities', field: 'city.name'},
                    required: true,
                    listName: 'delivery_fee_lines',
                },
                {
                    type: 'number',
                    name: 'fee',
                    label: 'Fee',
                    listName: 'delivery_fee_lines',
                },
            ]
        },
    }
    // tabs_1: {
    //     tab_pane_1: {
    //         row_1: {
    //             col_1: {}
    //         },
    //     }
    // }
};
