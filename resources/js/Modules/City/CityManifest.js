import CityTable from "./CityTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "cities";

const manifest = {
    "moduleName": "cities",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: CityTable},
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
                {
                    type: 'text',
                    name: 'province',
                    label: 'Province',
                },
                {
                    type: 'select',
                    name: 'region_id',
                    label: 'Region',
                    query: {url: '/api/regions', field: 'region.region'},
                },
            ]
        }
    }
};

export default manifest;
