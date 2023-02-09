import MeasurementTable from "./MeasurementTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "measurements";

const manifest = {
    "moduleName": "measurements",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
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

export default manifest;
