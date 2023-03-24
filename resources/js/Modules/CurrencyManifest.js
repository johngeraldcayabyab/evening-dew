import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import {Tag} from "antd";

const manifest = {
    moduleName: "currencies",
    displayName: "currencies",
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
                title: 'Currency',
                dataIndex: 'currency',
                key: 'currency',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Symbol',
                dataIndex: 'symbol',
                key: 'symbol',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
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
                title: 'Default',
                dataIndex: 'is_default',
                key: 'is_default',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.is_default) {
                        return <Tag color="green">Yes</Tag>
                    }
                    return <Tag color="red">No</Tag>
                }
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
                    name: 'currency',
                    label: 'Currency',
                    required: true
                },
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'unit',
                    label: 'Unit',
                },
                {
                    type: 'text',
                    name: 'sub_unit',
                    label: 'sub_unit',
                },
                {
                    type: 'checkbox',
                    name: 'is_default',
                    label: 'Is Default',
                },
            ]
        },
        row_2: {
            col_1: [
                {
                    type: 'number',
                    name: 'rounding_factor',
                    label: 'Rounding Factor',
                },
                {
                    type: 'number',
                    name: 'decimal_places',
                    label: 'Decimal Places',
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'symbol',
                    label: 'Symbol',
                    required: true
                },
                {
                    type: 'select',
                    name: 'symbol_position',
                    label: 'Symbol Position',
                    required: true,
                    options: [
                        {value: 'after_amount', label: 'After Amount'},
                        {value: 'before_amount', label: 'Before Amount'},
                    ]
                },
            ]
        }
    }
};

export default manifest;
