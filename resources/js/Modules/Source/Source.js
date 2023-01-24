import source_manifest from "./source_manifest.json"
import SourceForm from "./SourceForm"
import SourceTable from "./SourceTable"

export default {
    "moduleName": "sources",
    "displayName": "sources",
    "queryDefaults": {},
    "routes": [
        {path: `/${source_manifest.displayName}/create`, component: SourceForm},
        {path: `/${source_manifest.displayName}/:id`, component: SourceForm},
        {path: `/${source_manifest.displayName}`, component: SourceTable},
    ]
};
