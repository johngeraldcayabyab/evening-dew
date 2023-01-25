import UserForm from "./UserForm"
import UserTable from "./UserTable"

const displayName = "users";

export default {
    "moduleName": "users",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: UserForm},
        {path: `/${displayName}/:id`, component: UserForm},
        {path: `/${displayName}`, component: UserTable},
    ]
}
