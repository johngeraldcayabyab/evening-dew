import {DATE_RANGE, GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import {disableIfStatus} from "../Helpers/object";
import Text from "antd/es/typography/Text";

const manifest = {
    moduleName: "transfers",
    displayName: "transfers",
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
                title: 'Reference',
                dataIndex: 'reference',
                key: 'reference',
                sorter: true,
                filter: SEARCH,
                sequenceNumberRender: true,
                isGlobalSearch: true,
            },
            {
                title: 'From',
                dataIndex: 'source_location',
                key: 'source_location',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.source_location) {
                        return record.source_location.parents;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'To',
                dataIndex: 'destination_location',
                key: 'destination_location',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.destination_location) {
                        return record.destination_location.parents;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Contact',
                dataIndex: 'contact',
                key: 'contact',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.contact) {
                        return record.contact.name;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Scheduled Date',
                dataIndex: 'scheduled_date_human',
                key: 'scheduled_date_human',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.status !== 'done') {
                        if (record.scheduled_date_human.includes('ago')) {
                            return <Text type="danger">{record.scheduled_date_human}</Text>;
                        } else if (record.scheduled_date_human.includes('hours from now')) {
                            return <Text type="warning">{record.scheduled_date_human}</Text>;
                        } else {
                            return record.scheduled_date_human;
                        }
                    }
                    return '';
                },
                isGlobalSearch: true,
            },
            {
                title: 'Source Document',
                dataIndex: 'source_document',
                key: 'source_document',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: 'processing', label: 'Draft', value: 'draft'},
                    {color: 'default', label: 'Cancelled', value: 'cancelled'},
                    {color: 'success', label: 'Done', value: 'done'}
                ],
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
    initialState: {
        queries: {
            measurements: {url: '/api/measurements', options: []},
            locations: {url: '/api/locations', options: []}
        }
    },
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
            type: 'primary',
            label: 'Cancel',
            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
    ],
    form: {
        initialValue: true,
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
                    query: {url: '/api/contacts', field: 'name'},
                },
                {
                    type: 'select',
                    name: 'operation_type_id',
                    label: 'Operation Type',
                    query: {url: '/api/operations_types', field: 'name'},
                    required: true,
                    onValueChange: (changedValues, values, formContext) => {
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
                        });
                    }
                },
                {
                    type: 'select',
                    name: 'source_location_id',
                    label: 'Source Location',
                    optionsState: 'queries.locations',
                },
                {
                    type: 'select',
                    name: 'destination_location_id',
                    label: 'Destination Location',
                    optionsState: 'queries.locations',
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
                            query: {url: '/api/products', field: 'name'},
                            required: true,
                            onValueChange: (changedValues, values, formContext, changedLine, allValues) => {
                                formContext.useFetch(`/api/products/${changedLine.product_id}`, GET).then((response) => {
                                    const transferLines = allValues.transfer_lines;
                                    transferLines[changedLine.key] = {
                                        ...transferLines[changedLine.key],
                                        measurement_id: response.measurement_id,
                                    };
                                    formContext.form.setFieldsValue({
                                        material_lines: transferLines
                                    });
                                });
                            },
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'text',
                            name: 'description',
                            placeholder: 'Description',
                        },
                        {
                            type: 'number',
                            name: 'demand',
                            placeholder: 'Demand',
                            required: true,
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            optionsState: 'queries.measurements',
                            required: true,
                            overrideDisabled: (formContext) => disableIfStatus(formContext.formState, 'done')
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
                            query: {url: '/api/users', field: 'name'},
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

export default manifest;
