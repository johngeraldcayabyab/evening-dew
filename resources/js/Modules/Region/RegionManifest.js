import RegionTable from "./RegionTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "regions";

const manifest = {
    "moduleName": "regions",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: RegionTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'region',
                    label: 'Region',
                    required: true,
                    size: 'large'
                },
                {
                    type: 'text',
                    name: 'region_center',
                    label: 'Region Center',
                    required: true,
                    size: 'large'
                },
            ]
        }
    }
};

export default manifest;
