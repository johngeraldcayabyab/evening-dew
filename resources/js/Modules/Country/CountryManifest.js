import CountryForm from "./CountryForm";
import CountryTable from "./CountryTable";

const displayName = "countries";

export default {
    "moduleName": "countries",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: CountryForm},
        {path: `/${displayName}/:id`, component: CountryForm},
        {path: `/${displayName}`, component: CountryTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'country_name',
                    label: 'Country Name',
                    message: 'Please input country name',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'currency_id',
                    label: 'Currency',
                    query: {url: '/api/currencies', field: 'currency.currency'},
                },
                {
                    type: 'text',
                    name: 'country_code',
                    label: 'Country Code',
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'country_calling_code',
                    label: 'Country Calling Code',
                },
            ]
        }
    }
};
