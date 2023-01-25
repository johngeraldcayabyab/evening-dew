import LocationForm from "./LocationForm";
import LocationTable from "./LocationTable";

const displayName = "locations";

export default {
    "moduleName": "locations",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: LocationForm},
        {path: `/${displayName}/:id`, component: LocationForm},
        {path: `/${displayName}`, component: LocationTable},
    ]
};
