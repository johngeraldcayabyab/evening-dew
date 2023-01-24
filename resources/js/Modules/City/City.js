import city_manifest from "./city_manifest.json"
import CityForm from "./CityForm"
import CityTable from "./CityTable"

export default {
    "moduleName": "cities",
    "displayName": "cities",
    "queryDefaults": {},
    "routes": [
        {path: `/${city_manifest.displayName}/create`, component: CityForm},
        {path: `/${city_manifest.displayName}/:id`, component: CityForm},
        {path: `/${city_manifest.displayName}`, component: CityTable},
    ]
};
