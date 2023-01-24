import user_manifest from "./user_manifest.json"
import UserForm from "./UserForm"
import UserTable from "./UserTable"

export default {
    "moduleName": "users",
    "displayName": "users",
    "queryDefaults": {},
    "routes": [
        {path: `/${user_manifest.displayName}/create`, component: UserForm},
        {path: `/${user_manifest.displayName}/:id`, component: UserForm},
        {path: `/${user_manifest.displayName}`, component: UserTable},
    ]
}
