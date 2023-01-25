import AdjustmentForm from "./AdjustmentForm";
import AdjustmentTable from "./AdjustmentTable";

const displayName = "adjustments";

export default {
    "moduleName": "adjustments",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: AdjustmentForm},
        {path: `/${displayName}/:id`, component: AdjustmentForm},
        {path: `/${displayName}`, component: AdjustmentTable},
    ]
};
