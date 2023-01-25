import ActivityLogTable from "./ActivityLogTable"

const displayName = "activity_log";

export default {
    "moduleName": "activity_log",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}`, component: ActivityLogTable},
    ]
}
