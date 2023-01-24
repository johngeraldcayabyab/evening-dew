import access_right_manifest from "./access_right_manifest.json"
import AccessRightForm from "./AccessRightForm"
import AccessRightTable from "./AccessRightTable"

export default {
    "moduleName": "access_rights",
    "displayName": "access_rights",
    "queryDefaults": {},
    "routes": [
        {path: `/${access_right_manifest.displayName}/create`, component: AccessRightForm},
        {path: `/${access_right_manifest.displayName}/:id`, component: AccessRightForm},
        {path: `/${access_right_manifest.displayName}`, component: AccessRightTable},
    ]
};
