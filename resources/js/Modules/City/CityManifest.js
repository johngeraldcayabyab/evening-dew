import CityForm from "./CityForm";
import CityTable from "./CityTable";
import useOptionChad from "../../Hooks/useOptionChad"

const displayName = "cities";

export default {
    "moduleName": "cities",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: CityForm},
        {path: `/${displayName}/:id`, component: CityForm},
        {path: `/${displayName}`, component: CityTable},
    ],
    form: {
        fields: [
            [
                [
                    {
                        type: 'text',
                        name: 'name',
                        label: 'Name',
                        message: 'Please input name',
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
                        query: {url: '/api/regions', field: 'region.region', name: 'regionOptions'},
                    },
                ],
            ],
        ],
    }
};
