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
    ],
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'type',
                    label: 'Please select a type',
                    options: [
                        {value: 'reference', label: 'Reference measurement for this category'},
                        {value: 'smaller', label: 'Smaller than the reference measurement'},
                        {value: 'bigger', label: 'Bigger than the reference measurement'},
                    ],
                    required: true,
                },
                {
                    type: 'number',
                    name: 'ratio',
                    label: 'Ratio',
                    required: true,
                },
                {
                    type: 'number',
                    name: 'rounding_precision',
                    label: 'Rounding precision',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'measurement_category_id',
                    label: 'Measurement Category',
                    query: {url: '/api/measurement_categories', field: 'measurement_category.name'},
                    required: true,
                },
            ]
        }
    }
};
