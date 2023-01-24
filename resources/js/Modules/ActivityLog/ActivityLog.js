import activity_log_manifest from "./activity_log_manifest.json"
import ActivityLogTable from "./ActivityLogTable"

export default {
    "moduleName": "activity_log",
    "displayName": "activity_log",
    "queryDefaults": {},
    "routes": [
        {path: `/${activity_log_manifest.displayName}`, component: ActivityLogTable},
    ]
}
