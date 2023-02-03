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
                    message: 'Please Input Name',
                    required: true
                },
                {
                    type: 'checkbox',
                    name: 'is_enabled',
                    label: 'Enabled',
                },
            ]
        },
        tabs_1: {
            tab_pane_1: {
                row_1: {
                    col_1: {}
                },
            }
        }
    }
};
