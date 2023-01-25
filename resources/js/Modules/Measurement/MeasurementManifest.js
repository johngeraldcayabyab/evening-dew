import MeasurementForm from "./MeasurementForm";
import MeasurementTable from "./MeasurementTable";

const displayName = "measurements";

export default {
    "moduleName": "measurements",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: MeasurementForm},
        {path: `/${displayName}/:id`, component: MeasurementForm},
        {path: `/${displayName}`, component: MeasurementTable},
    ]
};
