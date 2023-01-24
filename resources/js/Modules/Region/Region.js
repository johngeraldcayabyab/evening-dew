import region_manifest from "./region_manifest.json"
import RegionForm from "./RegionForm"
import RegionTable from "./RegionTable"

export default {
    "moduleName": "regions",
    "displayName": "regions",
    "queryDefaults": {},
    "routes": [
        {path: `/${region_manifest.displayName}/create`, component: RegionForm},
        {path: `/${region_manifest.displayName}/:id`, component: RegionForm},
        {path: `/${region_manifest.displayName}`, component: RegionTable},
    ]
};
