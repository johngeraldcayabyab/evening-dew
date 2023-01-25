import CityForm from "./CityForm";
import CityTable from "./CityTable";

const displayName = "cities";

export default {
    "moduleName": "cities",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: CityForm},
        {path: `/${displayName}/:id`, component: CityForm},
        {path: `/${displayName}`, component: CityTable},
    ]
};
