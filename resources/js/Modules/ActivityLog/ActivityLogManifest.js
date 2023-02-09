import ActivityLogTable from "./ActivityLogTable";

const displayName = "activity_log";

const manifest = {
    "moduleName": "activity_log",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}`, component: ActivityLogTable},
    ]
};

export default manifest;
