import GlobalSettingForm from "./GlobalSettingForm";

const displayName = "global_settings";

export default {
    "moduleName": "global_settings",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}`, component: GlobalSettingForm},
    ],
    form: {
        initialValue: true,
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: 'General',
                row_1: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'general_default_country_id',
                            label: 'Default Country',
                            query: {url: '/api/countries', field: 'general_default_country.country_name'},
                        },
                    ],
                    col_2: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Table'
                        },
                        {
                            type: 'checkbox',
                            name: 'general_clickable_row',
                            label: 'Clickable Row',
                        },
                    ],
                },
            },
            tab_pane_2: {
                name: 'Inventory',
                row_1: {
                    col_1: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Measurements'
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_measurement_category_id',
                            label: 'Default Measurement Category',
                            query: {
                                url: '/api/measurement_categories',
                                field: 'inventory_default_measurement_category.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_measurement_id',
                            label: 'Default Measurement',
                            query: {
                                url: '/api/measurements',
                                field: 'inventory_default_measurement.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_purchase_measurement_id',
                            label: 'Default Purchase Measurement',
                            query: {
                                url: '/api/measurements',
                                field: 'inventory_default_purchase_measurement.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_sales_measurement_id',
                            label: 'Default Sales Measurement',
                            query: {
                                url: '/api/measurements',
                                field: 'inventory_default_sales_measurement.name'
                            },
                        },
                    ],
                    col_2: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Category'
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_product_category_id',
                            label: 'Default Product Category',
                            query: {
                                url: '/api/product_categories',
                                field: 'inventory_default_product_category.name'
                            },
                        },
                    ]
                },
                divider_1: {
                    type: 'divider',
                    name: 'divider_1',
                    orientation: 'left',
                    label: 'Locations'
                },
                row_2: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'inventory_default_customer_location_id',
                            label: 'Default Customer Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_customer_location.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_vendor_location_id',
                            label: 'Default Vendor Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_vendor_location.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_adjustment_location_id',
                            label: 'Default Adjustment Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_adjustment_location.name'
                            },
                        },
                    ],
                    col_2: [
                        {
                            type: 'select',
                            name: 'inventory_default_production_id',
                            label: 'Default Production Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_production.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_scrap_id',
                            label: 'Default Scrap Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_scrap.name'
                            },
                        },
                    ]
                },
                divider_2: {
                    type: 'divider',
                    name: 'divider_2',
                    orientation: 'left',
                    label: 'Defaults'
                },
                row_3: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'inventory_default_warehouse_id',
                            label: 'Default Warehouse',
                            query: {
                                url: '/api/warehouses',
                                field: 'inventory_default_warehouse.name'
                            },
                        },

                    ],
                },
                divider_3: {
                    type: 'divider',
                    name: 'divider_3',
                    orientation: 'left',
                    label: 'Background'
                },
                row_4: {
                    col_1: [
                        {
                            type: 'checkbox',
                            name: 'inventory_auto_validate_draft',
                            label: 'Auto validate drafts',
                        },
                        {
                            type: 'checkbox',
                            name: 'inventory_compute_product_quantity',
                            label: 'Compute Product Quantity',
                        },
                    ],
                },
            },
            tab_pane_3: {
                name: 'Accounting',
                row_1: {
                    col_1: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Measurements'
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_measurement_category_id',
                            label: 'Default Measurement Category',
                            query: {
                                url: '/api/measurement_categories',
                                field: 'inventory_default_measurement_category.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_measurement_id',
                            label: 'Default Measurement',
                            query: {
                                url: '/api/measurements',
                                field: 'inventory_default_measurement.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_purchase_measurement_id',
                            label: 'Default Purchase Measurement',
                            query: {
                                url: '/api/measurements',
                                field: 'inventory_default_purchase_measurement.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_sales_measurement_id',
                            label: 'Default Sales Measurement',
                            query: {
                                url: '/api/measurements',
                                field: 'inventory_default_sales_measurement.name'
                            },
                        },
                    ],
                    col_2: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Category'
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_product_category_id',
                            label: 'Default Product Category',
                            query: {
                                url: '/api/product_categories',
                                field: 'inventory_default_product_category.name'
                            },
                        },
                    ]
                },
                divider_1: {
                    type: 'divider',
                    name: 'divider_1',
                    orientation: 'left',
                    label: 'Locations'
                },
                row_2: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'inventory_default_customer_location_id',
                            label: 'Default Customer Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_customer_location.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_vendor_location_id',
                            label: 'Default Vendor Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_vendor_location.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_adjustment_location_id',
                            label: 'Default Adjustment Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_adjustment_location.name'
                            },
                        },
                    ],
                    col_2: [
                        {
                            type: 'select',
                            name: 'inventory_default_production_id',
                            label: 'Default Production Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_production.name'
                            },
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_scrap_id',
                            label: 'Default Scrap Location',
                            query: {
                                url: '/api/locations',
                                field: 'inventory_default_scrap.name'
                            },
                        },
                    ]
                },
                divider_2: {
                    type: 'divider',
                    name: 'divider_2',
                    orientation: 'left',
                    label: 'Defaults'
                },
                row_3: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'inventory_default_warehouse_id',
                            label: 'Default Warehouse',
                            query: {
                                url: '/api/warehouses',
                                field: 'inventory_default_warehouse.name'
                            },
                        },

                    ],
                },
                divider_3: {
                    type: 'divider',
                    name: 'divider_3',
                    orientation: 'left',
                    label: 'Background'
                },
                row_4: {
                    col_1: [
                        {
                            type: 'checkbox',
                            name: 'inventory_auto_validate_draft',
                            label: 'Auto validate drafts',
                        },
                        {
                            type: 'checkbox',
                            name: 'inventory_compute_product_quantity',
                            label: 'Compute Product Quantity',
                        },
                    ],
                },
            }
        }
    }
};
