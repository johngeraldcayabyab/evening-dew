import RegionForm from "./RegionForm";
import RegionTable from "./RegionTable";

const displayName = "regions";

export default {
    "moduleName": "regions",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: RegionForm},
        {path: `/${displayName}/:id`, component: RegionForm},
        {path: `/${displayName}`, component: RegionTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'region',
                    label: 'Region',
                    message: 'Please input region',
                    required: true,
                    size:'large'
                },
                {
                    type: 'text',
                    name: 'region_center',
                    label: 'Region Center',
                    message: 'Please input region center',
                    required: true,
                    size:'large'
                },
            ]
        }
    }
};
