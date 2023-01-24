import location_manifest from "./location_manifest.json"
import LocationForm from "./LocationForm"
import LocationTable from "./LocationTable"

export default {
    "moduleName": "locations",
    "displayName": "locations",
    "queryDefaults": {},
    "routes": [
        {path: `/${location_manifest.displayName}/create`, component: LocationForm},
        {path: `/${location_manifest.displayName}/:id`, component: LocationForm},
        {path: `/${location_manifest.displayName}`, component: LocationTable},
    ]
};
