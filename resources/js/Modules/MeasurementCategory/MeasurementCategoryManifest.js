import MeasurementCategoryForm from "./MeasurementCategoryForm";
import MeasurementCategoryTable from "./MeasurementCategoryTable";

const displayName = "measurement_categories";

export default {
    "moduleName": "measurement_categories",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: MeasurementCategoryForm},
        {path: `/${displayName}/:id`, component: MeasurementCategoryForm},
        {path: `/${displayName}`, component: MeasurementCategoryTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    message: 'Please input measurement category name',
                    required: true
                },
            ]
        }
    }
};
