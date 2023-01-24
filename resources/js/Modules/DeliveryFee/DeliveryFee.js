import delivery_fee_manifest from "./delivery_fee_manifest.json"
import DeliveryFeeForm from "./DeliveryFeeForm"
import DeliveryFeeTable from "./DeliveryFeeTable"

export default {
    "moduleName": "delivery_fees",
    "displayName": "delivery_fees",
    "queryDefaults": {},
    "routes": [
        {path: `/${delivery_fee_manifest.displayName}/create`, component: DeliveryFeeForm},
        {path: `/${delivery_fee_manifest.displayName}/:id`, component: DeliveryFeeForm},
        {path: `/${delivery_fee_manifest.displayName}`, component: DeliveryFeeTable},
    ]
};
