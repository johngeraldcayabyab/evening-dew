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
    ]
};
