import {DATE_RANGE, SEARCH} from "../consts"

const displayName = "locations";

const manifest = {
    "moduleName": "locations",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, manifest: () => manifest},
        {path: `/${displayName}/:id`, manifest: () => manifest},
        {path: `/${displayName}`, manifest: () => manifest},
    ],
    table: {
        columnSelection: true,
        columns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: true,
                hidden: true,
            },
            {
                title: 'Name',
                dataIndex: 'parents',
                key: 'name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            },
        ]
    },
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
                {
                    type: 'select',
                    name: 'parent_location_id',
                    label: 'Parent Location',
                    query: {url: '/api/locations', field: 'parent_location.name'},
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

export default manifest;
