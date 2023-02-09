import AddressTable from "./AddressTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "addresses";

const manifest = {
    "moduleName": "addresses",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: AddressTable},
    ],
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'address_name',
                    label: 'Address Name',
                    required: true,
                    size: 'large'
                },
            ],
        },
        row_2: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
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
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'contact_id',
                    label: 'Contact',
                    query: {url: '/api/contacts', field: 'contact.name'},
                    required: true,
                },
            ],
        }
    }
};

export default manifest;
