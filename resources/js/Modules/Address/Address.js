import address_manifest from "./address_manifest.json"
import AddressForm from "./AddressForm"
import AddressTable from "./AddressTable"

export default {
    "moduleName": "addresses",
    "displayName": "addresses",
    "queryDefaults": {},
    "routes": [
        {path: `/${address_manifest.displayName}/create`, component: AddressForm},
        {path: `/${address_manifest.displayName}/:id`, component: AddressForm},
        {path: `/${address_manifest.displayName}`, component: AddressTable},
    ]
};
