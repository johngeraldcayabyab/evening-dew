import {getPersistedKey, isLineFieldExecute} from "../Helpers/form"
import {DATE_RANGE, GET, SEARCH} from "../consts"
import {disableIfStatus} from "../Helpers/object"
import Text from "antd/es/typography/Text"
import {Tag} from "antd"

const displayName = "transfers";

const manifest = {
    "moduleName": "transfers",
    "displayName": displayName,
    "queryDefaults": {},
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
                render: (text, record) => {
                    return <Text strong><span style={{fontSize: '12px'}}>{record.reference}</span></Text>
                },
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
                render: (text, record) => {
                    const color = {draft: 'processing', done: 'success', cancelled: 'default'};
                    return <Tag color={color[record.status]}>{record.status.toUpperCase()}</Tag>
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

export default manifest;
