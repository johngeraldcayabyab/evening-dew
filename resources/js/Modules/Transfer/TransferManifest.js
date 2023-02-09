import TransferForm from "./TransferForm";
import TransferTable from "./TransferTable";
import {getPersistedKey, isLineFieldExecute} from "../../Helpers/form"
import {GET} from "../../consts"
import {disableIfStatus} from "../../Helpers/object"

const displayName = "transfers";

export default {
    "moduleName": "transfers",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: TransferForm},
        {path: `/${displayName}/:id`, component: TransferForm},
        {path: `/${displayName}`, component: TransferTable},
    ],
    statuses: [
        {
            value: 'draft',
            title: 'Draft',
            status: {draft: 'process', done: 'finish', cancelled: 'wait'}
        },
        {
            value: 'done',
            title: 'Done',
            type: 'primary',
            label: 'Validate',
            status: {draft: 'wait', done: 'finish', cancelled: 'wait'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
        {
            value: 'cancelled',
            title: 'Cancelled',
            type: 'ghost',
            label: 'Cancel',
            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
    ],
    form: {
        initialValue: true,
        onValuesChange: (changedValues, allValues, formContext) => {
            if (changedValues.operation_type_id) {
                formContext.useFetch(`/api/operations_types`, GET, {
                    id: changedValues.operation_type_id
                }).then((response) => {
                    const data = response.data[0];
                    let sourceLocationId = data.default_source_location_id;
                    let destinationLocationId = data.default_destination_location_id;
                    formContext.form.setFieldsValue({
                        source_location_id: sourceLocationId,
                        destination_location_id: destinationLocationId
                    });
                    formContext.options['source_location_id-options'].getOptions({id: sourceLocationId});
                    formContext.options['destination_location_id-options'].getOptions({id: destinationLocationId});
                }).catch((responseErr) => {
                    formContext.fetchCatcher.get(responseErr);
                });
            }
            isLineFieldExecute(changedValues, allValues, 'transfer_lines', 'product_id', (line, allValues) => {
                formContext.useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
                    const transferLines = allValues.transfer_lines;
                    transferLines[line.key] = {
                        ...transferLines[line.key],
                        measurement_id: response.measurement_id,
                    };
                    formContext.form.setFieldsValue({
                        material_lines: transferLines
                    });
                    const persistedKey = getPersistedKey(line, formContext.options['measurement_id-lineOptions'].options)
                    formContext.options['measurement_id-lineOptions'].getOptions(response.measurement.name, persistedKey);
                }).catch((responseErr) => {
                    formContext.fetchCatcher.get(responseErr);
                });
            });
        },
        row_1: {
            col_1: [
                {
                    type: 'status',
                    name: 'status',
                },
                {
                    type: 'number',
                    name: 'reference',
                    label: 'Reference',
                    size: 'large',
                    overrideDisabled: true,
                },
            ],
        },
        row_2: {
            col_1: [
                {
                    type: 'select',
                    name: 'contact_id',
                    label: 'Contact',
                    query: {url: '/api/contacts', field: 'contact.name'},
                },
                {
                    type: 'select',
                    name: 'operation_type_id',
                    label: 'Operation Type',
                    query: {url: '/api/operations_types', field: 'operation_type.name'},
                    required: true,
                },
                {
                    type: 'select',
                    name: 'source_location_id',
                    label: 'Source Location',
                    query: {url: '/api/locations', field: 'source_location.name'},
                },
                {
                    type: 'select',
                    name: 'destination_location_id',
                    label: 'Destination Location',
                    query: {url: '/api/locations', field: 'destination_location.name'},
                },
            ],
            col_2: [
                {
                    type: 'date',
                    name: 'scheduled_date',
                    label: 'Scheduled date',
                },
                {
                    type: 'text',
                    name: 'source_document',
                    label: 'Source Document',
                },
                {
                    type: 'text',
                    name: 'notes',
                    label: 'Notes',
                },
                {
                    type: 'select',
                    name: 'shipping_method',
                    label: 'Shipping Method',
                    options: [
                        {value: 'delivery', label: 'Delivery'},
                        {value: 'pickup', label: 'Pickup'},
                    ]
                },
            ]
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: "Operations",
                form_line_1: {
                    columns: ['Product', 'Description', 'Demand', 'Measurement'],
                    listName: 'transfer_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'product.name'},
                            required: true,
                            listName: 'transfer_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'text',
                            name: 'description',
                            listName: 'transfer_lines',
                            placeholder: 'Description',
                        },
                        {
                            type: 'number',
                            name: 'demand',
                            placeholder: 'Demand',
                            required: true,
                            listName: 'transfer_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            query: {url: '/api/measurements', field: 'measurement.name'},
                            required: true,
                            listName: 'transfer_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                    ]
                },
            },
            tab_pane_2: {
                name: "Additional Info",
                row_1: {
                    col_1: [
                        {
                            type: 'text',
                            name: 'tracking_reference',
                            label: 'Tracking Reference',
                        },
                    ],
                    col_2: [
                        {
                            type: 'select',
                            name: 'shipping_policy',
                            label: 'Shipping Policy',
                            options: [
                                {value: 'as_soon_as_possible', label: 'As soon as possible'},
                                {value: 'when_all_products_are_ready', label: 'When all products are ready'},
                            ],
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'responsible_id',
                            label: 'Responsible',
                            query: {url: '/api/users', field: 'responsible.name'},
                        },
                    ]
                }
            },
            tab_pane_3: {
                name: "Note",
                row_1: {
                    col_1: [
                        {
                            type: 'text',
                            name: 'note',
                            label: 'Note',
                        },
                    ],
                }
            }
        }
    },
};
