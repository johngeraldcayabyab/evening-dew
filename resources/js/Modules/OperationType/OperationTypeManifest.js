import OperationTypeTable from "./OperationTypeTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "operations_types";

const manifest = {
    "moduleName": "operations_types",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: OperationTypeTable},
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
                },
                {
                    type: 'select',
                    name: 'reference_sequence_id',
                    label: 'Reference Sequence',
                    query: {url: '/api/sequences', field: 'reference_sequence.name'},
                    required: true,
                },
                {
                    type: 'text',
                    name: 'code',
                    label: 'Code',
                    required: true,
                },
                {
                    type: 'select',
                    name: 'warehouse_id',
                    label: 'Warehouse',
                    query: {url: '/api/warehouses', field: 'warehouse.name'},
                },
                {
                    type: 'select',
                    name: 'reservation_method',
                    label: 'Reservation Method',
                    options: [
                        {value: 'at_confirmation', label: 'At Confirmation'},
                        {value: 'manually', label: 'Manually'},
                        {value: 'before_scheduled_date', label: 'Before Scheduled Date'},
                    ]
                },
                {
                    type: 'number',
                    name: 'reservation_days_before',
                    label: 'Reservation Days Before',
                },
                {
                    type: 'number',
                    name: 'reservation_days_before_priority',
                    label: 'Reservation Days Before Priority',
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'type',
                    label: 'Type Of Operation',
                    required: true,
                    options: [
                        [
                            {value: 'receipt', label: 'Receipt'},
                            {value: 'delivery', label: 'Delivery'},
                            {value: 'internal', label: 'Internal'},
                            {value: 'manufacturing', label: 'Manufacturing'},
                            {value: 'adjustment', label: 'Adjustment'},
                        ]
                    ]
                },
                {
                    type: 'select',
                    name: 'operation_type_for_returns_id',
                    label: 'Operation Type For Returns',
                    query: {url: '/api/operations_types', field: 'operation_type_for_returns.name'},
                },
                {
                    type: 'checkbox',
                    name: 'show_detailed_operation',
                    label: 'Show Detailed Operation',
                },
                {
                    type: 'checkbox',
                    name: 'pre_fill_detailed_operation',
                    label: 'Pre Fill Detailed Operation',
                },
            ]
        },
        row_2: {
            col_1: [
                {
                    type: 'checkbox',
                    name: 'create_new_lots_serial_numbers',
                    label: 'Create new lots/serial numbers',
                },
                {
                    type: 'checkbox',
                    name: 'Use existing lots/serial numbers',
                    label: 'Pre Fill Detailed Operation',
                },
                {
                    type: 'checkbox',
                    name: 'create_new_lots_serial_numbers_for_components',
                    label: 'Create new lots/serial numbers for components',
                },
            ],
            col_2: [
                {
                    type: 'select',
                    name: 'default_source_location_id',
                    label: 'Default Source Location',
                    query: {url: '/api/locations', field: 'default_source_location.name'},
                },
                {
                    type: 'select',
                    name: 'default_destination_location_id',
                    label: 'Default Destination Location',
                    query: {url: '/api/locations', field: 'default_destination_location.name'},
                },
            ]
        }
    }
};

export default manifest;
