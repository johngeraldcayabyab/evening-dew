import transfer_manifest from "./transfer_manifest.json"
import TransferForm from "./TransferForm"
import TransferTable from "./TransferTable"

export default {
    "moduleName": "transfers",
    "displayName": "transfers",
    "queryDefaults": {},
    "routes": [
        {path: `/${transfer_manifest.displayName}/create`, component: TransferForm},
        {path: `/${transfer_manifest.displayName}/:id`, component: TransferForm},
        {path: `/${transfer_manifest.displayName}`, component: TransferTable},
    ]
};
