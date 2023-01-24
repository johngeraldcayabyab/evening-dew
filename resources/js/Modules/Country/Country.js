import country_manifest from "./country_manifest.json"
import CountryForm from "./CountryForm"
import CountryTable from "./CountryTable"

export default {
    "moduleName": "countries",
    "displayName": "countries",
    "queryDefaults": {},
    "routes": [
        {path: `/${country_manifest.displayName}/create`, component: CountryForm},
        {path: `/${country_manifest.displayName}/:id`, component: CountryForm},
        {path: `/${country_manifest.displayName}`, component: CountryTable},
    ]
};
