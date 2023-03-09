import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "operations_types",
    displayName: "operations_types",
    queryDefaults: {},
    routes: [HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE],
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
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Warehouse',
                dataIndex: 'warehouse',
                key: 'warehouse',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.warehouse) {
                        return record.warehouse.name;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Reference Sequence',
                dataIndex: 'reference_sequence',
                key: 'reference_sequence',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.reference_sequence) {
                        return record.reference_sequence.name;
                    }
                    return null;
                },
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
                },
                {
                    type: 'select',
                    name: 'reference_sequence_id',
                    label: 'Reference Sequence',
                    query: {url: '/api/sequences', field: 'name'},
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
                    query: {url: '/api/warehouses', field: 'name'},
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
                    query: {url: '/api/operations_types', field: 'name'},
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
                    query: {url: '/api/locations', field: 'name'},
                },
                {
                    type: 'select',
                    name: 'default_destination_location_id',
                    label: 'Default Destination Location',
                    query: {url: '/api/locations', field: 'name'},
                },
            ]
        }
    }
};

export default manifest;
