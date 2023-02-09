import ContactTable from "./ContactTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "contacts";

const manifest = {
    "moduleName": "contacts",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
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
                    query: {url: '/api/countries', field: 'country.country_name'},
                },
                {
                    type: 'select',
                    name: 'city_id',
                    label: 'City',
                    query: {url: '/api/cities', field: 'city.name'},
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

export default manifest;
