import TransferForm from "./TransferForm";
import TransferTable from "./TransferTable";

const displayName = "transfers";

export default {
    "moduleName": "transfers",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: TransferForm},
        {path: `/${displayName}/:id`, component: TransferForm},
        {path: `/${displayName}`, component: TransferTable},
    ]
};
