import measurement_category_manifest from "./measurement_category_manifest.json"
import MeasurementCategoryForm from "./MeasurementCategoryForm"
import MeasurementCategoryTable from "./MeasurementCategoryTable"

export default {
    "moduleName": "measurement_categories",
    "displayName": "measurement_categories",
    "queryDefaults": {},
    "routes": [
        {path: `/${measurement_category_manifest.displayName}/create`, component: MeasurementCategoryForm},
        {path: `/${measurement_category_manifest.displayName}/:id`, component: MeasurementCategoryForm},
        {path: `/${measurement_category_manifest.displayName}`, component: MeasurementCategoryTable},
    ]
};
