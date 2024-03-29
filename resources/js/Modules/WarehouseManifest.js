import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH, VISIBILITY_CREATED} from "../consts";

const manifest = {
    moduleName: "warehouses",
    displayName: "warehouses",
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
                title: 'Short Name',
                dataIndex: 'short_name',
                key: 'short_name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Default',
                dataIndex: 'is_default',
                key: 'is_default',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: '#87d068', label: 'Yes', value: true},
                    {color: '#f50', label: 'No', value: false}
                ]
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
                    type: 'text',
                    name: 'short_name',
                    label: 'Short Name',
                    required: true,
                    size: 'medium'
                },
            ],
            col_2: [
                {
                    type: 'checkbox',
                    name: 'is_default',
                    label: 'Is Default',
                },
            ]
        },
        tab_1: {
            tab_pane_1: {
                name: "Warehouse Configuration",
                row_1: {
                    col_1: [
                        {
                            type: 'checkbox',
                            name: 'manufacture_to_resupply',
                            label: 'Manufacture to resupply',
                        },
                        {
                            type: 'checkbox',
                            name: 'buy_to_resupply',
                            label: 'Buy to resupply',
                        },
                    ]
                }
            },
            tab_pane_2: {
                visibility: VISIBILITY_CREATED,
                name: "Technical Information",
                row_1: {
                    col_1: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Locations'
                        },
                        {
                            type: 'select',
                            name: 'view_location_id',
                            label: 'View Location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'stock_location_id',
                            label: 'Stock Location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'input_location_id',
                            label: 'Input Location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'quality_control_location_id',
                            label: 'Quality Control Location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'packing_location_id',
                            label: 'Packing Location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'output_location_id',
                            label: 'Output Location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'stock_after_manufacturing_location_id',
                            label: 'Stock after manufacturing location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'picking_before_manufacturing_location_id',
                            label: 'Picking before manufacturing location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'adjustment_location_id',
                            label: 'Adjustment Location',
                            query: {url: '/api/locations', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                    ],
                    col_2: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Operation Types'
                        },
                        {
                            type: 'select',
                            name: 'in_type_id',
                            label: 'In Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'internal_type_id',
                            label: 'Internal Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'pick_type_id',
                            label: 'Pick Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'pack_type_id',
                            label: 'Pack Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'out_type_id',
                            label: 'Out Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'stock_after_manufacturing_operation_type_id',
                            label: 'Stock After Manufacturing Operation Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'picking_before_manufacturing_operation_type_id',
                            label: 'Picking Before Manufacturing Operation Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'manufacturing_operation_type_id',
                            label: 'Manufacturing Operation Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                        {
                            type: 'select',
                            name: 'adjustment_operation_type_id',
                            label: 'Adjustment Operation Type',
                            query: {url: '/api/operations_types', field: 'name'},
                            required: true,
                            overrideDisabled: true,
                        },
                    ]
                }
            }
        }
    }
};

export default manifest;
