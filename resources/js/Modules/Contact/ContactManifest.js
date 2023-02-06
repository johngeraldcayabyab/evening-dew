import ContactForm from "./ContactForm";
import ContactTable from "./ContactTable";

const displayName = "contacts";

export default {
    "moduleName": "contacts",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: ContactForm},
        {path: `/${displayName}/:id`, component: ContactForm},
        {path: `/${displayName}`, component: ContactTable},
    ],
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    message: 'Please input name',
                    required: true,
                    size: 'large'
                },
            ],
            col_2: [
                {
                    type: 'upload',
                    name: 'avatar',
                },
            ]
        },
        row_2: {
            col_1: [
                {
                    type: 'text',
                    name: 'address',
                    label: 'Address',
                },
                {
                    type: 'text',
                    name: 'zip',
                    label: 'Zip',
                },
                {
                    type: 'select',
                    name: 'country_id',
                    label: 'Country',
                    query: {url: '/api/countries', field: 'country.country_name', name: 'countryOptions'},
                },
                {
                    type: 'select',
                    name: 'city_id',
                    label: 'City',
                    query: {url: '/api/cities', field: 'city.name', name: 'cityOptions'},
                },
                {
                    type: 'text',
                    name: 'tax_id',
                    label: 'Tax ID',
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'tax_id',
                    label: 'Tax ID',
                },
                {
                    type: 'text',
                    name: 'phone',
                    label: 'Phone',
                },
                {
                    type: 'text',
                    name: 'mobile',
                    label: 'Mobile',
                },
                {
                    type: 'text',
                    name: 'website',
                    label: 'Website',
                },
            ]
        }
    }
};
