import SequenceForm from "./SequenceForm";
import SequenceTable from "./SequenceTable";

const displayName = "sequences";

export default {
    "moduleName": "sequences",
    "displayName": "sequences",
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: SequenceForm},
        {path: `/${displayName}/:id`, component: SequenceForm},
        {path: `/${displayName}`, component: SequenceTable},
    ]
};
