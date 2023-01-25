import GroupForm from "./GroupForm";
import GroupTable from "./GroupTable";

const displayName = "groups";

export default {
    "moduleName": "groups",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: GroupForm},
        {path: `/${displayName}/:id`, component: GroupForm},
        {path: `/${displayName}`, component: GroupTable},
    ]
};
