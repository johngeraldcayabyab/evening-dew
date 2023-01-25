import CurrencyForm from "./CurrencyForm";
import CurrencyTable from "./CurrencyTable";

const displayName = "currencies";

export default {
    "moduleName": "currencies",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: CurrencyForm},
        {path: `/${displayName}/:id`, component: CurrencyForm},
        {path: `/${displayName}`, component: CurrencyTable},
    ]
};
