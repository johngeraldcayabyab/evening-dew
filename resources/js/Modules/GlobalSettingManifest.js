import {HAS_FORM_CREATE} from "../consts"

const manifest = {
    moduleName: "global_settings",
    displayName: "global_settings",
    queryDefaults: {},
    routes: [HAS_FORM_CREATE],
    form: {
        updatable: false,
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
                            query: {url: '/api/countries', field: 'country_name'},
                        },
                    ],
                },
                divider_1: {
                    type: 'divider',
                    name: 'divider_1',
                    orientation: 'left',
                    label: 'Table'
                },
                row_2: {
                    col_1: [
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
                            query: {url: '/api/measurement_categories', field: 'name'},
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_measurement_id',
                            label: 'Default Measurement',
                            query: {url: '/api/measurements', field: 'name'},
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_purchase_measurement_id',
                            label: 'Default Purchase Measurement',
                            query: {url: '/api/measurements', field: 'name'},
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_sales_measurement_id',
                            label: 'Default Sales Measurement',
                            query: {url: '/api/measurements', field: 'name'},
                        },
                    ],
                    col_2: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Category'
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
                            name: 'inventory_default_adjustment_location_id',
                            label: 'Default Adjustment Location',
                            query: {url: '/api/locations', field: 'name'},
                        },
                    ],
                    col_2: [
                        {
                            type: 'select',
                            name: 'inventory_default_production_id',
                            label: 'Default Production Location',
                            query: {url: '/api/locations', field: 'name'},
                        },
                        {
                            type: 'select',
                            name: 'inventory_default_scrap_id',
                            label: 'Default Scrap Location',
                            query: {url: '/api/locations', field: 'name'},
                        },
                    ]
                },
                divider_2: {
                    type: 'divider',
                    name: 'divider_2',
                    orientation: 'left',
                    label: 'Defaults'
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
                            type: 'select',
                            name: 'accounting_default_currency_id',
                            label: 'Default Currency',
                            query: {url: '/api/currencies', field: 'name'},
                        },
                    ],
                },
            },
            tab_pane_4: {
                name: 'Sales',
                row_1: {
                    col_1: [
                        {
                            type: 'select',
                            name: 'sales_order_default_delivery_fee_id',
                            label: 'Sales Default Delivery Fee',
                            query: {url: '/api/delivery_fees', field: 'name'},
                        },
                    ],
                },
            },
            tab_pane_5: {
                name: 'Purchases',
                row_1: {
                    col_1: [],
                },
            }
        }
    }
};

export default manifest;
