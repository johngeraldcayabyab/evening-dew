import group_manifest from "./group_manifest.json"
import GroupForm from "./GroupForm"
import GroupTable from "./GroupTable"

export default {
    "moduleName": "groups",
    "displayName": "groups",
    "queryDefaults": {},
    "routes": [
        {path: `/${group_manifest.displayName}/create`, component: GroupForm},
        {path: `/${group_manifest.displayName}/:id`, component: GroupForm},
        {path: `/${group_manifest.displayName}`, component: GroupTable},
    ]
};
