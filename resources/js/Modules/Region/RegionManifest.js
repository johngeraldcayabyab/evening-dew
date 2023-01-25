import RegionForm from "./RegionForm";
import RegionTable from "./RegionTable";

const displayName = "regions";

export default {
    "moduleName": "regions",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: RegionForm},
        {path: `/${displayName}/:id`, component: RegionForm},
        {path: `/${displayName}`, component: RegionTable},
    ]
};
