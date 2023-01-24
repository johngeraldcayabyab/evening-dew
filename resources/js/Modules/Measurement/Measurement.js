import measurement_manifest from "./measurement_manifest.json"
import MeasurementForm from "./MeasurementForm"
import MeasurementTable from "./MeasurementTable"

export default {
    "moduleName": "measurements",
    "displayName": "measurements",
    "queryDefaults": {},
    "routes": [
        {path: `/${measurement_manifest.displayName}/create`, component: MeasurementForm},
        {path: `/${measurement_manifest.displayName}/:id`, component: MeasurementForm},
        {path: `/${measurement_manifest.displayName}`, component: MeasurementTable},
    ]
};
