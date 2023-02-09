import CountryTable from "./CountryTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "countries";

const manifest = {
    "moduleName": "countries",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: CountryTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'country_name',
                    label: 'Country Name',
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

export default manifest;
