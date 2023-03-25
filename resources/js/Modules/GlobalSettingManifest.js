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
                    col_1: [],
                },
                divider_1: {
                    type: 'divider',
                    name: 'divider_1',
                    orientation: 'left',
                    label: 'Table'
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
                    col_1: [],
                    col_2: []
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
                    col_1: [],
                },
            },
            tab_pane_4: {
                name: 'Sales',
                row_1: {
                    col_1: [],
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
