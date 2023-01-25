import OperationTypeForm from "./OperationTypeForm";
import OperationTypeTable from "./OperationTypeTable";

const displayName = "operations_types";

export default {
    "moduleName": "operations_types",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: OperationTypeForm},
        {path: `/${displayName}/:id`, component: OperationTypeForm},
        {path: `/${displayName}`, component: OperationTypeTable},
    ]
};
