import CityForm from "./CityForm";
import CityTable from "./CityTable";

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
        urlQueries: [
            {url: '/api/regions', query: 'region.region', optionName: 'regionOptions'},
        ],
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
                        optionName: 'regionOptions'
                    },
                ],
            ],
        ],
    }
};
