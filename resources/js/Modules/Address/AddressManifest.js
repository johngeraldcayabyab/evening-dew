import AddressForm from "./AddressForm";
import AddressTable from "./AddressTable";

const displayName = "addresses";

export default {
    "moduleName": "addresses",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: AddressForm},
        {path: `/${displayName}/:id`, component: AddressForm},
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
                    message: 'Please input address name',
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
                    query: {url: '/api/countries', field: 'country.country_name', name: 'countryOptions'},
                },
                {
                    type: 'select',
                    name: 'city_id',
                    label: 'City',
                    query: {url: '/api/cities', field: 'city.name', name: 'cityOptions'},
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'contact_id',
                    label: 'Contact',
                    query: {url: '/api/contacts', field: 'contact.name', name: 'contactOptions'},
                    message: 'Please select a contact',
                    required: true,
                },
            ],
        }
    }
};
