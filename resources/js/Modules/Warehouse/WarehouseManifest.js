import WarehouseForm from "./WarehouseForm";
import WarehouseTable from "./WarehouseTable";

const displayName = "warehouses";

export default {
    "moduleName": "warehouses",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: WarehouseForm},
        {path: `/${displayName}/:id`, component: WarehouseForm},
        {path: `/${displayName}`, component: WarehouseTable},
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
                    type: 'text',
                    name: 'short_name',
                    label: 'Short Name',
                    message: 'Please input short name',
                    required: true,
                    size: 'medium'
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
                visibility: 'created',
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
                            query: {url: '/api/locations', field: 'view_location.name'},
                            message: 'Please select a view location',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'stock_location_id',
                            label: 'Stock Location',
                            query: {url: '/api/locations', field: 'stock_location.name'},
                            message: 'Please select a view location',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'input_location_id',
                            label: 'Input Location',
                            query: {url: '/api/locations', field: 'input_location.name'},
                            message: 'Please select a view location',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'quality_control_location_id',
                            label: 'Quality Control Location',
                            query: {url: '/api/locations', field: 'quality_control_location.name'},
                            message: 'Please select a view location',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'packing_location_id',
                            label: 'Packing Location',
                            query: {url: '/api/locations', field: 'packing_location.name'},
                            message: 'Please select a view location',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'output_location_id',
                            label: 'Output Location',
                            query: {url: '/api/locations', field: 'output_location.name'},
                            message: 'Please select a view location',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'stock_after_manufacturing_location_id',
                            label: 'Stock after manufacturing location',
                            query: {url: '/api/locations', field: 'stock_after_manufacturing_location.name'},
                            message: 'Please select a view location',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'picking_before_manufacturing_location_id',
                            label: 'Picking before manufacturing location',
                            query: {url: '/api/locations', field: 'picking_before_manufacturing_location.name'},
                            message: 'Please select a picking before manufacturing location',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'adjustment_location_id',
                            label: 'Adjustment Location',
                            query: {url: '/api/locations', field: 'adjustment_location.name'},
                            message: 'Please select a view location',
                            required: true
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
                            query: {url: '/api/operations_types', field: 'in_type.name'},
                            message: 'Please select a in operation type',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'internal_type_id',
                            label: 'Internal Type',
                            query: {url: '/api/operations_types', field: 'internal_type.name'},
                            message: 'Please select a internal operation type',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'pick_type_id',
                            label: 'Pick Type',
                            query: {url: '/api/operations_types', field: 'pick_type.name'},
                            message: 'Please select a pick operation type',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'pack_type_id',
                            label: 'Pack Type',
                            query: {url: '/api/operations_types', field: 'pack_type.name'},
                            message: 'Please select a pack operation type',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'out_type_id',
                            label: 'Out Type',
                            query: {url: '/api/operations_types', field: 'out_type.name'},
                            message: 'Please select a out operation type',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'stock_after_manufacturing_operation_type_id',
                            label: 'Stock After Manufacturing Operation Type',
                            query: {url: '/api/operations_types', field: 'stock_after_manufacturing_operation_type.name'},
                            message: 'Please select a stock after manufacturing operation type',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'picking_before_manufacturing_operation_type_id',
                            label: 'Picking Before Manufacturing Operation Type',
                            query: {url: '/api/operations_types', field: 'picking_before_manufacturing_operation_type.name'},
                            message: 'Please select a picking before manufacturing operation type',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'manufacturing_operation_type_id',
                            label: 'Manufacturing Operation Type',
                            query: {url: '/api/operations_types', field: 'manufacturing_operation_type.name'},
                            message: 'Please select a manufacturing operation type',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'adjustment_operation_type_id',
                            label: 'Adjustment Operation Type',
                            query: {url: '/api/operations_types', field: 'adjustment_operation_type.name'},
                            message: 'Please select an adjustment operation type',
                            required: true
                        },
                    ]
                }
            }
        }
    }
}
