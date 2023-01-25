import AddressForm from "./AddressForm";
import AddressTable from "./AddressTable";

const displayName = "addresses";

export default {
    "moduleName": "addresses",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: AddressForm},
        {path: `/${displayName}/:id`, component: AddressForm},
        {path: `/${displayName}`, component: AddressTable},
    ]
};
