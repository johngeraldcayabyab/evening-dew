import currency_manifest from "./currency_manifest.json"
import CurrencyForm from "./CurrencyForm"
import CurrencyTable from "./CurrencyTable"

export default {
    "moduleName": "currencies",
    "displayName": "currencies",
    "queryDefaults": {},
    "routes": [
        {path: `/${currency_manifest.displayName}/create`, component: CurrencyForm},
        {path: `/${currency_manifest.displayName}/:id`, component: CurrencyForm},
        {path: `/${currency_manifest.displayName}`, component: CurrencyTable},
    ]
};
