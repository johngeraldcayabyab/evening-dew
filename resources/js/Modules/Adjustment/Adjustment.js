import adjustment_manifest from "./adjustment_manifest.json"
import AdjustmentForm from "./AdjustmentForm"
import AdjustmentTable from "./AdjustmentTable"

export default {
    "moduleName": "adjustments",
    "displayName": "adjustments",
    "queryDefaults": {},
    "routes": [
        {path: `/${adjustment_manifest.displayName}/create`, component: AdjustmentForm},
        {path: `/${adjustment_manifest.displayName}/:id`, component: AdjustmentForm},
        {path: `/${adjustment_manifest.displayName}`, component: AdjustmentTable},
    ]
};
