import sequence_manifest from "./sequence_manifest.json"
import SequenceForm from "./SequenceForm"
import SequenceTable from "./SequenceTable"

export default {
    "moduleName": "sequences",
    "displayName": "sequences",
    "queryDefaults": {},
    "routes": [
        {path: `/${sequence_manifest.displayName}/create`, component: SequenceForm},
        {path: `/${sequence_manifest.displayName}/:id`, component: SequenceForm},
        {path: `/${sequence_manifest.displayName}`, component: SequenceTable},
    ]
};
