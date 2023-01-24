import operation_type_manifest from "./operation_type_manifest.json"
import OperationTypeForm from "./OperationTypeForm"
import OperationTypeTable from "./OperationTypeTable"

export default {
    "moduleName": "operations_types",
    "displayName": "operations_types",
    "queryDefaults": {},
    "routes": [
        {path: `/${operation_type_manifest.displayName}/create`, component: OperationTypeForm},
        {path: `/${operation_type_manifest.displayName}/:id`, component: OperationTypeForm},
        {path: `/${operation_type_manifest.displayName}`, component: OperationTypeTable},
    ]
};
