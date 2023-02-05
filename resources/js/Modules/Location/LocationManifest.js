import LocationForm from "./LocationForm";
import LocationTable from "./LocationTable";

const displayName = "locations";

export default {
    "moduleName": "locations",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: LocationForm},
        {path: `/${displayName}/:id`, component: LocationForm},
        {path: `/${displayName}`, component: LocationTable},
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
                {
                    type: 'select',
                    name: 'parent_location_id',
                    label: 'Parent Location',
                    query: {url: '/api/locations', field: 'parent_location.name', name: 'parentLocationOptions'},
                    size: 'medium'
                },
            ]
        },
        divider_1: {
            orientation: 'left',
            label: 'Additional Information'
        },
        row_2: {
            col_1: [
                {
                    type: 'select',
                    name: 'type',
                    label: 'Type',
                    options: [
                        {value: 'vendor', label: 'Vendor'},
                        {value: 'view', label: 'View'},
                        {value: 'internal', label: 'Internal'},
                        {value: 'customer', label: 'Customer'},
                        {value: 'inventory_loss', label: 'Inventory Loss'},
                        {value: 'production', label: 'Production'},
                        {value: 'transit_location', label: 'Transit Location'},
                    ],
                    required: true,
                    message: 'Please select a location type'
                },
                {
                    type: 'checkbox',
                    name: 'is_a_scrap_location',
                    label: 'Is a scrap location?',
                },
                {
                    type: 'checkbox',
                    name: 'is_a_return_location',
                    label: 'Is a return location?',
                },
            ]
        }
    }
};
