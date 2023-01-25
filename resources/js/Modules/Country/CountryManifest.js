import CountryForm from "./CountryForm";
import CountryTable from "./CountryTable";

const displayName = "countries";

export default {
    "moduleName": "countries",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: CountryForm},
        {path: `/${displayName}/:id`, component: CountryForm},
        {path: `/${displayName}`, component: CountryTable},
    ]
};
