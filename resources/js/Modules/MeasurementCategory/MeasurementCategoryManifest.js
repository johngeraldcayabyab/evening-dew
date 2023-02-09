import MeasurementCategoryTable from "./MeasurementCategoryTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "measurement_categories";

const manifest = {
    "moduleName": "measurement_categories",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: MeasurementCategoryTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true
                },
            ]
        }
    }
};

export default manifest;
