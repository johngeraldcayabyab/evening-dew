import AccessRightForm from "./AccessRightForm";
import AccessRightTable from "./AccessRightTable";

const displayName = "access_rights";

export default {
    "moduleName": "access_rights",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: AccessRightForm},
        {path: `/${displayName}/:id`, component: AccessRightForm},
        {path: `/${displayName}`, component: AccessRightTable},
    ]
};
